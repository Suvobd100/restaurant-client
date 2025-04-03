import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import AppRoute from "./routes/AppRoute.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// Create a SINGLE instance of QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false, // optional
      // retry: 1, // optional
    },
  },
});



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient }>
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
    <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
