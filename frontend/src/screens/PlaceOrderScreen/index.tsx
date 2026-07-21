import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import CheckoutSteps from "../../components/CheckoutSteps";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { clearCartItems } from "../../store/slices/cartSlice";
import type { Order, OrderItem } from "../../types/orders";
import { useCreateOrderMutation } from "../../hooks/useCreateOrder";
import { copy } from "../../copy";

const PlaceOrderScreen = () => {
  const { Item } = ListGroup;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);
  const { createOrder, isLoading, error } = useCreateOrderMutation();

  const placeOrderHandler = () => {
    const orderData = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    } as Order;

    createOrder(orderData, {
      onSuccess: (data) => {
        dispatch(clearCartItems());
        navigate(`/order/${data._id}`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

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
        <Col md={8}>
          <ListGroup variant="flush">
            <Item>
              <h2>{copy.placeOrder.shipping}</h2>
              <p>
                <strong>{copy.placeOrder.address}: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode}, {""}
                {cart.shippingAddress.country}
              </p>
            </Item>
            <Item>
              <h2>{copy.placeOrder.paymentMethod}</h2>
              <strong>{copy.placeOrder.method}: </strong>
              {cart.paymentMethod}
            </Item>
            <Item>
              <h2>{copy.placeOrder.orderItems}</h2>
              {cart.cartItems.length === 0 ? (
                <Message>{copy.placeOrder.yourCartIsEmpty}</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item: OrderItem, index: number) => (
                    <Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </Item>
                  ))}
                </ListGroup>
              )}
            </Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <Item>
                <h2>{copy.placeOrder.orderSummary}</h2>
              </Item>
              <Item>
                <Row>
                  <Col>{copy.placeOrder.items}: </Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </Item>
              <Item>
                <Row>
                  <Col>{copy.placeOrder.shipping}: </Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </Item>
              <Item>
                <Row>
                  <Col>{copy.placeOrder.tax}: </Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </Item>
              <Item>
                <Row>
                  <Col>{copy.placeOrder.total}: </Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </Item>
              <Item>{error && <Message variant="danger">{error.message}</Message>}</Item>
              <Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  {copy.placeOrder.placeOrder}
                </Button>
                {isLoading && <Loader />}
              </Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
