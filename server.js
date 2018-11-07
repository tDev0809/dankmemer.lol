const Express = require('express');
const app = Express();
const port = 3000;
const bodyParser = require('body-parser')
const keys = require('./keys.json');
const r = require('rethinkdbdash')();
const { StatsD } = require('node-dogstatsd');
const ddog = new StatsD();

const dd_options = {
  'response_code': true
}

let data = [ //TODO: move to external file
  {
      name: "Meme",
      price: 2,
      link: "https://www.patreon.com/join/dankmemerbot/checkout?rid=2975977",
      perks: [
          "Donor Role on Dank Memer's server",
          "Access to NSFW commands",
          "1000 coins per dollar donated each month",
          "Donor Multiplier for currency commands",
          "Autoplaying flag for meme music"
      ],
      special: [
          "5% steal shields",
      ]
  },
  {
      name: "Meme Lord",
      price: 5,
      link: "https://www.patreon.com/join/dankmemerbot/checkout?rid=2212442",
      perks: [
          "Donor Role on Dank Memer's server",
          "Access to NSFW commands",
          "1000 coins per dollar donated each month",
          "Donor Multiplier for currency commands",
          "Autoplaying flag for meme music"
      ],
      special: [
          "Premium Perks on one server: Music functionality, Autoposting Memes, Austoposting NSFW, Tags, Extra coins",
          "25% steal shields"
      ]
  },
  {
      name: "Meme God",
      price: 20,
      link: "https://www.patreon.com/join/dankmemerbot/checkout?rid=2434764",
      perks: [
          "Donor Role on Dank Memer's server",
          "Access to NSFW commands",
          "1000 coins per dollar donated each month",
          "Donor Multiplier for currency commands",
          "Autoplaying flag for meme music"
      ],
      special: [
          "All your premium servers share donor perks to all server members",
          "Premium Perks on five servers: Music functionality, Autoposting Memes, Austoposting NSFW, Tags, Extra coins",
          "Sponser Role on Dank Memer's server",
          "95% steal shields"
      ]
  }
]

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

app.get('/api/premium', (req, res) => {
  res.status(200).send(data);
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

app.listen(port);

async function getStats() {
  let test = await r.table('stats')
  return test[0]
}