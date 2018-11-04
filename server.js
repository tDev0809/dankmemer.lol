const Express = require('express');
const app = Express();
const port = 3000;
const bodyParser = require('body-parser')
const keys = require('./keys.json');
const r = require('rethinkdbdash')();

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
})

app.get('/api/cmds', (req, res) => {
  res.status(200).send(commands);
})

app.get('/api/stats', (req, res) => {
  getStats().then(r => {
    res.status(200).send(r);
  })
})

app.get('*', (request, response) => {
  response.sendFile(`${__dirname}/build/static/index.html`);
})

// app.use((req, res, next) => {
//   res.status(404).sendFile(`${__dirname}/build/static/404.html`);
// });

app.listen(port);

async function getStats() {
  let test = await r.table('stats')
  return test[0]
}