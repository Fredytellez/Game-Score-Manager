import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const ResetPasswordComponent = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const handleResetPassword = (event) => {
    event.preventDefault();
    let timeLeft = 5;

    const countdownInterval = setInterval(() => {
      if (timeLeft > 1) {
        timeLeft -= 1;
        setCountdown(timeLeft);
      } else {
        clearInterval(countdownInterval);
        router.push("/login");
      }
    }, 1000);
  };

  return (
    <Container
      className="bg-white border rounded d-flex justify-content-center align-items-center mt-5"
      style={{ height: "40vh", width: "80vh" }}
      onSubmit={handleResetPassword}
    >
      <Row>
        <Col>
          <Form style={{ height: "30vh", width: "60vh" }}>
            <h2 className="text-center">
              Enter your username or email address
            </h2>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>User / email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter user or email"
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%" }}
              className="mb-3"
            >
              Restore
            </Button>{" "}
          </Form>
          {countdown < 5 && (
            <div>You will be redirected to login in: {countdown} seconds</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordComponent;
