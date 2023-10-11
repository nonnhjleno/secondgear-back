var express = require('express');
var router = express.Router();

const con = require('./userInfo').con;

/* GET home page. */

let database = {};

con.connect((err) => {
  if (err) throw err;
  console.log('Connected');
  const sql = 'show databases;';
  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    database = result;
  });
});

router
  .get('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000/');
    res.send(database);
  });

module.exports = router;