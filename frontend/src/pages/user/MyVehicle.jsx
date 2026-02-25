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
      setVehicle(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserVehicle();
  }, []);

  if (loading)
    return <p className="text-sm text-gray-600">Loading...</p>;

  return (
    <div>

      {/* Page Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        My Vehicle
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "profile"
              ? "border-b-2 border-gray-900 text-gray-900"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Profile
        </button>

        <button
          onClick={() => setActiveTab("qr")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "qr"
              ? "border-b-2 border-gray-900 text-gray-900"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          My QR Code
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "history"
              ? "border-b-2 border-gray-900 text-gray-900"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          My Parking History
        </button>
      </div>

      {/* Content Box */}
      <div className="bg-white border border-gray-200 rounded-md p-6 min-h-[250px]">

        {/* PROFILE TAB */}
        {activeTab === "profile" && vehicle && (
          <div className="space-y-3 text-sm">
            <h3 className="text-lg font-semibold mb-4">Profile</h3>

            <p><strong>Owner Name:</strong> {vehicle.ownerName}</p>
            <p><strong>Vehicle Number:</strong> {vehicle.vehicleNumber}</p>
            <p><strong>Flat:</strong> {vehicle.flatNumber}</p>
            <p><strong>Email:</strong> {vehicle.email}</p>
            <p>
              <strong>Registration Date:</strong>{" "}
              {new Date(vehicle.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* QR TAB */}
        {activeTab === "qr" && vehicle && (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-6">
              My QR Code
            </h3>

            <img
              src={vehicle.qrImage}
              alt="QR"
              className="w-48 mx-auto mb-6 border border-gray-200 p-2 rounded-md"
            />

            <a
              href={vehicle.qrImage}
              download="my-qr.png"
              className="inline-block bg-gray-900 text-white text-sm px-5 py-2 rounded-md"
            >
              Download QR
            </a>
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === "history" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Parking History
            </h3>
            <p className="text-sm text-gray-600">
              (History API not implemented yet)
            </p>
          </div>
        )}

      </div>
    </div>
  );
}