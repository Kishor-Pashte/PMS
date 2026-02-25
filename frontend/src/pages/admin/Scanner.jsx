import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import API from "../../api/axios";

export default function Scanner() {
  const [message, setMessage] = useState("");
  const scannerRef = useRef(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false,
    );

    scannerRef.current = scanner;

    const onScanSuccess = async (decodedText) => {
      // 🚫 Prevent multiple calls
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      try {
        // 🛑 Stop scanning immediately
        await scanner.clear();

        const res = await API.post("/scan", {
          qrId: decodedText,
        });

        setMessage(res.data.message);
      } catch (e) {
        console.log(e);
        setMessage(e.response?.data?.message || "Scan failed");
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
      <h2>Vehicle Scanner</h2>
      <div id="reader" style={{ width: "350px", marginTop: "20px" }}></div>

      {message && (
        <h3 style={{ marginTop: "20px", color: "green" }}>{message}</h3>
      )}
    </div>
  );
}
