import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FoodCard from "../components/foodCard";
import NotFound from "./NotFound";
import LoadingSpinner from "../components/LoadingSpinner";

export const AllFoods = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

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


  // Calculate pagination data on client side
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-4">
      <div
        className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 
        md:grid-cols-2 lg:grid-cols-3"
      >
        {paginatedData.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 w-[7%] bg-base-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-base-100">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((old) => (page >= totalPages ? old : old + 1))}
          disabled={page >= totalPages}
          className="px-4 w-[7%] py-2 bg-base-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      
    </div>
  );
};