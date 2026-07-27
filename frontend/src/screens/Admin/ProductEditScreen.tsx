import { /* useEffect, */ useState, type SubmitEvent } from "react";
import { isAxiosError } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useUpdateProductMutation } from "../../hooks/useUpdateProduct";
import { useGetProductById } from "../../hooks/useGetProductById";
import type { Product } from "../../types/product";

const ProductEditScreen = () => {
  const { Group, Label, Control } = Form;
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const { /* data: product */ isPending, error } = useGetProductById(productId!);
  const { updateProduct, isLoading: loadingUpdate } = useUpdateProductMutation();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    await updateProduct(
      {
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      } as Product,
      {
        onSuccess: () => {
          toast.success("Product updated successfully");
          navigate("/admin/productlist");
        },
        onError: (error) => {
          const message = isAxiosError<{ message?: string }>(error)
            ? error.response?.data.message
            : undefined;
          toast.error(message || "Error updating product");
        },
      },
    );
  };

  //   useEffect(() => {
  //     if (product) {
  //       setName(product.name);
  //       setPrice(product.price);
  //       setImage(product.image);
  //       setBrand(product.brand);
  //       setCategory(product.category);
  //       setCountInStock(product.countInStock);
  //       setDescription(product.description);
  //     }
  //   }, [product]);

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}

        {isPending ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.message}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Group controlId="name" className="my-2">
              <Label>Name</Label>
              <Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Control>
            </Group>

            <Group controlId="price" className="my-2">
              <Label>Price</Label>
              <Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              ></Control>
            </Group>

            <Group controlId="image" className="my-2">
              <Label>Image</Label>
              <Control
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Control>
            </Group>

            <Group controlId="brand" className="my-2">
              <Label>Brand</Label>
              <Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Control>
            </Group>

            <Group controlId="category" className="my-2">
              <Label>Category</Label>
              <Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Control>
            </Group>

            <Group controlId="countInStock" className="my-2">
              <Label>Count In Stock</Label>
              <Control
                type="number"
                placeholder="Enter count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              ></Control>
            </Group>

            <Group controlId="description" className="my-2">
              <Label>Description</Label>
              <Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Control>
            </Group>

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
