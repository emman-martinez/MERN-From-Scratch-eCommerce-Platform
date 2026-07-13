import { Router } from 'express';
import { HealthRoutes } from './health/routes.ts';
import { ProductsRoutes } from './products/routes.ts';
import { UserRoutes } from './user/routes.ts';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Define your routes here
    router.use('/api/health', HealthRoutes.routes);
    router.use('/api/products', ProductsRoutes.routes);
    router.use('/api/users', UserRoutes.routes);

    return router;
  }
}
