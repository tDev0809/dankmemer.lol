import { NextApiResponse } from "next";
import { BLOCKED_COUNTRIES } from "../../../constants";
import { NextIronRequest, withSession } from "../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const country = req.headers["cf-ipcountry"];
	return res.json({
		country,
		isBlocked: BLOCKED_COUNTRIES.includes(country as string),
	});
};

export default withSession(handler);
