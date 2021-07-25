//DB connection
const mysql = require('mysql');//mysql 모듈 로드

const dbConfig=require("./config/db.js");
const con = mysql.createConnection(dbConfig);//DB 연동

con.connect(function(error,results){//DB 접속
    if (error) {
        console.log(error);
    }
    console.log(results); 
});

con.end();//DB 접속 종료