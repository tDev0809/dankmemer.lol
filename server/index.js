// Handle NODE_ENV properly
process.env.NODE_ENV = process.argv.includes('--development')
  ? 'development'
  : 'production';

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('../config.json');

const app = express();

app.listen(config.port, () => {
  console.log('Listening to port', config.port);

  if (process.env.NODE_ENV === 'development') {
    require('./webpack.js');
  }
});

app.set('trust proxy', 1);
app.use(session({
  secret: config.secret,
  name: 'DankMemerHasABigSteamer',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production'
  }
}));

// set up parsing
app.use(bodyParser.json());

// Serve static files
app.use('/', express.static(__dirname + '/root'));
app.use('/assets', express.static(__dirname + '/../src/app/assets'));

app.get('/source', (req, res) => {
  res.status(200).sendfile('./source.zip');
});

app.get('/premium', (req, res) => {
  res.redirect('https://www.patreon.com/join/dankmemerbot');
});

require('./util/db.js')().then(() => {
  const Routers = require('./routers');

  app.use('/api', Routers.API);
  app.use('/oauth', Routers.OAuth);

  app.get('*', (request, response) => {
    response.sendFile(`${__dirname}/root/index.html`);
  });
});
