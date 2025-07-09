import Home from "./pages/Home";
//for componenets we need routes
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Postdetails from "./pages/Postdetails";
import CreatePost from "./pages/CreatePost";
import Editpost from "./pages/Editpost";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./context/userContext";
import Myblogs from "./pages/Myblogs";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/write" element={<CreatePost />} />
          <Route path="/edit/:id" element={<Editpost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/myblogs/:id" element={<Myblogs />} />

          <Route path="/posts/post/:id" element={<Postdetails />} />
          {/* rendering pages here  we need routes. rest paths can be defined in components itself */}
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
