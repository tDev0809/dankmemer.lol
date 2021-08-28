const { Router } = require('express');
const router = Router();
const db = require('../util/db.js');
const items = require('../data/items.json');
const feedbackCategories = require('../data/feedbackCategories.json');
const recentPosts = new Set();
const config = require('../../../config.json');
const axios = require('axios');
const { toTitleCase } = require("../util/string.js");

function generateReadableID () {
	return [
		items[Math.floor(Math.random()*items.length)],
		items[Math.floor(Math.random()*items.length)],
		items[Math.floor(Math.random()*items.length)],
		items[Math.floor(Math.random()*items.length)],
	].join("-");
}

function hot (date, upvotes) {
	const DAY = 86400000;
	const THREE_DAYS = DAY * 3;
	const WEEK = DAY * 7;
	const MONTH = DAY * 31;
	const YEAR = MONTH * 12;

	return (1e9 * Math.max((1 - ((Date.now() - date) / THREE_DAYS)), 0)) +
		   (1e6 * Math.max((1 - ((Date.now() - date) / WEEK)), 0)) +
		   (1e4 * Math.max((1 - ((Date.now() - date) / MONTH)), 0)) +
		   (upvotes * Math.max((1 - ((Date.now() - date) / YEAR)), 0));
}

router.use((req, res, next) => {
  	next();
});

router.get('/categories', (req, res) => {
	res.json(feedbackCategories);
});

router.get('/categoriesCount', async (req, res) => {
	const count = {};

	for (const category of feedbackCategories) {
		let result = await db
			.collection("feedback_posts")
			.find({category})
			.count();
		count[category] = result || 0;
	}
	
	return res.json(count);
});

router.get('/posts/:category', async (req, res) => {
	const { category } = req.params;
	const { user } = req.session;
	
	if (!category && !feedbackCategories.includes(category)) {
		return res.status(500).json({ message: 'This category does not exist.' });
	}
	const from = Number(req.query.from) || 0;
	const amount = Number(req.query.amount) || 10;
	
	const posts = await db
		.collection("feedback_posts")
		.aggregate([
			{
				$match: category === "all" 
					? {_id: {$ne: ""}}
					: {category: category}
			}, {
				$lookup: {
					from: "feedback_upvotes",
					localField: "_id",
					foreignField: "pID",
					as: "upvotedUsers"
				}
			}, {
				$addFields: {
					upvotes: {$size: "$upvotedUsers"}
				},
			}, {
				$addFields: {
					upvotedUser: user 
						? {
							$filter: {
								input: "$upvotedUsers",
								as: "up",
								cond: {
									$eq: ["$$up.uID", user.id]
								}
							}
						} 
						: []
				},
			}, {
				$addFields: {
					upvoted: {$ne: [{$size: "$upvotedUser"}, 0]}
				},
			}, { 
				$unset: ["upvotedUsers", "upvotedUser"]
			}, {
				$sort: {
					upvotes: -1
				}
			}, {
				$skip: from
			}, {
				$limit: amount
			}
			
		])
		.toArray();
		
	return res.json({posts: posts, all: posts.length == 0 || posts.length < amount});
});

router.get('/post/:id', async (req, res) => {
	const { id } = req.params;
	const { user } = req.session;
	
	const post = await db
		.collection("feedback_posts")
		.findOne({
			_id: id
		});

	if (!post) {
		return res.status(500).json({ message: 'This post does not exist.' });
	}

	const upvotes = await db
		.collection("feedback_upvotes")
		.find({
			pID: id
		})
		.count();

	const upvoted = await db
		.collection("feedback_upvotes")
		.find({
			pID: id,
			uID: user?.id || ""
		})
		.count();

	post.upvotes = upvotes;
	post.upvoted = !!upvoted;

	return res.json({post});
});

