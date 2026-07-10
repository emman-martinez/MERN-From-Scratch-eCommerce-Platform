import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
import { copy } from "../../copy";
import { useGetProducts } from "../../hooks/useGetProducts";

const HomeScreen = () => {
  const { data: products = [], error, isLoading } = useGetProducts();

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <p>{error.message}</p>
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
