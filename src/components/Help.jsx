const HELP_ITEMS = [
  ["1. Pick your duck", "Use the arrows below to find your duck."],
  ["2. Name your duck", "Give your duck a name."],
  ["3. Squeak the duck", "Squeeze it! Relieve your stress."],
  ["4. Talk to your duck", "Hit the microphone button and explain your problem out loud. Your duck is listening."],
  ["5. Transcript", "Everything you say appears as a transcript. A summary appears for you when you stop."],
  ["6. Growth", "The more you talk, the bigger your duck gets!"],
];

export default function Help({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "40px",
          maxWidth: "470px",
          width: "90vw",
          boxShadow: "0 24px 80px rgba(0,0,0,0.15)",
        }}
      >
        <h3
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "30px",
            marginBottom: "20px",
            color: "#2a2a2a",
          }}
        >
          How to use your duck 🦆 
        </h3>

        {HELP_ITEMS.map(([title, desc]) => (
          <div key={title} style={{ marginBottom: "14px" }}>
            <div style={{ fontWeight: 600, fontSize: "20px", color: "#333", marginBottom: "2px" }}>
              {title}
            </div>
            <div style={{ fontSize: "18px", color: "#777", lineHeight: 1.5 }}>
              {desc}
            </div>
          </div>
        ))}

        <button
          onClick={onClose}
          style={{
            marginTop: "16px",
            width: "100%",
            padding: "12px",
            background: "#FFD700",
            border: "none",
            borderRadius: "18px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            cursor: "pointer",
            color: "#5a4000",
          }}
        >
          Got it, thanks
        </button>
      </div>
    </div>
  );
}