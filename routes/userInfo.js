const mysql = require('mysql');

let con = mysql.createConnection({
    host: 'localhost',
    user: 'user01',
    password: 'user01',
});

module.exports = {
   con, // エクスポートする関数
};  