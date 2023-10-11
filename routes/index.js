var express = require('express');
var router = express.Router();

const pool = require('./userInfo').pool;
const getTableNames = require('./showTables').getTableNames;

let database = {};

pool.getConnection((err, connection) => {
  if (err) throw err;
  connection.query("show databases", (error, results) => {
    connection.release();
    if (error) throw error;
    database = results;
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
      const tableNames = await getTableNames(databaseName);
      res.send(tableNames);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;