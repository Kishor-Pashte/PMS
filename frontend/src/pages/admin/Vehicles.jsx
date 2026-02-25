import React, { useState, useEffect } from "react";
import API from "../../api/axios";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGeneratedQRList = async () => {
    try {
      setLoading(true);
      const res = await API.get("/generate-qr");
      setVehicles(res.data.vehicles);
      setMessage(res.data.message);
    } catch (e) {
      console.error(e);
      setMessage(e.response?.data?.message || "Error Fetching Vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGeneratedQRList();
  }, []);

  const filteredVehicles = vehicles.filter((v) =>
    v.vehicleNumber?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p>Loading vehicles...</p>;

  return (
    <div>
      <h2>Registered Vehicles</h2>

      {message && <p>{message}</p>}

      <div>
        <input
          type="text"
          placeholder="Search by Vehicle Number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {!loading && filteredVehicles.length === 0 && <p>No vehicles found.</p>}

      <table>
        <thead>
          <tr>
            <th>Owner</th>
            <th>Vehicle Number</th>
            <th>Flat</th>
            <th>Vehicle Type</th>
            <th>Contact</th>
            <th>QR ID</th>
          </tr>
        </thead>

        <tbody>
          {filteredVehicles.map((v) => (
            <tr key={v._id}>
              <td>{v.ownerName}</td>
              <td>{v.vehicleNumber}</td>
              <td>{v.flatNumber}</td>
              <td>{v.vehicleType}</td>
              <td>{v.contact}</td>
              <td>{v.qrId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
