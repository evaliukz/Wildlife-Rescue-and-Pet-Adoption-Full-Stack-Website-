import { Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";

import React from "react";

const Navb = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/" className="brand">
        <img src="/icon.png" height="80"/>
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Nav>
      <Nav.Link href="help" id="ebay">How to help?</Nav.Link>
        <Nav.Link href="findPets" id="find">Adopt Today</Nav.Link>
        <Nav.Link href="ebay" id="ebay">Pet Supplies</Nav.Link>
        <Nav.Link href="maps" id="maps">Maps</Nav.Link>
        <Nav.Link href="funfact" id="funfact">FunFacts</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navb;
