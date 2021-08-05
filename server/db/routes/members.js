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
    con.query('SELECT * FROM members',(error,rows)=>{
        if(error){
            throw error;
        }
        console.log('Member is: ', rows);
        res.send(rows);
    });
});

router.get("/:m_id",(req,res)=>{
    con.query('SELECT * FROM members WHERE m_id=\''+req.params.m_id+'\'',(error,rows)=>{
        if(error){
            throw error;
        }
        console.log('Member is: ', rows);
        res.send(rows);
    });
});

//Insert
router.post("/",(req,res)=>{
    var sql='INSERT INTO members VALUES(?,?,?,?,?)';
    var params=[req.body.m_tokens,req.body.m_id,req.body.m_email,req.body.m_name,req.body.m_picture];

    con.query(sql,params,(error,rows)=>{
        if(error){
            throw error;
        }
        console.log('Member is: ', rows);
        res.send(rows);
    });
});

//Update
router.put("/:m_id",(req,res)=>{
    var sql = 'UPDATE members SET m_email='+req.body.m_email+', m_name='+req.body.m_name+', m_picture='+req.body.m_picture+' WHERE m_id=\''+req.params.m_id+"\'";
    connection.query(sql, (error, rows)=>{
        if(error) {
            throw error;
        }
        console.log('members info is: ', rows);
        res.send(rows);
    });
});

//Delete
router.delete("/:m_id",(req,res)=>{
    var sql='DELETE FROM members WHERE m_id=\''+req.params.m_id+'\'';
    connection.query(sql, (error, rows)=>{
        if(error) {
            throw error;
        }
        console.log('members info is: ', rows);
        res.send(rows);
    });
});

module.exports=router;