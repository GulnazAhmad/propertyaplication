import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "../components/Menu";
import { userContext } from "../context/userContext";
//import axios from "axios";
//import URL from "../url";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  //imagine there is a user then you dont want to show login and register but rather wanna see create and profile so
  const { user } = useContext(userContext);
  //console.log(user);
  const [menu, setMenu] = useState(false);
  const showMenu = () => setMenu(!menu);
  const [prompt, setPrompt] = useState("");
  //seLocation().pathname gives you the current URL path of your app.
  const path = useLocation().pathname;
  //console.log(prompt);

  return (
    <>
      <div className="flex items-center justify-between px-6 md:[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blog Market</Link>
        </h1>
        {path === "/" && (
          <div className="ml-4 flex items-center justify-center space-x-0 cursor-pointer">
            <p
              onClick={() => navigate("/?title=" + prompt.trim())}
              className="cursor-pointer"
            >
              {" "}
              <FaSearch />
            </p>
            <input
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              placeholder="search a post"
              className="px-3 py-3 outline-none "
            ></input>
          </div>
        )}
        <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
          {user ? (
            <h3>
              <Link to="/write">Write</Link>
            </h3>
          ) : (
            <h3>
              <Link to="/login">Login</Link>
            </h3>
          )}
          {user ? (
            <div onClick={showMenu}>
              <p className="cursor-pointer">
                <FaBars />
              </p>
              {menu && <Menu />}
            </div>
          ) : (
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          )}
        </div>
        <div className="md:hidden " onClick={showMenu}>
          <p>
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
