import React, { useEffect, useState } from "react";
import API from "../../api/axios";

export default function MyVehicle() {
  const [activeTab, setActiveTab] = useState("profile");
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserVehicle = async () => {
    setLoading(true);
    try {
      const res = await API.get("/scan/my-vehicles");
      if (res.data.length > 0) {
        setVehicle(res.data[0]); //we take first vehicle
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserVehicle();
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={container}>
      <div style={navbar}>
        <h3>User Panel</h3>
      </div>

      <div style={tabContainer}>
        <button onClick={() => setActiveTab("profile")}>Profile</button>

        <button onClick={() => setActiveTab("qr")}>My QR Code</button>

        <button onClick={() => setActiveTab("history")}>
          My Parking History
        </button>
      </div>

      <div style={contentBox}>
        {activeTab === "profile" && vehicle && (
          <div>
            <h3>Profile</h3>
            <p>
              <strong>Name:</strong> {vehicle.ownerName}
            </p>
            <p>
              <strong>Vehicle Number:</strong> {vehicle.vehicleNumber}
            </p>
            <p>
              <strong>Flat:</strong> {vehicle.flatNumber}
            </p>
            <p>
              <strong>Vehicle Type:</strong> {vehicle.vehicleType}
            </p>
            <p>
              <strong>Registration Date:</strong> {vehicle.createdAt}
            </p>
          </div>
        )}

        {activeTab === "qr" && vehicle && (
          <div>
            <h3>My QR Code</h3>
            <img
              src={vehicle.qrImage}
              alt="QR"
              style={{ width: "200px", marginBottom: "15px" }}
            />
            <br />
            <a href={vehicle.qrImage} download="my-qr.png" style={downloadBtn}>
              Download QR
            </a>
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <h3>Parking History</h3>
            <p>(History API not implemented yet)</p>
          </div>
        )}
      </div>
    </div>
  );
}

const container = {
  padding: "20px",
};

const navbar = {
  background: "#111827",
  color: "white",
  padding: "15px",
  marginBottom: "20px",
};

const tabContainer = {
  display: "flex",
  gap: "15px",
  marginBottom: "20px",
};

const tabStyle = {
  padding: "10px 20px",
  border: "1px solid #ccc",
  background: "#f3f4f6",
  cursor: "pointer",
};

const activeTabStyle = {
  ...tabStyle,
  background: "#111827",
  color: "white",
};

const contentBox = {
  border: "2px solid #ccc",
  padding: "20px",
  minHeight: "250px",
};

const downloadBtn = {
  padding: "8px 15px",
  background: "black",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
};
