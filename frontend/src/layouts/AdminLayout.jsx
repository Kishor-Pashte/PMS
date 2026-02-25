import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div>
      <div>
        <h2>Parking Admin</h2>

        <nav>
          <Link to={"/admin/dashboard"}>Dashboard</Link>
          <Link to={"/admin/generate-qr"}>Generate QR</Link>
          <Link to={"/admin/vehicles"}>Vehicles</Link>
          <Link to={"/admin/scanner"}>Scanner</Link>
          <Link to={"/admin/history"}>History</Link>
        </nav>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
