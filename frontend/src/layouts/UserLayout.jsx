import React from "react";
import toast from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function UserLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('User logged out')
    navigate('/')

  }

  const name = localStorage.getItem('name')
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          User Panel
        </h2>

        <nav className="space-x-6 text-sm">
          <span className="flex">
          <p className="flex justify-center  items-center font-semibold text-md text-gray-800">Welcome {name}!</p>
        
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md text-gray-800 ml-5"
        >
          Logout
        </button></span>
        </nav>
      </div>

      {/* Page Content */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}