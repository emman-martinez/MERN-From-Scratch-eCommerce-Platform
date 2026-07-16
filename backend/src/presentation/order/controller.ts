import type { Request, Response } from 'express';
import type { OrderService } from '../../services/order.service.ts';

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @desc Create new order
  // @route POST /api/orders
  // @access Private
  async addOrderItems(req: Request, res: Response) {
    res.send('Add order items');
  }

  // @desc Get logged in user orders
  // @route GET /api/orders/myorders
  // @access Private
  async getMyOrders(req: Request, res: Response) {
    res.send('Get logged in user orders');
  }

  // @desc Get order by ID
  // @route GET /api/orders/:id
  // @access Private/Admin
  async getOrderById(req: Request, res: Response) {
    res.send('Get order by ID');
  }

  // @desc Update order to paid
  // @route PUT /api/orders/:id/pay
  // @access Private
  async updateOrderToPaid(req: Request, res: Response) {
    res.send('Update order to paid');
  }

  // @desc Update order to delivered
  // @route PUT /api/orders/:id/deliver
  // @access Private/Admin
  async updateOrderToDelivered(req: Request, res: Response) {
    res.send('Update order to delivered');
  }

  // @desc Get all orders
  // @route GET /api/orders
  // @access Private/Admin
  async getOrders(req: Request, res: Response) {
    res.send('Get all orders');
  }
}
