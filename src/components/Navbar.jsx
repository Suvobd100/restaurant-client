import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import userIcon from "../assets/images/user.png";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="">
      <div className="navbar bg-stone-500 text-white font-bold">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="all-food">All Food</Link>
              </li>
              <li>
                <Link to="food-gallery"> Gallery </Link>
              </li>
            </ul>
          </div>
          {/* <a className="btn btn-ghost text-xl">Lingo Bingo</a> */}
          <div className="ml-8">
            <Link to="/">
              <div
                className="flex flex-col font-comic p-2 text-stone-300 
            animate__animated animate__heartBeat animate__delay-2s "
              >
                <div className="flex lg:gap-2 gap-1">
                  <img className="lg:w-10 lg:h-10 lg:rounded-2xl rounded-full w-[20%] h-[20%]" src={logo} alt="" />
                  <p className="lg:text-3xl">চলও খাঁই</p>
                </div>
                <p className="lg:text-lg text-slate-400">
                  <span className="lg:ml-15 ml-6 text-l">চেটে পুটে খাই</span>
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="all-food">All Food</Link>
            </li>
            <li>
              <Link to="food-gallery"> Gallery </Link>
            </li>
            {/* <li>
                <Link to="/priv/vtutorials"> Add Visa</Link>
              </li> */}
            <li>{/* <Link to="/priv/add-visa"> Add Visa</Link> */}</li>
            <li>
              {/* <Link to="/priv/My-added-visas"> My added visas</Link> */}
            </li>
            <li>
              {/* <Link to="/priv/My-Visa-applications">My Visa applications</Link> */}
            </li>
            {/* <li>
              <Link to="register">register</Link>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <div>
            {user && user?.email ? (
              <div className="flex justify-center items-center gap-2">
                <img
                  className="w-10 h-10 rounded-3xl"
                  referrerPolicy="no-referrer"
                  src={user?.photoURL ? user.photoURL : userIcon}
                  alt="user pic"
                />
                <p className="font-semibold font-comic text-white">
                  {user?.email}
                </p>
              </div>
            ) : (
              <img className="rounded-full" src={userIcon} alt="" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
