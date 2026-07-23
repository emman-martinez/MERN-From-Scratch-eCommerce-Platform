import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import App from "../App";
import HomeScreen from "../../screens/HomeScreen";
import ProductScreen from "../../screens/ProductScreen";
import CartScreen from "../../screens/CartScreen";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import ShippingScreen from "../../screens/ShippingScreen";
import PrivateRoute from "../../components/PrivateRoute";
import PaymentScreen from "../../screens/PaymentScreen";
import PlaceOrderScreen from "../../screens/PlaceOrderScreen";
import OrderScreen from "../../screens/OrderScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import AdminRoute from "../../components/AdminRoute";
import OrderListScreen from "../../screens/Admin/OrderListScreen/OrderListScreen";

const publicRoutes: RouteObject[] = [
  { index: true, element: <HomeScreen /> },
  { path: "/product/:id", element: <ProductScreen /> },
  { path: "/cart", element: <CartScreen /> },
  { path: "/login", element: <LoginScreen /> },
  { path: "/register", element: <RegisterScreen /> },
];

const privateRoutes: RouteObject[] = [
  { path: "/shipping", element: <ShippingScreen /> },
  { path: "/payment", element: <PaymentScreen /> },
  { path: "/placeorder", element: <PlaceOrderScreen /> },
  { path: "/order/:id", element: <OrderScreen /> },
  { path: "/profile", element: <ProfileScreen /> },
];

const adminRoutes: RouteObject[] = [{ path: "/admin/orderList", element: <OrderListScreen /> }];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      ...publicRoutes,
      {
        element: <PrivateRoute />,
        children: privateRoutes,
      },
      {
        element: <AdminRoute />,
        children: adminRoutes,
      },
    ],
  },
]);
