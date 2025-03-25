import React from 'react'
import { Link } from 'react-router-dom'

const TestButtonA = ({text}) => {
  return (
    <div>
         <Link
            to='/add-job'
            className='w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'
          >
             {/* All Foods */}
             <h2 className='text-2xl btn btn-wide'>
                {text}
             </h2>

          </Link>
    </div>
  )
}

export default TestButtonA