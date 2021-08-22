const express = require("express");
const app = express();
const members = require("./members");
const categories = require("./categories");
const boards = require("./boards");
const comments = require("./comments");

app.use("/members", members);
app.use("/categories", categories);
app.use("/boards", boards);
app.use("/comments", comments);

app.listen(3306, () => {
  console.log("running");
});

module.exports = app;
