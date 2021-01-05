const express = require('express')
const favicon = require('serve-favicon');
let main = require('./app')

const app = express()
const port = 3000

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  return main.app(res)
})

app.use(function(req, res, next){  //Page introuvable (404)
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})