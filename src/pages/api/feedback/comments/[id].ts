import { NextApiResponse } from "next";
import { dbConnect } from "../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	const post = await db.collection("feedback_posts").findOne({
		_id: id,
	});

	if (!post) {
		return res.status(500).json({ message: "This post does not exist." });
	}

	const from = Number(req.query.from) || 0;
	const amount = Number(req.query.amount) || 10;

	const comments = await db
		.collection("feedback_comments")
		.aggregate([
			{
				$match: {
					pID: id,
				},
			},
			{
				$lookup: {
					from: "feedback_replies",
					localField: "_id",
					foreignField: "cID",
					as: "replies",
				},
			},
			{
				$addFields: {
					pinnedInt: { $cond: [{ $eq: ["$pinned", true] }, 1, -1] },
				},
			},
			{
				$sort: {
					pinnedInt: -1,
					createdAt: 1,
				},
			},
			{
				$skip: from,
			},
			{
				$limit: amount,
			},
		])
		.toArray();

	return res.json({
		comments: comments,
		all: comments.length == 0 || comments.length < amount,
	});
};

export default withSession(handler);
