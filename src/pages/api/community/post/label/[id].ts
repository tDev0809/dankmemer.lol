import { NextApiResponse } from "next";
import { Post } from "../../../../../types";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	const user = req.session.get("user");
	const label = req.query.label || "";

	if (!user || !user.moderator) {
		return res.status(401).json({ error: "Get away you sick filth." });
	}

	const post = (await db.collection("community-posts").findOne({
		_id: id,
	})) as Post;

	if (!post) {
		return res.status(500).json({ message: "This post does not exist." });
	}

	const labels = ([] as string[])
		.concat(
			post.labels.includes("developer-response")
				? ["developer-response"]
				: []
		)
		.concat(label != "" ? [label as string] : []);

	await db.collection("community-posts").updateOne(
		{
			_id: id,
		},
		{
			$set: { labels },
		}
	);

	res.status(200).json({ labels });
};

export default withSession(handler);
