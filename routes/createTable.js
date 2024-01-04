const userInfo = require('./userInfo').userInfo;

const generateCreateTableStatement = (tableName, columns) => {
    let createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableName} (`;

    Object.values(columns).forEach((column, index, array) => {
        const not_null = column.not_null === 'true' ? 'NOT NULL' : '';
        createTableSQL += `${column.column_name} ${column.column_type} ${not_null}`;

        if (index !== array.length - 1) {
            createTableSQL += ', ';
        }
    });

    createTableSQL += ')';

    return createTableSQL;
}

const createTable = (queryData) => {
    const createTableSQL = generateCreateTableStatement(queryData.tableName, queryData.data);
    const mysql = require('mysql');
    const con = mysql.createConnection({
        ...userInfo,
        database: queryData.currentSelectedDatabase
    });
    con.connect((err) => {
        if (err) throw err;
        con.query(createTableSQL, (error, result) => {
            con.end();
            if (error) {
                return (error);
            }
            else {
                return (result);
            }
        });
    });
}

module.exports = {
    createTable,
}