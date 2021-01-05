// Module
const express = require('express')
const favicon = require('serve-favicon');
const main = require('./app')
const mqtt = require('mqtt');
const mysql = require('mysql');

// Constants
const app = express()
const port = 3000

const endpointUrl = "mqtt://94.247.176.184";
const itemsToRead = [{ topic: "test_chanel" }, { topic: "#" }];

const connection = mysql.createConnection({
  host     : '195.144.11.150',
  user     : 'zdj62853',
  password : 'mis2020'
});

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));

// Connection
client = mqtt.connect(endpointUrl);
connection.connect();

client.stream.on('error', function (error) {
  console.log("error: ", error)
});

client.on("connect",function(){	
  console.log("connected");

  // Subscriptions
  for (var i = 0; i < itemsToRead.length; i++) {
    client.subscribe(itemsToRead[i].topic, function (err) { if (err) { console.log("error in subscription ", err) } });
  }
})

let data = [];

//When receiving a message
client.on('message', function (topic, message) {
    console.log(`topic: ${topic}, message: ${message}`)
    data.push(message)

    //TODO: store to DB
});


app.get('/', function(req, res) {
  return main.app(res, data)
})

app.use(function(req, res, next){  //Page introuvable (404)
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

// End of process
process.on('SIGINT', function () {
  console.log("Caught interrupt signal");
  connection.end();
  process.exit();
});