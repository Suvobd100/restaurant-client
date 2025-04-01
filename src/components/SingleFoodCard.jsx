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

//   data destraring

const {
    _id,
    foodId,
    foodName,
    foodImageURL,
    foodOrigin,
    Description,
    Price,
    purchaseCount,
    availableQuantity,
  } = food;

  return (
    <div className="text-stone-300">
      <h2>SingleFoodCard</h2>
      <h3>{food.foodName}</h3>
      <div className="w-11/12 justify-center mx-auto mb-2">
      <div className="card bg-base-100 w-full shadow-sm">
        <div className="mt-3 ml-10 flex justify-center ">
          <h2 className="card-title text-2xl p-2 text-center">
            {foodName}
          </h2>
        </div>
        <figure className="px-10 pt-4">
          <img
            src={foodImageURL}
            alt={foodImageURL}
            className="rounded-xl aspect-6/2 object-cover"
          />
        </figure>
        <div className="card-body items-center px-4">
          <ul>
            <li className="flex space-x-16 py-2">
              <h2 className="font-semibold ">Food Origin:</h2>
              <p className="text-right font-semibold">{foodOrigin}</p>
            </li>

            <li className="grid grid-cols-2 mt-4 space-x-4">
              <h2 className="font-semibold text-left">Description:</h2>
              <p className="text-right">{Description}</p>
            </li>
            <li className="grid grid-cols-2 mt-4 space-x-16 ">
              <h2 className="font-semibold text-left ">Price:</h2>
              <p className="text-right">${Price}</p>
            </li>
            <li className="grid grid-cols-2 mt-4 space-x-16 ">
              <h2 className="font-semibold text-left "> Purchase Count:</h2>
              <p className="text-right">{purchaseCount}</p>
            </li>
          </ul>
          <div className="card-actions mt-4">
            {/* <Link to={`/food/${_id}`}>
              <button className="btn bg-stone-500">See Details</button>
              </Link> */}
              <button className="btn bg-stone-500">Purchase</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SingleFoodCard;
