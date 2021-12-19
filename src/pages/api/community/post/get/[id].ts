import { NextApiResponse } from "next";
import { Post } from "../../../../../types";
import { dbConnect } from "../../../../../util/mongodb";
import { getPostsData } from "../../../../../util/posts";
import { redisConnect } from "../../../../../util/redis";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const redis = await redisConnect();
	const { id } = req.query;

	const user = req.session.get("user");

	let post = (await db
		.collection("community-posts")
		.findOne({ _id: id })) as Post;

	if (!post) {
		return res.status(500).json({ error: "This post does not exist." });
	}

	const posts = await getPostsData([post], user);

	return res.json({ post: posts[0] });
};

export default withSession(handler);
