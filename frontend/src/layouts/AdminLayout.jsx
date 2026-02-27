import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Admin logged out");
    navigate("/");
  };

  let admin = localStorage.getItem("admin");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Parking Admin</h2>

        <span className="flex">
          <p className="flex justify-center  items-center font-semibold text-md text-gray-800">
            Welcome {admin}!
          </p>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md text-gray-800 ml-5"
          >
            Logout
          </button>
        </span>
      </header>

      {/* Body Section */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-gray-200 p-6">
          <nav className="flex flex-col gap-4 text-sm text-gray-700">
            <Link
              to="/admin/dashboard"
              className={`hover:text-black ${activeTab == "Dashboard" ? "font-bold" : "none"} `}
              onClick={() => setActiveTab("Dashboard")}
            >
              Dashboard
            </Link>

            <Link
              to="/admin/generate-qr"
              className={`hover:text-black ${activeTab == "GenerateQR" ? "font-bold" : "none"} `}
              onClick={() => setActiveTab("GenerateQR")}
            >
              Generate QR
            </Link>

            <Link
              to="/admin/vehicles"
              className={`hover:text-black ${activeTab == "Vehicles" ? "font-bold" : "none"} `}
              onClick={() => setActiveTab("Vehicles")}
            >
              Vehicles
            </Link>

            <Link
              to="/admin/scanner"
              className={`hover:text-black ${activeTab == "Scanner" ? "font-bold" : "none"} `}
              onClick={() => setActiveTab("Scanner")}
            >
              Scanner
            </Link>

            <Link
              to="/admin/history"
              className={`hover:text-black ${activeTab == "History" ? "font-bold" : "none"} `}
              onClick={() => setActiveTab("History")}
            >
              History
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
