import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const AllFoods = () => {
    const [foods, setFoods] = useState([]);

    useEffect(()=>{
        fetchAllFoods()
    },[])

    const fetchAllFoods =async()=>{
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/foods`)
        setFoods(data)
    }
    console.log(foods);

  return (
    <div>AllFoods</div>
  )
}
