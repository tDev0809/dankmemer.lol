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

	if (!req.query?.id) {
		return res.status(400).json({ error: "Missing parameters." });
	}

	if (!user.moderator) {
		return res.status(401).json({ error: "You can't do this." });
	}

	const userData = await db
		.collection("users")
		.findOne({ _id: req.query.id as string });

	await redis.del(`user:${req.query.id}`);
	if (userData?.vanity) {
		await redis.del(`user:${userData.vanity}`);
	}

	try {
		await db.collection("users").updateOne(
			{ _id: req.query.id },
			{
				$set: {
					perks: !!!userData!.perks,
				},
			}
		);
		return res.status(200).json({ [role]: !!!userData![role] });
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
