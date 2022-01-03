import { ObjectId } from "bson";
import { NextApiResponse } from "next";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const { id } = req.query;

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.moderator) {
		return res.status(401).json({ error: "You can't pin comments." });
	}

	const comment = await db.collection("community-posts-comments").findOne({
		_id: new ObjectId(id as string),
	});

	await db.collection("community-posts-comments").updateOne(
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
