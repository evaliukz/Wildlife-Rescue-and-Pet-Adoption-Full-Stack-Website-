router.post("/zip", (req, res) => {
  const { zipCode } = req.body;
  //   console.log(zipCode);

  //   console.log(left);
  //   console.log(right);
  var query = `
        SELECT *
        FROM  zipcodeMapping 
        WHERE zip = '${zipcode}' 
      `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});
