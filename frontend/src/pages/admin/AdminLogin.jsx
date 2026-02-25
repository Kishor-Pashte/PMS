import React, { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

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
      const res = await API.post("/admin/login", formData);
      localStorage.setItem("token", res.data.token);

      alert("Admin login success");
      navigate("/admin/dashboard");
    } catch (e) {
      console.log(e);
      setError(e.response?.data?.message || "Login failed");
    }
  };
  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          name="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
