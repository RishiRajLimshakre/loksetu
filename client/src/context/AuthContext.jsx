//so in  this context it will
//initialize user and token from localStorage
//provide login and logout function
// make auth available globally

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(); // this is for to Creates a context object

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken("");
    setUser(null);
  };

  return (
    //AuthProvider:- a wrapper component that provides  auth data to the app.
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
    // children means whatever components are wrapped inside AuthProvider
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext); //useAuth() :- custom hook for easy access to auth context
