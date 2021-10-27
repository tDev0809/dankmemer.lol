import axios from "axios";
import { ObjectId } from "bson";
import { NextApiResponse } from "next";
import { FEEDBACK_CATEGORIES } from "../../../../../constants";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";
const items = require("../../../../../data/items.json");

const recent = new Set();

function generateReadableID() {
	return [
		items[Math.floor(Math.random() * items.length)],
		items[Math.floor(Math.random() * items.length)],
		items[Math.floor(Math.random() * items.length)],
		items[Math.floor(Math.random() * items.length)],
	].join("-");
}

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
		!req.body.title ||
		!req.body.content ||
		!req.body.category ||
		!FEEDBACK_CATEGORIES.includes(req.body.category)
	) {
		return res.status(400).json({ error: "Malformed body" });
	}

	if (req.body.title.length < 3) {
		return res.status(400).json({ error: "Your comment is too short." });
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

	if (Date.now() - accountCreated.getTime() < 1000 * 60 * 60 * 24 * 30 * 3) {
		return res
			.status(406)
			.json({ error: "Your account is too new to post feedback." });
	}

	const ban = await db
		.collection("bans")
		.findOne({ id: user.id, type: "Feedback" });

	if (ban) {
		return res
			.status(403)
			.json({ error: "You are banned from posting feedback." });
	}

	if (!user.isAdmin) {
		recent.add(user.id);
		setTimeout(() => recent.delete(user.id), 5 * 60 * 1000);
	}

	let readableID = generateReadableID();

	while (true) {
		const exist = await db
			.collection("feedback_posts")
			.findOne({ readableID });
		if (!exist) {
			break;
		}
		readableID = generateReadableID();
	}

	const post = await db.collection("feedback_posts").insertOne({
		_id: readableID as unknown as ObjectId, // make typescript happy
		title: req.body.title,
		description: req.body.content,
		category: req.body.category,
		createdAt: Date.now(),
		author: {
			id: user.id,
			discriminator: user.discriminator,
			username: user.username,
		},
	});

	await db.collection("feedback_upvotes").insertOne({
		uID: user.id,
		pID: readableID,
	});

	await axios.post(
		process.env.FEEDBACK_WEBHOOK!,
		{
			embeds: [
				{
					title: `New Post`,
					color: 0x39923c,
					timestamp: new Date(),
					fields: [
						{
							name: "Author",
							value: `${user.username}#${user.discriminator}\n(<@${user.id}> | ${user.id})`,
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
							name: "Description",
							value: req.body.content.slice(0, 1000),
							inline: false,
						},
						{
							name: "Link",
							value: `${process.env.DOMAIN}/feedback/p/${readableID}`,
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
