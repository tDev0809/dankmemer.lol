import { NextApiResponse } from "next";
import { dbConnect } from "../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.developer) {
		return res.status(401).json({ error: "You can't do this." });
	}

	try {
		await db.collection("community-updates").insertOne({
			...req.body,
			createdAt: new Date().getTime(),
		});
		return res.status(200).json({});
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
