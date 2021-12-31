const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const html2md = require("html-to-md");

const categories = [
	"currency_items",
	"currency_commands",
	"currency_balances",
	"new_features",
	"qol_changes",
	"patreon_and_lootboxes",
	"website",
	"pipe_dream",
	"other",
];

const data = async () => {
	const client = await MongoClient.connect(process.env.MONGODB_URI);
	const db = client.db(process.env.MONGODB_DB);

	const posts = await db.collection("community-posts").find({}).count();
	const dev = await db
		.collection("community-posts")
		.aggregate([
			{
				$match: {
					labels: { $nin: ["invalid"] },
				},
			},
			{
				$match: {
					labels: { $not: { $size: 0 } },
				},
			},
		])
		.toArray();

	const implemented = await db
		.collection("community-posts")
		.aggregate([
			{
				$match: {
					labels: "implemented",
				},
			},
		])
		.toArray();

	console.log("posts: ", posts);
	console.log("dev: ", dev.length);
	console.log("implemented: ", implemented.length);
	console.log();

	for (const category of categories) {
		const posts = await db
			.collection("community-posts")
			.find({ category })
			.count();

		const accepted = await db
			.collection("community-posts")
			.aggregate([
				{
					$match: {
						category,
						$or: [
							{ labels: "accepted" },
							{ labels: "implemented" },
						],
					},
				},
			])
			.toArray();

		console.log("category: ", category);
		console.log("posts: ", posts);
		console.log("accepted: ", accepted.length);
		console.log(" ");
	}

	process.exit();
};

data();
