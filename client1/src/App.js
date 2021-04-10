import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/screens/Home";
import FunFact from "./components/screens/FunFact";
import Maps from "./components/screens/Maps";
import FindPets from "./components/screens/FindPets";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/maps">
        <Maps />
      </Route>
      <Route path="/findpets">
        <FindPets />
      </Route>
      <Route path="/funfact">
        <FunFact />
      </Route>
    </BrowserRouter>
  );
}

export default App;