const Express = require('express');
const app = Express();
const bodyParser = require('body-parser')
const keys = require('./keys.json');
const config = require('./config.json')
const port = config.port || 3000;
const r = require('rethinkdbdash')();
const { StatsD } = require('node-dogstatsd');
const ddog = new StatsD();

const dd_options = {
  'response_code': true
}

const connect_datadog = require('connect-datadog')(dd_options);
app.use(connect_datadog);
//set up parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//misc. variables
let commands = {};

//Serve static files
app.use('/', Express.static('./build/static'));

//handle posting of commands to the server
app.post('/api/cmds', (req, res) => {
  if(keys.includes(req.headers.authorization)) {
    console.log(req.body.commands);
    commands = req.body.commands;
    res.status(200).send({status: 'ok'});
  }
  else {
    res.status(401).send({error: 'Get away you sick filth.'});
  }
  
})

app.get('/source', (req, res) => {
  res.status(200).sendfile('./source.zip');
  ddog.increment('website.source')
})

app.get('/api/cmds', (req, res) => {
  res.status(200).send(commands);
  ddog.increment('website.cmds')
})

app.get('/premium', (req, res) => {
  res.redirect('https://www.patreon.com/join/dankmemerbot?')
  ddog.increment('website.premium')
})

app.get('/api/stats', (req, res) => {
  getStats().then(t => {
    let data = {
      ram: (t.stats.totalRam / 1024).toFixed(1),
      guilds: t.stats.guilds.toLocaleString(),
      users: t.stats.users.toLocaleString()
    }
    res.status(200).send(data);
  })
  ddog.increment('website.stats')
})

app.get('*', (request, response) => {
  response.sendFile(`${__dirname}/build/static/index.html`);
  ddog.increment('website.visit')
})

// app.use((req, res, next) => {
//   res.status(404).sendFile(`${__dirname}/build/static/404.html`);
// });

app.listen(port, '127.0.0.1')

async function getStats() {
  let test = await r.table('stats')
  return test[0]
}
