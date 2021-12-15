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
	const statsPipeline = redis.pipeline();
	const upvotedPipline = redis.pipeline();

	for (const post of posts) {
		statsPipeline.get(`community:post:stats:${post._id}`);
		if (user) {
			upvotedPipline.get(`community:post:upvoted:${post._id}:${user.id}`);
		}
	}

	const statsData = await statsPipeline.exec();
	const upvotedData = await upvotedPipline.exec();

	for (let i = 0; i < posts.length; i++) {
		const post = posts[i];
		post.author = userData[i];

		if (!statsData[i][1]) {
			const upvotesCount = await db
				.collection("community-posts-upvotes")
				.find({ pID: post._id })
				.count();

			const commentsCount = await db
				.collection("community-posts-comments")
				.find({ pID: post._id })
				.count();

			statsPipeline.set(
				`community:post:stats:${post._id}`,
				`${upvotesCount},${commentsCount}`,
				"PX",
				TIME.day
			);

			post.upvotes = upvotesCount;
			post.comments = commentsCount;
		} else {
			post.upvotes = parseInt(statsData[i][1].split(",")[0]);
			post.comments = parseInt(statsData[i][1].split(",")[1]);
		}

		if (user) {
			if (!upvotedData[i][1]) {
				const upvoted = await db
					.collection("community-posts-upvotes")
					.find({ pID: post._id, uID: user.id })
					.count();

				statsPipeline.set(
					`community:post:upvoted:${post._id}:${user.id}`,
					upvoted,
					"PX",
					TIME.day
				);

				post.upvoted = upvoted == 1;
			} else {
				post.upvoted = upvotedData[i][1] == "1";
			}
		}
	}

	await statsPipeline.exec();

	return posts;
}
