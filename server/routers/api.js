const { Router } = require('express');
const { writeFileSync } = require('fs');
const keys = require('../../keys.json');
const boxes = require('../data/boxes.json');
const blockedCountries = require('../data/blockedCountries.json');
const router = Router();

router.post('/cmds', (req, res) => {
  if (keys.includes(req.headers.authorization)) {
    writeFileSync(`${__dirname}/../root/commands.json`, JSON.stringify(req.body.commands));
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(401).json({ error: 'Get away you sick filth.' });
  }
});

router.post('/webhook', (req, res) => { // TODO: Finish webhook endpoint, make it secure, then test it via axios before starting pages using it
  if (req.session.user) {
    console.log(req.body);
    axios.post(
      `https://discordapp.com/api/webhooks/${config.webhookID}/${config.webhook_token}?wait=true`, { embeds: [ {
        title: req.body.title,
        description: req.body.description,
        color: 0x71f23e
      } ] }, {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    res.status(200);
  } else {
    res.status(401).json({ error: 'Get away you sick filth.' });
  }
});

router.get('/country', (req, res) => {
  const country = req.headers[ 'cf-ipcountry' ];
  return res.json({
    country,
    isBlocked: blockedCountries.includes(country)
  });
});

router.get('/boxes', (req, res) => {
  res.json(boxes);
});

router.get('/admin/data/', (req, res) => {
  if (req.session.user && req.session.user.id === '172571295077105664') {
    res.status(200).json({
      test: '6969'
    });
  } else {
    res.status(401).json({ message: 'No admin for you, tsk tsk tsk' });
  }
});

module.exports = router;
