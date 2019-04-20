const { Router } = require('express');
const { writeFileSync } = require('fs');
const keys = require('../../../keys.json');
const config = require('../../../config.json');
const boxes = require('../data/boxes.json');
const blockedCountries = require('../data/blockedCountries.json');
const router = Router();
const db = require('../util/db.js');
const blogs = require('../util/blogs.js');
const axios = require('axios');
const recentAppeals = new Set();

router.post('/cmds', (req, res) => {
  if (keys.includes(req.headers.authorization)) {
    writeFileSync(`${__dirname}/../root/commands.json`, JSON.stringify(req.body.commands));
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(401).json({ error: 'Get away you sick filth.' });
  }
});

router.post('/appeal', async (req, res) => {
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({ error: 'Get away you sick filth.' });
  }
  if (recentAppeals.has(user.id)) {
    return res.status(429).json({ error: 'You\'re doing that too often.' });
  }
  if (!req.body.banType || !req.body.body) {
    return res.status(400).json({ error: 'Malformed body' });
  }

  recentAppeals.add(user.id);
  setTimeout(() => recentAppeals.delete(user.id), 30 * 60 * 1000);

  await axios.post(
    `https://discordapp.com/api/webhooks/${config.webhookID}/${config.webhook_token}?wait=true`, { embeds: [ {
      title: `${req.body.banType} Appeal`,
      fields: [ {
        name: 'User',
        value: `${user.username}#${user.discriminator} (<@${user.id}> | ${user.id})`
      }, {
        name: 'Broken Rules',
        value: req.body.rules.join('\n')
      }, {
        name: 'Appeal',
        value: req.body.body
      } ],
      color: 0x71f23e,
      timestamp: new Date()
    } ] }, {
      headers: { 'Content-Type': 'application/json' }
    }
  );

  await res.status(200).send();
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

router.get('/discount', async (req, res) => {
  const discount = await db.collection('discounts').findOne({
    expiry: { $gt: Date.now() }
  });
  if (discount) {
    res.json({
      percent: discount.percent,
      name: discount.name || '',
      expiry: discount.expiry
    });
  } else {
    res.json(null);
  }
})

router.get('/admin/data/', (req, res) => {
  if (req.session.user && req.session.user.id === '172571295077105664') {
    res.status(200).json({
      test: '6969'
    });
  } else {
    res.status(401).json({ message: 'No admin for you, tsk tsk tsk' });
  }
});

router.get('/blogs', (req, res) =>
  res.json(blogs.map(blog => ({
    id: blog.id,
    name: blog.name,
    date: blog.date,
    thumbnail: blog.thumbnail
  })))
);

router.get('/blogs/:blogID', (req, res) => {
  const { blogID } = req.params;
  const blog = blogs.find(blog => blog.id === blogID);

  return blog
    ? res.status(200).send(blog)
    : res.status(404).send(`Blog "${blogID}" not found`);
});

module.exports = router;
