import { NextApiResponse } from "next";
import { Post } from "../../../../../types";
import { dbConnect } from "../../../../../util/mongodb";
import { getPostsData } from "../../../../../util/posts";
import { NextIronRequest, withSession } from "../../../../../util/session";
import { getUser } from "../../../../../util/user";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	let userData = await getUser(id as string);

	if (!userData) {
		return res.status(404).send({ eror: "User not found" });
	}

	const user = req.session.get("user");

	let posts = (await db
		.collection("community-posts")
		.find({ author: userData.id })
		.sort({ createdAt: -1 })
		.toArray()) as Post[];

	posts = await getPostsData(posts, user);

	const comments = await db
		.collection("community-posts-comments")
		.find({ author: userData.id })
		.count();

	const upvotes = await db
		.collection("community-posts-upvotes")
		.find({ uID: userData.id })
		.count();

	const activities = await db
		.collection("community-activities")
		.find({ uID: userData.id })
		.sort({ createdAt: -1 })
		.limit(10)
		.toArray();

	return res.json({
		user: userData,
		posts,
		comments,
		upvotes,
		activities,
	});
};

export default withSession(handler);
