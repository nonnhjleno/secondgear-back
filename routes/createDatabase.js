const pool = require('./userInfo').pool;

const createDatabse = (databaseName) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(`CREATE DATABASE ${databaseName}`, (error, results) => {
            if (error) {
                console.error(error);
            } else {
                console.log(results);
            }
        });
    });
};

module.exports = {
    createDatabse,
};