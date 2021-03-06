// Module
const express = require('express')
const app = express()
const favicon = require('serve-favicon');
const main = require('./app')
const mqtt = require('./storage')
const http = require('http').createServer(app);
const io = require('socket.io')(http);


// Constants
const port = 3000

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));

mqtt.listen(io);

app.get('/', function(req, res) {
    return main.app(res)
})

app.use(function(req, res, next) { //Page introuvable (404)
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

http.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})