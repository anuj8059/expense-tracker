import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; // your axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check login on app load / refresh
  useEffect(() => {
    axios
      .get("/api/me/", { withCredentials: true })
      .then((res) => {
        setIsAuth(true);
        setUser(res.data.username);
      })
      .catch(() => {
        setIsAuth(false);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, user, loading, setIsAuth, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);