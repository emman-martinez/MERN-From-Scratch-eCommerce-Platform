import type { Request, Response } from 'express';
import { ProductService } from '../../services/product.service.ts';

export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  // @desc Fetch all products
  // @route GET /api/products
  // @access Public
  async getProducts(_req: Request, res: Response) {
    const products = await this.productService.getProducts();

    if (!products) {
      res.status(404);
      throw new Error('Products not found');
    }

    res.status(200).json(products);
  }

  // @desc Fetch single product
  // @route GET /api/products/:id
  // @access Public
  async getProductById(req: Request, res: Response) {
    const productId = String(req.params.id);
    const product = await this.productService.getProductById(productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error(`Product with ID ${productId} not found`);
    }
  }
}
