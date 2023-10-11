const mysql = require('mysql');

// 関数を定義してエクスポート
const  getTableNames = async (databaseName) => {
  return new Promise((resolve, reject) => {
    // Create a new connection with the selected database
    const con = mysql.createConnection({
      host: 'localhost',
      user: 'user01',
      password: 'user01',
      database: databaseName,
    });

    con.connect((err) => {
      if (err) {
        con.end();
        reject(err);
      }
      const sql = 'show tables;';
      con.query(sql, (err, results, fields) => {
        con.end();
        if (err) {
          reject(err);
        } else {
          const tableNames = results.map((row) => Object.values(row)[0]);
          console.log(tableNames);
          resolve(tableNames);
        }
      });
    });
  });
}


module.exports = {
  getTableNames, // エクスポートする関数
};
