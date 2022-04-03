import { NextApiResponse } from "next";
import { dbConnect } from "../../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../../util/session";

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const { id } = req.query;

	let tutorial = await db.collection("tutorials").findOne({ _id: id });

	if (tutorial) {
		return res.status(200).send(tutorial);
	}
	return res.status(404).send({ eror: "Tutorial not found" });
};

export default withSession(handler);
