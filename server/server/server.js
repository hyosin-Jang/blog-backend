const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
//const db = require('./config/db');  //RDS와 서버 연결

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser')

sequelize.sync();
sequelize.sync({ force: true });  //모든 데이터 조회

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', router);

//Teacher 테이블을 서버로 가져와 읽을 수 있도록
const {
    Teacher,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');


app.post('/add/data', (req, res) => {
    console.log(req.body)

        Teacher.create({
            name : req.body.data
        })
        .then( result => {
            res.send(result)
        })
        .catch( err => {
            console.log(err)
            throw err;
        })
})

app.get('/get/data', (req, res) => {
    Teacher.findAll()  //모든 데이터 조회. array형태
    .then( result => { res.send(result) })
    .catch( err => { throw err })
}) 

app.post('/modify/data', (req, res) => {
    Teacher.update({ name : req.body.modify.name }, {
        where : { id : req.body.modify.id }
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})

app.post('/delete/data', (req, res) => {
    Teacher.destroy({
        where : { id : req.body.delete.id }
    })
    .then( res.sendStatus(200) )
    .catch( err => { throw err })
})

/*
//여러개의 데이터 변경
app.post('/modify/data', (req, res) => {
    Teacher.update({ name : 'Same_name' }, {
        where : { [Op.or]: [{ id : 1 }, { name : 'Alan' }]}
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})
*/


/*
app.get('/get/data', (req, res) => {
    Teacher.findAll({
        where: { name : 'James' }  //특정데이터 조회
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
}) 
*/

/*//넘버가 1이고 name이 alan인 사람의 데이터
app.get('/get/data', (req, res) => {
    Teacher.findAll({
        where: { [Op.or]: [{ id : 1 }, { name : 'Alan' }] }
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
}) 
*/

/*
//하나의 데이터 가져오기 object형태
app.get('/get/data', (req, res) => {
    Teacher.findOne({
        where : { id : 2 }
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
}) 
*/

/*
//서버 응답 출력 'api/host'로 보낸 요청은 무조건 'Min'으로 응답
app.get('/api/host', (req, res) => {
    res.send({host : 'Min'});
})

//DB로 접근가능한 api 주소와 쿼리문
app.get('/api/test', (req, res) => {
    db.query("select * from test", (err, data) => {
        if(!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
})
*/

//서버 실행하기
app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
})
