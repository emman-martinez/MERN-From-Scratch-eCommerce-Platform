import { ProductModel } from '../data/mongo/models/index.ts';

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
}
