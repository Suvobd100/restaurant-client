import React from 'react'

const FoodCardA = ({food}) => {
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
    <div className="w-11/12 justify-center mx-auto mb-2">
      <div className="card bg-base-100 w-full shadow-sm">
        <div className="mt-3 ml-10 flex justify-center ">
          <h2
            className="card-title text-2xl p-2 text-center"
           
          >
            {foodName.substring(0, 12)}..
          </h2>
          
        </div>
        <figure className="px-10 pt-4">
          <img
            src={foodImageURL}
            alt={foodImageURL}
            className="rounded-xl aspect-3/2 object-cover"
          />
        </figure>
        <div className="card-body items-center px-4">
          <ul>
            <li className="flex space-x-16 py-2">
              <h2 className="font-semibold ">Food Origin:</h2>
              <p className="text-right">{foodOrigin}</p>
            </li>

            <li className="grid grid-cols-2 mt-4 space-x-4">
              <h2 className="font-semibold text-left">Description:</h2>
              <p className="text-right">{Description.substring(0, 19)}..</p>
            </li>
            <li className="grid grid-cols-2 mt-4 space-x-16 ">
              <h2 className="font-semibold text-left ">Price:</h2>
              <p className="text-right">${Price}</p>
            </li>
          </ul>
          <div className="card-actions mt-4">
            {/* to={`/priv/lesson/${lessondata.categoryId}`} */}
            {/* <Link to={`/visa/${_id}`}> */}
            {/* <Link to={`/priv/visa/${_id}`}> */}
            {/* <Link to={`/visa/${email}`}> */}
            <button className="btn  bg-stone-500">See Details</button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodCardA