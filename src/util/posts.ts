import { TIME } from "../constants";
import { Post, User } from "../types";
import { dbConnect } from "./mongodb";
import { redisConnect } from "./redis";
import { getUsers } from "./user";

export async function getPostsData(
	posts: Post[],
	user: User | null
): Promise<Post[]> {
	const { db } = await dbConnect();
	const redis = await redisConnect();
	const userData = await getUsers(posts.map((p) => p.author as string));
	const commentsPipeline = redis.pipeline();
	const upvotedPipline = redis.pipeline();

	for (const post of posts) {
		commentsPipeline.get(`community:post:comments:${post._id}`);
		if (user) {
			upvotedPipline.get(`community:post:upvoted:${post._id}:${user.id}`);
		}
	}

	const commentsData = await commentsPipeline.exec();
	const upvotedData = await upvotedPipline.exec();

	const upvotedNotCached: Post["_id"][] = [];

	for (let i = 0; i < posts.length; i++) {
		const post = posts[i];
		post.author = userData[i];

		if (!commentsData[i][1]) {
			const commentsCount = await db
				.collection("community-posts-comments")
				.find({ pID: post._id })
				.count();

			commentsPipeline.set(
				`community:post:comments:${post._id}`,
				commentsCount,
				"PX",
				TIME.week
			);

			post.comments = commentsCount;
		} else {
			post.comments = parseInt(commentsData[i][1]);
		}

		if (user) {
			if (!upvotedData[i][1]) {
				upvotedNotCached.push(post._id);
			} else {
				post.upvoted = upvotedData[i][1] == "1";
			}
		}
	}

	if (user) {
		const upvotedPosts = await db
			.collection("community-posts-upvotes")
			.find({
				uID: user.id,
				pID: { $in: upvotedNotCached },
			})
			.toArray();

		for (const postID of upvotedNotCached) {
			const upvoted = upvotedPosts.find((u) => u.pID == postID);

			commentsPipeline.set(
				`community:post:upvoted:${postID}:${user.id}`,
				!!upvoted ? 1 : 0,
				"PX",
				TIME.day
			);

			posts.find((p) => p._id == postID)!.upvoted = !!upvoted;
		}
	}

	await commentsPipeline.exec();

	return posts;
}
