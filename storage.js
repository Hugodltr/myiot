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
        socket.on('button', (msg) => {
            client.publish('Control', msg)
        });
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


        data = formatDate(data);

        io.emit(topic, data);
    });

    // End of process
    process.on('SIGINT', function() {
        console.log("Caught interrupt signal");
        connection.end();
        process.exit();
    });
}

function formatDate(obj) {
    if (obj.timestamp) {
        let d = new Date(obj.timestamp);

        const ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('fr', { month: 'short' }).format(d);
        const da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(d);

        var hours = d.getHours();
        var minutes = "0" + d.getMinutes();
        var seconds = "0" + d.getSeconds();

        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        let formattedDate = `${da} ${mo} ${ye}, ${formattedTime}`;

        obj.timestamp = formattedDate;
    }

    return obj;
}

module.exports = { listen };