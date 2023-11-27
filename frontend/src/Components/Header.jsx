import { Link } from "react-router-dom";
import { useHomeContext } from "../ContextApi/Context/HomeContext";

const Header = () => {
  const { authStatus, setAuthStatus } = useHomeContext();
  let user=JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {
    setAuthStatus((prev) => !prev)
    localStorage.removeItem("user");
    window.location.href="/"
  }

  return (
    <div className="border-b-2 shadow-md p-3 flex justify-between items-center">
      <h1 className="text-xl hover:text-blue-400 cursor-pointer">
        <div className="flex gap-12">
          <Link to="/">Home</Link> 
          {user.position && user.position === "manager"&&<Link to="/department">Department</Link>}
        </div>
      </h1>
      {user ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            <Link to="/signup">SignUp</Link>
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
