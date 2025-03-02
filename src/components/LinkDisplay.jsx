import { message } from "antd";
import React, { useState } from "react";
// 
const LinkDisplay = ({genaratedLink }) => {
  const [isCopied, setIsCopied] = useState(false);
  // Copy link to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(genaratedLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(() => {
        message.error("Failed to copy link.");
      });
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      {/* Link Input Field */}
      <input
        type="text"
        value={genaratedLink}
        readOnly
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          flex: 1,
          fontSize: "14px",
        }}
      />

      {/* Copy Button */}
      <button
        onClick={handleCopyToClipboard}
        style={{
          padding: "8px 16px",
          backgroundColor: isCopied ? "#52c41a" : "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default LinkDisplay;