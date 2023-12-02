const userInfo = require('./userInfo').userInfo;

const generateCreateTableStatement = (tableName, columns) => {
    let createTableSQL = `CREATE TABLE ${tableName} (`;

    columns.forEach((column, index) => {
        createTableSQL += `${column.name} ${column.type}`;

        if (column.constraints && column.constraints.length > 0) {
            createTableSQL += ` ${column.constraints.join(' ')}`;
        }

        createTableSQL += index === columns.length - 1 ? ')' : ', ';
    });

    return createTableSQL;
}

const createTable = (databaseName, tableName, queryData) => {
    const createTableSQL = generateCreateTableStatement(tableName, queryData);
    const mysql = require('mysql');
    const con = mysql.createConnection({
        ...userInfo,
        database: databaseName
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