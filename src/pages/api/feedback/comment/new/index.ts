import axios from "axios";
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
	if (
		!req.body.comment ||
		!req.body.id ||
		typeof req.body.comment !== "string"
	) {
		return res.status(400).json({ error: "Malformed body." });
	}

	if (req.body.comment.length < 5) {
		return res.status(400).json({ error: "Your comment is too short." });
	}

	if (req.body.comment.length > 1024) {
		return res.status(400).json({ error: "Your comment is too long." });
	}

	const post = await db.collection("feedback_posts").findOne({
		_id: req.body.id,
	});

	if (!post) {
		return res.status(500).json({ message: "This post does not exist." });
	}

	const accountCreated = new Date(
		Number(BigInt(user.id) >> BigInt(22)) + 1420070400000
	);

	if (Date.now() - accountCreated.getTime() < 1000 * 60 * 60 * 24 * 30 * 3) {
		return res
			.status(406)
			.json({ error: "Your account is too new to post a comment." });
	}

	const ban = await db
		.collection("bans")
		.findOne({ id: user.id, type: "Feedback" });

	if (ban) {
		return res
			.status(403)
			.json({ error: "You are banned from posting comments." });
	}

	if (!user.developer) {
		recent.add(user.id);
		setTimeout(() => recent.delete(user.id), 5 * 60 * 1000);
	}

	const comment = await db.collection("feedback_comments").insertOne({
		pID: req.body.id,
		comment: req.body.comment,
		createdAt: Date.now(),
		author: {
			id: user.id,
			discriminator: user.discriminator,
			username: user.username,
			developer: user.developer,
			moderator: user.isModerator,
		},
	});

	await axios.post(
		process.env.FEEDBACK_WEBHOOK!,
		{
			embeds: [
				{
					title: `New Comment`,
					color: 0x4287f5,
					timestamp: new Date(),
					fields: [
						{
							name: "Author",
							value: `${user.username}#${user.discriminator}\n(<@${user.id}> | ${user.id})`,
							inline: true,
						},
						{
							name: "Comment",
							value: req.body.comment.slice(0, 1000),
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

	await res.status(200).json({ id: comment.insertedId });
};

export default withSession(handler);
