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

	if (!req.query.team || req.query.team === "all teams") {
		const jobs = await db.collection("jobs").find({}).toArray();
		return res.status(200).json(jobs);
	} else {
		const jobs = await db
			.collection("jobs")
			.find({ team: req.query.team })
			.toArray();
		return res.status(200).json(jobs);
	}
};

export default withSession(handler);
