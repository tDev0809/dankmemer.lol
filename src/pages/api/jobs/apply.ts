import axios from "axios";
import { ObjectId } from "mongodb";
import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	const { job, userId, name, email, whyApplicant } = req.body;
	if (!job || !userId || !name || !email || !whyApplicant) {
		return res.status(400).json({ error: "Missing body elements." });
	}

	try {
		await axios.post(
			process.env.COMMUNITY_WEBHOOK!,
			{
				embeds: [
					{
						title: `Job Application [${job.title}]`,
						color: 0x199532,
						timestamp: new Date(),
						fields: [
							{
								name: "Applicant",
								value: `${name} (<@!${userId}>)`,
								inline: true,
							},
							{
								name: "Preferred Email",
								value: email,
								inline: true,
							},
						],
					},
				],
			},
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		return res.status(200).json(job);
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
