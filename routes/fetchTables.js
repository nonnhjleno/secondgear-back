const userInfo = require('./userInfo').userInfo;

const fetchTableNames = async (databaseName) => {
    return new Promise((resolve, reject) => {
        const mysql = require('mysql');
        const con = mysql.createConnection({
            ...userInfo,
            database: databaseName
        });
        con.connect((err) => {
            if (err) throw err;
            console.log('Connected to the database');
            con.query("SHOW TABLES", (error, results) => {
                con.end();
                if (error) {
                    reject(error);
                } else {
                    const tableNames = results.map((row) => Object.values(row)[0]);
                    resolve(tableNames);
                }
            });
        });
    });
}


module.exports = {
    fetchTableNames,
};