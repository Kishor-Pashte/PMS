import React, { useState } from "react";
import API from "../../api/axios";

export default function GenerateQR() {
  const [formData, setFormData] = useState({
    ownerName: "",
    vehicleNumber: "",
    email: "",
    flatNumber: "",
    vehicleType: "",
    contact: "",
  });

  const [qrImage, setQrImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/generate-qr", formData);
      setQrImage(res.data.qrImage);
      setMessage(res.data.message);
      setFormData({
        ownerName: "",
        vehicleNumber: "",
        email: "",
        flatNumber: "",
        vehicleType: "",
        contact: "",
      });
    } catch (e) {
      console.log(e);
      setMessage(e.response?.data?.message || "Error Creating QR");
    }
  };
  return (
    <div>
      <h2>Register Vehicle & Generate QR</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Owner Name"
          value={formData.ownerName}
          name="ownerName"
          onChange={handleChange}
        />
        <input
          type="text"
          required
          placeholder="Vehicle Number"
          value={formData.vehicleNumber}
          name="vehicleNumber"
          onChange={handleChange}
        />
        <input
          type="email"
          required
          placeholder="Owner Email"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
        <input
          type="text"
          required
          placeholder="Flat Number"
          value={formData.flatNumber}
          name="flatNumber"
          onChange={handleChange}
        />
        <input
          type="text"
          required
          placeholder="Vehicle Type"
          value={formData.vehicleType}
          name="vehicleType"
          onChange={handleChange}
        />
        <input
          type="text"
          required
          placeholder="Contact No"
          value={formData.contact}
          name="contact"
          onChange={handleChange}
        />
        <button type="submit">Generate QR</button>
      </form>

      {message && <p>{message}</p>}

      {qrImage && (
        <div style={{ marginTop: "20px" }}>
          <h3>QR Code: </h3>
          <img style={{ width: "200" }} src={qrImage} alt="QR Code" />
          <a
            href={qrImage}
            download="vehicle-qr.png"
            style={{
              padding: "10px 15px",
              background: "#16a34a",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
            }}
          >
            Download QR
          </a>
        </div>
      )}
    </div>
  );
}
