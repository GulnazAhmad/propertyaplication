import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import URL from "../url";
import IF from "../url";
import { userContext } from "../context/userContext";
import Loader from "../components/Loader";

const Postdetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState(null);
  const [loader, setLoader] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const user = useContext(userContext);
  //console.log(user.user);
  const naviagte = useNavigate();
  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/getpost/" + postId);
      //console.log("Fetched post data:", res.data);
      setPost(res.data);
      setLoader(false);
    } catch (e) {
      setLoader(true);
      console.error("Error fetching post:", e.message);
    }
  };

  const fetchpostComment = async () => {
    try {
      const res = await axios.get(URL + "/getcomments/" + postId);
      setComments(res.data);
      //console.log("comment", res);
    } catch (e) {
      console.log(e.message);
    }
  };
  const createpostComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/createcomment/",
        {
          comment: commentText,
          author: user.user.username,
          postId: postId,
          userId: user.user._id,
        },
        {
          withCredentials: true,
        }
      );
      setCommentText("");
      fetchpostComment();
      //console.log("comment", res);
    } catch (e) {
      console.log(e.message);
    }
  };
  const handledelete = async () => {
    try {
      await axios.delete(URL + "/deletepost/" + postId, {
        withCredentials: true,
      });
      naviagte("/");
      console.log("post deleted successfully");
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchpostComment();
  }, [postId]);

  if (!post) {
    //console.log("Post not loaded yet");
    return (
      <>
        <Navbar />
        <h1 className="text-center mt-10">Loading...</h1>
        <Footer />
      </>
    );
  }

  //console.log("Rendering post:", post);
  //console.log("Image path:", `http://localhost:8000/images/${post.photo}`);
  //console.log(user);
  //console.log("user", user?.user?._id);
  //console.log(post.userId);

  return (
    <>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] w-full">
          <Loader />
        </div>
      ) : (
        <div className="mx-8 px-4">
          <div className="flex flex-col justify-between text-center">
            <h1 className="text-left font-extrabold text-4xl">{post.title}</h1>
            {user?.user?._id == post.userId && (
              <div className="flex gap-4 my-4">
                <p onClick={() => naviagte("/edit/" + postId)}>
                  <CiEdit />
                </p>
                <p onClick={handledelete}>
                  <MdDeleteForever />
                </p>
              </div>
            )}

            <div className="mt-8 mb-8 flex justify-between mb-2 text-sm font-semibold text-gray-500 md:mb-4">
              <p>@{post.username}</p>
              <div className="flex space-x-2 ">
                <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
              </div>
            </div>
          </div>

          {post.photo ? (
            <div className="mt-6">
              <img
                src={
                  post.photo?.startsWith("http")
                    ? post.photo
                    : `http://localhost:8000/images/${encodeURIComponent(
                        post.photo
                      )}`
                }
                alt="post"
                className="w-full h-auto rounded-lg"
              />
            </div>
          ) : (
            <p className="text-red-500">No image available for this post.</p>
          )}

          <div className="w-full mt-4">{post.description}</div>

          <div className="mt-8 mb-8 flex text-center">
            <p className="font-bold">Categories: </p>
            <div className="flex items-center space-x-2 font-semibold">
              {post.categories?.map((c, i) => (
                <div key={i} className="bg-gray-300 rounded-lg px-3 ml-2">
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold">Comments:</p>
            {comments?.map((c) => (
              <div key={c._id} className="mt-4 my-4">
                <div className="bg-gray-300 mb-4 px-4 rounded-[10px] my-4 pb-4">
                  <div className="flex justify-between text-center py-4">
                    <p className="font-bold">@{c.author}</p>
                    <div className="flex gap-4 ">
                      <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                      <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
                    </div>
                  </div>
                  <div>{c.comment}</div>
                </div>
              </div>
            ))}
          </div>

          <div className=" flex justify-between mt-6">
            <input
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              className="px-4 py-2 border rounded-md w-full mr-4"
              type="text"
              placeholder="Write a comment"
            />
            <button
              onClick={createpostComment}
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              Add a Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Postdetails;
