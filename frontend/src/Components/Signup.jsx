// import { Link } from "react-router-dom";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
    position: "",
  });

  function formDetailsChange(e) {
    e.preventDefault();
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSignup(e) {
    try {
      e.preventDefault();
      const {data}=await axios.post("https://employee-management-g816.onrender.com/Signup",formDetails);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSignup} className="w-fit mx-auto mt-32">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-blue-500">
          <span className="text-primary">Create</span> new account
        </h1>

        {/* Full Name */}
        <div className="w-full sm:w-auto">
          <label htmlFor="name" className="text-base font-medium text-gray-700">
            Full Name <sup className="text-primary text-base">*</sup>
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Full Name"
              id="name"
              name="name"
              value={formDetails.name}
              onChange={formDetailsChange}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-base font-medium text-gray-700"
          >
            Email address <sup className="text-primary text-base">*</sup>
          </label>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              name="email"
              value={formDetails.email}
              onChange={formDetailsChange}
              placeholder="Email"
              id="email"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-base font-medium text-gray-700"
            >
              Password <sup className="text-primary text-base">*</sup>
            </label>
          </div>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Password"
              name="password"
              value={formDetails.password}
              onChange={formDetailsChange}
              id="password"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="position"
              className="text-base font-medium text-gray-700"
            >
              Position <sup className="text-primary text-base">*</sup>
            </label>
          </div>

          <div className="w-full border border-gray-300 rounded-md outline-none">
            <select
              name="position"
              className="w-full p-2 h-full outline-none"
              id="position"
              required
              value={formDetails.position}
              onChange={formDetailsChange}
            >
              <option value="Select position" defaultChecked>
                Select Position
              </option>
              <option value="manager">manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        </div>

        {/* Sign Up button */}
        <div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 bg-blue-600 text-white hover:bg-blue-800"
          >
            Create Account
          </button>
        </div>

        <div className="text-center">
          <p>
            Already have an account?
            <Link to="/login" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signup;
