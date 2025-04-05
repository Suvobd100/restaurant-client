import React, { useContext, useState } from "react";
import bgImg from "../assets/images/login.jpg";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from "react-tooltip";

const Login = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const from =  "/";
  // const from = location?.state || "/";
  // console.log(from);
  // import from auth
  const { signIn, signInWithGoogle } = useContext(AuthContext);

  const [isHovered, setIsHovered] = useState(false);

  const [err, setErr] = useState(null);
  //   const navigate = useNavigate();

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();

      toast.success("Signin Successful");
      navigate(from, { replace: true });
    } catch (err) {
      setErr(err);
      toast.error(err?.message);
    }
  };

  // Email Password Signin
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;
    // console.log({ email, pass });
    try {
      //User Login
      await signIn(email, pass);
      toast.success("Signin Successful");
      navigate(from, { replace: true });
    } catch (err) {
      setErr(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl text-center">Welcome Again</h2>

      <div className="min-h-screen flex justify-center -mt-10">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          <div className="w-full rounded-lg ">
            {/* login with google */}
            <div onClick={handleGoogleSignIn}>
              <div className="flex justify-center lg:justify-center items-center p-4 btn mt-4">
                <FaGoogle />
                <span className="text-sm"> Login with Google</span>
              </div>
            </div>

            {/* login with email password */}
            <div className="mt-4">
              <form onSubmit={handleSignIn} className="card-body">
                <div className="form-control flex  w-full justify-center items-center gap-2 ml-3">
                  <label className="label">
                    <span className="label-text font-semibold">Email: </span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control flex w-full justify-center items-center gap-2">
                  <label className="label">
                    <span className="label-text font-semibold">Password: </span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-neutral rounded-xs w-full p-6">
                    Login
                  </button>
                </div>
                <div className="text-center">
                  <span> Don't Have An Account?</span>
                  <span className="ml-2 ">
                   
                    <Link
                      to={"/auth/register"}
                      className={`${
                        isHovered ? "text-blue-600 underline" : "text-red-500"
                      }`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      data-tooltip-id="register-tooltip"
                      data-tooltip-place="right"
                    >
                      Register
                    </Link>
                    <Tooltip
                      id="register-tooltip"
                      place="top"
                      content="Create a new account"
                      className="!bg-gray-800 !text-xs !py-1 !px-2"
                    />
                  </span>
                </div>
              </form>
            </div>
            {err && (
              <div className="text-red-500 items-center text-center">{err}</div>
            )}
          </div>
        </div>

        {/* Right side - Image */}

        <div
          className="hidden lg:block lg:w-3/5 bg-center rounded-r-[40%] w-[80%]"
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "contain", // or 'cover' depending on your preference
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
