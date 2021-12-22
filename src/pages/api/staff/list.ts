import { NextApiResponse } from "next";
import { Staff } from "../../../types";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	if (req.query.id) {
		const staff = await db
			.collection("staff")
			.find({ _id: req.query.id })
			.toArray();

		if (!staff) {
			res.status(404).json({ error: "Not found." });
		}
	} else {
		const result: Record<string, Staff[]> = {};
		const staff = await db.collection("staff").find({}).toArray();
		for (const member of staff) {
			if (result[member.category]) {
				result[member.category].push(member as Staff);
			} else {
				result[member.category] = [member as Staff];
			}
		}
		return res.json(result);
	}
};

export default withSession(handler);
