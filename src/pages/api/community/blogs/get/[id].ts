import { NextApiResponse } from "next";
import { dbConnect } from "../../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../../util/session";
import { getUser } from "../../../../../util/user";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const { db } = await dbConnect();
	const { id } = req.query;

	let blog = await db.collection("community-blogs").findOne({ _id: id });

	if (blog) {
		blog.author = await getUser(blog.author);

		return res.status(200).send(blog);
	} else {
		return res.status(404).send({ eror: "Blog not found" });
	}
};

export default withSession(handler);
