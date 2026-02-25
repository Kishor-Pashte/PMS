import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import API from "../../api/axios";

export default function Scanner() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success / error
  const scannerRef = useRef(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scannerRef.current = scanner;

    const onScanSuccess = async (decodedText) => {
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      try {
        await scanner.clear();

        const res = await API.post("/scan", {
          qrId: decodedText,
        });

        setMessage(res.data.message);
        setStatus("success");
      } catch (e) {
        setMessage(e.response?.data?.message || "Scan failed");
        setStatus("error");
      }
    };

    document.getElementById("reader").innerHTML = "";
    scanner.render(onScanSuccess);

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div>
      {/* Page Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Vehicle Scanner
      </h2>

      {/* Scanner Card */}
      <div className="bg-white border border-gray-200 rounded-md p-6 max-w-md">
        <div
          id="reader"
          className="w-full"
        ></div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mt-6 p-4 rounded-md text-sm font-medium max-w-md ${
            status === "success"
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}