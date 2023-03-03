import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "./user-context";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  console.log(userInfo);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      fetch("http://localhost:8080/api/profile", {
        credentials: "include",
      })
        .then((response) => {
          response.json().then((data) => {
            setUserInfo(data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const logout = () => {
    fetch("http://localhost:8080/api/logout", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        if (data.loggedout) {
          setUserInfo(null);
        }
      });
    });
  };

  const email = userInfo?.email;

  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">MERN Blog App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end  mt-md-2">
          {email && (
            <>
              <Navbar.Text>
                <Link to={"/"} className="me-2">
                  {userInfo.firstname}
                </Link>
              </Navbar.Text>
              <Link to="/create">
                <Button variant="primary" className="me-2 btn-sm">
                  Create new post
                </Button>
              </Link>
              <Button
                variant="secondary"
                className="me-2 btn-sm"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
          {!email && (
            <>
              <Link to="/login">
                <Button variant="primary" className="me-2 btn-sm">
                  Login
                </Button>
              </Link>
              <Link to="register">
                <Button variant="secondary" className="me-2 btn-sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
