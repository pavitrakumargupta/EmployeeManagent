import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHomeContext } from "../ContextApi/Context/HomeContext";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const { employees } = useHomeContext();
  const { setAuthStatus } = useHomeContext();
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    // saving user to localhost

    try {
      
        e.preventDefault();
        const {data}=await axios.post("https://employee-management-g816.onrender.com/SignIn",formData);
        setAuthStatus(true)
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
     
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  }

  function formDataChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <form onSubmit={handleLogin} className="w-fit mx-auto mt-32">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-blue-500">
          <span className="text-primary">Login</span> to your account
        </h1>

        <div>
          <label
            htmlFor="email"
            className="text-base font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              ref={emailRef}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              name="email"
              value={formData.email}
              onChange={formDataChange}
              placeholder="Email"
              id="email"
              required
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-base font-medium text-gray-700"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={formDataChange}
              id="password"
              required
            />
          </div>
        </div>
        <p className="text-bold text-red-500">{error}</p>
        <div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
          >
            Login
          </button>
        </div>

        <div className="text-center">
          <p>
            Do not have an account?
            <Link to="/signup" className="text-primary font-medium">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
