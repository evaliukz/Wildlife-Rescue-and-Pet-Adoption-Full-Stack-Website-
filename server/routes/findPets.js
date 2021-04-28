const express = require("express");
const router = express.Router();
const config = require("./db-config.js");
var mysql = require("mysql");

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.post("/", (req, res) => {
  const { zipCode, type } = req.body;
  console.log(zipCode, type);
  const left = parseInt(zipCode) - 30;
  const right = parseInt(zipCode) + 30;
  //   console.log(left);
  //   console.log(right);
  var query = `
    SELECT *
    FROM animalData
    WHERE zipcode between '${left}' and '${right}' and LOWER(animal_type)='${type}'
    LIMIT 30
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});

module.exports = router;
