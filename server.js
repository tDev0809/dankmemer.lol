const express = require('express');
const { spawn } = require('child_process');
const { resolve } = require('path');
const { encode } = require('querystring');
// todo: axios
const { get, post } = require('snekfetch');
const bodyParser = require('body-parser');
const session = require('express-session');
const rethinkdbdash = require('rethinkdbdash');
const connectDatadog = require('connect-datadog');
const { StatsD } = require('node-dogstatsd');

const keys = require('./keys.json');
const config = require('./config.json');

const app = express();
const r = rethinkdbdash();
const ddog = new StatsD();

// Handle NODE_ENV properly
process.env.NODE_ENV = process.argv.includes('--development')
  ? 'development'
  : 'production';

// Datadog middleware
app.use(connectDatadog({
  response_code: true
}));

app.use(session({
  // todo: read from conf
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production'
  }
}));

// set up parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// misc. variables
let commands = {};

// Serve static files
app.use('/', express.static('./build/static'));

// handle posting of commands to the server
app.post('/api/cmds', (req, res) => {
  if (keys.includes(req.headers.authorization)) {
    console.log(req.body.commands);
    commands = req.body.commands;
    res.status(200).send({status: 'ok'});
  } else {
    res.status(401).send({error: 'Get away you sick filth.'});
  }
})

app.get('/source', (req, res) => {
  res.status(200).sendfile('./source.zip');
  ddog.increment('website.source');
});

app.get('/api/cmds', (req, res) => {
  res.status(200).send(commands);
  ddog.increment('website.cmds');
});

app.get('/premium', (req, res) => {
  res.redirect('https://www.patreon.com/join/dankmemerbot');
  ddog.increment('website.premium');
});

app.get('/api/stats', async (req, res) => {
  const { stats } = await getStats();

  res.status(200).send({
    ram: (stats.totalRam / 1024).toFixed(1),
    guilds: stats.guilds.toLocaleString(),
    users: stats.users.toLocaleString()
  });
  ddog.increment('website.stats');
});

const data = encode({
  scope: 'identify',
  response_type: 'code',
  client_id: config.clientID,
  // todo: set up for prod
  redirect_uri: 'http://localhost/oauth/callback'
});

app.get('/oauth/login', (req, res) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?${data}`);
});

app.get('/oauth/callback', async (req, res) => {
  if (!req.query.code) {
    return res.status(400).send('Missing code querystring');
  }

  const { body } = await post(`https://discordapp.com/api/v7/oauth2/token`)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
      client_id: config.clientID,
      client_secret: config.clientSecret,
      grant_type: 'authorization_code',
      code: req.query.code,
      // todo: set up for prod
      redirect_uri: 'http://localhost/oauth/callback'
    });

  const user = await get('https://discordapp.com/api/v7/users/@me')
    .set('Authorization', `Bearer ${body.access_token}`)
    .then(r => r.body);

  req.session.user = user;
  res.redirect('/');
});

app.get('/oauth/state', (req, res) => {
  return res.json(req.session.user || null);
});

app.get('/oauth/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('*', (request, response) => {
  response.sendFile(`${__dirname}/build/static/index.html`);
  ddog.increment('website.visit');
});

// app.use((req, res, next) => {
//   res.status(404).sendFile(`${__dirname}/build/static/404.html`);
// });

app.listen(config.port, '127.0.0.1');

async function getStats() {
  let test = await r.table('stats')
  return test[0]
}

// Webpack watcher for development environment
if (process.env.NODE_ENV === 'development') {
  const webpackPath = resolve(
    __dirname,
    'node_modules',
    '.bin',
    process.platform === 'win32'
      ? 'webpack-cli.cmd'
      : 'webpack-cli'
  );
  const webpack = spawn(webpackPath, [
    '--config', resolve(__dirname, 'webpack', 'webpack.config-client.js'),
    '--display-error-details',
    '--watch'
  ], { env: { FORCE_COLOR: true } });

  webpack.on('error', (error) => {
    console.log('Webpack error:', error);
  });

  webpack.stdout.on('data', (data) => {
    data = String(data);
    switch (data.slice(0, 5)) {
      case '\nwebp':
        console.log('Webpack watcher initiated.\n');
        break;

      case 'Hash:':
        console.log('Bundle built:\n' + data.slice(0, data.indexOf('Entrypoint')));
        break;
    }
  });

  webpack.stderr.on('data', (data) => {
    console.log('Webpack error', data.toString());
  });

  webpack.on('close', (code) => {
    console.log('Webpack closed with code', code);
  })
}
