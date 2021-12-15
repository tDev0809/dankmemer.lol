import { NextApiResponse } from "next";
import { TIME } from "../../../../../constants";
import { dbConnect } from "../../../../../util/mongodb";
import { redisConnect } from "../../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../../util/session";
import { getUser, getUsers } from "../../../../../util/user";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();
	const { id } = req.query;

	const cached = await redis.get(`community:place:${id}`);

	if (cached) {
		return res.json({ place: parseInt(cached) });
	}

	const contributors = await db
		.collection("community-activities")
		.aggregate([
			{
				$group: {
					_id: "$uID",
					score: { $sum: 1 },
				},
			},
			{
				$setWindowFields: {
					sortBy: { score: -1 },
					output: { place: { $documentNumber: {} } },
				},
			},
			{
				$match: {
					_id: id,
				},
			},
		])
		.toArray();

	if (contributors.length == 0) {
		return res.json({ place: -1 });
	}

	const contributor = contributors[0];

	const sameScores = await db
		.collection("community-activities")
		.aggregate([
			{
				$group: {
					_id: "$uID",
					score: { $sum: 1 },
				},
			},
			{
				$setWindowFields: {
					sortBy: { score: -1 },
					output: { position: { $documentNumber: {} } },
				},
			},
			{
				$match: {
					score: contributor.score,
				},
			},
		])
		.toArray();

	if (contributor.position < 300) {
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

		const minPosition = Math.min(...newScore.map((a) => a.position));
		const newPlace = newScore.findIndex((s) => s.id == id);

		await redis.set(
			`community:place:${id}`,
			(minPosition + newPlace).toString(),
			"PX",
			TIME.hour
		);

		return res.json({ place: minPosition + newPlace });
	} else {
		const place = Math.max(...sameScores.map((a) => a.position));

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
