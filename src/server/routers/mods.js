const { Router } = require('express');
const router = Router();
const db = require('../util/db.js');

router.use((req, res, next) => {
	if (!req.session.user || !req.session.user.isModerator) return res.status(401).send('No mod for you, tsk tsk tsk');
  	next();
});

router.put('/staff', async(req, res) => {
	try {
		await db.collection('staff').updateOne({ _id: req.session.user.id }, {
			$set: {
				about: req.body.about,
				social: req.body.socials
			}
		});
		return res.status(200).send();
	} catch (e) {
		return res.status(500).send();
	}
});

router.get('/checkBan', async (req, res) => {
  	const { type, id } = req.query;
  	if (!type || !id) return res.status(400).send('Missing type or id querystring parameter');

  	res.status(200).json(
		await db.collection('bans').find({ id, ...(type === 'any' ? {} : { type }) }).toArray()
    	.then(res => res.map(entry => entry.type)));
});

module.exports = router;
