import { NextApiResponse } from "next";
import { dbConnect } from "../../../../util/mongodb";
import { redisConnect } from "../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const redis = await redisConnect();

	const { id } = req.query;

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.developer) {
		return res.status(401).json({ error: "You can't do this." });
	}

	await db.collection("tutorials").deleteOne({ _id: id });
	await redis.del("tutorials");

	res.status(200).send({});
};

export default withSession(handler);
