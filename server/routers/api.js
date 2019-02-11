const { Router } = require('express');

const dataDog = require('../datadog.js');
const r = require('../db.js')
const keys = require('../../keys.json');
const router = Router();

let commands = {};

router.get('/cmds', (req, res) => {
  res.status(200).send(commands);
  dataDog.increment('website.cmds');
});

router.post('/cmds', (req, res) => {
  if (keys.includes(req.headers.authorization)) {
    console.log(req.body.commands);
    commands = req.body.commands;
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(401).json({ error: 'Get away you sick filth.' });
  }
});

router.get('/stats', async (req, res) => {
  const [ { stats } ] = await r.table('stats');

  res.status(200).json({
    ram: (stats.totalRam / 1024).toFixed(1),
    guilds: stats.guilds.toLocaleString(),
    users: stats.users.toLocaleString()
  });
  dataDog.increment('website.stats');
});

module.exports = router;
