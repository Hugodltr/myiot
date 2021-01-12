// Module
const express = require('express')
const favicon = require('serve-favicon');
const main = require('./app')
const mqtt = require('./storage')

// Constants
const app = express()
const port = 3000

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));

mqtt.listen();

app.get('/', function(req, res) {
    return main.app(res)
})

app.use(function(req, res, next) { //Page introuvable (404)
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})