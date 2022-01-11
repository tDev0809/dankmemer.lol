import { NextApiResponse } from "next";
import { dbConnect } from "../../../../util/mongodb";
import { redisConnect } from "../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const redis = await redisConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	const page = Math.min(Number(req.query.amount) || 0, 0);

	const notifications = await db
		.collection("community-notifications")
		.find({ uID: user.id })
		.sort("createdAt", -1)
		.skip(page * 25)
		.limit(25)
		.toArray();

	const lastNotification =
		(await db.collection("users").findOne({ _id: user.id }))
			?.lastNotification ?? 0;

	if (page == 0) {
		await redis.del(`community:notifications:count:${user.id}`);
		await db
			.collection("users")
			.updateOne(
				{ _id: user.id },
				{ $set: { lastNotification: Date.now() } }
			);
	}

	return res.json({ notifications, lastNotification });
};

export default withSession(handler);
