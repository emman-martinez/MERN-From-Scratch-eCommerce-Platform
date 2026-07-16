import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeScreen from "../../screens/HomeScreen";
import ProductScreen from "../../screens/ProductScreen";
import CartScreen from "../../screens/CartScreen";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import ShippingScreen from "../../screens/ShippingScreen";

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
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "/shipping",
        element: <ShippingScreen />,
      },
    ],
  },
]);
