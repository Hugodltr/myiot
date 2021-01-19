const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: '195.144.11.150',
    user: 'zdj62854',
    password: 'X2ecSypW0mV6',
    database: 'zdj62854'
});

async function app(res) {

    let vegetables, covidAlert, airQuality;

    results = await connection.query('SELECT * FROM vegetables1 ORDER BY timestamp DESC LIMIT 10');
    results[0] = formatDate(results[0]);
    vegetables = results[0];

    results = await connection.query('SELECT * FROM covidAlert ORDER BY timestamp DESC LIMIT 10');
    results[0] = formatDate(results[0]);
    covidAlert = results[0];

    results = await connection.query('SELECT * FROM airQuality ORDER BY timestamp DESC LIMIT 10');
    results[0] = formatDate(results[0]);
    airQuality = results[0];

    results = await connection.query('SELECT * FROM test_image LIMIT 10 ');
    results[0] = formatDate(results[0]);
    let image = results[0]

    res.render('./index.ejs', {
        vegetables,
        covidAlert,
        airQuality,
        image,
        name: "Vincent"
    });
}

function formatDate(obj) {
    obj.forEach(element => {
        if (element.timestamp) {
            let d = new Date(element.timestamp);

            const ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(d);
            const mo = new Intl.DateTimeFormat('fr', { month: 'short' }).format(d);
            const da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(d);

            var hours = d.getHours();
            var minutes = "0" + d.getMinutes();
            var seconds = "0" + d.getSeconds();

            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            let formattedDate = `${da} ${mo} ${ye}, ${formattedTime}`;

            element.timestamp = formattedDate;
        }
    });

    return obj;
}

module.exports = { app };