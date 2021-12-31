import { NextApiResponse } from "next";
import { createSecureContext } from "tls";
import { TIME } from "../../../../constants";
import { Contributor } from "../../../../types";
import { getTopContributions } from "../../../../util/contributions";
import { dbConnect } from "../../../../util/mongodb";
import { redisConnect } from "../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../util/session";
import { getUser } from "../../../../util/user";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const redis = await redisConnect();

	const cached = await redis.get("community:top");

	if (cached) {
		return res.json(JSON.parse(cached));
	}

	const scores = (await getTopContributions(TIME.month)).slice(0, 10);

	let contributors: Contributor[] = [];

	for (let score of scores) {
		const userData = await getUser(score._id);
		const contributor: Contributor = {
			...userData!,
			...{
				score:
					score.score * 1e6 +
					parseInt(userData?.discriminator || "0") +
					parseInt(userData!.id.slice(-4)),
			},
		};
		contributors.push(contributor);
	}

	contributors = contributors.sort((a, z) => z.score - a.score).slice(0, 5);

	await redis.set(
		"community:top",
		JSON.stringify(contributors),
		"PX",
		TIME.day
	);

	return res.json(contributors);
};

export default withSession(handler);
