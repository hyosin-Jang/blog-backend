const express = require("express");
const router = express.Router();
const { sequelize } = require("../models/index.js");
const bodyParser = require("body-parser");
/*
const dbConfig = require("../config/dbConfig.js");
const mysql = require("mysql");

const dbOptions = {
  host: dbConfig.host,
  port: dbConfig.port, // 3306번 사용
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
  sequelize.query("SELECT * FROM comments", (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("comment is: ", rows);
    res.send(rows);
  });
});

router.get("/:num", (req, res) => {
  sequelize.query(
    "SELECT * FROM comments WHERE num='" + req.params.num + "'",
    (error, rows) => {
      if (error) {
        throw error;
      }
      console.log("comment is: ", rows);
      res.send(rows);
    }
  );
});

//Insert
router.post("/", (req, res) => {
  var sql = "INSERT INTO comments VALUES(?,?)";
  var params = [req.body.id, req.body.content];

  sequelize.query(sql, params, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("comment is: ", rows);
    res.send(rows);
  });
});

//Update
router.put("/:num", (req, res) => {
  var sql =
    "UPDATE comments SET id=" +
    req.body.id +
    " WHERE num='" +
    req.params.num +
    "'";
  sequelize.query(sql, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("comments info is: ", rows);
    res.send(rows);
  });
});

//Delete
router.delete("/:num", (req, res) => {
  var sql = "DELETE FROM comments WHERE num='" + req.params.num + "'";
  sequelize.query(sql, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("comments info is: ", rows);
    res.send(rows);
  });
});

module.exports = router;
