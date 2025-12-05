import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "./../Pages/Register/Register";

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
        path: "/service",
        element: <h2>Hello world</h2>,
      },
      {
        path: "/blogs",
        element: <h2>Hello world</h2>,
      },
      {
        path: "/contact",
        element: <h2>Hello world</h2>,
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
]);

export default router;
