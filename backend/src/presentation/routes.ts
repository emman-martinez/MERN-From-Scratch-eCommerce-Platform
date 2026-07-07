import { Router } from 'express';
import { HealthRoutes } from './health/routes.ts';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Define your routes here
    router.use('/api/health', HealthRoutes.routes);
    // router.use('/api/products', ProductRoutes.routes);

    return router;
  }
}
