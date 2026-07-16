import { OrderModel } from '../data/mongo/models/index.ts';

export class OrderService {
  constructor() {}

  async getOrders() {
    try {
      const orders = await OrderModel.find({});
      return orders;
    } catch {
      throw new Error('Error fetching orders');
    }
  }
}
