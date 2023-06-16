import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../PublicNavbar";

const PublicRoute = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PublicRoute;
