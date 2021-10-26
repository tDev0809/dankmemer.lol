import { NextApiResponse } from "next";
import { dbConnect } from "../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.isAdmin) {
		return res.status(401).json({ error: "You can't do this." });
	}

	try {
		await db.collection("blogs").updateOne(
			{ _id: req.body.id },
			{
				$set: {
					_id: req.body.id,
					name: req.body.name,
					date: req.body.date || new Date().getTime(),
					author: req.body.author,
					desc: req.body.desc,
					content: req.body.content,
					draft: req.body.draft,
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
