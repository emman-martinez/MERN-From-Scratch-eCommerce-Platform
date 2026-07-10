export interface CartState {
  cartItems: { price: number; qty: number }[];
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}
