import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetTopProducts } from "../../hooks/products/useGetTopProducts";

const ProductCarousel = () => {
  const { Item, Caption } = Carousel;
  const { data: products, error, isLoading } = useGetTopProducts();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error.message}</Message>;
  }

  return (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products?.map((product) => (
        <Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Caption>
          </Link>
        </Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
