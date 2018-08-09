const Express = require('express');
const app = Express();
const port = 3000;

//Serve static files
app.use('/', Express.static('./build/static'));

app.get('*', function (request, response){
  response.sendFile(`${__dirname}/build/static/index.html`);
})
/*
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
});
*/
app.listen(port);
