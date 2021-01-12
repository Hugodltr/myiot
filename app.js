const mysql = require('mysql');

const connection = mysql.createPool({
    host: '195.144.11.150',
    user: 'zdj62854',
    password: 'X2ecSypW0mV6',
    database: 'zdj62854'
});

function app(res) {

    let vegetables, covidAlert, airQuality;


    connection.query('SELECT * FROM vegetables LIMIT 10', function(error, results, fields) {
        if (error) throw error;

        vegetables = results[0];
    });

    connection.query('SELECT * FROM covidAlert LIMIT 10', function(error, results, fields) {
        if (error) throw error;

        covidAlert = results[0];
    });

    connection.query('SELECT * FROM airQuality LIMIT 10', function(error, results, fields) {
        if (error) throw error;

        airQuality = results[0];
    });

    res.render('./index.ejs', {
        vegetables,
        covidAlert,
        airQuality
    });
}

module.exports = { app };