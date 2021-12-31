import { NextApiResponse } from "next";
import { TIME } from "../../../../../constants";
import { getTopContributions } from "../../../../../util/contributions";
import { redisConnect } from "../../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../../util/session";
import { getUsers } from "../../../../../util/user";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const redis = await redisConnect();
	const { id } = req.query;

	// Kable's easter egg
	if (id == "363785301195358221") {
		return res.json({ place: 69420 });
	}

	const cached = await redis.get(`community:place:${id}`);

	if (cached) {
		return res.json({ place: parseInt(cached) });
	}

	const scores = await getTopContributions(TIME.year);

	for (let i = 0; i < scores.length; i++) {
		scores[i].position = i + 1;
	}

	const score = scores.find((s) => s._id == id);

	if (!score) {
		return res.json({ place: -1 });
	}

	const sameScores = scores.filter((s) => (s.score = score.score));

	if (score.position! < 300) {
		let newScore = [];

		const data = await getUsers(
			sameScores.map((s) => s._id) as unknown as string[]
		);

		for (let user of sameScores) {
			const userData = data.find((u) => u.id == user._id);

			newScore.push({
				id: user._id,
				position: user.position,
				score:
					user.score * 1e6 +
					parseInt(userData?.discriminator || "0") +
					parseInt(userData!.id.slice(-4)),
			});
		}

		newScore = newScore.sort((a, z) => z.score - a.score);

		const minPosition = Math.min(...newScore.map((a) => a.position!));
		const newPlace = newScore.findIndex((s) => s.id == id);

		await redis.set(
			`community:place:${id}`,
			(minPosition + newPlace).toString(),
			"PX",
			TIME.hour
		);

		return res.json({ place: minPosition + newPlace });
	} else {
		const place = Math.max(...sameScores.map((a) => a.position!));

		await redis.set(
			`community:place:${id}`,
			place.toString(),
			"PX",
			TIME.hour
		);

		return res.json({ place: place });
	}
};

export default withSession(handler);
