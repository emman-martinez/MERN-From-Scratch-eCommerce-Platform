import { Router } from 'express';
import { env } from '../../config/env.ts';

export class PaypalRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/', (req, res) => {
      res.send({
        clientId: env.PAYPAL_CLIENT_ID,
      });
    });

    return router;
  }
}
