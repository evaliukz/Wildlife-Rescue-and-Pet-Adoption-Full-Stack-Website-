const express = require("express");
const router = express.Router();
const config = require("./db-config.js");
var mysql = require("mysql");

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.post("/", (req, res) => {
  const { zipCode } = req.body;

  const left = parseInt(zipCode) - 20;
  const right = parseInt(zipCode) + 20;
  var query = `
    SELECT *
    FROM animalData a JOIN zipcodeMapping z on a.zipcode = z.zip 
    WHERE z.zip > ${left} and z.zip < ${right} and (a.animal_type = "Dog" or a.animal_type = "Cat" or a.animal_type = "Rabbit")
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.post("/zip", (req, res) => {
  const { zipCode } = req.body;
  console.log(zipCode);

  //   console.log(left);
  //   console.log(right);
  var query = `
          SELECT latitude, longitude
          FROM  zipcodeMapping 
          WHERE zip = '${zipCode}' 
        `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
