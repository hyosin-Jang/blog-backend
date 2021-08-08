const router = require("express").Router();
const passport = require("passport");
//const {isLoggedIn, isNotLoggedIn} = require('../middlewares');

// /auth login
router.get("/login", (req, res) => {
  res.render("login");
});

// auth logout
router.get("/logout", (req, res) => {
  res.send("log out");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// callback route
router.get(
  "/google/redirect/callback",
  passport.authenticate("google"),
  (err, req, res, next) => {
    if (err.name === "TokenError") {
      res.redirect("/google"); // login page redirect
      console.log("TokenError");
    }
  },
  (req, res) => {
    // On success, home 으로 이동
    console.log("프로필로 이동");
    res.redirect("/profile");
  }
);

module.exports = router;
