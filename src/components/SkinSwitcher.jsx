const DUCK_SKINS = [
  { id: "classic", label: "Classic Duck", color: "#FFD700", glbUrl: "/ducks/duck.glb", desc: "The OG." },
  { id: "bunny", label: "Bunny Duck", color: "#87CEEB", glbUrl: "/ducks/bunny.glb",  desc: "Cute and fluffy." },
  { id: "dino", label: "Dino Duck", color: "#90C67C", glbUrl: "/ducks/duck.glb",  desc: "Rawr." },
  { id: "alien", label: "Alien Duck", color: "#2C2C54", glbUrl: "/ducks/duck.glb",  desc: "Zlorp." },
  { id: "flower", label: "Flower Duck", color: "#FFB6C1", glbUrl: "/ducks/duck.glb",  desc: "Full of whimsy." },
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