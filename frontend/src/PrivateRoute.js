import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, role  } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated ? (
        role === "admin" ? (
          <Navigate to="/admin" />
        ) : (
          <Navigate to="/user" />
        )
      ) : (
        <Navigate to="/auth" />
      )}
    </>
  );
};

export default PrivateRoute;
