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
    return (
      <div className="text-gray-600 text-sm">
        Dashboard Loading...
      </div>
    );
  }

  return (
    <div>
      {/* Page Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Admin Dashboard
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card title="Total Vehicles" value={stats.totalVehicles} />
        <Card title="Entries Today" value={stats.totalEntriesToday} />
        <Card title="Exits Today" value={stats.totalExitsToday} />
        <Card
          title="Currently Inside Vehicles"
          value={stats.insideVehicles}
        />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-6">
      <h4 className="text-sm text-gray-600 mb-2">
        {title}
      </h4>
      <h4 className="text-2xl font-semibold text-gray-800">
        {value}
      </h4>
    </div>
  );
}