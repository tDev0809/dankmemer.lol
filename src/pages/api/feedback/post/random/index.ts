import { NextApiResponse } from "next";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	let posts = await db
		.collection("feedback_posts")
		.aggregate([{ $sample: { size: 1 } }])
		.toArray();

	const post = posts[0];

	if (!posts) {
		return res.status(500).json({ error: "This post does not exist." });
	}

	return res.json({ post });
};

export default withSession(handler);
