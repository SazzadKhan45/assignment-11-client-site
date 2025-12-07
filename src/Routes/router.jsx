import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "./../Pages/Register/Register";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import AddProduct from "../Components/AddProduct/AddProduct";
import AllProducts from "../Components/AllProducts/AllProducts";

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
        path: "/blogs",
        element: <h2>Hello world</h2>,
      },
      {
        path: "/contact",
        element: <h2>Hello world</h2>,
      },
      {
        path: "/add-product",
        Component: AddProduct,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <h2>Hello world</h2>{" "}
          </PrivateRoutes>
        ),
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

  // User DashBoard Routes
]);

export default router;
