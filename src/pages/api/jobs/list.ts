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
	webhook?: string
}

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const user = req.session.get("user");

	let dbQuery = {};
	if (!user || !user.developer) {
		dbQuery = { active: true };
	}
	if (req.query.team && req.query.team !== "all teams") {
		dbQuery = { ...dbQuery, team: req.query.team };
	}
	const jobs = (await db.collection("jobs").find(dbQuery).toArray()) as Job[];
	
	for (let i = 0; i < jobs.length; i++) {
		if (
			req.query.user &&
			jobs[i].applicants?.includes(req.query.user.toString())
			) {
				jobs[i].alreadyApplied = true;
			}
			if (!user || !user.developer) {
				delete jobs[i].applicants;
				delete jobs[i].webhook;
			}
	}
	return res.status(200).json(jobs);
};

export default withSession(handler);
