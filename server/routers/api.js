const { Router } = require('express');

const BLOCKED_COUNTRIES = [
  'BE'
];

const keys = require('../../keys.json');
const { writeFileSync } = require('fs');
const router = Router();

router.post('/cmds', (req, res) => {
  if (keys.includes(req.headers.authorization)) {
    console.log(req.body.commands);
    writeFileSync(`${__dirname}/../build/static/commands.json`, JSON.stringify(req.body.commands, '', '  '));
    commands = req.body.commands;
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(401).json({ error: 'Get away you sick filth.' });
  }
});

router.get('/country', (req, res) => {
  const country = req.headers[ 'cf-ipcountry' ];
  return res.json({
    country,
    isBlocked: BLOCKED_COUNTRIES.includes(country)
  });
});

module.exports = router;
