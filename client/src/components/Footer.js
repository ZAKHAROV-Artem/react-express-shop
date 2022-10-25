import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
const Footer = () => {
  return (
    <Navbar fixed="bottom" className="bg-dark bg-gradient">
      <Container>
        <Navbar.Brand className="text-white">ZAKHAROV ARTEM</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Footer;
