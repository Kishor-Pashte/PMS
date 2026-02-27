import React, { useState } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { RotatingLines } from "react-loader-spinner";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch(); //use to send action to redux store
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
    setLoading(true);

    try {
      const res = await API.post("/admin/login", formData);
      // localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", res.data.adminName);
      dispatch(loginSuccess(res.data.token));

      toast.success(res.data.message);
      navigate("/admin/dashboard");
    } catch (e) {
      toast.error(e.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-md shadow-sm w-full max-w-md p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full mb-5 bg-gray-900 text-white py-2 rounded-md text-sm"
          >
            {loading ? "Signing you in..." : "Login"}
          </button>
          <Link
            className="flex justify-center text-gray-600 hover:text-gray-900 "
            to={"/"}
          >
            Navigate to Home
          </Link>
        </form>
      </div>
    </div>
  );
}
