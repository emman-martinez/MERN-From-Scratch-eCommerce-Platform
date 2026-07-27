import { isAxiosError } from "axios";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { useGetProducts } from "../../../hooks/useGetProducts";
import { useCreateProductMutation } from "../../../hooks/useCreateProduct";

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProducts();
  const { createProduct, isLoading: loadingCreate } = useCreateProductMutation();

  const handleCreateProduct = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      await createProduct(undefined, {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          const message = isAxiosError<{ message?: string }>(error)
            ? error.response?.data.message
            : undefined;
          toast.error(message || "Error paying order");
        },
      });
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={handleCreateProduct} disabled={loadingCreate}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button variant="danger" className="btn-sm">
                    <FaTrash
                      style={{
                        color: "white",
                      }}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
