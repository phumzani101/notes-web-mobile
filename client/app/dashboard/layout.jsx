"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";

const DashboardLayout = ({ children }) => {
  const [auth] = useContext(AuthContext);
  const [loading, setloading] = useState(true);
  const router = useRouter();

  // not perfect, but it works
  useEffect(() => {
    setTimeout(() => {
      if (auth) {
        setloading(false);
      } else {
        router.push("/auth/signin");
        return;
      }
    }, 1000);
  }, [auth]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return <section>{children}</section>;
};

export default DashboardLayout;
