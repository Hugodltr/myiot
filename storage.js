const mqtt = require('mqtt');
const mysql = require('mysql');

const endpointUrl = "mqtt://94.247.176.184";
const itemsToRead = [{ topic: "test_chanel" }, { topic: "#" }];

const connection = mysql.createConnection({
    host: '195.144.11.150',
    user: 'zdj62854',
    password: 'X2ecSypW0mV6',
    database: 'zdj62854'
});

function listen() {

    // Connection
    client = mqtt.connect(endpointUrl);

    connection.connect();

    connection.query('SELECT * FROM vegetables', function(error, results, fields) {
        if (error) throw error;
        console.log(results[0]);
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
        console.log(`topic: ${topic}, message: ${message}`)

        //TODO: store to DB
    });

    // End of process
    process.on('SIGINT', function() {
        console.log("Caught interrupt signal");
        connection.end();
        process.exit();
    });

}

module.exports = { listen };