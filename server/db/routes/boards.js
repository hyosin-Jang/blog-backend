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
    con.query('SELECT * FROM boards',(error,rows)=>{
        if(error){
            throw error;
        }
        console.log('Board is: ', rows);
        res.send(rows);
    });
});

router.get("/:b_num",(req,res)=>{
    con.query('SELECT * FROM boards WHERE b_num=\''+req.params.b_num+'\'',(error,rows)=>{
        if(error){
            throw error;
        }
        console.log('Board is: ', rows);
        res.send(rows);
    });
});

//Insert
router.post("/",(req,res)=>{
    var sql='INSERT INTO boards VALUES(?,?,?,?,?,?)';
    var params=[req.body.b_num,req.body.b_category,req.body.b_title,req.body.b_id,req.body.b_content,req.body.b_date,req.body.b_hit];

    con.query(sql,params,(error,rows)=>{
        if(error){
            throw error;
        }
        console.log('Board is: ', rows);
        res.send(rows);
    });
});

//Update
router.put("/:b_num",(req,res)=>{
    var sql = 'UPDATE boards SET b_category='+req.body.b_category+', b_id='+req.body.b_id+', b_content='+req.body.b_content+', b_date='+req.body.b_date+', b_hit='+req.body.b_hit+' WHERE b_num=\''+req.params.b_num+"\'";
    connection.query(sql, (error, rows)=>{
        if(error) {
            throw error;
        }
        console.log('Boards info is: ', rows);
        res.send(rows);
    });
});

//Delete
router.delete("/:b_num",(req,res)=>{
    var sql='DELETE FROM boards WHERE b_num=\''+req.params.b_num+'\'';
    connection.query(sql, (error, rows)=>{
        if(error) {
            throw error;
        }
        console.log('Boards info is: ', rows);
        res.send(rows);
    });
});

module.exports=router;