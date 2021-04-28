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
    FROM ebayData
    WHERE pet_type_id = '${petID}' and category_id = '${categoryID}'
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

router.post("/:petID/:categoryID", (req, res) => {
  // console.log(req.body);
  pID = req.params.petID;
  cID = req.params.categoryID;
  console.log(pID);
  var query = `
    SELECT *
    FROM (ebayData e JOIN petTypeMapping p ON e.pet_type_id = p.pet_type_id) JOIN petSuppliesMapping s ON 
    (e.pet_type_id = s.pet_type_id AND e.category_id = s.category_id)
    WHERE e.pet_type_id = '${pID}' and e.category_id = '${cID}'
  `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
