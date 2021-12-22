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

	const post = await db.collection("community-posts").findOne({ _id: id });

	if (!post) {
		return res.status(500).json({ error: "This post does not exist." });
	}

	if (!user.moderator && user.id !== post.author) {
		return res.status(401).json({ error: "It's not your post." });
	}

	await db.collection("community-posts").deleteOne({ _id: id });

	await db.collection("community-posts-upvotes").deleteMany({ pID: id });
	await db.collection("community-posts-replies").deleteMany({ pID: id });
	await db.collection("community-posts-comments").deleteMany({ pID: id });
	await db
		.collection("community-activities")
		.deleteMany({ type: 0, "data.id": id });
	await db
		.collection("community-activities")
		.deleteMany({ type: 1, "data.postId": id });
	await db
		.collection("community-activities")
		.deleteMany({ type: 2, "data.postId": id });

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
							value: `<@${post.author}> | ${post.author}`,
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
							name: "Content",
							value: post.content.slice(0, 1000),
							inline: false,
						},
						{
							name: "Deleted By",
							value: `<@${user.id}> | ${user.id}`,
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
