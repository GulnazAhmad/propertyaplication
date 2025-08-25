import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./context/userContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import IndividualProperty from "./components/IndividualProperty";
import AddPropertyForm from "./pages/addProperty";
function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/property/:propertyId"
            element={<IndividualProperty />}
          />
          <Route path="/addproperty" element={<AddPropertyForm />} />
        </Routes>
        ;
      </UserContextProvider>
    </>
  );
}

export default App;
