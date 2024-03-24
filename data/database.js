const firebird = require('node-firebird');

const options = {};

options.host = '127.0.0.1';
options.port = 3051;
options.database = 'C:/Users/ntust/Downloads/BU DB ACC 20211031 2022 Aug/LESTARI_2021.GDB';
options.user = 'guest';
options.password = 'guest';

const pool = firebird.pool(5, options);

module.exports = pool;