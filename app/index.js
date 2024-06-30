const express = require('express');
const mysql = require('mysql');

const config = {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'fullcycle'
};

const app = express();
const port = 3000;

const connection = mysql.createConnection(config);
const sqlInsert = `INSERT INTO people(name) values('John')`;

connection.query(sqlInsert);
connection.end();

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config);
    const sqlSelect = `SELECT name FROM people`;

    connection.query(sqlSelect, (err, result) => {
        if (err) throw err;

        res.send('<h1>Full Cycle Rocks!</h1><ul>' + result.map(item => `<li>${item.name}</li>`).join('') + '</ul>');
    });

    connection.end();
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});



