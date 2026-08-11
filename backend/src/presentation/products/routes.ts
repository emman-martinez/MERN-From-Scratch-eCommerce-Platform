import { Router } from 'express';
import { ProductsController } from './controller.ts';
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
    router.route('/top').get(controller.getTopProducts.bind(controller));
    router
      .route('/:id')
      .get(controller.getProductById.bind(controller))
      .put(protect, admin, controller.updateProduct.bind(controller))
      .delete(protect, admin, controller.deleteProduct.bind(controller));
    router.route('/:id/reviews').post(protect, controller.createProductReview.bind(controller));

    return router;
  }
}
