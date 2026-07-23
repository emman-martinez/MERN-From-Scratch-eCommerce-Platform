import type { Request, Response } from 'express';
import type { OrderService } from '../../services/order.service.ts';

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // @desc Create new order
  // @route POST /api/orders
  // @access Private
  async addOrderItems(req: Request, res: Response) {
    const createdOrder = await this.orderService.addOrderItems(req, res);

    res.status(201).json(createdOrder);
  }

  // @desc Get logged in user orders
  // @route GET /api/orders/myorders
  // @access Private
  async getMyOrders(req: Request, res: Response) {
    const userId = req.user?._id; // Assuming you have user information in the request object

    if (!userId) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const orders = await this.orderService.getMyOrders(userId);

    res.status(200).json(orders);
  }

  // @desc Get order by ID
  // @route GET /api/orders/:id
  // @access Private/Admin
  async getOrderById(req: Request, res: Response) {
    const orderId = req.params.id;

    const order = await this.orderService.getOrderById(orderId);

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    res.status(200).json(order);
  }

  // @desc Update order to paid
  // @route PUT /api/orders/:id/pay
  // @access Private
  async updateOrderToPaid(req: Request, res: Response) {
    const orderId = req.params.id;
    const paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const order = await this.orderService.updateOrderToPaid(orderId, paymentResult);

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    res.status(200).json(order);
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
    const orders = await this.orderService.getOrders();

    if (!orders) {
      res.status(404);
      throw new Error('Orders not found');
    }

    res.status(200).json(orders);
  }
}
