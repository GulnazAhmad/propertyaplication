import { useEffect, useState } from "react";
import { createContext } from "react";
export const userContext = createContext({});
import axios from "axios";
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  /*✅ Why useEffect()?
useEffect() runs code after the component mounts.

We use it here to:

Automatically call getUser() once when the app starts

Avoid manually calling it from every page

Without useEffect(), the call would not run automatically.*/
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/refetch", {
        withCredentials: true,
      });
      const user = res.data;
      // Normalize the _id to avoid confusion later
      const normalizedUser = {
        ...user,
        _id: user._id || user.id,
      };
      setUser(normalizedUser); // ✅ store user in context
    } catch (e) {
      console.log(e.message);
      setUser(null); // ✅ make sure user is cleared on error
    }
  };
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
