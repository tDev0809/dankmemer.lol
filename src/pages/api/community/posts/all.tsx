import { NextApiResponse } from "next";
import { POST_CATEGORIES, POST_LABELS, TIME } from "../../../../constants";
import { hot } from "../../../../constants/hot";
import { Post } from "../../../../types";
import { dbConnect } from "../../../../util/mongodb";
import { redisConnect } from "../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../util/session";
import { getUsers } from "../../../../util/user";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const user = req.session.get("user");
	const staff: boolean = user?.isAdmin || user?.isModerator;

	const from = Number(req.query.from) || 0;
	const amount = Math.min(Number(req.query.amount) || 10, 25);
	const sorting = req.query.sorting || "Hot";
	const category = req.query.category || "all";
	let filter = req.query.filter || "all posts";

	if (!POST_LABELS.includes(filter as string)) {
		filter = "all posts";
	}

	if (
		!(POST_CATEGORIES as typeof POST_CATEGORIES & "all")
			.concat("all")
			.includes(category as string)
	) {
		return res
			.status(500)
			.json({ message: "This category does not exist." });
	}

	const posts = (await db
		.collection("community-posts")
		.aggregate([
			{
				$match:
					category === "all"
						? {
								label:
									filter === "all posts"
										? { $ne: "." }
										: filter,
						  }
						: {
								category: category,
								label:
									filter === "all posts"
										? { $ne: "." }
										: filter,
						  },
			},
			{
				$addFields: {
					bad: {
						$or: [
							{ $eq: ["$label", "invalid"] },
							{ $eq: ["$label", "duplicate"] },
						],
					},
					denyInt: { $cond: [{ $eq: ["$label", "denied"] }, -1, 1] },
					hot: hot,
				},
			},
			{
				$addFields: {
					show: {
						$or: [
							staff
								? {
										$or: [
											{ $eq: ["$bad", false] },
											{ $eq: ["$label", filter] },
										],
								  }
								: { $eq: ["$bad", false] },
							{ $eq: ["$author.id", user?.id] },
						],
					},
				},
			},
			{
				$sort:
					sorting === "Top"
						? { upvotes: -1, createdAt: -1 }
						: sorting === "New"
						? { createdAt: -1 }
						: sorting === "Hot"
						? { denyInt: -1, hot: -1, createdAt: -1 }
						: { createdAt: 1 },
			},
			{
				$match: { show: true },
			},
			{
				$unset: ["hot", "show"],
			},
			{
				$skip: from,
			},
			{
				$limit: amount,
			},
		])
		.toArray()) as Post[];

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

	return res.json({
		posts: posts,
	});
};

export default withSession(handler);
