import { NextApiResponse } from "next";
import {
	LOOT_FLAT_DISCOUNT_PERCENTAGE,
	LOOT_MINIMUM_DISCOUNT_VALUE,
	LOOT_MINIMUM_PURCHASE_VALUE,
} from "../../../constants";
import { NextIronRequest, withSession } from "../../../util/session";

const boxes = require("../../../data/boxes.json");

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	return res.json({
		boxes,
		Constants: {
			MINIMUM_PURCHASE_VALUE: LOOT_MINIMUM_PURCHASE_VALUE,
			MINIMUM_DISCOUNT_VALUE: LOOT_MINIMUM_DISCOUNT_VALUE,
			FLAT_DISCOUNT_PERCENTAGE: LOOT_FLAT_DISCOUNT_PERCENTAGE,
		},
	});
};

export default withSession(handler);
