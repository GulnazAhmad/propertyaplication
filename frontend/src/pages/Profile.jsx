import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Blogposts from "../components/Blogposts";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import axios from "axios";
import URL from "../url";
const Profile = () => {
  const user = useContext(userContext);
  //console.log(user.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);

  //its is better to use this function rather than user to make chnages since it it the usercontext when you make changes in user it might not be rendeered const fetchuserdetails = async () => {};
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(URL + "/getuser/" + user.user._id, {
        withCredentials: true,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (e) {
      console.log(e.message);
    }
  };

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
  const handleupdateuser = async () => {
    try {
      let res = await axios.put(
        URL + "/updateuser/" + user.user._id,
        { username: username, email: email, password: password },
        {
          withCredentials: true,
        }
      );
      //console.log(res.data);
      fetchUserDetails(); //refresh updated data
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleuserdelete = async () => {
    try {
      let res = await axios.delete(
        URL + "/deleteuser/" + user.user._id,

        {
          withCredentials: true,
        }
      );
      //console.log(res.data);
      fetchUserDetails(); //refresh updated data
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    if (user?.user?._id) {
      fetchUsersposts();
      fetchUserDetails(); // <-- you missed calling this
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

        {/* Profile */}
        <div className="md:sticky md:top-16 flex justify-start items-start md:w-[40%] w-full md:items-end">
          <div className="flex flex-col gap-6 w-full">
            <h1 className="font-extrabold">Profile</h1>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Username"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
            />
            <div className="flex space-x-4">
              <button
                onClick={handleupdateuser}
                className="text-white bg-black px-2 py-2"
              >
                Update
              </button>
              <button
                onClick={handleuserdelete}
                className="text-white bg-black px-2 py-2"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
