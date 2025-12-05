import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ThemeProvider from "./Providers/ThemeProvider";
import { RouterProvider } from "react-router";
import router from "./Routes/router";
import AuthProvider from "./Providers/AuthProvider";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" autoClose={4000} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
