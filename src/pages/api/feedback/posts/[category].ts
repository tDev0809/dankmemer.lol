import { NextApiResponse } from "next";
import { FEEDBACK_CATEGORIES, FEEDBACK_LABELS } from "../../../../constants";
import { dbConnect } from "../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { category } = req.query;

	const user = req.session.get("user");
	const staff = user?.isAdmin || user?.isModerator;

	if (
		!category ||
		!FEEDBACK_CATEGORIES.concat("all").includes(category as string)
	) {
		return res
			.status(500)
			.json({ message: "This category does not exist." });
	}

	const from = Number(req.query.from) || 0;
	const amount = Number(req.query.amount) || 10;
	const sorting = req.query.sorting || "Hot";
	let filter = req.query.filter || "all posts";

	if (!FEEDBACK_LABELS.includes(filter as string)) {
		filter = "all posts";
	}

	const posts = await db
		.collection("feedback_posts")
		.aggregate([
			{
				$match:
					category === "all"
						? {
								_id: { $ne: "" },
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
					from: "feedback_upvotes",
					localField: "_id",
					foreignField: "pID",
					as: "upvotedUsers",
				},
			},
			{
				$lookup: {
					from: "feedback_comments",
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
					developerComments: {
						$filter: {
							input: "$commentsData",
							as: "cm",
							cond: {
								$eq: ["$$cm.author.developer", true],
							},
						},
					},
				},
			},
			{
				$addFields: {
					upvoted: { $ne: [{ $size: "$upvotedUser" }, 0] },
					developerResponse: {
						$ne: [{ $size: "$developerComments" }, 0],
					},
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
							{ $eq: ["$author.idA", user?.id] },
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

	return res.json({
		posts: posts,
		all: posts.length == 0 || posts.length < amount,
	});
};

export default withSession(handler);
