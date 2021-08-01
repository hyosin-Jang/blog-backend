const router = require("express").Router();
const passport = require("passport");
//const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const Member = require("../models/members");

// /auth/login
router.get("/login", (req, res) => {
  res.render("login");
});

// auth/logout
router.get("/logout", (req, res) => {
  res.send("log out");
});

/* 
  scope : profile에서 가져올 것 
  경로: /auth/google
*/
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// callback route
router.get(
  "/google/redirect",
  passport.authenticate("google"),
  (err, req, res, next) => {
    if (err.name === "TokenError") {
      res.redirect("/google"); // login page redirect
    } else {
      // handle other errors here
    }
  },
  (req, res) => {
    // On success, redirect back to '/'
    res.redirect("/");
  }
);

module.exports = router;
