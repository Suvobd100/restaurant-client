import { useContext, useRef, useState } from "react";
// import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
  // imp as object by useContext reference
  const { createNewUser, setUser } = useContext(AuthContext);

  const [err, setErr] = useState(null);
  //   by ref hook get checkbox data
  const checkboxRef = useRef(null);


  const handelSubmit = (e) => {
    e.preventDefault();
    setErr(null);
    // get form data
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    if (password.length < 6) {
      setErr("Password must 6 character long");
      return;
    }

    // password upper case check
    if (!/[A-Z]/.test(password)) {
      setErr("Please write at list one Upper case");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setErr("Please write at list one Lower case");
      return;
    }
    if (!checkboxRef.current.checked) {
      setErr("Please Accept Terms & Condition");
      return;
    }

    // console.log({ name, email, photo, password, checkboxRef });
    // using for fb 2 create new user
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        // user data sent AuthProvider
        setUser(user);
        console.log("frm register:--", user);
        Swal.fire(`${user.email} user created successfully!`);
        
        e.target.reset();
       
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        // console.log("from register---", errorCode, errorMessage);
        setErr(errorMessage);
      });
  };
  return (
    <div className="min-h-screen flex justify-center items-center flex-col ">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-xl p-10 border-2 -mt-5 ">
        <h2 className="text-2xl font-semibold text-center items-center">
          Register your account
        </h2>
        <form onSubmit={handelSubmit} className="card-body">
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Your Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Photo url"
              className="input input-bordered"
              required
            />
          </div>
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
          <div className="form-control">
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
            <div className="form-control mt-4">
              <label className="label cursor-pointer">
                <input type="checkbox" className="checkbox" ref={checkboxRef} />
                <span className="label-text font-bold text-xs">
                  Accept Term & Condition
                </span>
              </label>
              {/* {console.log(checkbox.value)} */}
            </div>
          </div>
          <div className="form-control mt-6 ">
            <button className="btn btn-neutral rounded-xs w-full p-6">
              Register
            </button>
          </div>
          <p className="text-center">
            Already Have An Account?{" "}
            <Link to={"/auth/login"} className="text-green-500">
              Login
            </Link>{" "}
            {/* <button>Login</button> */}
          </p>
        </form>
        {<p className="text-red-500 text-center">{err}</p>}
      </div>
    </div>
  );
};

export default Register;
