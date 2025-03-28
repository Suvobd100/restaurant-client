
import { Link } from "react-router";

import logo from "../assets/images/logo.png";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const AuthNav = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="navbar bg-base-100 flex flex-col">
       
        <Link to="/">
          <div className="flex flex-col font-comic p-2 text-stone-400 animate__animated animate__flash ">
            <div className="flex lg:gap-2 gap-2 justify-center">
              <img
                className="lg:w-10 lg:h-10 lg:rounded-2xl rounded-full w-[8%] h-[10%] "
                src={logo}
                alt=""
              />
              <p className="lg:text-3xl">চলও খাঁই</p>
            </div>
            <div className="flex gap-2 mt-2 justify-center">
            <p className="btn rounded-2xl"> Home</p>
            <p className="btn rounded-2xl"> {user?.email || 'test@email.com'}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AuthNav;
