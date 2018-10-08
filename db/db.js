const pgp = require('pg-promise')({
    // query(e) {
    //     console.log('QUERY:', e.query);
    // }
});

const db = pgp(process.env.DB_HOST);

module.exports = db;