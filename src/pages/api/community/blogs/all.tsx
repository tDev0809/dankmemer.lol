import { NextApiResponse } from "next";
import { TIME } from "../../../../constants";
import { Blog } from "../../../../types";
import { dbConnect } from "../../../../util/mongodb";
import { redisConnect } from "../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../util/session";
import { getUser } from "../../../../util/user";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();

	const cached = await redis.get("community:blogs");

	if (cached) {
		return res.json(JSON.parse(cached));
	}

	const blogs = (await db
		.collection("community-blogs")
		.find({ draft: false })
		.sort({ date: -1 })
		.toArray()) as Blog[];

	for (let blog of blogs) {
		const user = await getUser(blog.author);

		if (user) {
			blog.authorName = user.name;
		}
	}

	await redis.set("community:blogs", JSON.stringify(blogs), "PX", TIME.week);

	return res.json(blogs);
};

export default withSession(handler);
