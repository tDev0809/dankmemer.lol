import { NextApiResponse } from "next";
import { dbConnect } from "../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	let blogs = await db.collection("blogs").find({ _id: id }).toArray();

	let blog = blogs?.[0];

	return blog
		? res.status(200).send(blog)
		: res.status(404).send({ eror: "Blog not found" });
};

export default withSession(handler);
