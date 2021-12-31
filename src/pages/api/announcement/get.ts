import { NextApiResponse } from "next";
import { TIME } from "../../../constants";
import { dbConnect } from "../../../util/mongodb";
import { redisConnect } from "../../../util/redis";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const cached = await redis.get("announcements");

	if (cached) {
		return res.json(JSON.parse(cached));
	}

	try {
		const announcement = await db
			.collection("announcements")
			.find({})
			.sort({ createdAt: -1 })
			.toArray();

		if (!announcement[0] || announcement[0].content === "") {
			return res.status(200).json({});
		}

		await redis.set(
			"announcements",
			JSON.stringify(announcement[0]),
			"PX",
			TIME.day
		);

		return res.status(200).json(announcement[0]);
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
