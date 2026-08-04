import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Loader from "../../components/Loader";
import Product from "../../components/Product";
import { copy } from "../../copy";
import { useGetProducts } from "../../hooks/useGetProducts";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, error, isLoading } = useGetProducts({ keyword, pageNumber: Number(pageNumber) });
  const { products, pages, page } = data || { products: [], pages: 1, page: 1 };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <>
          <h1>{copy.home.title}</h1>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
