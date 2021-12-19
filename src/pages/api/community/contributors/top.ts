import { NextApiResponse } from "next";
import { TIME } from "../../../../constants";
import { Contributor } from "../../../../types";
import { dbConnect } from "../../../../util/mongodb";
import { redisConnect } from "../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../util/session";
import { getUser } from "../../../../util/user";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const cached = await redis.get("community:contributors");

	if (cached) {
		return res.json(JSON.parse(cached));
	}

	const users = await db
		.collection("community-activities")
		.aggregate([
			{
				$match: {
					createdAt: { $gt: Date.now() - TIME.month },
				},
			},
			{
				$group: {
					_id: "$uID",
					score: { $sum: 1 },
				},
			},
			{ $sort: { score: -1 } },
			{ $limit: 10 },
		])
		.toArray();

	let contributors: Contributor[] = [];

	for (let user of users) {
		const userData = await getUser(user._id);
		const contributor: Contributor = {
			...userData!,
			...{
				score:
					user.score * 1e6 +
					parseInt(userData?.discriminator || "0") +
					parseInt(userData!.id.slice(-4)),
			},
		};
		contributors.push(contributor);
	}

	contributors = contributors.sort((a, z) => z.score - a.score).slice(0, 5);

	await redis.set(
		"community:contributors",
		JSON.stringify(contributors),
		"PX",
		TIME.hour
	);

	return res.json(contributors);
};

export default withSession(handler);
