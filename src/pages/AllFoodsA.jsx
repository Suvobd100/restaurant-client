import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from './NotFound';
import FoodCardA from '../components/FoodCardA';

const AllFoodsA = () => {
     // Fetch all foods data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/foods`);
      return data;
    }
  });

  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <NotFound error={error}/>;
//   console.log(data);

  return (
    <div
    className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 
    md:grid-cols-2 lg:grid-cols-3"
  >
    {data.map((food) => (
      <FoodCardA key={food._id} food={food} />
    ))}
  </div>
    
    
  )
}

export default AllFoodsA