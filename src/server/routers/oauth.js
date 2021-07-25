const { encode, stringify } = require('querystring');
const { get, post } = require('axios');
const { Router } = require('express');
const { encrypt, decrypt } = require('../util/crypt.js');
const db = require('../util/db.js');

const config = require('../../../config.json');
const router = Router();

const OAuthScope = [ 'identify', 'email' ].join(' ');
const OAuthData = encode({
	scope: 'identify',
	response_type: 'code',
	client_id: config.clientID,
	redirect_uri: `${config.domain}/oauth/callback`,
	scope: OAuthScope
});

router.get('/login', (req, res) => {
	req.session.redirect = req.query.redirect;
	res.redirect(`https://discordapp.com/oauth2/authorize?${OAuthData}`);
});

router.get('/callback', async (req, res) => {
	if (!req.query.code) return res.status(404).redirect('/404');

	const { data } = await post('https://discordapp.com/api/v7/oauth2/token', stringify({
		client_id: config.clientID,
		client_secret: config.clientSecret,
		grant_type: 'authorization_code',
		code: req.query.code,
		redirect_uri: `${config.domain}/oauth/callback`
	}), {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

	if (data.scope !== OAuthScope) return res.status(403).send(`Expected scope "${OAuthScope}" but received scope "${data.scope}"`);

	const { data: user } = await get('https://discordapp.com/api/v7/users/@me', {
		headers: {
			'Authorization': `Bearer ${data.access_token}`
		}
	});

	if (user.email === null) return res.status(400).send('Please verify your Discord\'s account E-mail before logging in.');

	const exists = await db.collection('users').countDocuments({ _id: user.id });
	if (exists) {
		db.collection('users').updateOne({ _id: user.id }, {
			$set: {
				email: user.email
			},
			$addToSet: {
				ip: req.headers['cf-connecting-ip']
			}
		});
	} else {
		db.collection('users').insertOne({
			_id: user.id,
			email: user.email,
			ip: [req.headers['cf-connecting-ip']]
		});
	}

	const staffUser = await db.collection('staff').findOne({ _id: user.id });
	if (staffUser) {
		db.collection('staff').updateOne({ _id: user.id }, {
			$set: {
				avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`,
				name: user.username
			}
		});
	}

	req.session.user = {
		...user,
		isModerator: ['Support Moderators', 'Bot Moderators', 'Team', 'Honorable Mentions'].includes(staffUser?.category),
		isAdmin: staffUser?.category === 'Team',
		token: encrypt(user.id)
	};

	res.redirect(req.session.redirect || '/');
});

router.get('/state', (req, res) => {
	return res.json(req.session.user || null);
});

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;