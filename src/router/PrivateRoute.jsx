import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ isAuth, children }) => {
  const location = useLocation();
  return !isAuth ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    children
  );
};
