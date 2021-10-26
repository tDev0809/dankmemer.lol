import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const discount = await db.collection("discounts").findOne({
		expiry: { $gt: Date.now() },
	});
	if (discount) {
		res.status(200).json({
			percent: discount.percent,
			name: discount.name || "",
			expiry: discount.expiry,
		});
	} else {
		res.status(200).json({});
	}
};

export default withSession(handler);
