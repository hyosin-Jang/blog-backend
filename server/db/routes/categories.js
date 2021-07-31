const express=require('express');
const router=express.Router();
const mysql=require('mysql');
const dbConfig=require('../config/dbConfig.js');
const bodyParser=require('body-parser');

const dbOptions = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
};

const con = mysql.createConnection(dbOptions);
con.connect();

router.use(bodyParser.json());

//Select
router.get('/',(req,res)=>{
    con.query('SELECT * FROM categories',(error,rows)=>{
        if(error){
            throw error;
        }
        console.log('Category is: ', rows);
        res.send(rows);
    });
});

router.get("/:ct_name",(req,res)=>{
    con.query('SELECT * FROM members WHERE ct_name=\''+req.params.ct_name+'\'',(error,rows)=>{
        if(error){
            throw error;
        }
        console.log('Category is: ', rows);
        res.send(rows);
    });
});

//Insert
router.post("/",(req,res)=>{
    var sql='INSERT INTO categories VALUES(?)';
    var params=[req.body.ct_name];

    con.query(sql,params,(error,rows)=>{
        if(error){
            throw error;
        }
        console.log('Category is: ', rows);
        res.send(rows);
    });
});

//Update
router.put("/:ct_name",(req,res)=>{
    var sql = 'UPDATE categories SET ct_name='+req.body.ct_name+'/';
    connection.query(sql, (error, rows)=>{
        if(error) {
            throw error;
        }
        console.log('Category is: ', rows);
        res.send(rows);
    });
});

//Delete
router.delete("/:ct_name",(req,res)=>{
    var sql='DELETE FROM categories WHERE ct_name=\''+req.params.ct_name+'\'';
    connection.query(sql, (error, rows)=>{
        if(error) {
            throw error;
        }
        console.log('Category is: ', rows);
        res.send(rows);
    });
});

module.exports=router;