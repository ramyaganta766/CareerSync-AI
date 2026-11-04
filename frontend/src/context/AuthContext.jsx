import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("careersync_token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("careersync_token");
      const storedUser = localStorage.getItem("careersync_user");

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          // Verify with backend
          const res = await API.get("/auth/me");
          if (res.data && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem("careersync_user", JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.warn("Session expired or server unavailable:", err.message);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    const { token: receivedToken, user: receivedUser } = res.data;

    localStorage.setItem("careersync_token", receivedToken);
    localStorage.setItem("careersync_user", JSON.stringify(receivedUser));

    setToken(receivedToken);
    setUser(receivedUser);
    return res.data;
  };

  const signup = async (name, email, password) => {
    const res = await API.post("/auth/signup", { name, email, password });
    const { token: receivedToken, user: receivedUser } = res.data;

    if (receivedToken) {
      localStorage.setItem("careersync_token", receivedToken);
      localStorage.setItem("careersync_user", JSON.stringify(receivedUser));
      setToken(receivedToken);
      setUser(receivedUser);
    }
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("careersync_token");
    localStorage.removeItem("careersync_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
