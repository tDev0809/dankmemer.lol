import axios from "axios";
import { NextApiResponse } from "next";
import { TIME } from "../../../constants";
import { dbConnect } from "../../../util/mongodb";
import { redisConnect } from "../../../util/redis";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const redis = await redisConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in" });
	}

	if (await db.collection("bans").findOne({ type: "appeal", id: user.id })) {
		return res
			.status(403)
			.json({ error: "You are banned from appealing" });
	}

	if (
		(await redis.get(`community:cooldown:appeal:${user.id}`)) &&
		!user.moderator
	) {
		return res.status(429).json({ error: "You're doing that too often" });
	}

	if (!req.body.type || !req.body.appeal || !req.body.rules) {
		return res.status(400).json({ error: "Malformed body" });
	}

	if (req.body.appeal.length < 20 || req.body.appeal.length >= 2000) {
		return res.status(400).json({ error: "Your appeal is invalid" });
	}

	if (req.body.rules.length == 0) {
		return res.status(400).json({ error: "Your rules are invalid" });
	}

	await redis.set(
		`community:cooldown:appeal:${user.id}`,
		user.id,
		"PX",
		TIME.week
	);

	await axios.post(
		req.body.type === "Community Server Ban"
			? process.env.APPEALS_COMMUNITY_WEBHOOK!
			: req.body.type === "Support Server Ban"
			? process.env.APPEALS_SUPPORT_WEBHOOK!
			: process.env.APPEALS_USER_WEBHOOK!,
		{
			content: user.id,
			embeds: [
				{
					color: 0x39923c,
					author: {
						icon_url: user.avatar + '.png',
						name: `${req.body.type} Appeal`,
						url: `https://dankmemer.lol/@${user.id}`
					},
					timestamp: new Date(),
					description: req.body.appeal.slice(0, 4095),
					fields: [
						{
							name: "Rules that were broken",
							value: (req.body.rules as string[])
								.map((rule) => `• ${rule}`)
								.join("\n"),
						},
						{
							name: "User Appealing",
							value: `${user.username}#${user.discriminator} (<@${user.id}> | ${user.id})${req.body.type.includes('Server') ? '' : `\n${user.email}`}`,
						}
					],
				},
			],
		},
		{
			headers: { "Content-Type": "application/json" },
		}
	);

	res.status(200).send("");
};

export default withSession(handler);
