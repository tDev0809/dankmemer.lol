import { NextApiResponse } from "next";
import { TIME } from "../../../../../constants";
import { dbConnect } from "../../../../../util/mongodb";
import { redisConnect } from "../../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../../util/session";
import { getUser } from "../../../../../util/user";

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

	let newScore = [];

	for (let user of sameScores) {
		const userData = await getUser(user._id);
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
};

export default withSession(handler);
