"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";

const PageAuth = ({ child }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  if (!auth) {
    router.push("/auth/signin");
    return null;
  }

  return <WrappedComponent {...props} />;
};

export default PageAuth;
