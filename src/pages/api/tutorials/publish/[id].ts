import { NextApiResponse } from "next";
import { dbConnect } from "../../../../util/mongodb";
import { redisConnect } from "../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const redis = await redisConnect();

	const { id } = req.query;

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.developer) {
		return res.status(401).json({ error: "You can't do this." });
	}

	const tutorial = req.body;

	if (tutorial.title.length < 2) {
		return res.status(400).json({ error: "Title is too short." });
	}

	if (tutorial._id.length < 2) {
		return res.status(400).json({ error: "ID is too short." });
	}

	if (tutorial._id.includes(" ")) {
		return res.status(400).json({ error: "ID can't include space." });
	}

	if (
		tutorial._id.includes("/") ||
		tutorial._id.includes(" ") ||
		tutorial._id.includes("&") ||
		tutorial._id.includes("?")
	) {
		return res.status(400).json({ error: "Invalid ID" });
	}

	if (tutorial.content.length == 0) {
		return res.status(400).json({ error: "Content can't be empty." });
	}

	if (tutorial._id == "new") {
		return res.status(400).json({ error: "ID can't be equal to 'new'." });
	}

	if (
		tutorial._id != id &&
		(await db.collection("tutorials").findOne({ _id: tutorial._id }))
	) {
		return res
			.status(400)
			.json({ error: "Tutorial with this ID already exists." });
	}

	await redis.del("tutorials");

	try {
		await db.collection("tutorials").updateOne(
			{ _id: tutorial._id },
			{
				$set: {
					_id: tutorial._id,
					title: tutorial.title,
					content: tutorial.content,
					date: tutorial.date,
				},
			},
			{ upsert: true }
		);
		return res.status(200).json({});
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
