import { ObjectId } from "bson";
import { NextApiResponse } from "next";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.developer) {
		return res.status(401).json({ error: "You can't pin comments." });
	}

	const comment = await db.collection("feedback_comments").findOne({
		_id: new ObjectId(id as string),
	});

	await db.collection("feedback_comments").updateOne(
		{ _id: new ObjectId(id as string) },
		{
			$set: {
				pinned: !comment!.pinned,
			},
		}
	);

	res.status(200).json({ pinned: !comment!.pinned });
};

export default withSession(handler);
