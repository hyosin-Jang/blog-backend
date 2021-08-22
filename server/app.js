const express = require("express");
const path = require("path");
const passport = require("passport");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const authRoutes = require("./routers/auth-routes");
const dbRoutes = require("./routers/db-routes");
const profileRoutes = require("./routers/profile-routes");
const passportSetup = require("./config/passport-setup");
const session = require("express-session");

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

app.use(passport.initialize());
app.use(passport.session());

/* ------------------------------------------------------------------
 db.sequelize를 불러와서 sync메서드로 서버 실행시 mysql 연동되도록 했음
 force 옵션은 true로 설정하면 서버 실행시마다 테이블 재생성함
 (테이블 잘못 만든 경우에 true 설정)
  ------------------------------------------------------------------
*/

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

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// create db routes
app.use("/db", dbRoutes);

// create home routes
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(4000, () => {
  console.log("app now listening");
});
