import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'

export default function ProtectedRoute({ role }) {
  const token = localStorage.getItem("token");

  if(!token) {
    return <Navigate to={'/'} replace/>;
  }

  try {
    const decoded = jwtDecode(token);

    //if role mismatch nsvigate to home, else give access
    if(decoded.role !== role) {
      return <Navigate to={'/'} replace/>
    }

    return <Outlet />;

  }catch(e) {
    console.error(e);
    localStorage.removeItem('token');
    return <Navigate to={'/'} replace/>
  } 

 
}
