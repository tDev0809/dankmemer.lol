import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { redisConnect } from "../../../util/redis";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.moderator && !user.honorable) {
		return res.status(401).json({ error: "You can't do this." });
	}

	if (!req.query?.id) {
		return res.status(400).json({ error: "Missing parameters." });
	}

	if (user.id !== req.query.id && !user.developer) {
		return res.status(401).json({ error: "You can't do this." });
	}

	const userData = await db
		.collection("users")
		.findOne({ _id: req.query.id });

	if (req.query.banner.length == 0 || !req.query?.banner) {
		await redis.del(`user:${req.query.id}`);
		if (userData?.vanity) {
			await redis.del(`user:${userData.vanity}`);
		}
		await redis.del("staff");

		try {
			await db
				.collection("users")
				.updateOne(
					{ _id: req.query.id as string },
					{ $unset: { banner: 1 } }
				);

			return res.status(200).json({});
		} catch (e) {
			return res.status(500).json({ error: e });
		}
	}

	if (req.query.banner.length < 3) {
		return res.status(400).json({ error: "Banner URL too short." });
	}

	if (req.query.banner.length > 250) {
		return res.status(400).json({ error: "Banner URL too long." });
	}

	await redis.del(`user:${req.query.id}`);
	if (userData?.vanity) {
		await redis.del(`user:${userData.vanity}`);
	}
	await redis.del("staff");

	try {
		await db
			.collection("users")
			.updateOne(
				{ _id: req.query.id as string },
				{ $set: { banner: req.query.banner } }
			);

		return res.status(200).json({});
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
