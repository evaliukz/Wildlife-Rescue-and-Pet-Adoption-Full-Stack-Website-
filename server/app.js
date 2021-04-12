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
