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

	if (!req.query?.id || !req.query?.vanity) {
		return res.status(400).json({ error: "Missing parameters." });
	}

	if (req.query.vanity.length < 3) {
		return res.status(400).json({ error: "Vanity URL too short." });
	}

	if (req.query.vanity.length > 20) {
		return res.status(400).json({ error: "Vanity URL too long." });
	}

	if (
		req.query.vanity.includes(" ") ||
		req.query.vanity.includes("?") ||
		req.query.vanity.includes("&") ||
		req.query.vanity.includes("/")
	) {
		return res.status(400).json({ error: "Invalid Vanity URL." });
	}

	if (user.id !== req.query.id && !user.developer) {
		return res.status(401).json({ error: "You can't do this." });
	}

	if (await db.collection("users").findOne({ vanity: req.query.vanity })) {
		return res.status(401).json({ error: "Vanity URL already taken." });
	}

	await redis.del(`user:${req.query.id}`);
	await redis.del("staff");

	try {
		await db
			.collection("users")
			.updateOne(
				{ _id: req.query.id as string },
				{ $set: { vanity: req.query.vanity } }
			);

		return res.status(200).json({});
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
