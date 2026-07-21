interface User {
  _id?: string;
  name: string;
  email: string;
}

export interface Order {
  _id?: string;
  user?: User;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}

export interface OrderItem {
  _id?: string;
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentResult {
  id?: string;
  status?: string;
  update_time?: string;
  email_address?: string;
}
