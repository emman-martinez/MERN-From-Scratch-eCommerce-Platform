import { isAxiosError } from "axios";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetProducts } from "../../hooks/useGetProducts";
import { useCreateProductMutation } from "../../hooks/useCreateProduct";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import Paginate from "../../components/Paginate";

const ProductListScreen = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const { data, isLoading, error, refetch } = useGetProducts({ pageNumber: Number(pageNumber) });
  const { products, pages, page } = data || { products: [], pages: 1, page: 1 };
  const { createProduct, isLoading: loadingCreate } = useCreateProductMutation();
  const { isLoading: loadingDelete, deleteProduct } = useDeleteProduct();

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

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id, {
        onSuccess: () => {
          toast.success("Product deleted successfully");
          refetch();
        },
        onError: (error) => {
          const message = isAxiosError<{ message?: string }>(error)
            ? error.response?.data.message
            : undefined;
          toast.error(message || "Error deleting product");
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
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <>
          {" "}
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
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
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
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
