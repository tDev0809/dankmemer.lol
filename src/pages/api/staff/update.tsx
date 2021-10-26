import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.isModerator) {
		return res.status(401).json({ error: "You can't do this." });
	}

	try {
		await db.collection("staff").updateOne(
			{ _id: user.id },
			{
				$set: {
					about: req.body.about,
					social: req.body.social,
				},
			}
		);
		return res.status(200).json({});
	} catch (e) {
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
