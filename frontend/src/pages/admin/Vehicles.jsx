import React, { useState, useEffect } from "react";
import API from "../../api/axios";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGeneratedQRList = async () => {
    try {
      setLoading(true);
      const res = await API.get("/generate-qr");
      setVehicles(res.data.vehicles);
    } catch (e) {
      console.error(e.response?.data?.message || "Error Fetching Vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGeneratedQRList();
  }, []);

  const filteredVehicles = vehicles.filter((v) =>
    v.vehicleNumber?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <p className="text-sm text-gray-600">Loading vehicles...</p>;

  return (
    <div>
      {/* Page Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registered Vehicles
      </h2>

      

      {/* Search Card */}
      <div className="bg-white border border-gray-200 rounded-md p-4 mb-6 max-w-md">
        <input
          type="text"
          placeholder="Search by Vehicle Number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-md overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Vehicle Number</th>
              <th className="px-4 py-3">Flat</th>
              <th className="px-4 py-3">Vehicle Type</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">QR ID</th>
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.map((v) => (
              <tr key={v._id} className="border-t">
                <td className="px-4 py-3">{v.ownerName}</td>
                <td className="px-4 py-3">{v.vehicleNumber}</td>
                <td className="px-4 py-3">{v.flatNumber}</td>
                <td className="px-4 py-3">{v.vehicleType}</td>
                <td className="px-4 py-3">{v.contact}</td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {v.qrId}
                </td>
              </tr>
            ))}

            {filteredVehicles.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}