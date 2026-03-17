const DUCK_SKINS = [
  { id: "classic", label: "Classic Duck", color: "#FFD700", bodyColor: "#FFD700", billColor: "#FF8C00", desc: "The OG." },
  { id: "flower", label: "Flower Duck", color: "#FFB6C1", bodyColor: "#FFB6C1", billColor: "#FF69B4", desc: "Full of whimsy." },
  { id: "dino", label: "Dino Duck", color: "#90C67C", bodyColor: "#90C67C", billColor: "#5A8F3C", desc: "Rawr." },
  { id: "alien", label: "Alien Duck", color: "#2C2C54", bodyColor: "#2C2C54", billColor: "#7B2FBE", desc: "Zlorp." },
  { id: "bunny", label: "Bunny Duck", color: "#87CEEB", bodyColor: "#87CEEB", billColor: "#4169E1", desc: "Cute and fluffy." },
];

const btnStyle = {
  width: "36px",
  height: "36px",
  border: "1.5px solid rgba(0,0,0,0.1)",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,0.6)",
  color: "#555",
  transition: "all 0.15s",
};

export default function SkinSwitcher({ currentIdx, onChange }) {
  const skin = DUCK_SKINS[currentIdx];
  const prev = () => onChange((currentIdx - 1 + DUCK_SKINS.length) % DUCK_SKINS.length);
  const next = () => onChange((currentIdx + 1) % DUCK_SKINS.length);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", fontFamily: "'DM Sans', sans-serif" }}>
      <button onClick={prev} style={btnStyle}> ‹ </button>

      <div style={{ textAlign: "center", minWidth: "80px", padding: "20px" }}>
        <div style={{ fontWeight: 600, fontSize: "20px", color: "#444" }}>{skin.label}</div>
        <div style={{ fontSize: "18px", color: "#888", marginTop: "1px" }}>{skin.desc}</div>
      </div>

      <button onClick={next} style={btnStyle}> › </button>
    </div>
  );
}