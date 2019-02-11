const { encode, stringify } = require('querystring');
const { get, post } = require('axios');
const { promisify } = require('util');
const { Router } = require('express');

const config = require('../../config.json');
const router = Router();

const { encodeJWT, decodeJWT } = (() => {
  const { sign, verify } = require('jsonwebtoken');
  const [ signAsync, verifyAsync ] = [ sign, verify ].map(promisify);

  return {
    encodeJWT (obj) {
      return signAsync(obj, config.secret, { algorithm: 'HS512' });
    },
    decodeJWT (jwt) {
      return verifyAsync(jwt, config.secret, { algorithms: [ 'HS512' ] });
    }
  };
})();

const data = encode({
  scope: 'identify',
  response_type: 'code',
  client_id: config.clientID,
  redirect_uri: `${config.domain}/oauth/callback`
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

  req.session.user = {
    ...user,
    jwt: await encodeJWT({ id: user.id })
  };
  res.redirect(req.session.redirect || '/');
});

router.get('/state', (req, res) => {
  console.log(req.session.user);
  return res.json(req.session.user || null);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;