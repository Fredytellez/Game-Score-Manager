import { useInputHook } from "@/app/hooks/input-hooks";
import validationHook from "@/app/hooks/validation-hook";
import { setToken } from "@/store/features/authSlice";
import {
  setConfirmPassword,
  setPassword,
  setEmail,
  setUserName,
} from "@/store/features/registerSlice";
import { useRegisterUserMutation } from "@/store/services/user.api";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { errors, validate } = validationHook();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    value: valueUserName,
    bind: bindUserName,
    reset: resetUserName,
  } = useInputHook();
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
  const {
    value: valueConfirmPassword,
    bind: bindConfirmPassword,
    reset: resetConfirmPassword,
  } = useInputHook();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fields = {
      username: valueUserName,
      password: valuePassword,
      confirmPassword: valueConfirmPassword,
    };
    if (!validate(fields)) {
      return;
    }

    try {
      const data = await registerUser({
        username: valueUserName,
        email: valueEmail,
        password: valuePassword,
        confirmPassword: valuePassword,
      }).unwrap();
      console.log(data);

      localStorage.setItem("token", data.token);
      dispatch(setToken(data.token));
      router.push("/user-dashboard");
    } catch (error) {
      console.error(error);
      if (error.originalStatus === 404) {
        alert("The endpoint was not found. Please check the URL.");
      } else {
        alert("Error al registrar el usuario: " + error.data || error.message);
      }
    }

    dispatch(setUserName(valueUserName));
    dispatch(setEmail(valueEmail));
    dispatch(setPassword(valuePassword));
    dispatch(setConfirmPassword(valueConfirmPassword));
    router.push("/user-dashboard");
  };

  const handleLoginButton = () => {
    router.push("/login");
  };

  return (
    <Container
      className="bg-white border rounded d-flex justify-content-center align-items-center mt-5"
      style={{ height: "90vh", width: "80vh" }}
    >
      <Row>
        <Col>
          <h1 className="text-center pb-5">Create an account</h1>
          <Form
            style={{ height: "60vh", width: "60vh" }}
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                isInvalid={!!errors.username}
                required
                {...bindUserName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
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
                isInvalid={!!errors.password}
                required
                {...bindPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
              <Form.Label>Confirm your password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                isInvalid={!!errors.confirmPassword}
                required
                {...bindConfirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%" }}
              className="mb-3"
            >
              Register
            </Button>{" "}
            <Container className="text-center mb-5">
              <Button variant="danger" className="me-2">
                <i className="fab fa-google"></i> Register with Google
              </Button>
              <Button variant="dark">
                <i className="fab fa-github"></i> Register with GitHub
              </Button>
            </Container>
            <Container className="text-center">
              <p>
                Already have an account?{""}
                <Button variant="link" onClick={handleLoginButton}>
                  <span>Log in.</span>
                </Button>
              </p>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterComponent;
