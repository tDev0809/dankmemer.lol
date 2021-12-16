import axios from "axios";
import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

const recent = new Set();

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (await db.collection("bans").findOne({ type: "appeal", id: user.id })) {
		return res
			.status(403)
			.json({ error: "You are banned from appealing." });
	}

	if (recent.has(user.id)) {
		return res.status(429).json({ error: "You're doing that too often." });
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

	if (!user.developer) {
		recent.add(user.id);
		setTimeout(() => recent.delete(user.id), 30 * 60 * 1000);
	}

	await axios.post(
		req.body.type === "Community Server Ban"
			? process.env.APPEALS_COMMUNITY_WEBHOOK!
			: req.body.type === "Support Server Ban"
			? process.env.APPEALS_SUPPORT_WEBHOOK!
			: process.env.APPEALS_USER_WEBHOOK!,
		{
			embeds: [
				{
					title: `Appealing a ${req.body.type}`,
					color: 0x39923c,
					timestamp: new Date(),
					fields: [
						{
							name: `Banned user`,
							value: `${user.username}#${user.discriminator} (<@${user.id}> | ${user.id})`,
						},
						{
							name: "Rules that were broken",
							value: (req.body.rules as string[])
								.map((rule) => `• ${rule}`)
								.join("\n"),
						},
						{
							name: "Appeal content",
							value: req.body.appeal.slice(0, 1023),
						},
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
