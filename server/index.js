const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectDatadog = require('connect-datadog');

const config = require('../config.json');

const Routers = require('./routers');
const dataDog = require('./datadog.js');

const app = express();

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
  secret: config.secret,
  name: 'DankMemerHasABigSteamer',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production'
  }
}));

// set up parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(__dirname + '/build/static'));

app.get('/source', (req, res) => {
  res.status(200).sendfile('./source.zip');
  dataDog.increment('website.source');
});

app.get('/premium', (req, res) => {
  res.redirect('https://www.patreon.com/join/dankmemerbot');
  dataDog.increment('website.premium');
});

app.use('/api', Routers.API);
app.use('/oauth', Routers.OAuth);

app.get('*', (request, response) => {
  response.sendFile(`${__dirname}/build/static/index.html`);
  dataDog.increment('website.visit');
});

app.listen(config.port, '127.0.0.1', () => {
  console.log('Listening to port', config.port);

  if (process.env.NODE_ENV === 'development') {
    require('./webpack.js');
  }
});
