import { api } from "./axios";
import { ORDERS_URL, PAYPAL_URL } from "../const";
import type { Order } from "../types/orders";

export const createOrder = async (order: Order): Promise<Order> => {
  const response = await api.post(`${ORDERS_URL}`, order);
  return response.data;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const response = await api.get(`${ORDERS_URL}/${id}`);
  return response.data;
};

export const payOrder = async ({
  orderId,
  details,
}: {
  orderId: string;
  details: object;
}): Promise<Order> => {
  const response = await api.put(`${ORDERS_URL}/${orderId}/pay`, details);
  return response.data;
};

export const getPayPalClientId = async (): Promise<string> => {
  const response = await api.get(`${PAYPAL_URL}`);
  return response.data;
};

export const getMyOrders = async (): Promise<Order[]> => {
  const response = await api.get(`${ORDERS_URL}/mine`);
  return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get(`${ORDERS_URL}`);
  return response.data;
};

export const deliverOrder = async (orderId: string): Promise<Order> => {
  const response = await api.put(`${ORDERS_URL}/${orderId}/deliver`);
  return response.data;
};
