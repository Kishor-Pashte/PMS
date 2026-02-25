import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";

export default function UserLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    
    try {
      const res = await API.post("/user/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem('name', res.data.name)

      toast.success(res.data.message)
      navigate("/user/my-vehicle");
    } catch (e) {
      toast.error(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
      <div className="bg-white border border-gray-200 rounded-md p-8 w-full max-w-sm">
        
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          User Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md text-sm"
          >
            Login
          </button>

          <Link className="flex justify-center text-gray-600 hover:text-gray-900 " to={'/'}>Navigate to Home</Link>

          
        </form>

      </div>
    </div>
  );
}