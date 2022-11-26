"use client";
import React from "react";
import PageNavbar from "./PageNavbar";
import { ToastContainer } from "react-toastify";

const PageLayout = ({ children }) => {
  return (
    <div>
      <PageNavbar />
      {children}
      <ToastContainer />
    </div>
  );
};

export default PageLayout;
