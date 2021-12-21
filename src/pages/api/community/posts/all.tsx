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
	const sorting = req.query.sorting || "hot";
	const category = req.query.category || "all";
	let filter = req.query.filter || "all";

	if (!POST_LABELS.includes(filter as string)) {
		filter = "all";
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
								labels:
									filter === "all" ? { $ne: "." } : filter,
						  }
						: {
								category: category,
								labels:
									filter === "all" ? { $ne: "." } : filter,
						  },
			},
			{
				$addFields: {
					bad: {
						$or: [
							{ $in: ["duplicate", "$labels"] },
							{ $in: ["denied", "$labels"] },
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
											{ $in: [filter, "$labels"] },
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
					sorting === "top"
						? { upvotes: -1, createdAt: -1 }
						: sorting === "new"
						? { createdAt: -1 }
						: sorting === "hot"
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
