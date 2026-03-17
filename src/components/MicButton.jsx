import { FaMicrophone, FaStop } from "react-icons/fa";

export default function MicButton({ listening, transcriptCount, onToggle, error }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
      <button
        onClick={onToggle}
        title={listening ? "Stop listening" : "Talk to your duck"}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: listening ? "#FF4444" : "#2a2a2a",
          color: "white",
          fontSize: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          transition: "all 0.2s",
          boxShadow: listening ? "0 0 0 0 rgba(255,68,68,0.4)" : "0 4px 16px rgba(0,0,0,0.12)",
        }}
      >
        {listening ? <FaStop /> : <FaMicrophone />}
        {listening && (
          <span style={{
            position: "absolute",
            inset: "-8px",
            borderRadius: "50%",
            border: "3px solid #FF4444",
            animation: "pulse-ring 1.2s ease-out infinite",
          }} />
        )}
      </button>

      <span style={{ fontSize: "16px", color: "#aaa" }}>
        {listening
          ? `listening… ${transcriptCount > 0 ? `(${transcriptCount} lines)` : ""}`
          : "click to talk"}
      </span>

      {error && (
        <span style={{ fontSize: "16px", color: "#e44", maxWidth: "260px", textAlign: "center" }}>
          {error}
        </span>
      )}
    </div>
  );
}