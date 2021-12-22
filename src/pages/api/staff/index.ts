import { NextApiResponse } from "next";
import { TIME } from "../../../constants";
import { UserData } from "../../../types";
import { dbConnect } from "../../../util/mongodb";
import { redisConnect } from "../../../util/redis";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const cached = await redis.get("community:blogs");

	if (cached) {
		return res.json(JSON.parse(cached));
	}

	const result: Record<string, UserData[]> = {
		team: [],
		botModerators: [],
		moderators: [],
		honorable: [],
	};
	const users = await db
		.collection("users")
		.find({ $or: [{ moderator: true }, { honorable: true }] })
		.toArray();

	for (const user of users) {
		delete user.email;
		delete user.ip;

		if (user.developer) {
			result.team.push(user as UserData);
		} else if (user.botModerator) {
			result.botModerators.push(user as UserData);
		} else if (user.moderator) {
			result.moderators.push(user as UserData);
		} else {
			result.honorable.push(user as UserData);
		}
	}

	await redis.set("community:blogs", JSON.stringify(result), "PX", TIME.week);

	return res.json(result);
};

export default withSession(handler);
