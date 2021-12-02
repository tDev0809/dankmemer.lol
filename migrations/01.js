const { MongoClient } = require("mongodb");
require("dotenv").config();
const html2md = require("html-to-md");

const migration = async () => {
	const client = await MongoClient.connect(process.env.MONGODB_URI);
	const db = client.db(process.env.MONGODB_DB);

	// Migrate Blogs to Community
	const blogs = await db.collection("blogs").find({}).toArray();

	for (const blog of blogs) {
		const markdown = html2md(
			blog.content.replaceAll('\\"', '"')
		).replaceAll("\\n", "");

		await db.collection("community-blogs").insertOne({
			_id: blog._id,
			title: blog.name,
			author:
				blog.author == "Melmsie"
					? "172571295077105664"
					: "214858075650260992", // badosz
			description: blog.desc,
			date: blog.date,
			draft: blog.draft == true, // will set false for old blogs
			content: markdown,
		});
	}

	process.exit();
};

migration();
