import { TIME } from "../constants";
import { UserData } from "../types";
import { dbConnect } from "./mongodb";
import { redisConnect } from "./redis";

export async function getUser(id: string): Promise<UserData | null> {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const cachedUser = await redis.get(`user:${id}`);

	if (cachedUser) {
		return JSON.parse(cachedUser);
	} else {
		const user = await db
			.collection("users")
			.findOne({ $or: [{ _id: id }, { vanity: id }] });

		if (user) {
			const data = {
				id: user._id,
				name: user.name,
				discriminator: user.discriminator,
				avatar: user.avatar,
				banner: user.banner,
				developer: user.developer == true,
				moderator: user.moderator == true,
				botModerator: user.botModerator == true,
				honorable: user.honorable == true,
			};

			await redis.set(
				`user:${id}`,
				JSON.stringify(data),
				"PX",
				TIME.day * 3
			);

			return data;
		} else {
			return null;
		}
	}
}

export async function getUsers(ids: string[]): Promise<UserData[]> {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const pipeline = redis.pipeline();

	for (const id of ids) {
		pipeline.get(`user:${id}`);
	}

	const results = await pipeline.exec();

	const users = [];

	for (let i = 0; i < ids.length; i++) {
		if (results[i][1]) {
			users.push(JSON.parse(results[i][1]));
		} else {
			const user = await db.collection("users").findOne({ _id: ids[i] });

			if (user) {
				const data = {
					id: user._id,
					name: user.name,
					discriminator: user.discriminator,
					avatar: user.avatar,
					banner: user.banner,
					developer: user.developer == true,
					moderator: user.moderator == true,
					botModerator: user.botModerator == true,
					honorable: user.honorable == true,
				};

				await redis.set(
					`user:${ids[i]}`,
					JSON.stringify(data),
					"PX",
					TIME.day * 3
				);

				users.push(data);
			} else {
				users.push(null);
			}
		}
	}

	return users;
}
