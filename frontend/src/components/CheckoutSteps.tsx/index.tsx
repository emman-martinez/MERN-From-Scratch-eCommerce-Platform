import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { copy } from "../../copy";
import type { CheckoutStepsProps } from "../../types";

const CheckoutSteps = ({ step1, step2, step3, step4 }: CheckoutStepsProps) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>{copy.login.signIn}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{copy.login.signIn}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>{copy.shipping.title}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{copy.shipping.title}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>{copy.payment.title}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{copy.payment.title}</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>{copy.placeOrder.title}</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>{copy.placeOrder.title}</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
