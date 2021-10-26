import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	try {
		const announcement = await db
			.collection("announcements")
			.find({})
			.sort({ createdAt: -1 })
			.toArray();

		if (!announcement[0] || announcement[0].content === "") {
			return res.status(200).json({});
		}

		return res.status(200).json(announcement[0]);
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
