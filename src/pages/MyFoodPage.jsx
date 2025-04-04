import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";

const MyFoodPage = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetchAllFoods();
    }
  }, [user]);

  const fetchAllFoods = async () => {
    setLoading(true); // Start loading
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods/user/${user?.email}`
      );
      setFoods(data);
    } catch (error) {
      console.error("Failed to fetch foods:", error);
      setFoods([]);
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  const handleUpdate = (food) => {
    setSelectedFood(food);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/foods/user/${selectedFood._id}`,
        selectedFood
      );
      setFoods(
        foods.map((f) => (f._id === selectedFood._id ? selectedFood : f))
      );
      setSelectedFood(null);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Purchase updated successfully.",
        confirmButtonText: "OK",
        confirmButtonColor: "#10B981",
      });
    } catch (error) {
      console.error("Failed to update food:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update purchase. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#EF4444",
      });
      setSelectedFood(null);
    }
  };

  const handleBack = (e) => {
    if (e) {
      e.preventDefault();
    }
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Your changes will not be saved.",
      showCancelButton: true,
      confirmButtonText: "Yes, leave",
      cancelButtonText: "No, stay",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#10B981",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Purchases</h1>
      {loading ? (
        <LoadingSpinner /> // Show spinner while fetching
      ) : foods.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-stone-700">
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Food Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Buying Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className="hover:bg-stone-500">
                  <td className="p-2 border">
                    {food.foodImageURL ? (
                      <img
                        src={food.foodImageURL}
                        alt={food.foodName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="p-2 border">{food.foodName}</td>
                  <td className="p-2 border">${food.price}</td>
                  <td className="p-2 border">{food.BuyingQuantity}</td>
                  <td className="p-2 border">{food.BuyingDate}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleUpdate(food)}
                      className="btn btn-sm bg-sky-700 text-white hover:bg-blue-600 flex items-center"
                    >
                      <FaEdit className="mr-1" /> Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handleBack}
              className="disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <p>No purchases found.</p> // Show message when no data
      )}

      {selectedFood && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-stone-400 p-4 rounded shadow-lg">
            <h2 className="text-xl mb-2">Update Purchase</h2>
            <input
              type="text"
              value={selectedFood.foodName}
              readOnly // Make foodName non-editable
              className="input input-bordered w-full mb-2" // Optional: gray out to indicate read-only
            />
            <input
              type="number"
              value={selectedFood.BuyingQuantity}
              onChange={(e) =>
                setSelectedFood({
                  ...selectedFood,
                  BuyingQuantity: parseInt(e.target.value) || 0, // Default to 0 if invalid
                })
              }
              className="input input-bordered w-full mb-2"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedFood(null)}
                className="btn btn-sm bg-purple-400 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn btn-sm bg-green-500 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFoodPage;