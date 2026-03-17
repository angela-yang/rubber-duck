export default function NavBar({ page, onNavigate, onHelp }) {
  const navBtnStyle = (active) => ({
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'DM Serif Display', Georgia, serif",
    fontSize: "22px",
    letterSpacing: "0.01em",
    color: active ? "#2a2a2a" : "#bbb",
    textDecoration: active ? "underline" : "none",
    textDecorationColor: "#FFD700",
    textUnderlineOffset: "5px",
    textDecorationThickness: "2px",
    transition: "color 0.2s",
  });

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "32px",
        paddingTop: "28px",
        paddingBottom: "8px",
      }}
    >
      <button onClick={() => onNavigate("duck")}  style={navBtnStyle(page === "duck")}>duck</button>
      <button onClick={() => onNavigate("about")} style={navBtnStyle(page === "about")}>about</button>
      <button onClick={onHelp} style={navBtnStyle(false)}>help</button>
    </nav>
  );
}