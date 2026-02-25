import React, { useState, useEffect } from "react";
import API from "../../api/axios";

export default function History() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  //filter
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
      console.error(e);
      console.log("Error fetching history");
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
      <h2>Scan History</h2>

      {/* //filter */}
      <div>
        <input
          type="date"
          name="date"
          value={filters.date}
          placeholder="Date"
          onChange={handleChange}
        />
        <select
          name="scanType"
          value={filters.scanType}
          onChange={handleChange}
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
        />

        <button onClick={fetchScanHistory}>Apply</button>
      </div>

      {loading ? (
        <h3>History Loading</h3>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Owner Name</th>
              <th>Vehicle Number</th>
              <th>Flat No</th>
              <th>Vehicle Type</th>
              <th>Scan Type</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {scans.map((scan) => (
              <tr key={scan._id}>
                <td>{scan.vehicleId?.ownerName}</td>
                <td>{scan.vehicleId?.vehicleNumber}</td>
                <td>{scan.vehicleId?.flatNumber}</td>
                <td>{scan.vehicleId?.type}</td>
                <td>
                  <span
                    style={{
                      color: scan.scanType === "Entry" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {scan.scanType}
                  </span>
                </td>
                <td>{new Date(scan.date).toLocaleDateString()}</td>
                <td>{new Date(scan.time).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
