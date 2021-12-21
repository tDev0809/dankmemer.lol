const { MongoClient, ObjectId } = require("mongodb");
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

	// Add discrim and username if not found
	const addMissingFields = async (user) => {
		const data = await db.collection("users").findOne({ _id: user.id });

		if (!data.discriminator || !data.name || !data.avatar) {
			await db.collection("users").updateOne(
				{ _id: user.id },
				{
					$set: {
						name: user.username,
						discriminator: user.discriminator,
						avatar: `https://cdn.discordapp.com/embed/avatars/${
							parseFloat(user.id) % 5
						}.png`,
					},
				}
			);
		}
	};

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

	// // Migrate Posts to Community
	let posts = await db.collection("feedback_posts").find({}).toArray();

	const comments = await db
		.collection("feedback_comments")
		.find({})
		.toArray();

	for (const post of posts) {
		const devResponse = comments.find(
			(c) => c.pID == post._id && c.author.developer
		);

		const upvotes = await db
			.collection("feedback_upvotes")
			.find({ pID: post._id })
			.count();

		await db.collection("community-posts").insertOne({
			_id: post._id,
			title: post.title,
			content: post.description,
			category: post.category,
			createdAt: post.createdAt,
			author: post.author.id,
			upvotes: upvotes,
			labels: (post.label ? [post.label] : []).concat(
				devResponse ? ["developer-response"] : []
			),
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

		await addMissingFields(post.author);
	}

	await db.collection("feedback_posts").drop();
	await db.collection("feedback_upvotes").rename("community-posts-upvotes");

	// // Migrate Comments to Community
	posts = await db.collection("community-posts").find({}).toArray();

	for (const comment of comments) {
		const post = posts.find((p) => p._id == comment.pID);

		if (post) {
			await db.collection("community-posts-comments").insertOne({
				_id: comment._id,
				pID: comment.pID,
				content: comment.comment,
				author: comment.author.id,
				createdAt: comment.createdAt,
				...(comment.pinned ? { pinned: true } : {}),
			});

			if (comment.author.id !== "[deleted]") {
				await db.collection("community-activities").insertOne({
					uID: comment.author.id,
					data: {
						postTitle: post.title,
						postId: post._id,
					},
					type: 1, // See src/constants/activities
					createdAt: comment.createdAt,
				});

				await addMissingFields(comment.author);
			}
		}
	}
	await db.collection("feedback_comments").drop();

	// Migrate Replies to Community
	const replies = await db.collection("feedback_replies").find({}).toArray();

	for (const reply of replies) {
		const post = posts.find((p) => p._id == reply.pID);

		if (post) {
			await db.collection("community-posts-replies").insertOne({
				pID: reply.pID,
				cID: reply.cID,
				content: reply.reply,
				author: reply.author.id,
				createdAt: reply.createdAt,
			});

			if (reply.author.id !== "[deleted]") {
				await db.collection("community-activities").insertOne({
					uID: reply.author.id,
					data: {
						postTitle: post.title,
						postId: post._id,
					},
					type: 2, // See src/constants/activities
					createdAt: reply.createdAt,
				});

				await addMissingFields(reply.author);
			}
		}
	}
	await db.collection("feedback_replies").drop();

	// Migrate Staff
	const staff = await db.collection("staff").find({}).toArray();

	for (const user of staff) {
		await db.collection("users").updateOne(
			{ _id: user._id },
			{
				$set: {
					about: user.about,
					socials: user.social,
					...(user.category == "Team"
						? {
								developer: true,
								botModerator: true,
								moderator: true,
								modManager: true,
						  }
						: {}),
					...(user.category == "Support Moderators"
						? { moderator: true }
						: {}),
					...(user.category == "Bot Moderators"
						? { botModerator: true, moderator: true }
						: {}),
					...(user.category == "Honorable Mentions"
						? { honorable: true }
						: {}),
					...([
						"266432078222983169",
						"371659212025233422",
						"327272032863649793",
						"675855839369625631",
					].includes(user._id)
						? { modManager: true }
						: {}),
				},
			}
		);
	}
	// await db.collection("staff").drop(); TODO

	// Create indexes
	await db.collection("community-posts-upvotes").createIndex({ pID: "text" });
	await db
		.collection("community-posts-comments")
		.createIndex({ pID: "text" });

	process.exit();
};

migration();
