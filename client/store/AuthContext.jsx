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

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
