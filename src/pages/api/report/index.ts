import axios from "axios";
import { NextApiResponse } from "next";
import { TIME } from "../../../constants";
import { dbConnect } from "../../../util/mongodb";
import { redisConnect } from "../../../util/redis";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (await db.collection("bans").findOne({ type: "report", id: user.id })) {
		return res
			.status(403)
			.json({ error: "You are banned from reporting." });
	}

	if (
		(await redis.get(`community:cooldown:report:${user.id}`)) &&
		!user.moderator
	) {
		return res.status(429).json({ error: "You're doing that too often." });
	}

	if (!req.body.type || !req.body.report || !req.body.id || !req.body.rules) {
		return res.status(400).json({ error: "Malformed body" });
	}

	if (req.body.id.length <= 10 || req.body.id.length >= 25) {
		return res.status(400).json({ error: "Your id is invalid" });
	}

	if (req.body.report.length < 20 || req.body.report.length >= 2000) {
		return res.status(400).json({ error: "Your report is invalid" });
	}

	if (req.body.rules.length == 0) {
		return res.status(400).json({ error: "Your rules are invalid" });
	}

	await redis.set(
		`community:cooldown:report:${user.id}`,
		user.id,
		"PX",
		TIME.minute * 10
	);
	await axios.post(
		req.body.type === "server"
			? process.env.REPORTS_SERVER_WEBHOOK!
			: process.env.REPORTS_USER_WEBHOOK!,
		{
			embeds: [
				{
					title: `Reporting a ${req.body.type}`,
					color: 0x39923c,
					timestamp: new Date(),
					fields: [
						{
							name: "Reporter",
							value: `${user.username}#${user.discriminator}\n(<@${user.id}> | ${user.id})`,
							inline: true,
						},
						{
							name: "Reported",
							value: req.body.id,
							inline: true,
						},
						{
							name: "Rules that were broken",
							value: (req.body.rules as string[])
								.map((rule) => `• ${rule}`)
								.join("\n"),
						},
						{
							name: "Report content",
							value: req.body.report.slice(0, 1023),
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
