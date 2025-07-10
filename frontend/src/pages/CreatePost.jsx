import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdCancel } from "react-icons/md";
import { userContext } from "../context/userContext";
import URL from "../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); //in model it is photo
  const user = useContext(userContext);
  //console.log("user is", user);
  //console.log("user inside user is", user.user);
  //for ne cat
  const [cat, setCat] = useState("");
  const [catlist, setCatlist] = useState([]);
  const navigate = useNavigate();
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
  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      description,
      username: user.user.username,
      userId: user.user._id,
      categories: catlist,
    };
    //image upload
    if (image) {
      const data = new FormData();

      data.append("file", image);
      //console.log("formdata is here", data);
      try {
        const imgUploads = await axios.post(URL + "/api/upload", data);
        //console.log(imgUploads.data);
        post.photo = imgUploads.data.filename; // ✅ use the actual returned filename
      } catch (e) {
        console.log(e.message);
      }
    }
    //post upload
    try {
      const res = await axios.post(URL + "/createpost", post, {
        withCredentials: true,
      });
      //console.log(res.data);
      navigate("/posts/post/" + res.data._id);

      //console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
      <Navbar />
      <div>
        <div className="text-left mx-8 mt-10 px-4">
          <h1 className="text-2xl font-bold mb-8">Create a post</h1>
          <form>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-4 "
              type="text"
              placeholder="Enter your post title"
            ></input>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              className="mt-5 px-4 py-4 border-2"
              placeholder="No file Chosen"
            />

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
            <input
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-4 px-4 my-8"
              type="text"
              placeholder="Enter post description"
            ></input>
          </form>
        </div>
        <div className="justify-center flex">
          <button
            onClick={handleCreate}
            className="text-center justify-center bg-black colo text-white px-14 py-4 mt-14"
          >
            Create
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
