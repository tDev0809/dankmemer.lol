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
				TIME.day
			);

			post.comments = commentsCount;
		} else {
			post.comments = parseInt(commentsData[i][1]);
		}

		if (user) {
			if (!upvotedData[i][1]) {
				const upvoted = await db
					.collection("community-posts-upvotes")
					.find({ pID: post._id, uID: user.id })
					.count();

				commentsPipeline.set(
					`community:post:upvoted:${post._id}:${user.id}`,
					upvoted,
					"PX",
					TIME.day * 3
				);

				post.upvoted = upvoted == 1;
			} else {
				post.upvoted = upvotedData[i][1] == "1";
			}
		}
	}

	await commentsPipeline.exec();

	return posts;
}
