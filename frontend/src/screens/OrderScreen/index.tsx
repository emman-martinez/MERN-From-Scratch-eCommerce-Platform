import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrderById } from "../../hooks/useGetOrderById";

const OrderScreen = () => {
  const { Item } = ListGroup;
  const { id: orderId } = useParams<{ id: string }>();
  const { data: order, error, isLoading } = useGetOrderById(orderId as string);

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error.message}</Message>;

  return (
    <>
      <h1>Order {order?._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order?.user?.name}
              </p>
              <p>
                <strong>Email: </strong> {order?.user?.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order?.shippingAddress.address}, {order?.shippingAddress.city}{" "}
                {order?.shippingAddress.postalCode}, {order?.shippingAddress.country}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">
                  Delivered on {order?.deliveredAt?.toLocaleDateString()}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </Item>

            <Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong> {order?.paymentMethod}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order?.paidAt?.toLocaleDateString()}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </Item>

            <Item>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <>
                  {order?.orderItems.map((item, index) => (
                    <Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </Item>
                  ))}
                </>
              )}
            </Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <Item>
                <h2>Order Summary</h2>
              </Item>
              <Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order?.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </Item>
              {/* PAY ORDER PLACEHOLDER */}
              {/* MARK AS DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
