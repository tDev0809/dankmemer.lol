import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();

	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	if (!user.isAdmin) {
		return res.status(401).json({ error: "You can't do this." });
	}

	const dbQuery: Record<string, any> = {};

	for (const [query, value] of Object.entries(req.query)) {
		const valueRX = RegExp(value as string, "i");

		switch (query) {
			case "Discord ID":
				dbQuery["payer.userID"] = valueRX;
				break;
			case "PayPal E-Mail":
				dbQuery["payer.paypalEmail"] = valueRX;
				break;
			case "Full Name":
				dbQuery["payer.name"] = valueRX;
				break;
			case "Payment ID":
				dbQuery["$or"] = [{ captureID: valueRX }, { orderID: valueRX }];
		}
	}

	try {
		if (Object.keys(dbQuery).length === 0)
			return res.status(500).json({ error: "This is not right." });

		const purchase = await db
			.collection("purchases")
			.find(dbQuery)
			.toArray();
		if (!purchase[0]) {
			res.status(204).json({
				error: "No purchase found with that information.",
			});
		} else {
			res.status(200).json(purchase);
		}
	} catch (e) {
		return res.status(500).json({});
	}
};

export default withSession(handler);
