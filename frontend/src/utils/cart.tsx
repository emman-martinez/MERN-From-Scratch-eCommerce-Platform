import type { CartState } from "../types/cart";

export const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: CartState) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      // acc is the accumulator, item is the current item in the array
      // The reduce function takes a callback function and an initial value (0 in this case)
      (acc: number, item: { price: number; qty: number }) => acc + item.price * item.qty,
      0,
    ),
  );

  // Calculate shipping price (if order is over $100 then free, else $10 shipping)
  state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);

  // Calculate tax price (15% of items price)
  state.taxPrice = addDecimals(Number((0.15 * Number(state.itemsPrice)).toFixed(2)));

  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
