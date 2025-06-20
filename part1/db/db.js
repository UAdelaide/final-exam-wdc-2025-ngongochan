const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 
    password: process.env.MYSQL_KEY,
    database: 'MyEvents'
});

module.exports = pool.promise();