import React from "react";
import Blogposts from "../components/Blogposts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import URL from "../url";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
const Home = () => {
  const { search } = useLocation();
  //console.log(search);
  const [posts, setPosts] = useState([]);
  const [noresults, setNoresults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(userContext);
  //console.log(user);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/getposts" + search);
      //console.log(res.data);
      setPosts(res.data);
      if (res.data.length === 0) {
        // eslint-disable-next-line no-const-assign
        setNoresults(true);
      }
      setLoader(false);
    } catch (e) {
      console.log(e.message);
      setLoader(true);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [search]);
  return (
    <>
      <Navbar />
      <div className="px-8">
        {loader ? (
          <div className="h-[40vh] flex items-center ">
            <Loader />
          </div>
        ) : !noresults ? (
          posts.map((p) => (
            <Link to={user ? `posts/post/${p._id}` : "/login"}>
              <Blogposts key={p._id} post={p} />
            </Link> //parent passing props to child blogpost
          ))
        ) : (
          <h4 className="text-red-800 font-400 text-200 justify-center text-center">
            No Results found
          </h4>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
