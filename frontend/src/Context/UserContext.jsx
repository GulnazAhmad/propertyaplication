import { Children, createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { URL } from "../url";
export const userContext = createContext({});
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/refetch", {
        withCredentials: true,
      });
      const user = res.data;
      const normalizedUser = {
        ...user,
        _id: user._id || user.id,
      };
      setUser(normalizedUser);
    } catch (e) {
      console.log(e.message);
      setUser(null);
    }
  };
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
