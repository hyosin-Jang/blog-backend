const express=require("express");
const app=express();
const members=require('./routes/members');
const categories=require('./routes/categories');
const boards=require('./routes/boards');
const comments=require('./routes/comments');
const router = require('./route');
const cors = require('cors');
const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

//sequelize.sync();
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch(err => {
    console.error(err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

app.use('/', router);

const session = require('express-session')
app.use(session({
	secret:'keyboard cat',
	resave:false,
	saveUninitialize:true
}));

/*
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})
*/

app.use('/db/members',members);
app.use('/db/categories',categories);
app.use('/db/boards',boards);
app.use('/db/comments',comments);

app.listen(3306,()=>{
    console.log("running");
});