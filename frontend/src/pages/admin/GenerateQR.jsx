import React, { useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";

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
      

      toast.success(res.data.message)
      setFormData({
        ownerName: "",
        vehicleNumber: "",
        email: "",
        flatNumber: "",
        vehicleType: "",
        contact: "",
      });
    } catch (e) {
      toast.error(e.response?.data?.message || "Error Creating QR");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Register Vehicle & Generate QR
      </h2>

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-md p-6 mb-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            required
            placeholder="Owner Name"
            value={formData.ownerName}
            name="ownerName"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <input
            type="text"
            required
            placeholder="Vehicle Number"
            value={formData.vehicleNumber}
            name="vehicleNumber"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <input
            type="email"
            required
            placeholder="Owner Email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <input
            type="text"
            required
            placeholder="Flat Number"
            value={formData.flatNumber}
            name="flatNumber"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <input
            type="text"
            required
            placeholder="Vehicle Type"
            value={formData.vehicleType}
            name="vehicleType"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <input
            type="text"
            required
            placeholder="Contact No"
            value={formData.contact}
            name="contact"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md text-sm"
            >
              Generate QR
            </button>
          </div>
        </form>
      </div>

      

      {/* QR Preview */}
      {qrImage && (
        <div className="bg-white border border-gray-200 rounded-md p-6 text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            QR Code
          </h3>

          <img
            src={qrImage}
            alt="QR Code"
            className="mx-auto mb-4 w-40 h-40"
          />

          <a
            href={qrImage}
            download="vehicle-qr.png"
            className="inline-block bg-gray-900 text-white px-4 py-2 rounded-md text-sm"
          >
            Download QR
          </a>
        </div>
      )}
    </div>
  );
}