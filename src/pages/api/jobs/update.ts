import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

interface Job {
	_id: string;
	title: string;
	description: string;
	body: string;
	team: string;
	location: string;
	createdAt: number;
	active: boolean;
	requiresResume: boolean;
	applicants?: string[];
	alreadyApplied?: boolean;
}

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.developer) {
		return res.status(401).json({ error: "You can't do this." });
	}

	if (!req.query.id) {
		return res.status(400).json({ error: "No job id was provided." });
	}

	if (!req.body) {
		return res.status(400).json({ error: "No body data was provided." });
	}

	const job = await db.collection("jobs").findOne({ _id: req.query.id });
	if (!job) {
		return res
			.status(400)
			.json({ error: "No job with the given id was found." });
	}

	try {
		await db
			.collection("jobs")
			.updateOne({ _id: req.query.id }, { $set: { ...req.body } });
		return res.status(200).json({ message: "Updated successfully." });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
