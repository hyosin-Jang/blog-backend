const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { sequelize } = require("../models/index.js");
/*
const mysql = require("mysql");
const dbConfig = require("../config/dbConfig.js");

const dbOptions = {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database
};


const con = mysql.createConnection(dbOptions);
con.connect();

*/
router.use(bodyParser.json());

//Select
router.get("/", (req, res) => {
  sequelize.query("SELECT * FROM boards", (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("Board is: ", rows);
    res.send(rows);
  });
});

router.get("/:num", (req, res) => {
  var sql = "SELECT * FROM boards WHERE num='" + req.params.num + "'";
  var sql2 =
    "UPDATE boards SET hit = hit + 1 WHERE num='" + req.params.num + "'";
  sequelize.query(sql, sql2, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("Board is: ", rows);
    res.send(rows);
  });
});

//Insert
router.post("/", (req, res) => {
  var sql = "INSERT INTO boards VALUES(?,?,?,?)";
  var params = [
    req.body.category,
    req.body.title,
    req.body.id,
    req.body.content,
    req.body.date
  ];

  sequelize.query(sql, params, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("Board is: ", rows);
    res.send(rows);
  });
});

//Update
router.put("/:num", (req, res) => {
  var sql =
    "UPDATE boards SET category=" +
    req.body.category +
    ", id=" +
    req.body.id +
    ", content=" +
    req.body.content +
    ", date=" +
    req.body.date +
    " WHERE num='" +
    req.params.num +
    "'";
  sequelize.query(sql, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("Boards info is: ", rows);
    res.send(rows);
  });
});

//Delete
router.delete("/:num", (req, res) => {
  var sql = "DELETE FROM boards WHERE num='" + req.params.num + "'";
  sequelize.query(sql, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("Boards info is: ", rows);
    res.send(rows);
  });
});

module.exports = router;
