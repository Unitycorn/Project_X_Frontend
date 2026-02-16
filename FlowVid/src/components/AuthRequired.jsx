import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export default function AuthRequired() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{
        message: "You must log in first",
        from: location.pathname,
      }}
      replace
    />
  );
}
