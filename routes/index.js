var express = require('express');
const { compile } = require('morgan');
var router = express.Router();
const mysql = require('mysql');

const fetchTableNames = require('./fetchTables').fetchTableNames;
const createDatabase = require('./createDatabase').createDatabase;
const createTable = require('./createTable').createTable;

const fetchDatabases = () => {
  const userInfo = require('./userInfo').userInfo;
  const con = mysql.createConnection({ ...userInfo });
  return new Promise((resolve, reject) => {
    con.connect((err) => {
      if (err) {
        return reject(err);
      }
      con.query("show databases", (error, results) => {
        con.end();
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  });
};

const setHeader = (res, num) => res.setHeader('Access-Control-Allow-Origin', `http://localhost:${num}`);

router
  .get('/', async (req, res, next) => {
    setHeader(res, 4000);
    const result = {};
    try {
      const response = await fetchDatabases();
      const databaseNames = response.map(databaseInfo => databaseInfo.Database);
      databaseNames.forEach(name => {
        result[name] = {};
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
    res.send(result);
  })
  .get('/showTables/:name', async (req, res) => {
    setHeader(res, 4000);
    const databaseName = req.params.name;
    let result = {};
    try {
      const response = await fetchTableNames(databaseName);
      result = response;
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
    res.send(result);
  })
  .post('/createDatabase', (req, res) => {
    setHeader(res, 4000);
    const databaseName = req.body.name;
    // console.log(databaseName);
    const result = createDatabase(databaseName);
    console.log('/createDatabase');
    res.send(result);
  })
  .post('/createTable', (req, res) => {
    setHeader(res, 4000);
    console.log('/createTable');
    const body = req.body;
    const queryData = JSON.parse(Object.keys(body)[0]);
    createTable(queryData);
    res.send({result:"Success"});
  });

module.exports = router;