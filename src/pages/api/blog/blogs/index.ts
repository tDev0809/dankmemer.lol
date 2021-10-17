import { NextApiResponse } from "next";
import { dbConnect } from "../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	const blogs = await db
		.collection("blogs")
		.find({ draft: { $in: [false, null] } })
		.sort({ date: -1 })
		.toArray();

	return res.json(blogs);
};

export default withSession(handler);
