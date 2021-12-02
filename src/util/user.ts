import { TIME } from "../constants";
import { dbConnect } from "./mongodb";
import { redisConnect } from "./redis";

// TODO: user type
export async function getUser(id: string) {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const cachedUser = await redis.get(`user:${id}`);

	if (cachedUser) {
		return JSON.parse(cachedUser);
	} else {
		const user = await db.collection("users").findOne({ _id: id });

		if (user) {
			const data = {
				name: user.name,
				discriminator: user.discriminator,
				avatar: user.avatar,
			};

			await redis.set(`user:${id}`, JSON.stringify(data), "PX", TIME.day);

			return data;
		}
	}
}
