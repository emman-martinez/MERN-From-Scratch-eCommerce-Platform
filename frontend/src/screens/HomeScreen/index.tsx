import { Row, Col } from "react-bootstrap";
import Loader from "../../components/Loader";
import Product from "../../components/Product";
import { copy } from "../../copy";
import { useGetProducts } from "../../hooks/useGetProducts";
import Message from "../../components/Message";

const HomeScreen = () => {
  const { data: products = [], error, isPending } = useGetProducts();

  return (
    <>
      {isPending ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <>
          <h1>{copy.home.title}</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
