import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg p-10 w-[380px] text-center">
        <h1 className="text-2xl font-bold mb-2">Parking Management System</h1>

        <p className="text-gray-500 mb-8">Select your role to continue</p>
        <div className="flex flex-col gap-4">
          <Link
            className="bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
            to={"/admin/login"}
          >
            Admin Login
          </Link>
          <Link
            className="border border-gray-900 py-2 rounded-lg hover:bg-gray-100 transition"
            to={"/user/login"}
          >
            Resident Login
          </Link>
        </div>
      </div>
    </div>
  );
}
