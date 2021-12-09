import { NextApiResponse } from "next";
import { POST_CATEGORIES, POST_LABELS } from "../../../../constants";
import { dbConnect } from "../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../util/session";
import { getUser } from "../../../../util/user";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	const user = req.session.get("user");
	const staff: boolean = user?.isAdmin || user?.isModerator;

	const from = Number(req.query.from) || 0;
	const amount = Math.min(Number(req.query.amount) || 10, 100);
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
					hot: {
						$divide: [
							{
								$round: [
									{
										$multiply: [
											{
												$add: [
													{
														$ln: {
															$divide: [
																{
																	$add: [
																		"$upvotes",
																		1,
																	],
																},
																2.302585092994046,
															],
														},
													},
													{
														$divide: [
															{
																$subtract: [
																	{
																		$divide:
																			[
																				"$createdAt",
																				1000,
																			],
																	},
																	1631640684,
																],
															},
															45000,
														],
													},
												],
											},
											10000000,
										],
									},
									7,
								],
							},
							10000000,
						],
					},
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
				$unset: [
					"upvotedUsers",
					"upvotedUser",
					"commentsData",
					"developerComments",
					"denyInt",
				],
			},
			{
				$match: { show: true },
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

	return res.json({
		posts: posts,
		all: posts.length == 0 || posts.length < amount,
	});
};

export default withSession(handler);
