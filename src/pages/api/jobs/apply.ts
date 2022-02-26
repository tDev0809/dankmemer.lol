import axios from "axios";
import { IncomingForm } from "formidable";
import FormData from "form-data";
import { createReadStream } from "fs";
import { NextApiResponse } from "next";
import { dbConnect } from "../../../util/mongodb";
import { NextIronRequest, withSession } from "../../../util/session";
import { rm } from "fs/promises";

export const config = {
	api: {
		bodyParser: false,
	},
};

const handler = async (req: NextIronRequest, res: NextApiResponse) => {
	const db = await dbConnect();
	const user = req.session.get("user");

	if (!user) {
		return res.status(401).json({ error: "You are not logged in." });
	}

	try {
		const { fields, files } = await new Promise((resolve, reject) => {
			const form = new IncomingForm();
			form.parse(req, async (error, fields: any, files: any) => {
				if (error) {
					reject(error);
				}
				resolve({ fields, files });
			});
		});

		const formData = new FormData();
		if (Object.keys(files).length !== 0) {
			formData.append("file", createReadStream(files.resume.filepath), {
				filename: files.resume.originalFilename,
			});
		}

		formData.append("payload_json", fields.payload_json);

		const { job, userId } = JSON.parse(fields.job);
		if (!job || !userId) {
			return res.status(400).json({ error: "Missing body elements." });
		}

		const dbRecord = await db.collection("jobs").findOne({ _id: job._id });
		if (!dbRecord) {
			return res.status(500).json({
				error: "Job listing with provided ID was not found.",
			});
		}

		if (dbRecord.applicants.includes(userId)) {
			return res.status(401).json({
				error: "You have already applied for this position.",
			});
		}

		await db
			.collection("jobs")
			.updateOne({ _id: job._id }, { $push: { applicants: userId } });

		await axios({
			method: "POST",
			url:
				dbRecord.webhook.length > 1
					? dbRecord.webhook
					: process.env.JOBS_WEBHOOK,
			data: formData,
			headers: formData.getHeaders(),
		});

		if (Object.keys(files).length !== 0) {
			rm(files.resume.filepath);
		}
		return res.status(200).json({ message: "Job application submitted." });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: e });
	}
};

export default withSession(handler);
