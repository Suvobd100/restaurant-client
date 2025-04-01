import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import NotFound from "../pages/NotFound";

const SingleFoodCard = () => {
  const {id} = useParams();
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   console.log(FoodDBId);

  useEffect(() => {
    fetchSingleFoodData()
  }, [id]);

  const fetchSingleFoodData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/food/${id}`
      );
      setFood(data);
    } catch (err) {
      console.error("Error fetching food:", err);
      setError(err.response?.data?.message || "Failed to fetch food");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner/>
  if (error) return <div>Error: {error}</div>;
  if (!food) return <NotFound/>;

  return (
    <div className="text-black">
      <h2>SingleFoodCard</h2>
      <h3>{food.foodName}</h3>
    </div>
  );
};

export default SingleFoodCard;
