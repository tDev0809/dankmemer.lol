import { NextApiResponse } from "next";
import { TIME } from "../../../../../constants";
import { dbConnect } from "../../../../../util/mongodb";
import { redisConnect } from "../../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();
	const { id } = req.query;

	const user = req.session.get("user");

	if (!id) {
		return res.status(500).json({ error: "This post does not exist." });
	}

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (await redis.get(`community:cooldown:upvote:${user.id}`)) {
		return res.status(429).json({ error: "You're doing that too often." });
	}

	await redis.set(
		`community:cooldown:upvote:${user.id}`,
		id,
		"PX",
		TIME.second
	);

	const post = await db.collection("community-posts").findOne({
		_id: id,
	});

	if (!post) {
		return res.status(500).json({ error: "This post does not exist." });
	}

	const upvote = await db.collection("community-posts-upvotes").findOne({
		pID: id,
		uID: user.id,
	});

	redis.keys(`community:posts:${user.id}*`, async (_, keys) => {
		for (const key of keys) {
			await redis.del(key);
		}
	});

	if (!upvote) {
		await db.collection("community-posts-upvotes").insertOne({
			uID: user.id,
			pID: id,
		});
		res.status(200).json({ upvote: 1 });
	} else {
		await db.collection("community-posts-upvotes").deleteOne({
			uID: user.id,
			pID: id,
		});
		res.status(200).json({ upvote: -1 });
	}
};

export default withSession(handler);
