import { NextApiResponse } from "next";
import { dbConnect } from "../../../../../util/mongodb";
import { redisConnect } from "../../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;
	const redis = await redisConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.developer) {
		return res.status(401).json({ error: "You can't do this." });
	}

	const blog = req.body;

	if (blog.title.length < 2) {
		return res.status(400).json({ error: "Title is too short." });
	}

	if (blog.description.length < 2) {
		return res.status(400).json({ error: "Description is too short." });
	}

	if (blog._id.length < 2) {
		return res.status(400).json({ error: "ID is too short." });
	}

	if (blog._id.includes(" ")) {
		return res.status(400).json({ error: "ID can't include space." });
	}

	if (blog._id.includes("/")) {
		return res.status(400).json({ error: "ID can't include '/'." });
	}

	if (blog.content.length == 0) {
		return res.status(400).json({ error: "Content can't be empty." });
	}

	if (blog._id == "new") {
		return res.status(400).json({ error: "ID can't be equal to 'new'." });
	}

	if (
		blog._id != id &&
		(await db.collection("community-blogs").findOne({ _id: blog._id }))
	) {
		return res
			.status(400)
			.json({ error: "Blog with this ID already exists." });
	}

	await redis.del("community:blogs");

	try {
		if (id != "new" && id != blog._id) {
			await db.collection("community-blogs").deleteOne({ _id: id });
		}

		await db.collection("community-blogs").updateOne(
			{ _id: blog._id },
			{
				$set: {
					_id: blog._id,
					title: blog.title,
					author:
						typeof blog.author == "string"
							? blog.author
							: blog.author.id,
					description: blog.description,
					draft: blog.draft,
					content: blog.content,
					date: blog.date,
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
