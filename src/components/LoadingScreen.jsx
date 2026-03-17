import { useEffect, useState } from "react";

const DUCK_PUNS = [
  "Getting your ducks in a row…",
  "Quacking the bugs open…",
  "Fluffing feathers, please wait…",
  "Rubber up, we're almost there…",
  "Down to the last quack…",
  "Teaching the duck to listen…",
];

export default function LoadingScreen({ progress }) {
  const [punIdx, setPunIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPunIdx((i) => (i + 1) % DUCK_PUNS.length), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#ffe099",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "28px", zIndex: 9999,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <img
        src="/loading.gif"
        alt=""
        style={{
          width: "clamp(90px, 18vw, 150px)",
          filter: "drop-shadow(0 8px 24px rgba(160,100,0,0.18))",
        }}
      />

      <p
        key={punIdx}
        style={{
          fontSize: "clamp(16px, 2.7vw, 18px)",
          color: "#ff6200",
          fontWeight: 700,
          textAlign: "center",
          maxWidth: "280px",
          lineHeight: 1.55,
          animation: "pun-fade 0.35s ease",
        }}
      >
        {DUCK_PUNS[punIdx]}
      </p>

      {/* Progress bar */}
      <div style={{
        width: "clamp(160px, 36vw, 260px)",
        height: "8px",
        background: "rgba(247, 131, 29, 0.33)",
        borderRadius: "99px",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${Math.round(progress * 100)}%`,
          background: "#ff6200",
          borderRadius: "99px",
          transition: "width 0.35s ease",
        }} />
      </div>

      <p style={{ fontSize: "16px", color: "rgba(208, 114, 7, 0.48)", marginTop: "-14px" }}>
        {Math.round(progress * 100)}%
      </p>

      <style>{`
        @keyframes pun-fade {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}