import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">MERN Blog App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end gap-2">
          <Navbar.Text>
            <a href="#login">Mark Otto</a>
          </Navbar.Text>
          <Link to="/login">
            <Button variant="primary">Login</Button>
          </Link>
          <Link to="register">
            <Button variant="primary">Register</Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
