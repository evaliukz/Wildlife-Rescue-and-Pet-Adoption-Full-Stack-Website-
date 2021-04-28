const express = require("express");
const app = express();
const PORT = 5000;
const ebayRoute = require("./routes/ebayRoute");
const mapsRoute = require("./routes/maps");
const findPetsRoute = require("./routes/findPets");
//Middleware
// const middleware = () => {
//   console.log("middleware working");
// };
// app.use(middleware);

app.use(express.json());
//making routes here
app.use("/ebay", ebayRoute);
app.use("/maps", mapsRoute);
app.use("/findpets", findPetsRoute);

app.listen(PORT, () => {
  console.log("server is runing on", PORT);
});
// From Eva;
const bodyParser = require("body-parser");
var routes = require("./routes.js");
const cors = require("cors");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/query/getOrgContacts/:state", routes.getOrgContacts);
app.get("/query/funfact2", routes.getFunfact2);
app.get("/query/funfact3", routes.getFunfact3);
app.get("/query/funfact4", routes.getFunfact4);
app.get("/query/funfact5", routes.getFunfact5);
app.get("/query/funfact6", routes.getFunfact6);

app.listen(8081, () => {
  console.log(`Server listening on PORT 8081`);
});