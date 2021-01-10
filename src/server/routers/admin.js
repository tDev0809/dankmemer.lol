const { Router } = require('express');
const router = Router();
const db = require('../util/db.js');

const { admins } = require('../../../config.json');

router.use((req, res, next) => {
	if (!req.session.user || !admins.includes(req.session.user.id)) return res.status(401).send('No admin for you, tsk tsk tsk');
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

router.post('/ban', (req, res) => {
  	db.collection('bans').insertOne(req.body);
  	res.status(200).send();
});

router.post('/unban', (req, res) => {
  	db.collection('bans').remove(req.body);
  	res.status(200).send();
});

router.get('/checkBan', async (req, res) => {
  	const { type, id } = req.query;
  	if (!type || !id) return res.status(400).send('Missing type or id querystring parameter');

  	res.status(200).json(
		await db.collection('bans').find({ id, ...(type === 'any' ? {} : { type }) }).toArray()
    	.then(res => res.map(entry => entry.type)));
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

  	res.status(200).json(await db.collection('purchases').find(dbQuery).toArray());
});

module.exports = router;
