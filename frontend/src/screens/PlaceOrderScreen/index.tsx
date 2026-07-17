import { useEffect } from "react";
import { /* Link, */ useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { /* Button, Card, */ Col, /* Image, ListGroup, */ Row } from "react-bootstrap";
import CheckoutSteps from "../../components/CheckoutSteps";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>8</Col>
        <Col md={4}>4</Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
