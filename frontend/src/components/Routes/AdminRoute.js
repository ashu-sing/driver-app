import React from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../Dashboard/Sidebar";

const AdminRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/auth" />;

  return user && user.role === "admin" ? (
    <>
      <div className="admin-panel min-h-screen">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </>
  ) : (
    <Navigate to="/auth" />
  );
};

export default AdminRoute;
