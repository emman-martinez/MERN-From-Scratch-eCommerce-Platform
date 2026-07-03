import { Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import Product from "../../components/Product";
import { copy } from "../../copy";
import { fetchProducts, productKeys } from "../../api/products";

const HomeScreen = () => {
  const { data: products = [] } = useQuery({
    queryKey: productKeys.all,
    queryFn: fetchProducts,
  });

  return (
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
  );
};

export default HomeScreen;
