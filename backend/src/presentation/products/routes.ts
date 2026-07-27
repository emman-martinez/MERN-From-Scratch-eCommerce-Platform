import { Router } from 'express';
import { ProductsController } from './controller.ts';
import asyncHandler from '../../middleware/asyncHandler.ts';
import { ProductService } from '../../services/product.service.ts';
import { protect, admin } from '../../middleware/authMiddleware.ts';

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();
    const productService = new ProductService();
    const controller = new ProductsController(productService);

    router
      .route('/')
      .get(controller.getProducts.bind(controller))
      .post(protect, admin, controller.createProduct.bind(controller));
    router.get('/:id', asyncHandler(controller.getProductById.bind(controller)));

    return router;
  }
}
