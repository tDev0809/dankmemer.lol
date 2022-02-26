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

	if (!user.developer) {
		return res.status(401).json({ error: "You can't do this." });
	}

	const {
		title,
		team,
		location,
		requiresResume,
		webhook,
		description,
		body,
	} = req.body;
	if (!title || !team || !location || !description || !body) {
		return res.status(400).json({ error: "Missing body elements." });
	}

	try {
		const job = {
			_id: encodeURIComponent(
				title.toLowerCase().replace(/ /g, "-")
			) as unknown as ObjectId,
			title,
			team,
			location,
			webhook,
			requiresResume,
			description,
			body,
			createdAt: new Date().getTime(),
			active: true,
			applicants: [],
		};
		await db.collection("jobs").insertOne(job);
		return res.status(200).json(job);
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
