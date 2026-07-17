import { api } from "./axios";
import { ORDERS_URL } from "../const";
import type { Order } from "../types/orders";

export const createOrder = async (order: Order): Promise<Order> => {
  const response = await api.post(`${ORDERS_URL}`, order);
  return response.data;
};
