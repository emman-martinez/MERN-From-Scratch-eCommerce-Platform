import type { Request, Response } from 'express';
import products from '../../data/products.ts';

export class ProductsController {
  getProducts(req: Request, res: Response) {
    res.status(200).json(products);
  }

  getProductById(req: Request, res: Response) {
    const product = products.find((p) => p._id === req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
}
