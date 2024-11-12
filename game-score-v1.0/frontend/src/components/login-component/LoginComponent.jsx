import { useInputHook } from "@/app/hooks/input-hooks";
import { setToken } from "@/store/features/authSlice";
import { setEmail } from "@/store/features/loginSlice";
import { useLoginUserMutation } from "@/store/services/user.api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

const LoginComponent = () => {
  const [loginUser, { isUpdating }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState(null);

  const {
    value: valueEmail,
    bind: bindEmail,
    reset: resetEmail,
  } = useInputHook();
  const {
    value: valuePassword,
    bind: bindPassword,
    reset: resetPassword,
  } = useInputHook();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null)
    loginUser({ email: valueEmail, password: valuePassword })
      .unwrap()
      .then((data) => {
        console.log(data);
        //Guarda el token
        localStorage.setItem("token", data.token);
        dispatch(setToken(data.token));
        dispatch(setEmail(valueEmail));
        resetEmail();
        resetPassword();
        // Redirige al dash una vex inicie sesion
        router.push("user-dashboard");
      })
      .catch((err) => {
        if (err.status === 401) {
          setError("Incorrect email or password."); // Mensaje de error personalizado
        } else {
          setError("An unexpected error occurred. Please try again."); // Otro tipo de error
        }
      });
  };

  const handleRegisterButton = () => {
    router.push("/register");
  };

  const handleRessetPassword = () => {
    router.push("/login/reset-password");
  };
  return (
    <Container
      className="bg-white border rounded d-flex justify-content-center align-items-center mt-5"
      style={{ height: "80vh", width: "80vh" }}
    >
      <Row>
        <Col>
          <Form
            style={{ height: "60vh", width: "60vh" }}
            onSubmit={handleSubmit}
          >
            <h1 className="text-center">Login</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                {...bindEmail}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                {...bindPassword}
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
              <div className="text-end mt-1">
                <Button
                  variant="link"
                  onClick={handleRessetPassword}
                  className="p-0 text-dark"
                  style={{ fontSize: "0.875rem" }}
                >
                  <span>Forgot your password?</span>
                </Button>
              </div>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%" }}
              className="mb-3"
            >
              Login
            </Button>{" "}
            <Container className="text-center mb-5">
              <Button variant="danger" className="me-2">
                <i className="fab fa-google"></i> Login with Google
              </Button>
              <Button variant="dark">
                <i className="fab fa-github"></i> Login with GitHub
              </Button>
            </Container>
            <Container className="text-center">
              <p>
                Dont have an account?{""}
                <Button variant="link" onClick={handleRegisterButton}>
                  <span>Register here.</span>
                </Button>
              </p>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginComponent;
