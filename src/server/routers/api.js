const { Router } = require('express');
const { writeFileSync } = require('fs');
const keys = require('../../../keys.json');
const adminRouter = require('./admin.js');
const config = require('../../../config.json');
const boxes = require('../data/boxes.json');
const blockedCountries = require('../data/blockedCountries.json');
const router = Router();
const db = require('../util/db.js');
const blogs = require('../util/blogs.js');
const axios = require('axios');
const recentAppeals = new Set();
const recentReports = new Set();
const path = require('path');

router.post('/cmds', (req, res) => {
  if (keys.includes(req.headers.authorization)) {
    writeFileSync(
      path.resolve(__dirname, '..', '..', 'app', 'Pages', 'Commands', 'commands.json'),
      JSON.stringify(req.body.commands)
    );
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(401).json({ error: 'Get away you sick filth.' });
  }
});

router.get('/isBanned', async (req, res) => {
  if (await db.collection('bans').findOne({
    type: 'lootbox',
    id: req.session.user && req.session.user.id
  })) {
    res.status(403).send();
  } else {
    res.status(200).send();
  }
});

router.post('/appeal', async (req, res) => {
  	const { user } = req.session;

	if (!user) return res.status(401).json({ error: 'Get away you sick filth.' });
	if (await db.collection('bans').findOne({ type: 'appeal', id: user.id })) return res.status(403).json({ error: 'Get away you sick filth.' });
	if (recentAppeals.has(user.id)) return res.status(429).json({ error: 'You\'re doing that too often.' });
	if (!req.body.banType || !req.body.content) return res.status(400).json({ error: 'Malformed body' });

	recentAppeals.add(user.id);
	setTimeout(() => recentAppeals.delete(user.id), 30 * 60 * 1000);

	const webhook = config[req.body.banType === 'server' ? 'cmAppealsWebhook' : 'devAppealsWebhook'];

	try {
		await axios.post(`https://discord.com/api/webhooks/${webhook.webhookID}/${webhook.webhook_token}?wait=true`, {
			embeds: [{
				title: `Appealing a ${req.body.banType} ban`,
			  	color: 0x39923c,
				timestamp: new Date(),
				fields: [{
					name: `Banned user`,
					value: `${user.username}#${user.discriminator} (<@${user.id}> | ${user.id})`
				}, {
					name: 'Rules that were broken',
					value: req.body.rules.map((rule) => `• ${rule}`).join("\n")
				}, {
					name: 'Appeal content',
					value: req.body.content.slice(0, 1023)
				}]
			}]
			}, {
			headers: {
				'Content-Type': 'application/json'
			}
			}
		);
  
	  await res.status(200).send();
	} catch ({ response }) {
		console.error(`${response.statusText}: ${JSON.stringify(response.data)}`);
		await res.status(500).send();
	}
});

router.post('/report', async (req, res) => {
  	const { user } = req.session;
	const { reporting } = req.body;

	if (!user) return res.status(401).json({ error: 'Get away you sick filth.' });
	if (await db.collection('bans').findOne({ type: 'report', id: user.id })) return res.status(403).json({ error: 'Get away you sick filth.' });
	if (recentReports.has(user.id)) return res.status(429).json({ error: 'You\'re doing that too often.' });
	if (!req.body.reportType || !req.body.content) return res.status(400).json({ error: 'Malformed body' });

	recentReports.add(user.id);
	setTimeout(() => recentReports.delete(user.id), 10 * 60 * 1000);

	const webhook = config[req.body.banType === 'server' ? 'cmAppealsWebhook' : 'devReportWebhook'];

	try {
		await axios.post(`https://discord.com/api/webhooks/${webhook.webhookID}/${webhook.webhook_token}?wait=true`, {
			embeds: [{
				title: `Reporting a ${req.body.reportType}`,
				color: 0x39923c,
				timestamp: new Date(),
				  fields: [{
					name: 'Reporter',
					value: `${user.username}#${user.discriminator}\n(<@${user.id}> | ${user.id})`,
					inline: true
				  }, {
					name: 'Reported',
					value: reporting,
					inline: true
				  }, {
					name: 'Rules that were broken',
					value: req.body.rules.map((rule) => `• ${rule}`).join("\n")
				}, {
					name: 'Report content',
					value: req.body.content.slice(0, 1023)
				}]
			}]
		}, {
			headers: { 'Content-Type': 'application/json' }
		});
	
		await res.status(200).send();
	} catch ({ response }) {
		console.error(`${response.statusText}: ${JSON.stringify(response.data)}`);
		await res.status(500).send();
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

router.use('/admin', adminRouter);

router.get('/blogs', (req, res) =>
  res.json(blogs.map(blog => ({
    id: blog.id,
    name: blog.name,
    date: blog.date,
    thumbnail: blog.thumbnail,
    image: blog.image,
    author: blog.author,
    desc: blog.desc
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
