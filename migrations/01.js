const { MongoClient } = require("mongodb");
require("dotenv").config();
const html2md = require("html-to-md");

const authorsMap = {
	Melmsie: "172571295077105664",
	Badosz: "214858075650260992",
	Kable: "363785301195358221",
};

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
			author: authorsMap[blog.author],
			description: blog.desc,
			date: blog.date,
			draft: blog.draft == true, // will set false for old blogs
			content: markdown,
		});
	}

	await db.collection("blogs").drop();

	process.exit();
};

migration();
