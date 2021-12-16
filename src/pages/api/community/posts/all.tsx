import { NextApiResponse } from "next";
import { POST_CATEGORIES, POST_LABELS, TIME } from "../../../../constants";
import { hot } from "../../../../constants/hot";
import { Post } from "../../../../types";
import { dbConnect } from "../../../../util/mongodb";
import { getPostsData } from "../../../../util/posts";
import { redisConnect } from "../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../util/session";
import { getUsers } from "../../../../util/user";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	const user = req.session.get("user");

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

	let posts = (await db
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
							user?.moderator
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

	posts = await getPostsData(posts, user);

	return res.json({
		posts: posts,
	});
};

export default withSession(handler);
