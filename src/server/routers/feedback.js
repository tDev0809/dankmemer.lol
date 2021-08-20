const { Router } = require('express');
const router = Router();
const db = require('../util/db.js');
const items = require('../data/items.json');
const feedbackCategories = require('../data/feedbackCategories.json');
const recentPosts = new Set();

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
			.collection("feedback")
			.find({category})
			.count();
		count[category] = result || 0;
	}
	
	return res.json(count);
});

router.get('/posts/:category', async (req, res) => {
	const { category } = req.params;
	if (!category && !feedbackCategories.includes(category)) {
		return res.status(500).json({ message: 'This category does not exist.' });
	}
	const from = Number(req.query.from) || 0;
	const amount = Number(req.query.amount) || 10;
	
	const posts = await db
		.collection("feedback")
		.find({
			category: category,
		})
		.sort({upvotes: -1})
		.skip(from)
		.limit(amount)
		.toArray();
		
	return res.json({posts: posts, all: posts.length == 0 || posts.length < amount});
});

router.get('/post/:id', async (req, res) => {
	const { id } = req.params;
	
	const post = await db
		.collection("feedback")
		.findOne({
			_id: id
		});

	if (!post) {
		return res.status(500).json({ message: 'This post does not exist.' });
	}
		
	return res.json({post});
});

router.delete('/post/:id', async (req, res) => {
	const { id } = req.params;
	const { user } = req.session;
	
	const post = await db
		.collection("feedback")
		.findOne({
			_id: id
		});

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
		.collection("feedback")
		.deleteOne({_id: id});
		
	return res.status(200);
});

router.post('/new', async (req, res) => {
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
		const exist = await db.collection("feedback").findOne({readableID});
		if (!exist) {
			break;
		}
		readableID = generateReadableID();
	}

	const post = await db
		.collection("feedback")
		.insertOne({ 
			_id: readableID, 
			title: req.body.title,
			description: req.body.description,
			category: req.body.category,
			createdAt: Date.now(),
			upvotes: 0,
			author: {
				id: user.id,
				username: user.username,
				avatar: user.avatar
			}	
		});

	await res.status(200).json({id: post.insertedId});
});

module.exports = router;
