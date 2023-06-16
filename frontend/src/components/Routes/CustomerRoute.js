import React from "react";
import { Navigate } from "react-router-dom";
import CustomerNavbar from "../CustomerComponents/CustomerNavbar";
import Footer from "../Footer";

const CustomerRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/auth" />;
  return user && user.role === "customer" ? (
    { children }
  ) : (
    <Navigate to="/auth" />
  );

  return (
    <>
      <CustomerNavbar />
      <div className="min-h-[70vh] mt-24">{children}</div>
      <Footer />
    </>
  );
};

export default CustomerRoute;
