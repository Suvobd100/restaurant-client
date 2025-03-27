import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* AuthLayout Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
