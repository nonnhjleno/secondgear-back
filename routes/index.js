var express = require('express');
var router = express.Router();

const con = require('./userInfo').con;
const showTables = require('./showTables').getTableNames;

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

const setHeader = (res,num) => res.setHeader('Access-Control-Allow-Origin', `http://localhost:${num}`);

router
  .get('/', (req, res, next) => {
    setHeader(res,4000);
    res.send(database);
  })
  .get('/showTables/:name', async (req, res) => {
    setHeader(res,4000);
    const databaseName = req.params.name;

    try {
      const tableNames = await showTables(databaseName);
      res.send(tableNames);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;