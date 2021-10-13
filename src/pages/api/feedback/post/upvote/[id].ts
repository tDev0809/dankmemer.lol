import { NextApiResponse } from "next";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";

const recent = new Set();

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	const user = req.session.get("user");

	if (!id) {
		return res.status(500).json({ error: "This post does not exist." });
	}

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (recent.has(user.id)) {
		return res.status(429).json({ error: "You're doing that too often." });
	}

	recent.add(user.id);
	setTimeout(() => recent.delete(user.id), 1 * 1000);

	const post = await db.collection("feedback_posts").findOne({
		_id: id,
	});

	if (!post) {
		return res.status(500).json({ error: "This post does not exist." });
	}

	const upvote = await db.collection("feedback_upvotes").findOne({
		pID: id,
		uID: user.id,
	});

	if (!upvote) {
		await db.collection("feedback_upvotes").insertOne({
			uID: user.id,
			pID: id,
		});
		res.status(200).json({ upvote: 1 });
	} else {
		await db.collection("feedback_upvotes").deleteOne({
			uID: user.id,
			pID: id,
		});
		res.status(200).json({ upvote: -1 });
	}
};

export default withSession(handler);
