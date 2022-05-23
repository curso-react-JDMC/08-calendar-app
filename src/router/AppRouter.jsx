import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { startChecking } from "../redux/actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Espere...</h5>;
  }
  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={<PublicRoute isAuth={!!uid} children={<LoginScreen />} />}
      />
      <Route
        exact
        path="/"
        element={<PrivateRoute isAuth={!!uid} children={<CalendarScreen />} />}
        isAuth={!!uid}
      />
       <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
