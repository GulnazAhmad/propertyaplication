import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import { userContext } from "../context/userContext";

import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const [prompt, setPrompt] = useState("");

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-indigo-600 hover:text-indigo-700 transition-colors">
          <Link to="/">PropertyIt</Link>
        </h1>

        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-semibold">
          {user ? (
            <div className="flex items-center space-x-4">
              <p className="hover:text-indigo-600 transition-colors">
                Welcome {user.username} !
              </p>
              <p className="hover:text-indigo-600 transition-colors">
                <Link to={"/addproperty"}>addproperty</Link>
              </p>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-indigo-600 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
