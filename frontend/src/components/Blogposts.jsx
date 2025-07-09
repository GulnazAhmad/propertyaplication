import React from "react";
import IF from "../url";
const Blogposts = ({ post }) => {
  if (!post) return null; // prevent rendering if post is undefined
  const imageSrc = post.photo?.startsWith("http")
    ? post.photo
    : `${IF}/images/${post.photo}`;
  return (
    <>
      <div className=" flex mt-8 space-x-4 ml-4 mr-4">
        {/*left*/}
        <div className="w-[35%] h-[300px] flex justify-center items-center">
          <img
            src={imageSrc}
            alt=""
            className="h-full w-full object-cover rounded-md"
          />
        </div>

        {/*right*/}
        <div className="flex flex-col w-[65%]">
          <h1 className="text-x1 font-bold mb-1 md:mb-2 md:text-2xl">
            {post.title}
          </h1>
          <div className="flex justify-between mb-2 text-sm font-semibold text-gray-500 md:mb-4">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>

          <div>
            <p className="text-sm md:text-lg ">
              {" "}
              {post.description.slice(0, 200)}
              <span className="text-blue-700">"...Read more"</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogposts;
