import axios from "axios";
import { ObjectId } from "bson";
import { NextApiResponse } from "next";
import { ActivityType } from "../../../../../constants/activities";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	const user = req.session.get("user");

	const reply = await db
		.collection("community-posts-replies")
		.findOne({ _id: new ObjectId(id as string) });

	if (!reply) {
		return res.status(500).json({ error: "This reply does not exist." });
	}

	if (reply.author == "[deleted]") {
		return res
			.status(500)
			.json({ message: "This reply was already deleted." });
	}

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.moderator && user.id !== reply.author) {
		return res.status(401).json({ error: "It's not your reply." });
	}

	await db.collection("community-posts-replies").updateOne(
		{ _id: new ObjectId(id as string) },
		{
			$set: {
				content: "[deleted]",
				author: "[deleted]",
			},
		}
	);

	await db.collection("community-activities").deleteOne({
		type: ActivityType.REPLY_CREATE,
		uID: reply.author,
		"data.postId": reply.pID,
	});

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
							value: `<@${reply.author}> | ${reply.author}`,
							inline: true,
						},
						{
							name: "Comment",
							value: reply.content.slice(0, 1000),
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
