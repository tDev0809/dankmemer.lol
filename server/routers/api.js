const { Router } = require('express');

const dataDog = require('../datadog.js');
const keys = require('../../keys.json');
const { writeFileSync } = require('fs');
const router = Router();

router.post('/cmds', (req, res) => {
  if (keys.includes(req.headers.authorization)) {
    console.log(req.body.commands);
    fs.writeFileSync(`${__dirname}/../build/static/commands.json`, JSON.stringify(req.body.commands, '', '  '));
    commands = req.body.commands;
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(401).json({ error: 'Get away you sick filth.' });
  }
});

module.exports = router;
