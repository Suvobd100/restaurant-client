import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import moment from "moment";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchAllFoods();
    }
  }, [user]);

  const fetchAllFoods = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/foods/user/${user?.email}`
      );
      setFoods(data);
      // console.log('url----',data);
    } catch (error) {
      console.error("Failed to fetch foods:", error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  //  Delete func
  const handleDeleteFood = async (food) => {
    // Get the correct ID - either from $oid or direct _id
    const foodId = food._id?.$oid || food._id;
    // console.log('Deleting food with ID:', foodId);
  
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/foods/${foodId}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
  
        if (response.data.success) {
          // Update state by checking both ID formats
          setFoods(prevFoods => prevFoods.filter(
            item => (item._id?.$oid || item._id) !== foodId
          ));
          Swal.fire('Deleted!', response.data.message, 'success');
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error('Delete error:', error);
        Swal.fire({
          title: 'Error',
          html: `
            <div>
              <p>${error.response?.data?.message || error.message || 'Failed to delete food item'}</p>
              ${process.env.NODE_ENV === 'development' && `
                <div class="mt-2 text-left text-sm">
                  <p>Attempted to delete ID: ${foodId}</p>
                  <p>Full error: ${error.toString()}</p>
                </div>
              `}
            </div>
          `,
          icon: 'error'
        });
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  // console.log(foods);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {user?.email && (
        <div className="mb-6 p-4 bg-green-50 rounded-md">
          <p className="text-green-700">{user.displayName}</p>
        </div>
      )}

      {user?.email && foods.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            You haven't added any food items yet.
          </p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-stone-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Food Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-stone-600 divide-y divide-gray-300">
              {foods.map((food) => (
                <tr key={food._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={food.foodImage || "/placeholder.svg"}
                        alt={food.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{food.foodName}</p>
                        <p className="text-sm text-gray-300">
                          {food.description?.substring(0, 50)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${food.price?.toFixed(2)}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap capitalize">{food.foodCategory}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* using moment for date formate */}
                    {moment(food.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteFood(food)}
                      className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      title="Delete food item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
