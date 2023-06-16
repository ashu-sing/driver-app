import React from "react";
import { Navigate } from "react-router-dom";
import DriverNavbar from "../DriverComponents/DriverNavbar";
import Layout from "../Layout";

const DriverRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/auth" />;

  return user && user.role === "driver" ? (
    <>
      <DriverNavbar />
      <Layout>{children}</Layout>
    </>
  ) : (
    <Navigate to="/auth" />
  );
};

export default DriverRoute;
