import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	const user = req.session.get("user");

	const staff = await db.collection("staff").findOne({ _id: req.query.id });

	const users = await db
		.collection("users")
		.aggregate([
			{
				$match: { _id: id },
			},
			{
				$unset: ["ip", "email"],
			},
			{
				$lookup: {
					from: "feedback_posts",
					localField: "_id",
					foreignField: "author.id",
					as: "posts",
				},
			},
			{
				$lookup: {
					from: "feedback_upvotes",
					localField: "_id",
					foreignField: "uID",
					as: "upvotedPosts",
				},
			},
			{
				$lookup: {
					from: "feedback_comments",
					localField: "_id",
					foreignField: "author.id",
					as: "commentedPosts",
				},
			},
			{
				$lookup: {
					from: "feedback_replies",
					localField: "_id",
					foreignField: "author.id",
					as: "repliedComments",
				},
			},
			{
				$addFields: {
					developer: staff?.category === "Team",
					moderator: [
						"Support Moderators",
						"Bot Moderators",
						"Team",
						"Honorable Mentions",
					].includes(staff?.category),
					upvotes: { $size: "$upvotedPosts" },
					comments: {
						$add: [
							{ $size: "$repliedComments" },
							{ $size: "$commentedPosts" },
						],
					},
				},
			},
			{
				$unset: ["upvotedPosts", "repliedComments", "commentedPosts"],
			},
		])
		.toArray();

	const profile = users[0];

	if (!profile) {
		return res.status(404).json({ message: "Not found." });
	}

	const posts = await db
		.collection("feedback_posts")
		.aggregate([
			{
				$match: { "author.id": id },
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
							profile.moderator
								? {
										$eq: ["$bad", false],
								  }
								: { $eq: ["$bad", false] },
							{ $eq: ["$author.id", user?.id] },
						],
					},
				},
			},
			{
				$sort: { upvotes: -1, createdAt: -1 },
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
		])
		.toArray();

	profile.posts = posts;

	console.log(profile);

	return res.status(200).json(profile);
};

export default withSession(handler);
