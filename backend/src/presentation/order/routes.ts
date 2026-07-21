import { Router } from 'express';
import { OrderService } from '../../services/order.service.ts';
import { OrderController } from './controller.ts';
import { protect, admin } from '../../middleware/authMiddleware.ts';

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();
    const orderService = new OrderService();
    const controller = new OrderController(orderService);
    router
      .route('/')
      .post(protect, controller.addOrderItems.bind(controller))
      .get(protect, admin, controller.getOrders.bind(controller));
    router.get('/mine', protect, controller.getMyOrders.bind(controller));
    router.get('/:id', protect, admin, controller.getOrderById.bind(controller));
    router.put('/:id/pay', protect, controller.updateOrderToPaid.bind(controller));
    router.put('/:id/deliver', protect, admin, controller.updateOrderToDelivered.bind(controller));

    return router;
  }
}
