export interface CartState {
  cartItems: CartItem[];
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}

export interface CartItem {
  _id: number;
  image: string;
  name: string;
  price: number;
  qty: number;
  countInStock: number;
}

export type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
