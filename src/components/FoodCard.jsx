import React from 'react'

const foodCard = ({food}) => {

    // {
    //     "_id": "67e798e7db448c75231b1b84",
    //     "foodId": "B003",
    //     "foodName": "Panta Bhat (Fermented Rice)",
    //     "foodImageURL": "https://i.ibb.co.com/JwQjDyzP/BD-Panta-bhat.jpg",
    //     "foodOrigin": "Bangladesh",
    //     "Description": "Leftover rice soaked in water overnight, served with salt, green chili, onion, and fried fish. A traditional Bengali dish.",
    //     "Price": 500,
    //     "purchaseCount": 600,
    //     "availableQuantity": 200
    // }
    const {_id,foodId,foodName,foodImageURL,foodOrigin,Description,Price,purchaseCount,availableQuantity}= food
  return (
    <div className='w-11/12 mx-auto'>
    <div className="card bg-base-100 w-full shadow-sm">
      <div className="mt-3 ml-10 flex justify-center ">
        <h2 className="card-title text-3xl">{foodName}</h2>
      </div>
      <figure className="px-10 pt-4">
        <img src={foodImageURL} alt={foodImageURL} className="rounded-xl w-[50%] " />
      </figure>
      <div className="card-body items-center px-4">
        <ul>
          <li className="flex  space-x-16 py-2">
            <h2 className="font-semibold ">Food Origin:</h2>
            <p className="text-right">{foodOrigin}</p>
          </li>

          <li className="grid grid-cols-2 mt-4 space-x-4">
            <h2 className="font-semibold text-left">Description:</h2>
            <p className="text-right">{Description}</p>
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

export default foodCard