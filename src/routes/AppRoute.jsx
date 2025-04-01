import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import { AllFoods } from "../pages/AllFoods";
import AllFoodsA from "../pages/AllFoodsA";
import SingleFoodCard from "../components/SingleFoodCard";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout Route */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="all-food" element={<AllFoodsA/>}/>
          <Route path="/food/:id" element={<SingleFoodCard/>}/>
          <Route path="*" element={<NotFound />} />
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
