// var config = require("./routes/db-config.js");
// var mysql = require("mysql");

// config.connectionLimit = 10;
// var connection = mysql.createPool(config);

// function ebay(req, res) {
//   const { petID, CateID } = req.body;
//   console.log(req.body);
//   var query = `
//       SELECT *
//       FROM ebay
//       WHERE pet_type_id = '${petID}' and category_id = '${CateID}'
//     `;
//   connection.query(query, function (err, rows, fields) {
//     if (err) console.log(err);
//     else {
//       res.json(rows);
//     }
//   });
// }

// module.exports = {
//   ebay: ebay,
// };
