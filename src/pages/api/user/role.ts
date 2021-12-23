import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { redisConnect } from "../../../util/redis";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const user = req.session.get("user");
	const role = req.query?.role as string;

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!req.query?.id || !req.query?.role) {
		return res.status(400).json({ error: "Missing parameters." });
	}

	if (!user.moderator) {
		return res.status(401).json({ error: "You can't do this." });
	}

	if (
		!["modManager", "moderator", "botModerator", "honorable"].includes(
			req.query?.role as string
		)
	) {
		return res.status(400).json({ error: "This role doesn't exist." });
	}

	if (role == "moderator" && !user.modManager) {
		return res.status(401).json({ error: "You can't do this." });
	}

	if (role == "modManager" && !user.developer) {
		return res.status(401).json({ error: "You can't do this." });
	}

	if (role == "botModerator" && !user.developer) {
		return res.status(401).json({ error: "You can't do this." });
	}

	if (role == "honorable" && !user.developer) {
		return res.status(401).json({ error: "You can't do this." });
	}

	const userData = await db
		.collection("users")
		.findOne({ _id: req.query.id as string });

	await redis.del(`user:${req.query.id}`);
	if (userData?.vanity) {
		await redis.del(`user:${userData.vanity}`);
	}
	await redis.del("staff");

	try {
		await db.collection("users").updateOne(
			{ _id: req.query.id },
			{
				$set: {
					[role]: !!!userData![role],
				},
			}
		);
		return res.status(200).json({ [role]: !!!userData![role] });
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
