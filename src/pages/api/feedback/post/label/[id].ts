import { NextApiResponse } from "next";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	const user = req.session.get("user");
	const label = req.query.label || "";

	if (!id) {
		return res.status(500).json({ error: "This post does not exist." });
	}

	if (!user || (!user.isAdmin && !user.isModerator)) {
		return res.status(401).json({ error: "Get away you sick filth." });
	}

	const post = await db.collection("feedback_posts").findOne({
		_id: id,
	});

	if (!post) {
		return res.status(500).json({ message: "This post does not exist." });
	}

	await db.collection("feedback_posts").updateOne(
		{
			_id: id,
		},
		{
			$set: { label },
		}
	);

	res.status(200).json({ label });
};

export default withSession(handler);
