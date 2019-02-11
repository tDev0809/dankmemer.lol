const { Router } = require('express');

const dataDog = require('../datadog.js');
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

module.exports = router;
