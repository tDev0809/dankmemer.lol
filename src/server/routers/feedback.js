const { Router } = require('express');
const router = Router();
const db = require('../util/db.js');
const items = require('../data/items.json');
const feedbackCategories = require('../data/feedbackCategories.json');
const recentPosts = new Set();
const recentUpvotes = new Set(); // TODO: move to redis one day, maybe in rewrite
const recentComments = new Set();
const config = require('../../../config.json');
const axios = require('axios');
const { toTitleCase } = require("../util/string.js");
const { ObjectId } = require('mongodb');

const LABEL_FILTERS = [
    "all posts",
    "accepted",
    "implemented",
    "duplicate",
    "denied",
	"invalid"
];

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
	const staff = user?.isAdmin || user?.isModerator

	if (!category && !feedbackCategories.includes(category)) {
		return res.status(500).json({ message: 'This category does not exist.' });
	}

	const from = Number(req.query.from) || 0;
	const amount = Number(req.query.amount) || 10;
	const sorting = req.query.sorting || "Hot";
	let filter = req.query.filter || "all posts"

	if (!LABEL_FILTERS.includes(filter)) {
		filter = "all posts" 
	}

	const posts = await db
		.collection("feedback_posts")
		.aggregate([
			{
				$match: category === "all" 
					? {
						_id: {$ne: ""}
					}
					: {
						category: category,
						label: filter === "all posts"
							? {$ne: "."}
							: filter 
					}
			}, {
				$lookup: {
					from: "feedback_upvotes",
					localField: "_id",
					foreignField: "pID",
					as: "upvotedUsers"
				}
			},  {
				$lookup: {
					from: "feedback_comments",
					localField: "_id",
					foreignField: "pID",
					as: "commentsData"
				}
			}, {
				$addFields: {
					upvotes: {$size: "$upvotedUsers"},
					comments: {$size: "$commentsData"},
					bad: {$or: [{$eq: ["$label", "invalid"]}, {$eq: ["$label", "duplicate"]}]},
					denyInt: {$cond: [{$eq: ["$label", "denied"]}, -1, 1]} 
				},
			}, {
				$addFields: {
					order: {
						$ln: {
							$divide: [
								{ $add: ["$upvotes", 1] },
								2.302585092994046
							]
						}
					},
				},
			}, {
				$addFields: {
					hot: {
						$divide: [
							{ $round: [
								{ $multiply: [
									{ $add: [
										{ $ln: {
												$divide: [
													{ $add: ["$upvotes", 1] },
													2.302585092994046
												]
											}
										} , 
										{ $divide: [
											{ $subtract: [
												{ $divide: [
													"$createdAt",
													1000
												] },
												1631640684
											] },
											45000
										] }
									] },
									10000000
								] },
								7
							] },
							10000000
						]
					}
				}
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
					developerComments: {
						$filter: {
							input: "$commentsData",
							as: "cm",
							cond: {
								$eq: ["$$cm.author.developer", true]
							}
						}
					}
				}
			}, {
				$addFields: {
					upvoted: {$ne: [{$size: "$upvotedUser"}, 0]},
					developerResponse: {$ne: [{$size: "$developerComments"}, 0]},
					show: { $or: [
						staff ? true : {$eq: ["$bad", false]},
						{$eq: ["$author.id", user?.id]}
					]},
				},
			}, { 
				$unset: ["upvotedUsers", "upvotedUser", "commentsData", "developerComments"]
			}, {
				$sort: sorting === "Top"
					? { upvotes: -1, createdAt: -1, }
					: (sorting === "New"
						? { createdAt: -1 }
						: (sorting === "Hot"
							? { denyInt: -1, hot: -1, createdAt: -1}
							: { createdAt: 1 }
						)
					)
			}, {
				$match: {show: true}
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
				$lookup: {
					from: "feedback_comments",
					localField: "_id",
					foreignField: "pID",
					as: "commentsData"
				}
			},
			{
				$addFields: {
					upvotes: {$size: "$upvotedUsers"},
					comments: {$size: "$commentsData"},
					bad: {$or: [{$eq: ["$label", "invalid"]}, {$eq: ["$label", "duplicate"]}]}
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
					developerComments: {
						$filter: {
							input: "$commentsData",
							as: "cm",
							cond: {
								$eq: ["$$cm.author.developer", true]
							}
						}
					}
				}
			}, {
				$addFields: {
					upvoted: {$ne: [{$size: "$upvotedUser"}, 0]},
					developerResponse: {$ne: [{$size: "$developerComments"}, 0]}
				},
			}, { 
				$unset: ["upvotedUsers", "upvotedUser", "commentsData", "developerComments"]
			}, {
				$sort: {
					upvotes: -1
				}
			}	
		])
		.toArray();

	post = post[0];

	if (!post) {
		return res.status(500).json({ message: 'This post does not exist.' });
	}

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

	await db
		.collection("feedback_upvotes")
		.deleteMany({pID: id});

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

	if (recentUpvotes.has(user.id)) {
		return res.status(429).json({ error: 'You\'re doing that too often.' });
	}

	recentUpvotes.add(user.id);
	setTimeout(() => recentUpvotes.delete(user.id), 2 * 1000);

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
			pID: id,
			uID: user.id
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

