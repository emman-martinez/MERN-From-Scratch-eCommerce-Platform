import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../../components/Rating";
import products from "../../mockData/products";
import { copy } from "../../copy";

const ProductScreen = () => {
  const { id: productId } = useParams<{ id: string }>();
  const product = products.find((p) => p._id === productId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        {copy.product.goBack}
      </Link>
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
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product && product?.countInStock === 0}
                >
                  {copy.product.addToCart}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
