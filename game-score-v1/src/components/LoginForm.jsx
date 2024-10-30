import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getEmail, getPassword } from "lab1/store/features/userSlice";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  if (!router) {
    return null; 
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const loginUserData = {
      email,
      password,
    };
    console.log(loginUserData);

    dispatch(getEmail(email));
    dispatch(getPassword(password));

    router.push("/user-dashboard");
  };

  const handleRegisterButton = () => {
    router.push("/register")
  }

  return (
    <Container
      className="bg-white border rounded d-flex justify-content-center align-items-center mt-5"
      style={{ height: "80vh", width: "80vh" }}
    >
      <Row>
        <Col>
          <Form>
            <h1>Login</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                alue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group >
            <Container className="ms-auto">
            <Button variant="primary" onClick={handleLogin}>
              Register
            </Button>{" "}
            <Button variant="primary" onClick={handleRegisterButton}>
              Login
            </Button>{" "}
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
