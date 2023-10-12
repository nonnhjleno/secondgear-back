const fetchTableNames = async (databaseName) => {
    return new Promise((resolve, reject) => {
        const pool = require('./userInfo').pool;
        pool.config.connectionConfig.database = databaseName;
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query("show tables", (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const tableNames = results.map((row) => Object.values(row)[0]);
                    pool.config.connectionConfig.database = null;
                    resolve(tableNames);
                }
            });
        });
    });
}

module.exports = {
    fetchTableNames,
};