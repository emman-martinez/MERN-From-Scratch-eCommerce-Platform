import type { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addToCart, removeFromCart } from "../../store/slices/cartSlice";
import Message from "../../components/Message";
import type { CartItem, FormControlElement } from "../../types/cart";
import { copy } from "../../copy";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (
    product: CartItem,
    event: ChangeEvent<FormControlElement, Element>,
  ) => {
    const qty = Number(event.target.value);
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id: number) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>{copy.cart.title}</h1>
        {cartItems.length === 0 ? (
          <Message>
            {copy.cart.empty} <Link to="/">{copy.cart.goBack}</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item: CartItem) => (
              <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, e)}
                    >
                      {[...Array(item?.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                {copy.cart.subtotal} (
                {cartItems.reduce((acc: number, item: CartItem) => acc + item.qty, 0)}){" "}
                {copy.cart.items}
              </h2>
              $
              {cartItems
                .reduce((acc: number, item: CartItem) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                {copy.cart.checkout}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
