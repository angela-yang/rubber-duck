import { useEffect, useRef } from "react";

export default function TranscriptPanel({ lines, summary, duckName, onClear }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div
      style={{
        marginTop: "20px",
        width: "min(520px, 90vw)",
        maxHeight: "180px",
        overflowY: "auto",
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(12px)",
        borderRadius: "18px",
        border: "1.5px solid rgba(0,0,0,0.07)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ padding: "14px 18px 8px", fontSize: "14px", color: "#333", lineHeight: 1.65 }}>
        {lines.length === 0 ? (
          <span style={{ color: "#aaa", fontStyle: "italic" }}>
            Start talking… {duckName} is listening 🦆
          </span>
        ) : (
          lines.map((line, i) => (
            <p key={i} style={{ margin: "2px 0" }}>{line}</p>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {summary && (
        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.06)",
            padding: "8px 18px",
            fontSize: "12px",
            color: "#666",
            background: "rgba(255,248,200,0.7)",
            borderRadius: "0 0 18px 18px",
          }}
        >
          <strong style={{ color: "#a07800" }}>💡 </strong>
          {summary}
        </div>
      )}

      {lines.length > 0 && (
        <button
          onClick={onClear}
          style={{
            display: "block",
            margin: "0 auto 10px",
            fontSize: "11px",
            color: "#bbb",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          clear
        </button>
      )}
    </div>
  );
}