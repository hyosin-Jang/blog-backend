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
  sequelize.query("SELECT * FROM members", (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("Member is: ", rows);
    res.send(rows);
  });
});

router.get("/:id", (req, res) => {
  sequelize.query(
    "SELECT * FROM members WHERE id='" + req.params.id + "'",
    (error, rows) => {
      if (error) {
        throw error;
      }
      console.log("Member is: ", rows);
      res.send(rows);
    }
  );
});

//Insert
router.post("/", (req, res) => {
  var sql = "INSERT INTO members VALUES(?,?,?,?,?)";
  var params = [
    //req.body.m_tokens,
    req.body.id,
    req.body.email,
    req.body.name,
    req.body.picture
  ];

  sequelize.query(sql, params, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("Member is: ", rows);
    res.send(rows);
  });
});

//Update
router.put("/:id", (req, res) => {
  var sql =
    "UPDATE members SET email=" +
    req.body.email +
    ", name=" +
    req.body.name +
    ", picture=" +
    req.body.picture +
    " WHERE id='" +
    req.params.id +
    "'";
  sequelize.query(sql, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("members info is: ", rows);
    res.send(rows);
  });
});

//Delete
router.delete("/:id", (req, res) => {
  var sql = "DELETE FROM members WHERE id='" + req.params.id + "'";
  sequelize.query(sql, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("members info is: ", rows);
    res.send(rows);
  });
});

module.exports = router;
