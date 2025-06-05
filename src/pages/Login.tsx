import config from "../config/config.json";
import SocialIcons from "../components/SocialIcons";
import WalkingIcon from "../assets/images/walking.png";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../assets/css/style.css";

const Login = () => {
  return (
    <div className="login-container">
      <Container
        fluid
        className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      >
        <Row className="w-100 justify-content-center align-items-center g-4">
          {/* Left - Login Form */}
          <Col xs={12} md={6} lg={5} className="d-flex justify-content-center">
            <Card className="w-100" style={{ maxWidth: "400px" }}>
              <Card.Body className="p-4">
                <h1 className="fw-bold mb-4">{config?.text[0]}</h1>
                <p>
                  New user?{" "}
                  <a href="#" className="text-decoration-none fw-semibold">
                    Create an account
                  </a>
                </p>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username or email"
                      className="border-secondary"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className="border-secondary"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Keep me signed in"
                      className="fw-semibold"
                    />
                  </Form.Group>
                  <Button variant="secondary" className="w-100 py-2 mb-4">
                    Sign In
                  </Button>
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
              style={{ maxWidth: "400px" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
