import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../../components/Rating";
import { copy } from "../../copy";
import { useGetProductById } from "../../hooks/useGetProductById";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { addToCart } from "../../store/slices/cartSlice";
import { useAppDispatch } from "../../store/hooks";

const ProductScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams<{ id: string }>();
  const { data: product, error, isPending } = useGetProductById(productId ?? "");
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate(`/cart`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        {copy.product.goBack}
      </Link>
      {isPending ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    text={`${product?.numReviews} ${copy.product.reviews}`}
                    value={product?.rating || 0}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  {copy.product.price}: ${product?.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  {copy.product.description}: {product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>{copy.product.price}:</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>{copy.product.status}:</Col>
                      <Col>
                        <strong>
                          {product && product?.countInStock > 0
                            ? copy.product.inStock
                            : copy.product.outOfStock}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product && product?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>{copy.product.qty}</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product?.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product && product?.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      {copy.product.addToCart}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
