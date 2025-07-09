import React, { useContext } from "react";
import { userContext } from "../context/userContext";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Blogposts from "../components/Blogposts";
import URL from "../url";
const Myblogs = () => {
  const user = useContext(userContext);
  const [posts, setPosts] = useState([]);
  const fetchUsersposts = async () => {
    try {
      const res = await axios.get(URL + "/getuserposts/" + user.user._id, {
        withCredentials: true,
      });
      //console.log(res.data);
      setPosts(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    if (user?.user?._id) {
      fetchUsersposts();
    }
  }, [user]);
  return (
    <>
      <Navbar />
      {/*left includes your post*/}
      <div className="px-8 space-x-8 md:px-[150px] mt-8 flex md:flex-row w-full m-8 p-4 flex-col-reverse md:items-start items-start">
        {/* Blogposts */}
        <div className="flex flex-col w-full md:w-[60%] mt-8 md:mt-0">
          <h1 className="font-bold text-2xl">Your Posts:</h1>
          {posts.map((p) => (
            <Blogposts key={p._id} post={p} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Myblogs;
