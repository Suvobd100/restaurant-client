import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";

const FoodPurchase = () => {
  
  const { state } = useLocation();
  const foodData = state?.foodData;

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // console.log(user.metadata.creationTime, user.metadata.lastSignInTime);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const form = e.target;

    // data save to DB
    const formData = {
      foodId: foodData?.foodId,
      BuyingQuantity: 1,
      BuyerName: form.buyerName.value.trim(),
      BuyerEmail: form.emailBuyer.value.trim(),
      BuyingDate: form.curDate.value,
      createAt: user?.metadata?.creationTime,
      lastSignInTime: user?.metadata?.lastSignInTime,
      foodName: foodData?.foodName,
      price: parseFloat(foodData?.Price),
      foodOrigin: foodData?.foodOrigin,
    };

    try {
      //   db route for save data
      await axios.post(`${import.meta.env.VITE_API_URL}/user-food`, formData);

      toast.success("Purchase completed successfully!");
      //   back form for prevent duplication data saved

      navigate(-1);
    } catch (err) {
      // console.log(err);
      toast.error(err.response?.data?.message || "Purchase failed");
      
    }
    
  };

  const handleBack = (e) => {
    // Prevent form submission
    if (e) {
      e.preventDefault();
    }

    // confirmation dialog for back
    if (
      window.confirm(
        "Are you sure you want to leave? Your changes will not be saved."
      )
    ) {
      // back 1step form
      navigate(-1);
    }
  };

  return (
    <div>
      <section className=" p-2 md:p-6 mx-auto bg-stone-600 rounded-md shadow-md ">
        <h2 className="text-2xl font-semibold text-gray-400 capitalize text-center ">
          Food Purchase
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {/* food name */}
            <div>
              <label className="text-gray-300 " htmlFor="foodName">
                Food Name
              </label>
              <input
                id="foodName"
                name="foodName"
                type="text"
                defaultValue={foodData?.foodName || ""}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            {/* price */}
            <div>
              <label className="text-gray-300 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                defaultValue={foodData?.Price || ""}
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            {/* buyer name */}
            <div>
              <label className="text-gray-300 ">Buyer Name</label>
              <input
                id="buyerName"
                type="text"
                name="buyerName"
                defaultValue={user?.displayName}
                disabled={true}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            {/* buyer Email */}
            <div>
              <label className="text-gray-300 " htmlFor="emailBuyer">
                Email Address
              </label>
              <input
                id="emailBuyer"
                type="email"
                name="emailBuyer"
                required
                defaultValue={user?.email}
                disabled={true}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            {/* buying date start */}
            <div className="flex flex-col gap-4 ">
              <label className="text-gray-300">Buying Date</label>

              {/* current system date */}
              <input
                id="curDate"
                type="date"
                value={new Date().toISOString().split("T")[0]}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                disabled
              />
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-8 ">
            <button
              onClick={handleBack}
              className="disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 trans htmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 cursor-pointer"
            >
              
              Back
            </button>

            <button className="disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 trans htmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              
              Purchase
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default FoodPurchase;
