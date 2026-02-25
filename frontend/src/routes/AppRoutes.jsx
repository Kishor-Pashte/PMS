import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import GenerateQR from "../pages/admin/GenerateQR";
import History from "../pages/admin/History";
import Scanner from "../pages/admin/Scanner";
import Vehicles from "../pages/admin/Vehicles";

import UserLogin from "../pages/user/UserLogin";
import UserLayout from "../layouts/UserLayout";
import MyVehicle from "../pages/user/MyVehicle";

import HomePage from "../pages/HomePage";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Home page */}
        <Route path="/" element={<HomePage />}/>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute role={'admin'}/>}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/generate-qr" element={<GenerateQR />} />
            <Route path="/admin/history" element={<History />} />
            <Route path="/admin/scanner" element={<Scanner />} />
            <Route path="/admin/vehicles" element={<Vehicles />} />
          </Route>
        </Route>

        <Route path="/user/login" element={<UserLogin />} />

        <Route element={<ProtectedRoute role={'user'}/>}>
          <Route element={<UserLayout />}>
            <Route path="/user/my-vehicle" element={<MyVehicle />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
