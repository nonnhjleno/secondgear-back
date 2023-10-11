const mysql = require('mysql');

let pool = mysql.createPool({
    host: 'localhost',
    user: 'user01',
    password: 'user01',
});

module.exports = {
   pool, // エクスポートする関数
};