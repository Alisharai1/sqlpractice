const pgpf = require('pg-promise');
const pgp = pgpf()
// Option 1: Using connection string
// const db = pgp('postgres://alisha:Secret@localhost:5432/alisha');

// Option 2: Using config object
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'alisha',
    user: 'alisha',
    password: 'Secret'
});

module.exports = db;
