import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeScreen from "../../screens/HomeScreen";
import ProductScreen from "../../screens/ProductScreen";
import CartScreen from "../../screens/CartScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "/product/:id",
        element: <ProductScreen />,
      },
      {
        path: "/cart",
        element: <CartScreen />,
      },
    ],
  },
]);
