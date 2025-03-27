import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  // import from auth
  const { userLogin, setUser, handelGoogleLogin } = useContext(AuthContext);

  const [err,setErr]=useState(null)
  const navigate = useNavigate();

  const handelSubmit=(e)=>{
    e.preventDefault();
    setErr(null);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log('login form:--',email,password);

// login by fb with existence user email & password
    userLogin(email, password)
    .then((result) => {
      const user = result.user;
      setUser(user);
      // toast messg
    //   toast.success('Login successfully done!');
      toast.success('Login')
      
      navigate(location?.state ? location.state : "/");
    })
    .catch((error) => {
      
      setErr(error.code);
    });

  }
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10  border-2">
        <h2 className="text-2xl font-semibold text-center">
          Login your account
        </h2>
        <form onSubmit={handelSubmit} className="card-body">
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Email address</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            {/* <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label> */}
          </div>
          <div className="form-control mt-6 ">
            <button className="btn btn-neutral rounded-xs w-full p-6">
              Login
            </button>
          </div>
          <p className="text-center">
            Don't Have An Account?{" "}
            <Link to={"/auth/register"} className="text-red-500">
              Register
            </Link>{" "}
          </p>
        </form>
        {<div className="text-red-500 items-center text-center">{err}</div>}
      </div>
      <Link
        to={"/"}
        onClick={handelGoogleLogin}
        // className="btn bg-stone-100 text-black mt-6 w-[25%]"
      >
        <div className="flex justify-center lg:justify-between items-center lg:gap-4 p-4 btn
         bg-stone-300 mt-4">
          <FaGoogle />
          <span className="text-sm"> Login with Google</span>
        </div>
      </Link>
    </div>
  );
};

export default Login;
