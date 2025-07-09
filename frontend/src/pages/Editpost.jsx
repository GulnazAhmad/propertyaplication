import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";
//import { useContext } from "react";
//import { userContext } from "../context/userContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import URL from "../url";
import { userContext } from "../context/userContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const Editpost = () => {
  const [cat, setCat] = useState("");
  const [catlist, setCatlist] = useState([]);
  const user = useContext(userContext);
  const postId = useParams().id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); //in model it is photo
  //const user = useContext(userContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/getpost/" + postId);
      //console.log(res);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setImage(res.data.photo);
      setCatlist(res.data.categories);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleupdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      description,
      username: user.user.username,
      userId: user.user._id,
      categories: catlist,
    };
    //console.log(post);
    //image upload
    if (image) {
      const data = new FormData();

      data.append("file", image);
      //console.log("formdata is here", data);
      try {
        const imgUploads = await axios.post(URL + "/api/upload/", data);
        //console.log(imgUploads.data);
        post.photo = imgUploads.data.filename; // ✅ use the actual returned filename
      } catch (e) {
        console.log(e.message);
      }
    }
    //post upload
    try {
      const res = await axios.put(URL + "/updatepost/" + postId, post, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/posts/post/" + res.data._id);
    } catch (e) {
      console.log(e.message);
    }
  };

  const addCategory = (e) => {
    e.preventDefault(); // 🛑 Prevent page reload

    setCatlist([...catlist, cat]);
    setCat("");
  };
  const deleteCategory = (i) => {
    let updatedcats = [...catlist];
    //updatedcats.splice(i); removes everything from i to end
    updatedcats.splice(i, 1);
    setCatlist(updatedcats);
  };
  return (
    <>
      <Navbar />
      <div>
        <div className="text-left mx-8 mt-10 px-4">
          <h1 className="text-2xl font-bold mb-8">Edit a post</h1>
          <form>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full px-4 py-4 "
              type="text"
              placeholder="Enter your post title"
            ></input>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              className="mt-5 px-4 py-4 border-2"
              placeholder="choose a file"
            />
            No file chosen
            <div className="py-2">
              <div className="flex space-x-8 mt-5 py-4">
                <input
                  className="w-full px-4"
                  type="text"
                  placeholder="Enter post category"
                  value={cat} //if onchange not added it will be hardcoded as "" by default
                  onChange={(e) => setCat(e.target.value)}
                ></input>
                <button
                  onClick={addCategory}
                  className="bg-black text-white px-8 py-4"
                >
                  Add Category
                </button>
              </div>
              <div className="space-x-4 flex">
                {catlist?.map((c, i) => (
                  <p key={i} className="bg-gray-300 px-2 py-2 ">
                    {c}
                    {/*onClick={deleteCategory(i)} calls the delet function immediately*/}
                    <button
                      onClick={() => deleteCategory(i)}
                      className="ml-2 hover:bg-black hover:text-white"
                    >
                      <MdCancel />
                    </button>
                  </p>
                ))}
              </div>
            </div>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-full py-4 px-4 my-8"
              type="text"
              placeholder="Enter post description"
            ></textarea>
          </form>
        </div>
        <div className="justify-center flex">
          <button
            onClick={handleupdate}
            className="text-center justify-center bg-black colo text-white px-14 py-4 mt-14"
          >
            Update a post
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Editpost;
