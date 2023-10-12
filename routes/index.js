var express = require('express');
var router = express.Router();

const fetchTableNames = require('./fetchTables').fetchTableNames;
const createDatabase = require('./createDatabase').createDatabse;

const fetchDatabases = () => {
  const pool = require('./userInfo').pool;
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        connection.release();
        return reject(err);
      }
      connection.query("show databases", (error, results) => {
        connection.release();
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

    try {
      const result = await fetchDatabases(); // データベース一覧を待つ
      res.send(result); // レスポンスを返す
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  })
  .get('/showTables/:name', async (req, res) => {
    setHeader(res, 4000);
    const databaseName = req.params.name;

    try {
      const tableNames = await fetchTableNames(databaseName);
      res.send(tableNames);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  })
  .post('/createDatabase', (req, res) => {
    setHeader(res, 4000);

    const databaseName = req.query.name;

    createDatabase(databaseName);

    res.send(databaseName);

  });

module.exports = router;