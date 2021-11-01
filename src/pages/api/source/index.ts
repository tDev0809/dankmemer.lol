import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "public/source.zip");
const imageBuffer = fs.readFileSync(filePath);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader("Content-Type", "application/zip");
	res.send(imageBuffer);
};

export default handler;
