import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PublicRoute = ({ isAuth, children }) => {
  const location = useLocation();
  return isAuth ? <Navigate to="/" state={{ from: location }} /> : children;
};
