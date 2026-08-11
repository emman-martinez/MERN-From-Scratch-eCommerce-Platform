import { isAxiosError } from "axios";
import { useState, type SubmitEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Rating from "../../components/Rating";
import { copy } from "../../copy";
import { useGetProductById } from "../../hooks/useGetProductById";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { addToCart } from "../../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCreateNewReview } from "../../hooks/products/useCreateNewReview";
import Meta from "../../components/Meta";

const ProductScreen = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id: productId } = useParams<{ id: string }>();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: product, error, isLoading, refetch } = useGetProductById(productId ?? "");
  const { createReview, isLoading: loadingProductReview } = useCreateNewReview();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate(`/cart`);
  };

  const handleSubmitReview = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      id: productId ?? "",
      review: {
        rating,
        comment,
      },
    };

    await createReview(payload, {
      onSuccess: () => {
        toast.success("Review submitted successfully");
        setRating(0);
        setComment("");
        refetch();
      },
      onError: (error) => {
        const message = isAxiosError<{ message?: string }>(error)
          ? error.response?.data.message
          : undefined;
        toast.error(message || "Something went wrong");
      },
    });
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        {copy.product.goBack}
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <>
          <Meta title={product?.name} />
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
          <Row className="mt-5">
            <Col md={6}>
              <h2>Reviews</h2>
              {product?.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product?.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} text="" />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {loadingProductReview && <Loader />}
                  {userInfo ? (
                    <Form onSubmit={handleSubmitReview}>
                      <Form.Group controlId="rating" className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="mb-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button disabled={loadingProductReview} type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
