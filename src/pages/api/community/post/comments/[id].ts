import { NextApiResponse } from "next";
import { Comment } from "../../../../../types";
import { dbConnect } from "../../../../../util/mongodb";
import { randomAvatar } from "../../../../../util/random";
import { NextIronRequest, withSession } from "../../../../../util/session";
import { getUsers } from "../../../../../util/user";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const { id } = req.query;

	const post = await db.collection("community-posts").findOne({
		_id: id,
	});

	if (!post) {
		return res.status(500).json({ message: "This post does not exist." });
	}

	const from = Number(req.query.from) || 0;
	const amount = Math.min(Number(req.query.amount) || 10, 50);

	const comments = (await db
		.collection("community-posts-comments")
		.aggregate([
			{
				$match: {
					pID: id,
				},
			},
			{
				$lookup: {
					from: "community-posts-replies",
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
				$unset: ["pinnedInt"],
			},
			{
				$skip: from,
			},
			{
				$limit: amount,
			},
		])
		.toArray()) as Comment[];

	const userDataComments = await getUsers(
		comments.map((c) => c.author as string)
	);

	for (let i = 0; i < userDataComments.length; i++) {
		const comment = comments[i];
		if (userDataComments[i]) {
			comment.author = userDataComments[i];
		} else {
			comment.author = {
				id: "#",
				name: "[deleted]",
				discriminator: "0000",
				avatar: randomAvatar("0"),
				developer: false,
				moderator: false,
				botModerator: false,
				honorable: false,
				modManager: false,
			};
		}

		if (comment.replies.length) {
			const userDataReplies = await getUsers(
				comment.replies.map((r) => r.author as string)
			);

			for (let j = 0; j < userDataReplies.length; j++) {
				const reply = comment.replies[j];

				if (userDataReplies[j]) {
					reply.author = userDataReplies[j];
				} else {
					reply.author = {
						id: "#",
						name: "[deleted]",
						discriminator: "0000",
						avatar: randomAvatar("0"),
						developer: false,
						moderator: false,
						botModerator: false,
						honorable: false,
						modManager: false,
					};
				}
			}
		}
	}

	return res.json({
		comments: comments,
		all: comments.length == 0 || comments.length < amount,
	});
};

export default withSession(handler);
