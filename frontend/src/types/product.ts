export interface ProductData {
  products: Product[];
  page: number;
  pages: number;
}
export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}

export type ProductProps = {
  product: Product;
};

export interface ProductParams {
  keyword: string;
  pageNumber: number;
}
