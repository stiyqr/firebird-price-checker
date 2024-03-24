const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'dummydb',
    user: 'root',
    password: 'secretpass0'
});

module.exports = pool;