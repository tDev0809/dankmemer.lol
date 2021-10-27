import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	return res.status(200).send(`User-agent: *\n` + `Disallow:`);
};

export default handler;
