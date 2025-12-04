import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ThemeProvider from "./Providers/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <h2>Hello word</h2>
    </ThemeProvider>
  </StrictMode>
);
