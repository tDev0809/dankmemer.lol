import axios from "axios";
import { NextApiResponse } from "next";
import { sanitizeCategory } from "../../../../../util/feedback";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	const user = req.session.get("user");

	if (!id) {
		return res.status(500).json({ error: "This post does not exist." });
	}

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	const posts = await db
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
				$addFields: {
					upvotes: { $size: "$upvotedUsers" },
				},
			},
			{
				$unset: ["upvotedUsers"],
			},
		])
		.toArray();

	let post = posts[0];

	if (!post) {
		return res.status(500).json({ error: "This post does not exist." });
	}

	if (!user.isAdmin && !user.isModerator && user.id !== post.author.id) {
		return res.status(401).json({ error: "It's not your post." });
	}

	await db.collection("feedback_posts").deleteOne({ _id: id });

	await db.collection("feedback_upvotes").deleteMany({ pID: id });
	await db.collection("feedback_replies").deleteMany({ pID: id });

	await axios.post(
		process.env.FEEDBACK_WEBHOOK!,
		{
			embeds: [
				{
					title: `Post Deleted`,
					color: 0xbd3540,
					timestamp: new Date(),
					fields: [
						{
							name: "Author",
							value: `${post.author.username}#${post.author.discriminator}\n(<@${post.author.id}> | ${post.author.id})`,
							inline: true,
						},
						{
							name: "Category",
							value: sanitizeCategory(post.category),
							inline: true,
						},
						{
							name: "Upvotes",
							value: post.upvotes,
							inline: true,
						},
						{
							name: "Title",
							value: post.title,
							inline: false,
						},
						{
							name: "Description",
							value: post.description,
							inline: false,
						},
						{
							name: "Deleted By",
							value: `${user.username}#${user.discriminator}\n(<@${user.id}> | ${user.id})`,
							inline: false,
						},
					],
				},
			],
		},
		{
			headers: { "Content-Type": "application/json" },
		}
	);

	return res.status(200).json({});
};

export default withSession(handler);
