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
    con.query('SELECT * FROM comments',(error,rows)=>{
        if(error){
            throw error;
        }
        console.log('comment is: ', rows);
        res.send(rows);
    });
});

router.get("/:cm_num",(req,res)=>{
    con.query('SELECT * FROM comments WHERE cm_num=\''+req.params.cm_num+'\'',(error,rows)=>{
        if(error){
            throw error;
        }
        console.log('comment is: ', rows);
        res.send(rows);
    });
});

//Insert
router.post("/",(req,res)=>{
    var sql='INSERT INTO comments VALUES(?,?)';
    var params=[req.body.cm_id,req.body.cm_content];

    con.query(sql,params,(error,rows)=>{
        if(error){
            throw error;
        }
        console.log('comment is: ', rows);
        res.send(rows);
    });
});

//Update
router.put("/:cm_num",(req,res)=>{
    var sql = 'UPDATE comments SET cm_id='+req.body.cm_id+' WHERE cm_num=\''+req.params.cm_num+"\'";
    connection.query(sql, (error, rows)=>{
        if(error) {
            throw error;
        }
        console.log('comments info is: ', rows);
        res.send(rows);
    });
});

//Delete
router.delete("/:cm_num",(req,res)=>{
    var sql='DELETE FROM comments WHERE cm_num=\''+req.params.cm_num+'\'';
    connection.query(sql, (error, rows)=>{
        if(error) {
            throw error;
        }
        console.log('comments info is: ', rows);
        res.send(rows);
    });
});

module.exports=router;