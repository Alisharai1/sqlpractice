const pgp = require('pg-promise')();

// Option 1: Using connection string
// const db = pgp('postgres://username:password@localhost:5432/mydatabase');

// Option 2: Using config object
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'alisha',
    user: 'alisha',
    password: 'Secret'
});

module.exports = db;
