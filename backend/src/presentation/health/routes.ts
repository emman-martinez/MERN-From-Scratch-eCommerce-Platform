import { Router } from 'express';
import { HealthController } from './controller.ts';

export class HealthRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new HealthController();

    router.get('/', controller.getHealthStatus);

    return router;
  }
}
