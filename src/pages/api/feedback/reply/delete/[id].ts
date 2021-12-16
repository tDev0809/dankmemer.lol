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
		return res.status(500).json({ error: "This reply does not exist." });
	}

	const reply = await db
		.collection("feedback_replies")
		.findOne({ _id: new ObjectId(id as string) });

	if (!reply) {
		return res.status(500).json({ error: "This reply does not exist." });
	}

	if (reply.deleted) {
		return res
			.status(500)
			.json({ message: "This reply was already deleted." });
	}

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.developer && !user.isModerator && user.id !== reply.author.id) {
		return res.status(401).json({ error: "It's not your reply." });
	}

	await db.collection("feedback_replies").updateOne(
		{ _id: new ObjectId(id as string) },
		{
			$set: {
				reply: "[deleted]",
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
					title: `Reply Deleted`,
					color: 0xbd3540,
					timestamp: new Date(),
					fields: [
						{
							name: "Author",
							value: `${reply.author.username}#${reply.author.discriminator}\n(<@${reply.author.id}> | ${reply.author.id})`,
							inline: true,
						},
						{
							name: "Comment",
							value: reply.reply,
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
