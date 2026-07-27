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

export class ProductService {
  constructor() {}

  async getProducts() {
    try {
      const products = await ProductModel.find({});
      return products;
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
}
