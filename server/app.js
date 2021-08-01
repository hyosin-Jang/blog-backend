const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");

// connect to mysqldb
const { sequelize } = require("./models");
passportSetup(); // passport 설정
const app = express();

//app.set('port', process.env.PORT || 3001);
app.set("view engine", "ejs");

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

/* ------------------------------------------------------------------
 db.sequelize를 불러와서 sync메서드로 서버 실행시 mysql 연동되도록 했음
 force 옵션은 true로 설정하면 서버 실행시마다 테이블 재생성함
 (테이블 잘못 만든 경우에 true 설정)
  ------------------------------------------------------------------
*/
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch(err => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3001, () => {
  console.log("app now listening");
});
