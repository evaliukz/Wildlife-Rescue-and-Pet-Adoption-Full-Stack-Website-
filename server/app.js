const express = require("express");
const app = express();
const PORT = 5000;
const mysql = require("mysql");

//Middleware
const middleware = () => {
  console.log("middleware working");
};
app.use(middleware);

//making routes here
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/about", (req, res) => {
  res.send("this is an about page");
});

app.listen(PORT, () => {
  console.log("server is runing on", PORT);
});
