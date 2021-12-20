import axios from "axios";
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

	await redis.set(
		`community:cooldown:comment:${user.id}`,
		req.body.id,
		"PX",
		TIME.minute * 5
	);

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
			.json({ error: "Your account is too new to post a comment." });
	}

	const ban = await db
		.collection("bans")
		.findOne({ id: user.id, type: "Community" });

	if (ban) {
		return res
			.status(403)
			.json({ error: "You are banned from posting comments." });
	}

	const comment = await db.collection("community-posts-comments").insertOne({
		pID: req.body.id,
		content: req.body.comment,
		author: user.id,
		createdAt: Date.now(),
	});

	await db.collection("community-activities").insertOne({
		type: ActivityType.COMMENT_CREATE,
		uID: user.id,
		data: {
			postTitle: post.title,
			postId: req.body.id,
		},
		createdAt: Date.now(),
	});

	if (user.developer && !post.labels.includes("developer-response")) {
		await db.collection("community-posts").updateOne(
			{ _id: req.body.id },
			{
				$addToSet: {
					labels: "developer-response",
				},
			}
		);
	}

	await redis.del(`community:post:stats:${req.body.id}`);

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
							value: `<@${user.id}> | ${user.id}`,
							inline: true,
						},
						{
							name: "Comment",
							value: req.body.comment.slice(0, 1000),
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

	return res.status(200).json({ id: comment.insertedId });
};

export default withSession(handler);
