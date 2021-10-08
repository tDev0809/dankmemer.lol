import axios from "axios";
import { ObjectId } from "bson";
import { NextApiResponse } from "next";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";

const recent = new Set();

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}
	if (recent.has(user.id)) {
		return res.status(429).json({ error: "You're doing that too often." });
	}
	if (!req.body.reply || !req.body.id || !req.body.replyingTo) {
		return res.status(400).json({ error: "Malformed body." });
	}

	if (req.body.reply.length < 5) {
		return res.status(400).json({ error: "Your reply is too short." });
	}

	if (req.body.reply.length > 200) {
		return res.status(400).json({ error: "Your reply is too short." });
	}

	const comment = await db.collection("feedback_comments").findOne({
		_id: new ObjectId(req.body.replyingTo),
	});

	if (!comment) {
		return res
			.status(500)
			.json({ message: "This comment does not exist." });
	}

	const accountCreated = new Date(
		Number(BigInt(user.id) >> BigInt(22)) + 1420070400000
	);

	if (Date.now() - accountCreated.getTime() < 1000 * 60 * 60 * 24 * 30 * 3) {
		return res
			.status(406)
			.json({ error: "Your account is too new to post a reply." });
	}

	const ban = await db
		.collection("bans")
		.findOne({ id: user.id, type: "Feedback" });

	if (ban) {
		return res
			.status(403)
			.json({ error: "You are banned from posting replies." });
	}

	if (!user.isAdmin) {
		recent.add(user.id);
		setTimeout(() => recent.delete(user.id), 5 * 60 * 1000);
	}

	await db.collection("feedback_replies").insertOne({
		pID: req.body.id,
		cID: new ObjectId(req.body.replyingTo),
		reply: req.body.reply,
		createdAt: Date.now(),
		author: {
			id: user.id,
			discriminator: user.discriminator,
			username: user.username,
			developer: user.isAdmin,
			moderator: user.isModerator,
		},
	});

	await axios.post(
		process.env.FEEDBACK_WEBHOOK!,
		{
			embeds: [
				{
					title: `New Comment Reply`,
					color: 0xa685ed,
					timestamp: new Date(),
					fields: [
						{
							name: "Author",
							value: `${user.username}#${user.discriminator}\n(<@${user.id}> | ${user.id})`,
							inline: true,
						},
						{
							name: "Reply",
							value: req.body.reply,
							inline: false,
						},
						{
							name: "Link",
							value: `${process.env.DOMAIN}/feedback/p/${req.body.id}`,
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

	await res.status(200).json({});
};

export default withSession(handler);
