import React, { useState, useEffect } from "react";
import API from "../../api/axios";

export default function History() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    date: "",
    scanType: "",
    vehicleNumber: "",
  });

  const fetchScanHistory = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await API.get(`/scan?${query}`);
      setScans(res.data.scanHistory);
    } catch (e) {
      console.error("Error fetching history", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScanHistory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div>
      {/* Page Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Scan History
      </h2>

      {/* Filters Card */}
      <div className="bg-white border border-gray-200 rounded-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <select
            name="scanType"
            value={filters.scanType}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="">All</option>
            <option value="Entry">Entry</option>
            <option value="Exit">Exit</option>
          </select>

          <input
            type="text"
            name="vehicleNumber"
            value={filters.vehicleNumber}
            placeholder="Vehicle Number"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <button
            onClick={fetchScanHistory}
            className="bg-gray-900 text-white rounded-md text-sm px-4 py-2"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-sm text-gray-600">History Loading...</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-md overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Owner Name</th>
                <th className="px-4 py-3">Vehicle Number</th>
                <th className="px-4 py-3">Flat No</th>
                <th className="px-4 py-3">Vehicle Type</th>
                <th className="px-4 py-3">Scan Type</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>

            <tbody>
              {scans.map((scan) => (
                <tr key={scan._id} className="border-t">
                  <td className="px-4 py-3">
                    {scan.vehicleId?.ownerName}
                  </td>
                  <td className="px-4 py-3">
                    {scan.vehicleId?.vehicleNumber}
                  </td>
                  <td className="px-4 py-3">
                    {scan.vehicleId?.flatNumber}
                  </td>
                  <td className="px-4 py-3">
                    {scan.vehicleId?.vehicleType}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        scan.scanType === "Entry"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {scan.scanType}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(scan.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(scan.time).toLocaleTimeString()}
                  </td>
                </tr>
              ))}

              {scans.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500"
                  >
                    No history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}