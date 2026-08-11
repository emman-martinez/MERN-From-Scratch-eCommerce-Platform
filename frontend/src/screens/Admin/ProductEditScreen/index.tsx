import ProductEditForm from "./ProductEditForm";
import { Link, useParams } from "react-router-dom";
import FormContainer from "../../../components/FormContainer";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { useGetProductById } from "../../../hooks/useGetProductById";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetProductById(productId!);

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.message}</Message>
        ) : (
          product && <ProductEditForm key={product._id} product={product} productId={productId} />
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
