import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	const { job, userId } = req.body;
	if (!job || !userId) {
		return res.status(400).json({ error: "Missing body elements." });
	}

	const dbRecord = await db.collection("jobs").findOne({ _id: job._id });
	if (!dbRecord) {
		return res
			.status(500)
			.json({ error: "Job listing with provided ID was not found." });
	}

	if (dbRecord.applicants.includes(userId)) {
		return res
			.status(401)
			.json({ error: "You have already applied for this position." });
	}

	try {
		await db
			.collection("jobs")
			.updateOne({ _id: job._id }, { $push: { applicants: userId } });
		return res.status(200).json({ message: "Job application submitted." });
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
