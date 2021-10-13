import { NextApiResponse } from "next";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	const user = req.session.get("user");

	let posts = await db
		.collection("feedback_posts")
		.aggregate([
			{
				$match: { _id: id },
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
				},
			},
			{
				$unset: [
					"upvotedUsers",
					"upvotedUser",
					"commentsData",
					"developerComments",
				],
			},
			{
				$sort: {
					upvotes: -1,
				},
			},
		])
		.toArray();

	const post = posts[0];

	if (!posts) {
		return res.status(500).json({ message: "This post does not exist." });
	}

	return res.json({ post });
};

export default withSession(handler);