router.delete('/post/:id', async (req, res) => {
	const { id } = req.params;
	const { user } = req.session;
	
	if (!id) {
		return res.status(500).json({ message: 'This post does not exist.' });
	}

	let post = await db
		.collection("feedback_posts")
		.aggregate([
			{
				$match: {_id: id}
			}, {
				$lookup: {
					from: "feedback_upvotes",
					localField: "_id",
					foreignField: "pID",
					as: "upvotedUsers"
				}
			}, {
				$addFields: {
					upvotes: {$size: "$upvotedUsers"}
				},
			}, { 
				$unset: ["upvotedUsers"]
			}
			
		])
		.toArray();

	post = post[0]

	if (!post) {
		return res.status(500).json({ message: 'This post does not exist.' });
	}

	if (!user) {
		return res.status(401).json({ error: 'Get away you sick filth.' });
	}

	if (!user.isAdmin && !user.isModerator && user.id !== post.author.id) {
		return res.status(401).json({ error: 'It\'s not your post.' });
	}


	await db
		.collection("feedback_posts")
		.deleteOne({_id: id});

	const webhook = config.FeedbackWebhook

	await axios.post(`https://discord.com/api/webhooks/${webhook.webhookID}/${webhook.webhook_token}?wait=true`, {
		embeds: [{
			title: `Post Deleted`,
			color: 0xBD3540,
			timestamp: new Date(),
			fields: [{
				name: 'Author',
				value: `${post.author.username}#${post.author.discriminator}\n(<@${post.author.id}> | ${post.author.id})`,
				inline: true
			}, {
				name: 'Category',
				value: toTitleCase(post.category),
				inline: true
			}, {
				name: 'Upvotes',
				value: post.upvotes,
				inline: true
			}, {
				name: 'Title',
				value: post.title,
				inline: false
			},
			{
				name: 'Description',
				value: post.description,
				inline: false
			}, 
			{
				name: 'Deleted By',
				value: `${user.username}#${user.discriminator}\n(<@${user.id}> | ${user.id})`,
				inline: false,
			}]
		}]
	}, {
		headers: { 'Content-Type': 'application/json' }
	});
		
	return res.status(200).send();

});


router.patch('/post/upvote/:id', async (req, res) => {
	const { user } = req.session;
	const { id } = req.params;

	if (!id) {
		return res.status(500).json({ message: 'This post does not exist.' });
	}

	if (!user) {
		return res.status(401).json({ error: 'Get away you sick filth.' });
	}

	const post = await db
		.collection("feedback_posts")
		.findOne({
			_id: id
		});


	if (!post) {
		return res.status(500).json({ message: 'This post does not exist.' });
	}

	const upvote = await db
		.collection("feedback_upvotes")
		.findOne({
			pID: id
		});

	if (!upvote) {
		await db
			.collection("feedback_upvotes")
			.insertOne({
				uID: user.id,
				pID: id
			})
		res.status(200).json({upvote: 1});
	} else {
		await db
		.collection("feedback_upvotes")
		.deleteOne({
			uID: user.id,
			pID: id
		})
		await res.status(200).json({upvote: -1});
	}

});

router.post('/post', async (req, res) => {
	const { user } = req.session;

  	if (!user) {
		return res.status(401).json({ error: 'Get away you sick filth.' });
	}
  	if (recentPosts.has(user.id)) {
		return res.status(429).json({ error: 'You\'re doing that too often.' });
	}
  	if (!req.body.title || !req.body.description || !req.body.category || !feedbackCategories.includes(req.body.category)) {
	  	return res.status(400).json({ error: 'Malformed body' });
	}

	if (!user.isAdmin) {
		recentPosts.add(user.id);
		setTimeout(() => recentPosts.delete(user.id), 5 * 60 * 1000);
	}

	let readableID = generateReadableID();

	while (true) {
		const exist = await db.collection("feedback_posts").findOne({readableID});
		if (!exist) {
			break;
		}
		readableID = generateReadableID();
	}

	const post = await db
		.collection("feedback_posts")
		.insertOne({ 
			_id: readableID, 
			title: req.body.title,
			description: req.body.description,
			category: req.body.category,
			createdAt: Date.now(),
			author: {
				id: user.id,
				discriminator: user.discriminator,
				username: user.username,
			}	
		});

		const webhook = config.FeedbackWebhook

	await db
		.collection("feedback_upvotes")
		.insertOne({
			uID: user.id,
			pID: readableID
		})

	await axios.post(`https://discord.com/api/webhooks/${webhook.webhookID}/${webhook.webhook_token}?wait=true`, {
		embeds: [{
			title: `New Post`,
			color: 0x39923c,
			timestamp: new Date(),
			fields: [{
				name: 'Author',
				value: `${user.username}#${user.discriminator}\n(<@${user.id}> | ${user.id})`,
				inline: true
			}, {
				name: 'Category',
				value: req.body.category,
				inline: true
			}, {
				name: 'Title',
				value: req.body.title,
				inline: false
			}, {
				name: 'Description',
				value: req.body.description,
				inline: false
			},  {
				name: 'Link',
				value: `${config.domain}/feedback/p/${readableID}`,
				inline: false,
			}]
		}]
	}, {
		headers: { 'Content-Type': 'application/json' }
	});

	await res.status(200).json({id: post.insertedId});
});

module.exports = router;
