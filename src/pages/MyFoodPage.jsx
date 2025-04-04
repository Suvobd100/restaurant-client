import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa'; // Using react-icons for the update icon
import LoadingSpinner from '../components/LoadingSpinner';

const MyFoodPage = () => {
  const [foods, setFoods] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      fetchAllFoods();
    }
  }, [user]);

  const fetchAllFoods = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods/user/${user?.email}`);
      setFoods(data);
    } catch (error) {
      console.error("Failed to fetch foods:", error);
      setFoods([]);
    }
  };

  const handleUpdate = (foodId) => {
    // for update logic
    console.log("Update clicked for foodId:", foodId);
    
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {foods.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-stone-600">
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Food Name</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Buying Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className="hover:bg-gray-500">
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
                  <td className="p-2 border">{food.BuyingDate}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleUpdate(food._id)}
                      className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 flex items-center"
                    >
                      <FaEdit className="mr-1" /> Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <LoadingSpinner/>
          <p>No purchases found.</p>
        </div>
        
      )}
    </div>
  );
};

export default MyFoodPage;