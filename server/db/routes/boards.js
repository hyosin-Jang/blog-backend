const express=require('express');
const router=express.Router();
const mysql=require('mysql');
const dbConfig=require('../config/db.js');
const con=mysql.createConnection(dbConfig);
const bodyParser=require('body-parser');

con.connect();

router.use(bodyParser.json());