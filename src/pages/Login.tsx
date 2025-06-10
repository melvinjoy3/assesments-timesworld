import config from "../config/config.json";
import SocialIcons from "../components/SocialIcons";
import WalkingIcon from "../assets/images/walking.png";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import "../assets/css/style.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import { useState } from "react";
import { validatePassword } from "../utils/utils";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });

    // Clear error when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });

    // Validate password as user types
    if (name === "password") {
      const passwordError = validatePassword(value);
      setErrors((prev) => ({
        ...prev,
        password: passwordError,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate username
    if (!loginDetails.userName.trim()) {
      setErrors((prev) => ({
        ...prev,
        userName: "Username is required",
      }));
      return;
    }

    // Validate password
    const passwordError = validatePassword(loginDetails.password);
    if (passwordError) {
      setErrors((prev) => ({
        ...prev,
        password: passwordError,
      }));
      return;
    }

    // If all validations pass
    navigate("/home");
  };

  return (
    <div className="login-container">
      <Container
        fluid
        className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      >
        <Row className="w-100 justify-content-center align-items-center g-4">
          {/* Left - Login Form */}
          <Col xs={12} md={6} lg={5} className="d-flex justify-content-center">
            <Card className="w-100">
              <Card.Body className="p-4">
                <h1 className="fw-bold mb-4">{config?.text[0]}</h1>
                <p>New user? Create an account</p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username or email"
                      className={`border-secondary ${
                        errors.userName ? "is-invalid" : ""
                      }`}
                      value={loginDetails?.userName}
                      onChange={handleChange}
                      name="userName"
                    />
                    {errors.userName && (
                      <div className="invalid-feedback">{errors.userName}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className={`border-secondary ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      name="password"
                      value={loginDetails?.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3  align-items-center">
                    <Form.Check
                      type="checkbox"
                      label="Keep me signed in"
                      className="fw-semibold d-flex align-items-center gap-3"
                    />
                  </Form.Group>
                  <Button styles={"w-100"}>{"Sign In"}</Button>
                  <div className="d-flex align-items-center mb-4">
                    <hr className="flex-grow-1" />
                    <span className="px-3 text-muted fw-semibold">
                      Or Sign In With
                    </span>
                    <hr className="flex-grow-1" />
                  </div>
                  <SocialIcons />
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right - Image */}
          <Col md={6} lg={5} className="d-none d-md-block">
            <img
              src={WalkingIcon}
              alt="Login Illustration"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
