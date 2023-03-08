import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./user-context";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      fetch(`${process.env.REACT_APP_API}api/profile`, {
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
    fetch(`${process.env.REACT_APP_API}api/logout`, {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        if (data.loggedout) {
          setUserInfo(null);
          navigate("/");
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
          {userInfo && (
            <>
              <Navbar.Text className="me-2">
                Signed in as {userInfo.firstname}
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
