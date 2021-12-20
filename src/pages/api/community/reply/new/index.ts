import axios from "axios";
import { ObjectId } from "bson";
import { NextApiResponse } from "next";
import { TIME } from "../../../../../constants";
import { ActivityType } from "../../../../../constants/activities";
import { dbConnect } from "../../../../../util/mongodb";
import { redisConnect } from "../../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}
	if (
		(await redis.get(`community:cooldown:comment:${user.id}`)) &&
		!user.moderator
	) {
		return res.status(429).json({ error: "You're doing that too often." });
	}

	if (
		!req.body.reply ||
		!req.body.id ||
		!req.body.replyingTo ||
		typeof req.body.reply !== "string"
	) {
		return res.status(400).json({ error: "Malformed body." });
	}

	if (req.body.reply.length < 5) {
		return res.status(400).json({ error: "Your reply is too short." });
	}

	if (req.body.reply.length > 200) {
		return res.status(400).json({ error: "Your reply is too short." });
	}

	await redis.set(
		`community:cooldown:comment:${user.id}`,
		req.body.id,
		"PX",
		TIME.minute * 5
	);

	const comment = await db.collection("community-posts-comments").findOne({
		_id: new ObjectId(req.body.replyingTo),
	});

	if (!comment) {
		return res
			.status(500)
			.json({ message: "This comment does not exist." });
	}

	const post = await db.collection("community-posts").findOne({
		_id: req.body.id,
	});

	if (!post) {
		return res.status(500).json({ message: "This post does not exist." });
	}

	const accountCreated = new Date(
		Number(BigInt(user.id) >> BigInt(22)) + 1420070400000
	);

	if (Date.now() - accountCreated.getTime() < TIME.month * 3) {
		return res
			.status(406)
			.json({ error: "Your account is too new to post a reply." });
	}

	const ban = await db
		.collection("bans")
		.findOne({ id: user.id, type: "Community" });

	if (ban) {
		return res
			.status(403)
			.json({ error: "You are banned from posting replies." });
	}

	const reply = await db.collection("community-posts-replies").insertOne({
		pID: req.body.id,
		cID: new ObjectId(req.body.replyingTo),
		content: req.body.reply,
		createdAt: Date.now(),
		author: user.id,
	});

	await db.collection("community-activities").insertOne({
		type: ActivityType.REPLY_CREATE,
		uID: user.id,
		data: {
			postTitle: post.title,
			postId: req.body.id,
		},
		createdAt: Date.now(),
	});

	await redis.del(`community:post:stats:${req.body.id}`);

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
							value: `<@${user.id}> | ${user.id}`,
							inline: true,
						},
						{
							name: "Reply",
							value: req.body.reply,
							inline: false,
						},
						{
							name: "Link",
							value: `${process.env.DOMAIN}/community/post/${req.body.id}`,
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

	return res.status(200).json({ id: reply.insertedId });
};

export default withSession(handler);
