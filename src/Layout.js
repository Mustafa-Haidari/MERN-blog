import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Container from "react-bootstrap/Container";

const Layout = () => {
  return (
    <Container>
      <Header />
      <Container className="mt-4" fluid>
        <Outlet />
      </Container>
    </Container>
  );
};

export default Layout;
