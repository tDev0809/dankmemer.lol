// Handle NODE_ENV properly
process.env.NODE_ENV = process.argv.includes('--development') ?
  'development' :
  'production';

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../../config.json');

const app = express();

app.listen(config.port, () => {
  console.log('Listening to port', config.port);

  if (process.env.NODE_ENV === 'development') {
    require('./webpack.js');
  }
});

// set up parsing
app.use(bodyParser.json());

// Serve static files
app.use('/', express.static(__dirname + '/build'));
app.use('/static', express.static(__dirname + '/../app/assets/'));

app.get('/source', (req, res) => {
  res.status(200).sendfile('./source.zip');
});

app.get('/premium', (req, res) => {
  res.redirect('https://www.patreon.com/join/dankmemerbot');
});

require('./util/db.js')().then(db => {
  const Routers = require('./routers');

  app.set('trust proxy', 1);
  app.use(session({
    secret: config.secret,
    name: 'DankMemerHasABigSteamer',
    resave: false,
    saveUninitialized: true,
    rolling: true,
    store: new MongoStore({
      db
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2628000
    }
  }));

  app.use('/api', Routers.API);
  app.use('/oauth', Routers.OAuth);

  app.get('*', (request, response) => {
    response.sendFile(`${__dirname}/build/index.html`);
  });
}).catch(e => {
  console.error(e);
})