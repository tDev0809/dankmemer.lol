const { Router } = require('express');
const router = Router();
const db = require('../util/db.js');

const { admins } = require('../../../config.json');

router.use((req, res, next) => {
  if (!req.session.user || !admins.includes(req.session.user.id)) {
    return res.status(401).send('No admin for you, tsk tsk tsk');
  }

  next();
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
  if (!type || !id) {
    return res.status(400).send('Missing type or id querystring parameter');
  }

  res.status(200).json(
    await db.collection('bans').find({
      id,
      ...(type === 'any'
        ? {}
        : { type })
    })
      .toArray()
      .then(res => res.map(entry => entry.type))
  );
});

module.exports = router;
