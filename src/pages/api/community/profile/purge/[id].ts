import { NextApiResponse } from "next";
import { Post } from "../../../../../types";
import { dbConnect } from "../../../../../util/mongodb";
import { getPostsData } from "../../../../../util/posts";
import { NextIronRequest, withSession } from "../../../../../util/session";
import { getUser } from "../../../../../util/user";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const { id } = req.query;

	let userData = await getUser(id as string);

	if (!userData) {
		return res.status(404).send({ eror: "User not found" });
	}

	const user = req.session.get("user");

	if (!user.developer && !user.botModerator && !user.modManager) {
		return res
			.status(403)
			.json({ error: "You don't have permission to do this." });
	}

	try {
		await db
			.collection("community-posts")
			.deleteMany({ author: userData.id });
		await db
			.collection("community-posts-comments")
			.deleteMany({ author: userData.id });
		await db
			.collection("community-posts-upvotes")
			.deleteMany({ uID: userData.id });
		await db
			.collection("community-activities")
			.deleteMany({ uID: userData.id });

		return res.status(200).json({
			user: userData,
			status: "All gone",
		});
	} catch (e: any) {
		console.error(e);
		return res.status(500).json({
			error: e.message.replace(/"/g, ""),
		});
	}
};

export default withSession(handler);
