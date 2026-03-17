const btnStyle = {
  width: "36px",
  height: "36px",
  border: "1.5px solid rgba(0,0,0,0.1)",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.6)",
  color: "#555",
  transition: "all 0.15s",
};

export default function SkinSwitcher({ skins, currentIdx, onChange, onSelect, selecting }) {
  const skin = skins[currentIdx];
  const prev = () => onChange((currentIdx - 1 + skins.length) % skins.length);
  const next = () => onChange((currentIdx + 1) % skins.length);

  if (!selecting) return null;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "14px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <button onClick={prev} style={btnStyle}> ‹ </button>
        <div style={{ textAlign: "center", minWidth: "120px" }}>
          <div style={{ fontWeight: 600, fontSize: "20px", color: "#333" }}>{skin.label}</div>
          <div style={{ fontSize: "18px", color: "#999", marginTop: "2px" }}>{skin.desc}</div>
          <div style={{ fontSize: "16px", color: "#bbb", marginTop: "2px" }}>
            {currentIdx + 1} / {skins.length}
          </div>
        </div>
        <button onClick={next} style={btnStyle}> › </button>
      </div>

      <button
        onClick={onSelect}
        style={{
          padding: "10px 32px",
          marginTop: "10px",
          background: "#2a2a2a",
          color: "white",
          border: "none",
          borderRadius: "99px",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: "18px",
          cursor: "pointer",
          letterSpacing: "0.04em",
          boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
          transition: "all 0.2s",
        }}
      >
        select this duck ›
      </button>
    </div>
  );
}