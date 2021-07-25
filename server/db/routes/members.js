const express=require('express');
const router=express.Router();
const mysql=require('mysql');
const dbConfig=require('../config/db.js');
const con=mysql.createConnection(dbConfig);
const bodyParser=require('body-parser');

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
    var sql='INSERT INTO members VALUES(?,?,?,?)';
    var params=[req.body.m_id,req.body.m_pw,req.body.m_name,req.body.m_email];

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
    var sql = 'UPDATE members SET m_pw='+req.body.m_pw+', m_name='+req.body.m_name+', m_email='+req.body.m_email+' WHERE m_id=\''+req.params.m_id+"\'";
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