import { NextApiResponse } from "next";
import { POST_CATEGORIES, POST_LABELS, TIME } from "../../../../constants";
import { hot } from "../../../../constants/hot";
import { dbConnect } from "../../../../util/mongodb";
import { redisConnect } from "../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../util/session";
import { getUser } from "../../../../util/user";

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

	const cacheKey = `posts:${user?.id ?? "-"}:${
		req.url?.split("?")[1] ?? "-"
	}`;

	const cached = await redis.get(cacheKey);

	if (cached) {
		return res.json({
			posts: JSON.parse(cached),
		});
	}
	const posts = await db
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
				$lookup: {
					from: "community-posts-upvotes",
					localField: "_id",
					foreignField: "pID",
					as: "upvotedUsers",
				},
			},
			{
				$lookup: {
					from: "community-posts-comments",
					localField: "_id",
					foreignField: "pID",
					as: "commentsData",
				},
			},
			{
				$addFields: {
					upvotes: { $size: "$upvotedUsers" },
					comments: { $size: "$commentsData" },
					bad: {
						$or: [
							{ $eq: ["$label", "invalid"] },
							{ $eq: ["$label", "duplicate"] },
						],
					},
					denyInt: { $cond: [{ $eq: ["$label", "denied"] }, -1, 1] },
				},
			},
			{
				$addFields: {
					hot: hot,
				},
			},
			{
				$addFields: {
					upvotedUser: user
						? {
								$filter: {
									input: "$upvotedUsers",
									as: "up",
									cond: {
										$eq: ["$$up.uID", user.id],
									},
								},
						  }
						: [],
				},
			},
			{
				$addFields: {
					upvoted: { $ne: [{ $size: "$upvotedUser" }, 0] },
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
				$unset: [
					"upvotedUsers",
					"upvotedUser",
					"commentsData",
					"developerComments",
					"denyInt",
					"hot",
					"show",
				],
			},
			{
				$skip: from,
			},
			{
				$limit: amount,
			},
		])
		.toArray();

	for (const post of posts) {
		post.author = await getUser(post.author);
	}

	await redis.set(cacheKey, JSON.stringify(posts), "PX", TIME.day);

	return res.json({
		posts: posts,
	});
};

export default withSession(handler);
