import { NextApiResponse } from "next";
import { dbConnect } from "../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	try {
		const update = await db
			.collection("community-updates")
			.find({})
			.sort({ createdAt: -1 })
			.toArray();

		if (!update[0] || update[0].content === "") {
			return res.status(200).json({});
		}
		return res.status(200).json(update[0]);
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
