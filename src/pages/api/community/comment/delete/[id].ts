import axios from "axios";
import { ObjectId } from "bson";
import { NextApiResponse } from "next";
import { ActivityType } from "../../../../../constants/activities";
import { dbConnect } from "../../../../../util/mongodb";
import { redisConnect } from "../../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const redis = await redisConnect();

	const { id } = req.query;

	const user = req.session.get("user");

	const comment = await db
		.collection("community-posts-comments")
		.findOne({ _id: new ObjectId(id as string) });

	if (!comment) {
		return res.status(500).json({ error: "This comment does not exist." });
	}

	if (comment.author == "[deleted]") {
		return res
			.status(500)
			.json({ message: "This comment was already deleted." });
	}

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.moderator && user.id !== comment.author) {
		return res.status(401).json({ error: "It's not your comment." });
	}

	await db.collection("community-posts-comments").updateOne(
		{ _id: new ObjectId(id as string) },
		{
			$set: {
				content: "[deleted]",
				author: "[deleted]",
			},
		}
	);

	await db.collection("community-activities").deleteOne({
		type: ActivityType.COMMENT_CREATE,
		uID: comment.author,
		"data.postId": comment.pID,
	});

	await db.collection("community-notifications").deleteMany({
		"data.commentId": comment._id,
	});

	await redis.del(`community:post:stats:${comment.pID}`);

	await axios.post(
		process.env.COMMUNITY_WEBHOOK!,
		{
			embeds: [
				{
					title: `Comment Deleted`,
					color: 0xbd3540,
					timestamp: new Date(),
					fields: [
						{
							name: "Author",
							value: `<@${comment.author}> | ${comment.author}`,
							inline: true,
						},
						{
							name: "Comment",
							value: comment.content.slice(0, 1000),
							inline: false,
						},
						{
							name: "Deleted By",
							value: `<@${user.id}> | ${user.id}`,
							inline: false,
						},
					],
				},
			],
		},
		{
			headers: { "Content-Type": "application/json" },
		}
	);

	return res.status(200).json({});
};

export default withSession(handler);
