import { Router } from 'express';
import { ProductsController } from './controller.ts';
import asyncHandler from '../../middleware/asyncHandler.ts';
import { ProductService } from '../../services/product.service.ts';

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();
    const productService = new ProductService();
    const controller = new ProductsController(productService);

    router.get('/', asyncHandler(controller.getProducts.bind(controller)));
    router.get('/:id', asyncHandler(controller.getProductById.bind(controller)));

    return router;
  }
}
