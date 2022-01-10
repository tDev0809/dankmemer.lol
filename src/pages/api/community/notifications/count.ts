import { NextApiResponse } from "next";
import { dbConnect } from "../../../../util/mongodb";
import { redisConnect } from "../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const redis = await redisConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(200).json({ count: 0 });
	}

	const cached = await redis.get(`community:notifications:count:${user.id}`);

	if (cached) {
		return res.status(200).json({ count: parseInt(cached) });
	}

	const lastNotification = (
		await db.collection("users").findOne({ _id: user.id })
	)?.lastNotification;

	const count = await db
		.collection("notifications")
		.find({ uID: user.id, createdAt: { $gt: lastNotification ?? 0 } })
		.count();

	return res.status(200).json({ count });
};

export default withSession(handler);
