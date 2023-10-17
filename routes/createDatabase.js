const userInfo = require('./userInfo').userInfo;

const createDatabase = (databaseName) => {
    const mysql = require('mysql');
    const con = mysql.createConnection({
        ...userInfo,
    });
    con.connect((err) => {
        if (err) throw err;
        con.query(`CREATE DATABASE ${databaseName}`, (error, results) => {
            con.end();
            if (error) {
                return(error);
            } else {
                return(results);
            }
        });
    });

};

module.exports = {
    createDatabase,
};