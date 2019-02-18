const { Router } = require('express');

const BLOCKED_COUNTRIES = [
  'BE'
];

const keys = require('../../keys.json');
const { writeFileSync } = require('fs');
const router = Router();

router.post('/cmds', (req, res) => {
  if (keys.includes(req.headers.authorization)) {
    writeFileSync(`${__dirname}/../build/static/commands.json`, JSON.stringify(req.body.commands, '', '  '));
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
