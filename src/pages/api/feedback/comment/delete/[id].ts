import axios from "axios";
import { ObjectId } from "bson";
import { NextApiResponse } from "next";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	const user = req.session.get("user");

	if (!id) {
		return res.status(500).json({ error: "This comment does not exist." });
	}

	const comment = await db
		.collection("feedback_comments")
		.findOne({ _id: new ObjectId(id as string) });

	if (!comment) {
		return res.status(500).json({ error: "This comment does not exist." });
	}

	if (comment.deleted) {
		return res
			.status(500)
			.json({ message: "This comment was already deleted." });
	}

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.isAdmin && !user.isModerator && user.id !== comment.author.id) {
		return res.status(401).json({ error: "It's not your comment." });
	}

	await db.collection("feedback_comments").updateOne(
		{ _id: new ObjectId(id as string) },
		{
			$set: {
				comment: "[deleted]",
				author: {
					id: "[deleted]",
					discriminator: "0000",
					username: "[deleted]",
				},
				deleted: true,
			},
		}
	);

	await axios.post(
		process.env.FEEDBACK_WEBHOOK!,
		{
			embeds: [
				{
					title: `Comment Deleted`,
					color: 0xbd3540,
					timestamp: new Date(),
					fields: [
						{
							name: "Author",
							value: `${comment.author.username}#${comment.author.discriminator}\n(<@${comment.author.id}> | ${comment.author.id})`,
							inline: true,
						},
						{
							name: "Comment",
							value: comment.comment.slice(0, 1000),
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
