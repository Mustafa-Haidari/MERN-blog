import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Card from "react-bootstrap/Card";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const formHandler = (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          console.log(data);
          // setUserInfo(data);
          // navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        toast.error(error);
      });
  };
  return (
    <>
      <ToastContainer />
      <h1 className="text-center">Register form</h1>
      <Card className="p-4 mt-5 form-layout">
        <Form onSubmit={formHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default Login;
