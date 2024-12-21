import { useState } from "react";
import QRCode from "qrcode"; // Ensure the `qrcode` package is installed

const Qrcode = () => {
  const [url, setUrl] = useState<string>(""); // State to hold the input URL
  const [qrcode, setQrcode] = useState<string>(""); // State to hold the generated QR code

  const GenerateQrCode = () => {
    if (!url.trim()) {
      alert("Please enter a valid URL.");
      return;
    }

    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 1,
        color: {
          dark: "#000000ff", // Black for QR code
          light: "#ffffffff", // White for background
        },
      },
      (err, generatedUrl) => {
        if (err) {
          console.error("Error generating QR code:", err);
        } else {
          setQrcode(generatedUrl); // Set the QR code URL
          setUrl(""); // Clear the input field
        }
      }
    );
  };

  return (
    <div className="qr-code-app">
      {/* Title */}
      <h1>QR Code Generator</h1>

      {/* Input Field */}
      <input
        type="text"
        placeholder="e.g., https://google.com"
        value={url}
        onChange={(evt) => setUrl(evt.target.value)}
      />

      {/* Generate Button */}
      <button onClick={GenerateQrCode}>Generate</button>

      {/* Display QR Code and Download Link */}
      {qrcode && (
        <div className="qr-code-output">
          <img src={qrcode} alt="Generated QR Code" />
          <a href={qrcode} download="qrcode.png">
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default Qrcode;
