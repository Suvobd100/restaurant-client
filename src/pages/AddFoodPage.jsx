// src/AddFoodForm.jsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';

const AddFoodPage = () => {
  const { user } = useContext(AuthContext);
  console.log('Current user:', user); // Debug line

  const [foodName, setFoodName] = useState('');
  const [foodImage, setFoodImage] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [foodOrigin, setFoodOrigin] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error('Please log in to add a food item');
      return;
    }

    const foodData = {
      foodName,
      foodImage,
      foodCategory,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      addBy: { 
        name: user?.displayName || 'Unknown User', // if user not found then unknown
        email: user?.email || ''
      },
      foodOrigin,
      description,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/foods/user/${user.email}`,
        foodData
      );
      
      if (response.status === 201) {
        toast.success('Food item added successfully!');
        resetForm();
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || 'Failed to add food item'}`);
      } else if (error.request) {
        toast.error('No response from server. Please check if the server is running.');
      } else {
        toast.error('Error: ' + error.message);
      }
      console.error('Error adding food item:', error);
    }
  };

  const resetForm = () => {
    setFoodName('');
    setFoodImage('');
    setFoodCategory('');
    setQuantity('');
    setPrice('');
    setFoodOrigin('');
    setDescription('');
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetForm();
    toast.info('Form has been reset');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-stone-600 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Add Food Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-stone-300 text-gray-800"
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Food Image URL"
            value={foodImage}
            onChange={(e) => setFoodImage(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-stone-300 text-gray-800"
            required
          />
        </div>

        <div>
          <select
            value={foodCategory}
            onChange={(e) => setFoodCategory(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-stone-300 text-gray-800"
            required
          >
            <option value="">Select Food Category</option>
            <option value="Bangladeshi">Bangladeshi</option>
            <option value="Pakistani">Pakistani</option>
            <option value="Thai">Thai</option>
          </select>
        </div>

        <div>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-stone-300 text-gray-800"
            min="1"
            required
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-stone-300 text-gray-800"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Food Origin (Country)"
            value={foodOrigin}
            onChange={(e) => setFoodOrigin(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-stone-300 text-gray-800"
            required
          />
        </div>

        <div>
          <textarea
            placeholder="Short Description (ingredients, making procedure, etc.)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-stone-300 text-gray-800"
            rows="4"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Add Item
          </button>
          <button 
            type="button"
            onClick={handleReset}
            className="flex-1 p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFoodPage;