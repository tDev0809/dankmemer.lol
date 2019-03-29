const { encode, stringify } = require('querystring');
const { get, post } = require('axios');
const { Router } = require('express');
const { encrypt, decrypt } = require ('../util/crypt.js');
const db = require('../util/db.js');

const config = require('../../config.json');
const router = Router();

const data = encode({
  scope: 'identify',
  response_type: 'code',
  client_id: config.clientID,
  redirect_uri: `${config.domain}/oauth/callback`,
  scope: [
    'email'
  ].join(' ')
});

router.get('/login', (req, res) => {
  req.session.redirect = req.query.redirect;
  res.redirect(`https://discordapp.com/oauth2/authorize?${data}`);
});

router.get('/callback', async (req, res) => {
  if (!req.query.code) {
    return res.status(400).send('Missing code querystring');
  }

  const { data } = await post('https://discordapp.com/api/v7/oauth2/token', stringify({
    client_id: config.clientID,
    client_secret: config.clientSecret,
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: `${config.domain}/oauth/callback`
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  });

  const { data: user } = await get('https://discordapp.com/api/v7/users/@me', {
    headers: {
      'Authorization': `Bearer ${data.access_token}`
    }
  });

  db.updateOne({ _id: user.id }, {
    $set: {
      _id: user.id,
      email: user.email
    }
  }, { upsert: true });

  req.session.user = {
    ...user,
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