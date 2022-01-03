import axios from "axios";
import { ObjectId } from "bson";
import { NextApiResponse } from "next";
import { POST_CATEGORIES, TIME } from "../../../../../constants";
import { ActivityType } from "../../../../../constants/activities";
import { dbConnect } from "../../../../../util/mongodb";
import { redisConnect } from "../../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../../util/session";
const items = require("../../../../../data/items.json");

function generateReadableID() {
	return [
		items[Math.floor(Math.random() * items.length)],
		items[Math.floor(Math.random() * items.length)],
		items[Math.floor(Math.random() * items.length)],
		items[Math.floor(Math.random() * items.length)],
	].join("-");
}

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const redis = await redisConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (
		(await redis.get(`community:cooldown:post:${user.id}`)) &&
		!user.moderator
	) {
		return res.status(429).json({ error: "You're doing that too often." });
	}

	if (
		!req.body.title ||
		!req.body.content ||
		!req.body.category ||
		typeof req.body.title !== "string" ||
		typeof req.body.content !== "string" ||
		!POST_CATEGORIES.includes(req.body.category)
	) {
		return res.status(400).json({ error: "Malformed body" });
	}

	if (req.body.title.length < 3) {
		return res.status(400).json({ error: "Your title is too short." });
	}

	if (req.body.title.length > 100) {
		return res.status(400).json({ error: "Your title is too long." });
	}

	if (req.body.content.length < 20) {
		return res.status(400).json({ error: "Your content is too short." });
	}

	if (req.body.content.length > 2000) {
		return res.status(400).json({ error: "Your content is too long." });
	}

	const accountCreated = new Date(
		Number(BigInt(user.id) >> BigInt(22)) + 1420070400000
	);

	if (Date.now() - accountCreated.getTime() < TIME.month * 3) {
		return res
			.status(406)
			.json({ error: "Your account is too new to post." });
	}

	const ban = await db
		.collection("bans")
		.findOne({ id: user.id, type: "Community" });

	if (ban) {
		return res.status(403).json({ error: "You are banned from posting." });
	}

	await redis.set(
		`community:cooldown:post:${user.id}`,
		req.body.id,
		"PX",
		TIME.minute * 10
	);

	let readableID = generateReadableID();

	while (true) {
		const exist = await db
			.collection("community:posts")
			.findOne({ _id: readableID });
		if (!exist) {
			break;
		}
		readableID = generateReadableID();
	}

	const post = await db.collection("community-posts").insertOne({
		_id: readableID as unknown as ObjectId, // make typescript happy
		title: req.body.title,
		content: req.body.content,
		category: req.body.category,
		createdAt: Date.now(),
		upvotes: 1,
		author: user.id,
		labels: [],
	});

	await db.collection("community-posts-upvotes").insertOne({
		uID: user.id,
		pID: readableID,
	});

	await db.collection("community-activities").insertOne({
		type: ActivityType.POST_CREATE,
		uID: user.id,
		data: {
			title: req.body.title,
			id: readableID,
		},
		createdAt: Date.now(),
	});

	await axios.post(
		process.env.COMMUNITY_WEBHOOK!,
		{
			embeds: [
				{
					title: `New Post`,
					color: 0x39923c,
					timestamp: new Date(),
					fields: [
						{
							name: "Author",
							value: `<@${user.id}> | ${user.id}`,
							inline: true,
						},
						{
							name: "Category",
							value: req.body.category,
							inline: true,
						},
						{
							name: "Title",
							value: req.body.title,
							inline: false,
						},
						{
							name: "Content",
							value: req.body.content.slice(0, 1000),
							inline: false,
						},
						{
							name: "Link",
							value: `${process.env.DOMAIN}/community/post/${readableID}`,
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

	res.status(200).json({ id: post.insertedId });
};

export default withSession(handler);
