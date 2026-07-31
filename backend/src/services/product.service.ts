import { ProductModel } from '../data/mongo/models/index.ts';
import type { Types } from 'mongoose';

interface Product {
  user: Types.ObjectId;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
  image: string;
  name: string;
  numReviews: number;
  price: number;
  rating: number;
}

interface ReviewData {
  user: Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

export class ProductService {
  constructor() {}

  async getProducts({ pageSize, page }: { pageSize: number; page: number }) {
    const count = await ProductModel.countDocuments();

    try {
      const products = await ProductModel.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      return { products, count };
    } catch {
      throw new Error('Error fetching products');
    }
  }

  async getProductById(id: string) {
    const product = await ProductModel.findById(id);
    return product;
  }

  async createProduct(productData: Product) {
    const newProduct = new ProductModel(productData);
    const createdProduct = await newProduct.save();
    return createdProduct;
  }

  async updateProduct(id: string, productData: Partial<Product>) {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    Object.assign(product, productData);
    const updatedProduct = await product.save();
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    await product.deleteOne();

    return product;
  }

  async createProductReview(id: string, reviewData: ReviewData) {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    const alreadyReviewed = product.reviews?.find(
      (review) => review.user.toString() === reviewData.user.toString(),
    );

    if (alreadyReviewed) {
      throw new Error('Product already reviewed by this user');
    }

    const newReview = {
      user: reviewData.user,
      name: reviewData.name,
      comment: reviewData.comment,
      rating: reviewData.rating,
    };

    product.reviews?.push(newReview);
    product.numReviews = product.reviews?.length || 0;
    product.rating =
      product.reviews?.reduce((acc, item) => item.rating + acc, 0) /
        (product.reviews?.length || 1) || 0;

    await product.save();

    return newReview;
  }
}
