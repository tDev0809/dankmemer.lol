import { TIME } from "../constants";
import { Score } from "../types";
import { dbConnect } from "./mongodb";
import { redisConnect } from "./redis";

export async function getTopContributions(limit: number): Promise<Score[]> {
	const db = await dbConnect();
	const redis = await redisConnect();

	const cached = await redis.get(`community:contributors:${limit}`);

	if (cached) {
		return JSON.parse(cached);
	} else {
		const postsMade = await db
			.collection("community-activities")
			.aggregate([
				{
					$match: {
						createdAt: { $gt: Date.now() - limit },
						type: 0,
					},
				},
				{
					$group: {
						_id: "$uID",
						score: { $sum: 1 },
					},
				},
			])
			.toArray();

		const upvotesGiven = await db
			.collection("community-posts-upvotes")
			.aggregate([
				{
					$addFields: {
						createdAt: {
							$toLong: {
								$toDate: "$_id",
							},
						},
					},
				},
				{
					$match: {
						createdAt: { $gt: Date.now() - limit },
					},
				},
				{
					$group: {
						_id: "$uID",
						score: { $sum: 1 },
					},
				},
			])
			.toArray();

		const upvotesReceived = await db
			.collection("community-posts")
			.aggregate([
				{
					$match: {
						createdAt: { $gt: Date.now() - limit },
					},
				},
				{
					$group: {
						_id: "$author",
						score: { $sum: "$upvotes" },
					},
				},
			])
			.toArray();

		const commentsMade = await db
			.collection("community-activities")
			.aggregate([
				{
					$match: {
						createdAt: { $gt: Date.now() - limit },
						type: 1,
					},
				},
				{
					$group: {
						_id: "$uID",
						score: { $sum: 1 },
					},
				},
			])
			.toArray();

		let scores: Score[] = [];

		const getScore = (id: string) => {
			const score = scores.find((s) => s._id == id);
			if (!score) {
				scores.push({ _id: id, score: 0 });
				return scores[scores.length - 1];
			}
			return score;
		};

		for (const user of postsMade) {
			getScore(user._id).score += user.score * 10;
		}

		for (const user of upvotesReceived) {
			getScore(user._id).score += user.score * 5;
		}

		for (const user of commentsMade) {
			getScore(user._id).score += user.score * 5;
		}

		for (const user of upvotesGiven) {
			getScore(user._id).score += user.score * 2;
		}

		scores = scores.sort((a, z) => z.score - a.score);

		await redis.set(
			`community:contributors:${limit}`,
			JSON.stringify(scores),
			"PX",
			TIME.day
		);

		return scores;
	}
}
