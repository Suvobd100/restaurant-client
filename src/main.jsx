import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import AppRoute from "./routes/AppRoute.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);
