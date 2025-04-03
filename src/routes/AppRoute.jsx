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
import FoodPurchase from "../pages/FoodPurchase";
import PrivateRoute from "./PrivateRoute";
import PrivateLayout from "../layouts/PrivateLayout";
import PhotoGallery from "../pages/PhotoGallery";
import MyFoodPage from "../pages/MyFoodPage";
import AddFoodPage from "../pages/AddFoodPage";
import MyOrders from "../pages/MyOrders";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout Route */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/all-food" element={<AllFoodsA/>}/>
          <Route path="/food/:id" element={<SingleFoodCard/>}/>
          <Route path="/gallery" element={<PhotoGallery/>}/>
          {/* <Route path="/food-purchase" element={<FoodPurchase/>}/> */}

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Private route */}
        <Route path="/priv" element={<PrivateLayout/>}>
          
          <Route path="food-purchase" element={<PrivateRoute><FoodPurchase/></PrivateRoute>}/>
          <Route path="my-food-page" element={<PrivateRoute><MyFoodPage/></PrivateRoute>}/>
          <Route path="add-food-page" element={<PrivateRoute><AddFoodPage/></PrivateRoute>}/>
          <Route path="my-orders" element={<PrivateRoute><MyOrders/></PrivateRoute>}/>
         
          {/* <Route path="lesson/:id" element={<PrivateRoute><LessonDetail/></PrivateRoute>}/> */}
          {/* <Route path="vtutorials" element={<PrivateRoute><TutorialAll/></PrivateRoute>}/> */}
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
