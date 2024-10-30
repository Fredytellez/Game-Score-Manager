import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getEmail, getFirstName, getLastName, getPassword } from "lab1/store/features/registerSlice";
import { useRouter } from "next/navigation";
/* import registerUser from "lab1/services/auth"; */

const RegisterForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  if (!router) {
    return null; 
  }


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const userData = { firstName, lastName, email, password };

    try {
      /* await registerUser(userData); */

      dispatch(getFirstName(email));
      dispatch(getLastName(password));
      dispatch(getEmail(password));
      dispatch(getPassword(password));

      router.push("/user-dashboard");
    } catch (error) {
      console.log("Register Failed:", error);
    }
  };

  const handleLoginButton = () => {
    router.push("/login")
  }

  return (
    <Container
      className="bg-white border rounded d-flex justify-content-center align-items-center mt-5"
      style={{ height: "90vh", width: "80vh"}}
    >
      <Row>
        <Col>
          <Form className="pt-4">
            <h1>Register</h1>
            <Form.Group className="mb-3" controlId="formGroupFirtsName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your LastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
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
            </Form.Group>
            <Container className="ms-auto">
            <Button variant="primary" onClick={handleRegister}>
              Register
            </Button>{" "}
            <Button variant="primary" onClick={handleLoginButton}>
              Login
            </Button>{" "}
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
