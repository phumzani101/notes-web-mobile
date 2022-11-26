"use client";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { getFromLocalStorage } from "./lsutils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setAuth(getFromLocalStorage("auth"));
  }, []);

  // checks if the user is authenticated or not
  const isAuth = () => {
    return auth ? true : false;
  };

  return (
    <AuthContext.Provider value={[auth, setAuth, isAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
