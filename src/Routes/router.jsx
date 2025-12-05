import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";

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
    ],
  },
]);

export default router;
