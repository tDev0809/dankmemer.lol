const Express = require('express');
const app = Express();
const port = 3000;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//Serve static files
app.use('/', Express.static('./build/static'));

app.post('/api/cmds', async (req, res) => {
  console.log(res.body.cmds)
  // TODO: take this data and update /commands
})

app.get('*', function (request, response){
  response.sendFile(`${__dirname}/build/static/index.html`);
})
/*
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
});
*/
app.listen(port);
