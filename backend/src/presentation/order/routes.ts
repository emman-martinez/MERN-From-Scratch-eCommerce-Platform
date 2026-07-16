import { Router } from 'express';
import { OrderService } from '../../services/order.service.ts';
import { OrderController } from './controller.ts';
import { protect, admin } from '../../middleware/authMiddleware.ts';

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();
    const orderService = new OrderService();
    const controller = new OrderController(orderService);
    const {
      addOrderItems,
      getMyOrders,
      getOrderById,
      updateOrderToPaid,
      updateOrderToDelivered,
      getOrders,
    } = controller;

    router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
    router.get('/mine', protect, getMyOrders);
    router.get('/:id', protect, admin, getOrderById);
    router.put('/:id/pay', protect, updateOrderToPaid);
    router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

    return router;
  }
}
