import type { Request, Response } from 'express';
import type { Types } from 'mongoose';
import { OrderModel } from '../data/mongo/models/index.ts';
import type { UserDocument } from '../data/mongo/models/user.model.ts';
import type { OrderDocument } from '../data/mongo/models/order.model.ts';

interface OrderData {
  user: UserDocument;
  orderItems: OrderDocument['orderItems'];
  shippingAddress: OrderDocument['shippingAddress'];
  paymentMethod: OrderDocument['paymentMethod'];
  paymentResult?: OrderDocument['paymentResult'];
  itemsPrice: OrderDocument['itemsPrice'];
  taxPrice: OrderDocument['taxPrice'];
  shippingPrice: OrderDocument['shippingPrice'];
  totalPrice: OrderDocument['totalPrice'];
  isPaid: OrderDocument['isPaid'];
  paidAt?: OrderDocument['paidAt'];
  isDelivered: OrderDocument['isDelivered'];
  deliveredAt?: OrderDocument['deliveredAt'];
}
export class OrderService {
  constructor() {}

  async addOrderItems(req: Request, res: Response) {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body as OrderData;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new OrderModel({
        user: req?.user?._id, // Assuming you have user information in the request object
        orderItems: orderItems.map((item) => ({
          ...item,
          product: item._id,
          _id: undefined, // Remove the _id field to avoid conflicts with MongoDB's ObjectId
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      return createdOrder;
    }
  }

  async getMyOrders(userId: Types.ObjectId) {
    const orders = await OrderModel.find({ user: userId });
    return orders;
  }

  async getOrderById(orderId: string | string[]) {
    const order = await OrderModel.findById(orderId).populate('user', 'name email'); // Populate the user field with name and email
    return order;
  }

  async updateOrderToPaid(orderId: string, paymentResult: OrderDocument['paymentResult']) {
    const order = await OrderModel.findById(orderId);

    if (order) {
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = paymentResult;

      const updatedOrder = await order.save();
      return updatedOrder;
    } else {
      throw new Error('Order not found');
    }
  }

  async updateOrderToDelivered(orderId: string) {
    const order = await OrderModel.findById(orderId);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = new Date();

      const updatedOrder = await order.save();
      return updatedOrder;
    } else {
      throw new Error('Order not found');
    }
  }

  async getOrders() {
    const orders = await OrderModel.find({});
    return orders;
  }
}
