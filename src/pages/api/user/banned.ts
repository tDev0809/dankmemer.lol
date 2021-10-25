import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	const user = req.session.get("user");

	if (!user?.id) {
		res.status(200).json({});
	}

	if (
		await db.collection("bans").findOne({
			type: "lootbox", // TODO
			id: user.id,
		})
	) {
		res.status(403).json({});
	} else {
		res.status(200).json({});
	}
};

export default withSession(handler);
