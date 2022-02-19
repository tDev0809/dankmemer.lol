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

	if (!req.query.team || req.query.team === "all teams") {
		const jobs = (await db
			.collection("jobs")
			.find({ active: true })
			.toArray()) as Job[];
		for (let i = 0; i < jobs.length; i++) {
			if (
				req.query.user &&
				jobs[i].applicants?.includes(req.query.user.toString())
			) {
				jobs[i].alreadyApplied = true;
			}
			delete jobs[i].applicants;
		}
		return res.status(200).json(jobs);
	} else {
		const jobs = await db
			.collection("jobs")
			.find({ team: req.query.team, active: true })
			.toArray();

		for (let i = 0; i < jobs.length; i++) {
			if (
				req.query.user &&
				jobs[i].applicants?.includes(req.query.user.toString())
			) {
				jobs[i].alreadyApplied = true;
			}
			delete jobs[i].applicants;
		}

		return res.status(200).json(jobs);
	}
};

export default withSession(handler);
