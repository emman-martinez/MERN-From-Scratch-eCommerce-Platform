import { useEffect, useState, type SubmitEvent } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import CheckoutSteps from "../../components/CheckoutSteps";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { savePaymentMethod } from "../../store/slices/cartSlice";
import { copy } from "../../copy";

const PaymentScreen = () => {
  const { Check, Group, Label } = Form;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1>{copy.payment.title}</h1>

      <Form onSubmit={submitHandler}>
        <Group>
          <Label as="legend">{copy.placeOrder.selectMethod}</Label>
          <Col>
            <Check
              type="radio"
              className="my-2"
              label={copy.placeOrder.paypalOrCreditCard}
              id="PayPal"
              name="paymentMethod"
              value={paymentMethod}
              checked={paymentMethod === copy.placeOrder.paypal}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Check>
          </Col>
        </Group>

        <Button type="submit" variant="primary">
          {copy.placeOrder.continue}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
