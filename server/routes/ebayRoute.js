const express = require("express");
const router = express.Router();
const config = require("./db-config.js");
var mysql = require("mysql");

config.connectionLimit = 10;
var connection = mysql.createPool(config);

router.post("/", (req, res) => {
  console.log(req.body);
  const { petID, categoryID } = req.body;
  var query = `
    SELECT *
    FROM ebay
    WHERE pet_type_id = '${petID}' and category_id = '${categoryID}'
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
