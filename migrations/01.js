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

	if (blogs.length) {
		await db.collection("blogs").drop();
	}

	// Migrate Posts to Community
	const posts = await db.collection("feedback_posts").find({}).toArray();

	for (const post of posts) {
		await db.collection("community-posts").insertOne({
			_id: post._id,
			title: post.title,
			content: post.description,
			category: post.category,
			createdAt: post.createdAt,
			author: post.author.id,
			label: post.label ? post.label : "",
		});

		await db.collection("community-activities").insertOne({
			uID: post.author.id,
			data: {
				title: post.title,
				id: post._id,
			},
			type: 0, // See src/constants/activities
			createdAt: post.createdAt,
		});
	}

	await db.collection("feedback_posts").drop();
	await db.collection("feedback_upvotes").rename("community-posts-upvotes");

	process.exit();
};

migration();
