import React, { useState, useEffect } from "react";
import API from "../../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await API.get("/scan/dashboard");
      setStats(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <h3>Dashboard Loading...</h3>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        <Card title="Total Vehicles" value={stats.totalVehicles} />
        <Card title="Entries Today" value={stats.totalEntriesToday} />
        <Card title="Exits Today" value={stats.totalExitsToday} />
        <Card title="Currently Inside Vehicles" value={stats.insideVehicles} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div>
      <h4>{title}</h4>
      <h4>{value}</h4>
    </div>
  );
}
