import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { copy } from "../../copy/en";
import FormContainer from "../../components/FormContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <FormContainer>
      <h1>{copy.login.signIn}</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>{copy.login.emailAddress}</Form.Label>
          <Form.Control
            type="email"
            placeholder={copy.login.enterEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>{copy.login.password}</Form.Label>
          <Form.Control
            type="password"
            placeholder={copy.login.enterPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2">
          {copy.login.signIn}
        </Button>

        <Row className="py-3">
          <Col>
            {copy.login.newCustomer} <Link to="/register">{copy.login.register}</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
