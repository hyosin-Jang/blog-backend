const express = require("express");
const path = require("path");
const passport = require("passport");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const passportSetup = require("./config/passport-setup");
const session = require("express-session");
const authRoutes = require("./routers/auth-routes");
const routes = require("./routers/index");
const app = express();

// session setup
app.use(
  session({
    secret: "blog-backend",
    cookie: { maxAge: 60 * 60 * 1000 }, // 1시간 제한
    resave: true,
    saveUninitialized: true
  })
);

//app.use(passport.initialize());
//app.use(passport.session());

/* ------------------------------------------------------------------
 db.sequelize를 불러와서 sync메서드로 서버 실행시 mysql 연동되도록 했음
 force 옵션은 true로 설정하면 서버 실행시마다 테이블 재생성함
 (테이블 잘못 만든 경우에 true 설정)
  ------------------------------------------------------------------
*/

//app.use("/auth", authRoutes);
// connect to mysqldb
const { sequelize } = require("./models/index.js");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch(err => {
    console.error(err);
  });

//const api = require("./api");
//app.use("/api", api);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

process.setMaxListeners(15);

app.get("/", function (req, res) {
  res.send("This is main");
});

// / 경로로 오면 routes로 이동
app.use("/api", routes);

app.listen(4000, () => {
  console.log("app now listening");
});