router.patch('/post/label/:id', async (req, res) => {
	const { user } = req.session;
	const { id } = req.params;
	const label = req.query.label || "";

	if (!id) {
		return res.status(500).json({ message: 'This post does not exist.' });
	}

	if (!user || (!user.isAdmin && !user.isModerator)) {
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

	await db
		.collection("feedback_posts")
		.updateOne({
			_id: id
		}, {
			$set: {label}
		});

	await res.status(200).json({label});

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

	const accountCreated = new Date(Number(BigInt(user.id) >> 22n) + 1420070400000);

	if (Date.now() - accountCreated.getTime() < (1000 * 60 * 60 * 24 * 30 * 3)) {
		return res.status(406).json({ error: 'Your account is too new to post feedback.' });
	}

	const ban = await db
		.collection("bans")
		.findOne({id: user.id, type: "Feedback"});

	if (ban) {
		return res.status(403).json({ error: 'You are banned from posting feedback.' });
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

router.post('/comment', async (req, res) => {
	const { user } = req.session;

  	if (!user) {
		return res.status(401).json({ error: 'Get away you sick filth.' });
	}
  	if (recentComments.has(user.id)) {
		return res.status(429).json({ error: 'You\'re doing that too often.' });
	}
  	if (!req.body.comment || !req.body.id) {
	  	return res.status(400).json({ error: 'Malformed body' });
	}

	const post = await db
		.collection("feedback_posts")
		.findOne({
			_id: req.body.id
		});

	if (!post) {
		return res.status(500).json({ message: 'This post does not exist.' });
	}

	const accountCreated = new Date(Number(BigInt(user.id) >> 22n) + 1420070400000);

	if (Date.now() - accountCreated.getTime() < (1000 * 60 * 60 * 24 * 30 * 3)) {
		return res.status(406).json({ error: 'Your account is too new to post a comment.' });
	}

	const ban = await db
		.collection("bans")
		.findOne({id: user.id, type: "Feedback"});

	if (ban) {
		return res.status(403).json({ error: 'You are banned from posting comments.' });
	}

	if (!user.isAdmin) {
		recentComments.add(user.id);
		setTimeout(() => recentComments.delete(user.id), 5 * 60 * 1000);
	}


	const comment = await db
		.collection("feedback_comments")
		.insertOne({ 
			pID: req.body.id,
			comment: req.body.comment,
			createdAt: Date.now(),
			author: {
				id: user.id,
				discriminator: user.discriminator,
				username: user.username,
				developer: user.isAdmin,
				moderator: user.isModerator
			}	
		});

	const webhook = config.FeedbackWebhook

	await axios.post(`https://discord.com/api/webhooks/${webhook.webhookID}/${webhook.webhook_token}?wait=true`, {
		embeds: [{
			title: `New Comment`,
			color: 0x4287f5,
			timestamp: new Date(),
			fields: [{
				name: 'Author',
				value: `${user.username}#${user.discriminator}\n(<@${user.id}> | ${user.id})`,
				inline: true
			}, {
				name: 'Comment',
				value: req.body.comment,
				inline: false
			}, {
				name: 'Link',
				value: `${config.domain}/feedback/p/${req.body.id}`,
				inline: false,
			}]
		}]
	}, {
		headers: { 'Content-Type': 'application/json' }
	});

	await res.status(200).json({});
});

router.delete('/comment/:id', async (req, res) => {
	const { id } = req.params;
	const { user } = req.session;
	
	if (!id) {
		return res.status(500).json({ message: 'This comment does not exist.' });
	}
	
	const comment = await db
		.collection("feedback_comments")
		.findOne({_id: ObjectId(id)});
	
	if (!comment) {
		return res.status(500).json({ message: 'This comment does not exist.' });
	}

	if (comment.deleted) {
		return res.status(500).json({ message: 'This comment was already deleted.' });
	}

	if (!user) {
		return res.status(401).json({ error: 'Get away you sick filth.' });
	}

	if (!user.isAdmin && !user.isModerator && user.id !== comment.author.id) {
		return res.status(401).json({ error: 'It\'s not your comment.' });
	}

	await db
		.collection("feedback_comments")
		.updateOne({_id: ObjectId(id)}, {
			$set: {
				comment: "[deleted]",
				author: {
					id: "[deleted]",
					discriminator: "0000",
					username: "[deleted]"
				},
				deleted: true
			}
		});

	const webhook = config.FeedbackWebhook

	await axios.post(`https://discord.com/api/webhooks/${webhook.webhookID}/${webhook.webhook_token}?wait=true`, {
		embeds: [{
			title: `Comment Deleted`,
			color: 0xBD3540,
			timestamp: new Date(),
			fields: [{
				name: 'Author',
				value: `${comment.author.username}#${comment.author.discriminator}\n(<@${comment.author.id}> | ${comment.author.id})`,
				inline: true
			}, {
				name: 'Comment',
				value: comment.comment,
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

router.get('/comments/:id', async (req, res) => {
	const { id } = req.params;
	
	const post = await db
		.collection("feedback_posts")
		.findOne({
			_id: id
		});

	if (!post) {
		return res.status(500).json({ message: 'This post does not exist.' });
	}

	const from = Number(req.query.from) || 0;
	const amount = Number(req.query.amount) || 10;
	
	const comments = await db
		.collection("feedback_comments")
		.aggregate([
			{
				$match: {
					pID: id
				}
			}, {
				$sort: {
					createdAt: 1
				}
			}, {
				$skip: from
			}, {
				$limit: amount
			}
			
		])
		.toArray();
		
	return res.json({comments: comments, all: comments.length == 0 || comments.length < amount});
});

module.exports = router;
