import type { Product } from "../../../../types/product";
import { useState, type SubmitEvent } from "react";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../../../components/Loader";
import { useUpdateProductMutation } from "../../../../hooks/useUpdateProduct";
import { useUploadProductImageMutation } from "../../../../hooks/useUploadProductImage";

type ProductEditFormProps = {
  product: Product;
  productId?: string;
};
const ProductEditForm = ({ product, productId }: ProductEditFormProps) => {
  const { Group, Label, Control } = Form;
  const navigate = useNavigate();
  const { updateProduct, isLoading: loadingUpdate } = useUpdateProductMutation();
  const { uploadProductImage, isLoading: loadingUpload } = useUploadProductImageMutation();
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category);
  const [countInStock, setCountInStock] = useState(product.countInStock);
  const [description, setDescription] = useState(product.description);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const payload = {
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    } as Product;

    await updateProduct(payload, {
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
    });
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    await uploadProductImage(formData, {
      onSuccess: (data) => {
        setImage(data.image);
        toast.success("Image uploaded successfully");
      },
      onError: (error) => {
        const message = isAxiosError<{ message?: string }>(error)
          ? error.response?.data.message
          : undefined;
        toast.error(message || "Error uploading image");
      },
    });
  };

  return (
    <>
      {loadingUpdate && <Loader />}

      <Form onSubmit={handleSubmit}>
        <Group controlId="name" className="my-2">
          <Label>Name</Label>
          <Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Group>

        <Group controlId="price" className="my-2">
          <Label>Price</Label>
          <Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </Group>

        <Group controlId="image" className="my-2">
          <Label>Image</Label>
          <Control
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Control type="file" onChange={handleUploadFile} />
          {loadingUpload && <Loader />}
        </Group>

        <Group controlId="brand" className="my-2">
          <Label>Brand</Label>
          <Control
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Group>

        <Group controlId="category" className="my-2">
          <Label>Category</Label>
          <Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Group>

        <Group controlId="countInStock" className="my-2">
          <Label>Count In Stock</Label>
          <Control
            type="number"
            placeholder="Enter count in stock"
            value={countInStock}
            onChange={(e) => setCountInStock(Number(e.target.value))}
          />
        </Group>

        <Group controlId="description" className="my-2">
          <Label>Description</Label>
          <Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Group>

        <Button type="submit" variant="primary" className="my-2">
          Update
        </Button>
      </Form>
    </>
  );
};

export default ProductEditForm;
