import axios from "axios";
import React, { useEffect, useState } from "react";
import FoodCard from "../components/foodCard";

export const AllFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchAllFoods();
  }, []);

  const fetchAllFoods = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods`);
    setFoods(data);
  };
  console.log(foods);

  return (
    <div
      className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 
    md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {foods.map((food) => (
        <FoodCard key={food._id} food={food} />
      ))}
    </div>
  );
};
