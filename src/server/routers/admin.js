const { Router } = require('express');
const router = Router();
const db = require('../util/db.js');

router.use((req, res, next) => {
	if (!req.session.user || !req.session.user.isAdmin) return res.status(401).send('No admin for you, tsk tsk tsk');
  	next();
});

router.get('/staff', async(req, res) => {
	if(!req.query.id) return res.status(400).send();
	try {
		let exist = await db.collection('staff').findOne({ _id: req.query.id });
		if(!exist) return res.status(404).send();
		return res.status(200).send();
	} catch (e) {
		return res.status(500).send();
	}
});

router.put('/staff', async(req, res) => {
	try {
		await db.collection('staff').updateOne({ _id: req.session.user.id }, {
			$set: {
				avatar: req.body.avatar,
				about: req.body.about,
				social: req.body.socials
			}
		});
		return res.status(200).send();
	} catch (e) {
		return res.status(500).send();
	}
});

router.post('/staff', async(req, res) => {
	if(!req.query || !req.query.id || !req.query.category) return res.status(400).json({ message: 'Missing search parameters.' });
	try {
		await db.collection('staff').insertOne({ 
			_id: req.query.id,
			category: req.query.category,
			name: '',
			about: '',
			avatar: '',
			social: {}
		});
		return res.status(200).send();
	} catch (e) {
		return res.status(500).send();
	}
});

router.delete('/staff', async(req, res) => {
	if(!req.query || !req.query.id) return res.status(400).json({ message: 'Missing search parameters.' });
	try {
		await db.collection('staff').deleteOne({ _id: req.query.id });
		return res.status(200).send();
	} catch (e) {
		return res.status(500).send();
	}
});

router.post('/ban', (req, res) => {
	if(!req.body || !req.body.id || !req.body.type) res.status(400).json({ message: "Something is wrong, I can feel it." })
  	db.collection('bans').insertOne(req.body);
  	res.status(200).send();
});

router.post('/unban', (req, res) => {
	if(!req.body || !req.body.id || !req.body.type) res.status(400).json({ message: "Something is wrong, I can feel it." })
  	db.collection('bans').remove(req.body);
  	res.status(200).send();
});

router.get('/checkBan', async (req, res) => {
	let { type, id } = req.query;
	if (!type || !id) return res.status(400).send('Missing type or id querystring parameter');

  	let bans = await db.collection('bans').find({ id, ...(type.toLowerCase() == 'any' ? {} : { type }) }).toArray();

	res.status(200).json(bans.map(entry => entry.type));
});

router.get('/findTransaction', async (req, res) => {
  	const dbQuery = {};

  	for (const [ query, value ] of Object.entries(req.query)) {
    	const valueRX = RegExp(value, 'i');

    	switch (query) {
      		case 'Discord ID':
        		dbQuery['payer.userID'] = valueRX;
        		break;
      		case 'PayPal E-Mail':
        		dbQuery['payer.paypalEmail'] = valueRX;
        		break;
      		case 'Full Name':
        		dbQuery['payer.name'] = valueRX;
        		break;
      		case 'Payment ID':
        		dbQuery['$or'] = [{ captureID: valueRX }, { orderID: valueRX }];
    	}
  	}

	try {
		if(Object.keys(dbQuery).length === 0) return res.status(500).json({ message: "This is not right." })

		const purchase = await db.collection('purchases').find(dbQuery).toArray();
		if(!purchase[0]) res.status(204).json({ message: "No purchase found with that information." })
		else res.status(200).json(purchase);
	} catch (e) {
		return res.status(500).json({ message: "This is not right." });
	}
});

router.post('/blogs', async (req, res) => {
	try {
		await db.collection('blogs').updateOne({ _id: req.body.id }, { $set: {
			_id: req.body.id,
			name: req.body.name,
			date: req.body.date || new Date().getTime(),
			author: req.body.author,
			desc: req.body.desc,
			content: req.body.content
		}}, { upsert: true });
		return res.status(200).send();
	} catch (e) {
		return res.status(500).send(e);
	}
});

router.delete('/blogs', async(req, res) => {
	try {
		await db.collection('blogs').deleteOne({ '_id': req.query.id });
		return res.status(200).send();
	} catch (e) {
		return res.status(500).send();
	}
});

router.post('/discount', async(req, res) => {
	let { id: percentage,  type: expiry } = req.body;
	try {
		await db.collection('discounts').insertOne({
			percent: percentage / 100,
			name: '',
			expiry: Date.now() + (parseInt(expiry) * 3600 * 1000) // Current date + hours in milliseconds of sale
		});
		return res.status(200).json({ message: "Discount set!" });
	} catch (e) {
		res.status(500).json({ error: e })
	}
});

router.post('/announcement', async(req, res) => {
	let { id: content } = req.body;
	try {
		let announcements = await db.collection('announcements').find({}).toArray();
		let _id = announcements.filter(announcement => announcement._id === -1) ? announcements.length : announcements.length + 1
		await db.collection('announcements').insertOne({
			_id,
			content: content,
			createdAt: new Date().getTime()
		});
		return res.status(200).json({ message: "Announcement made" });
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.delete('/announcement', async(req, res) => {
	try {
		await db.collection('announcements').deleteOne({ _id: -1 });
		await db.collection('announcements').insertOne({
			_id: -1,
			content: "Placeholder announcement. This is being used to hide the announcement banner.",
			createdAt: new Date().getTime()
		});
		return res.status(200).json({ message: "Announcement cleared" });
	} catch (e) {
		res.status(500).json({ error: e });
	}
})

module.exports = router;
