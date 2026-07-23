import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useUserLoginMutation } from "../../hooks/useUserLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { copy } from "../../copy/en";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import { setCredentials } from "../../store/slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useUserLoginMutation();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: (data) => {
          dispatch(setCredentials(data));
          navigate(redirect);
        },
        onError: (error) => {
          const message = isAxiosError<{ message?: string }>(error)
            ? error.response?.data.message
            : undefined;

          toast.error(message || "Login failed");
        },
      },
    );
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

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

        <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
          {copy.login.signIn}
        </Button>
        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          {copy.login.newCustomer}{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            {copy.login.register}
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
