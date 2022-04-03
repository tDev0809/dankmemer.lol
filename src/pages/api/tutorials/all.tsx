import { NextApiResponse } from "next";
import { TIME } from "../../../constants";
import { Tutorial } from "../../../types";
import { dbConnect } from "../../../util/mongodb";
import { redisConnect } from "../../../util/redis";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const redis = await redisConnect();

	const cached = await redis.get("tutorials");

	if (cached) {
		return res.json(JSON.parse(cached));
	}

	const tutorials = (await db
		.collection("tutorials")
		.find({})
		.sort({ date: -1 })
		.toArray()) as Tutorial[];

	await redis.set("tutorials", JSON.stringify(tutorials), "PX", TIME.week);

	return res.json(tutorials);
};

export default withSession(handler);
