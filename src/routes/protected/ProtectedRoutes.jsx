import React from "react";
import Home from "../../pages/home/Home";
import jwtDecode from "jwt-decode";
import AdminHome from "../../pages/Admin/AdminHome";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AdminRoutes from "../AdminRoutes";
import UserRoutes from "../UserRoutes";

function ProtectedRoutes() {
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.is_admin) {
      return <AdminRoutes />
    } else {
      return <UserRoutes />;
    }
  } else {
    return <Home />;
  }
}

export default ProtectedRoutes;
