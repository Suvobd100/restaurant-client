import { useContext, useRef, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom"; // Fixed import from react-router-dom
import Swal from "sweetalert2";
import bgImg from "../assets/images/register.jpg";

const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const [err, setErr] = useState(null);
  const checkboxRef = useRef(null);

  const handleSubmit = (e) => { // Fixed typo in function name
    e.preventDefault();
    setErr(null);
    
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");
    console.log(name,email,photo,password);

    // Password validation
    if (password.length < 6) {
      setErr("Password must be at least 6 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErr("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setErr("Password must contain at least one lowercase letter");
      return;
    }
    if (!checkboxRef.current.checked) {
      setErr("Please accept Terms & Conditions");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          title: "Success!",
          text: `${user.email} account created successfully!`,
          icon: "success"
        });
        e.target.reset();
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-gray-50">
      <div className="hidden lg:block w-full bg-center h-[500px]"
           style={{
             backgroundImage: `url(${bgImg})`,
             backgroundSize: "cover",
             backgroundRepeat: "no-repeat",
             backgroundPosition: "center"
           }}>
      </div>
      
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-xl p-8 border-2 shadow-lg -mt-5">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Register your account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Your Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Enter photo URL"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email address</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
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
              placeholder="Create a password"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <div className="form-control mt-4">
            <label className="label cursor-pointer justify-start gap-2">
              <input 
                type="checkbox" 
                className="checkbox checkbox-primary" 
                ref={checkboxRef} 
              />
              <span className="label-text font-semibold text-sm">
                Accept Terms & Conditions
              </span>
            </label>
          </div>
          
          {err && <p className="text-red-500 text-sm text-center">{err}</p>}
          
          <div className="form-control mt-6">
            <button 
              type="submit" 
              className="btn btn-primary rounded-lg w-full py-4"
            >
              Register
            </button>
          </div>
          
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-500 font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;