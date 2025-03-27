import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router";

const NavTop = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log('NAV top:--',user);

const handleLogout=()=>{
  logOut();
  // alert('Logout')
}

  return (
    <div className="bg-lime-600 h-10 p-2 text-sky-100 px-4 text-sm">
      <div className="flex justify-between">
        <div className="flex space-x-8">
          <div className="flex gap-4">
            <h4> Home Delivery</h4> 
            <span>|</span>
          </div>
          <div className="flex gap-4">
            <h4> Return Policy </h4>
            <span>|</span>
          </div>
          <div>
            <h4> Follow Us </h4>
          </div>
        </div>
        <div className="-mt-2">
        {user && user?.email ? (
            <Link
              to={"/"}
              onClick={handleLogout}
              className="btn btn-outline text-black"
            >
              Log-Out
            </Link>
          ) : (
            <Link
              to={"auth/login"}
              className="btn btn-outline text-black"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavTop;
