import { Navbar, Nav } from "react-bootstrap";

import React from "react";

const Navb = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/" className="brand">
        Pet Lover
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Nav>
        <Nav.Link href="findPets">Find Pets</Nav.Link>
        <Nav.Link href="maps">Maps</Nav.Link>
        <Nav.Link href="funfact">FunFacts</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navb;
