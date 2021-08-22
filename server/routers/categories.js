const express = require("express");
const router = express.Router();
const { sequelize } = require("../models/index.js");
const bodyParser = require("body-parser");

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
  sequelize.query("SELECT * FROM categories", (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("Category is: ", rows);
    res.send(rows);
  });
});

router.get("/:category", (req, res) => {
  sequelize.query(
    "SELECT * FROM members WHERE category='" + req.params.category + "'",
    (error, rows) => {
      if (error) {
        throw error;
      }
      console.log("Category is: ", rows);
      res.send(rows);
    }
  );
});

//Insert
router.post("/", (req, res) => {
  var sql = "INSERT INTO categories VALUES(?)";
  var params = [req.body.category];

  sequelize.query(sql, params, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("Category is: ", rows);
    res.send(rows);
  });
});

//Update
router.put("/:category", (req, res) => {
  var sql = "UPDATE categories SET category=" + req.body.category + "/";
  sequelize.query(sql, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("Category is: ", rows);
    res.send(rows);
  });
});

//Delete
router.delete("/:category", (req, res) => {
  var sql =
    "DELETE FROM categories WHERE category='" + req.params.category + "'";
  sequelize.query(sql, (error, rows) => {
    if (error) {
      throw error;
    }
    console.log("Category is: ", rows);
    res.send(rows);
  });
});

module.exports = router;
