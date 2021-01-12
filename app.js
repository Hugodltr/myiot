const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: '195.144.11.150',
    user: 'zdj62854',
    password: 'X2ecSypW0mV6',
    database: 'zdj62854'
});

async function app(res) {

    let vegetables, covidAlert, airQuality;

    results = await connection.query('SELECT * FROM vegetables LIMIT 10');
    vegetables = results[0];

    results = await connection.query('SELECT * FROM covidAlert LIMIT 10');
    covidAlert = results[0];

    results = await connection.query('SELECT * FROM airQuality LIMIT 10');
    airQuality = results[0];

    results = await connection.query('SELECT * FROM test_image LIMIT 10');
    let image = results[0]

    res.render('./index.ejs', {
        vegetables,
        covidAlert,
        airQuality,
        image,
        name: "Vincent"
    });
}

module.exports = { app };