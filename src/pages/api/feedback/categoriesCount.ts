import { NextApiResponse } from "next";
import { FEEDBACK_CATEGORIES } from "../../../constants";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const count: Record<string, number> = {};

	for (const category of FEEDBACK_CATEGORIES) {
		let result = await db
			.collection("feedback_posts")
			.find({ category })
			.count();
		count[category] = result || 0;
	}

	return res.json(count);
};

export default withSession(handler);
