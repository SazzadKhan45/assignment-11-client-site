import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "./../Pages/Register/Register";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import AddProduct from "../Components/AddProduct/AddProduct";
import AllProducts from "../Components/AllProducts/AllProducts";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import AdminOrManagerRoute from "../PrivateRoutes/AdminOrManagerRoute";
import DashBoard from "../Layouts/DashBoard/DashBoard";
import AllProductsTable from "../Components/DashBoardComponents/AllProductsTable";
import UserCollections from "../Components/DashBoardComponents/UserCollections";
import ManagerProducts from "../Components/DashBoardComponents/ManagerProducts";
import OrderPage from "../Components/OrderPage/OrderPage";
import AdminOrderPage from "../Components/DashBoardComponents/AdminOrderPage";
import ManagerOrder from "../Components/DashBoardComponents/ManagerOrder";
import BuyerOrderPage from "./../Components/DashBoardComponents/BuyerOrderPage";
import AdminProfile from "../Components/DashBoardComponents/AdminProfile";
import ManagerProfile from "../Components/DashBoardComponents/ManagerProfile";
import BuyerProfile from "../Components/DashBoardComponents/BuyerProfile";
import OnlinePayment from "../Components/OnlinePayment/OnlinePayment";
import CancelPayment from "../Components/CancelPayment/CancelPayment";
import AboutUs from "../Components/AboutUs/AboutUs";
import ContactUs from "../Components/ContactUs/ContactUs";
import ManagerStatusPending from "../Components/DashBoardComponents/ManagerStatusPending";
import ManagerSuspend from "../Components/DashBoardComponents/ManagerSuspend";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <h2>Something went wrong!</h2>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-products",
        Component: AllProducts,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
      {
        path: "/add-product",
        element: (
          <AdminOrManagerRoute>
            {" "}
            <AddProduct />{" "}
          </AdminOrManagerRoute>
        ),
      },
      {
        path: "/product-details/:id",
        Component: ProductDetails,
      },
      {
        path: "/order-product/:id",
        Component: OrderPage,
      },
    ],
  },

  // AuthLayout Routes here
  {
    path: "/auth",
    Component: AuthLayout,
    errorElement: <h2>Something went wrong!</h2>,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  // DashBoard Route
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        {" "}
        <DashBoard />{" "}
      </PrivateRoutes>
    ),
    errorElement: <h2>Something went wrong!</h2>,
    children: [
      {
        path: "adminProfile",
        Component: AdminProfile,
      },
      {
        path: "managerProfile",
        Component: ManagerProfile,
      },
      {
        path: "buyerProfile",
        Component: BuyerProfile,
      },
      {
        path: "all-products",
        Component: AllProductsTable,
      },
      {
        path: "user-collections",
        Component: UserCollections,
      },
      {
        path: "manager-products",
        Component: ManagerProducts,
      },
      {
        path: "buyer-order",
        Component: BuyerOrderPage,
      },
      {
        path: "all-orders",
        Component: AdminOrderPage,
      },
      {
        path: "manager-order",
        Component: ManagerOrder,
      },
      {
        path: "payment-success",
        Component: OnlinePayment,
      },
      {
        path: "payment-cancel",
        Component: CancelPayment,
      },
      {
        path: "pending",
        Component: ManagerStatusPending,
      },
      {
        path: "suspend",
        Component: ManagerSuspend,
      },
    ],
  },

  // User DashBoard Routes
]);

export default router;
