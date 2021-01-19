const mqtt = require('mqtt');
const mysql = require('mysql2');

const endpointUrl = "mqtt://94.247.176.184";
const itemsToRead = [{ topic: "covidAlert" }, { topic: "vegetables1" }, { topic: "airQuality" }];

const connection = mysql.createPool({
    host: '195.144.11.150',
    user: 'zdj62854',
    password: 'X2ecSypW0mV6',
    database: 'zdj62854'
});

function listen(io) {

    // Connection
    client = mqtt.connect(endpointUrl);
    io.on('connection', (socket) => {
        console.log('a user connected');
    });

    client.stream.on('error', function(error) {
        console.log("error: ", error)
    });

    client.on("connect", function() {
        console.log("Connected to mqtt");

        // Subscriptions
        for (var i = 0; i < itemsToRead.length; i++) {
            client.subscribe(itemsToRead[i].topic, function(err) { if (err) { console.log("error in subscription ", err) } });
        }
    })

    //When receiving a message
    client.on('message', function(topic, message) {

        let data = JSON.parse(message);

        console.log(`received ${topic}`)
        connection.query(`INSERT INTO ${topic} SET ?`, data, function(err, result) {
            if (err) throw err;
            console.log('Data inserted!');
        });

        io.emit(topic, data);
    });

    // End of process
    process.on('SIGINT', function() {
        console.log("Caught interrupt signal");
        connection.end();
        process.exit();
    });
}

module.exports = { listen };