import { ObjectId } from "bson";
import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.developer) {
		return res.status(401).json({ error: "You can't do this." });
	}

	if (!req.query?.id || !req.query?.category) {
		return res.status(400).json({ error: "Missing parameters." });
	}

	try {
		await db.collection("staff").insertOne({
			_id: req.query.id as unknown as ObjectId,
			category: req.query.category as string,
			name: "",
			about: "",
			avatar: "",
			social: {},
		});
		return res.status(200).json({});
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
