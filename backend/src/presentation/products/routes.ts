import { Router } from 'express';
import { ProductsController } from './controller.ts';

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ProductsController();

    router.get('/', controller.getProducts);
    router.get('/:id', controller.getProductById);

    return router;
  }
}
