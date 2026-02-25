import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ role }) {
  const token = localStorage.getItem("token");

  if (!token) {
    <Navigate to={"/user/login"} />;
  }

  return <Outlet />;
}
