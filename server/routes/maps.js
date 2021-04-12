const express = require("express");
const router = express.Router();
const config = require("./db-config.js");
var mysql = require("mysql");

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.post("/", (req, res) => {
  const { zipCode } = req.body;
  //   console.log(zipCode);
  const left = parseInt(zipCode) - 50;
  const right = parseInt(zipCode) + 50;
  //   console.log(left);
  //   console.log(right);
  var query = `
    SELECT *
    FROM animals
    WHERE zipcode between '${left}' and '${right}'
    LIMIT 49
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
