import type { Request, Response } from 'express';
import { ProductService } from '../../services/product.service.ts';

export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  async getProducts(_req: Request, res: Response) {
    const products = await this.productService.getProducts();

    res.json(products);
  }

  async getProductById(req: Request, res: Response) {
    const productId = String(req.params.id);
    const product = await this.productService.getProductById(productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
}
