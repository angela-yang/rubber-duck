import { useState, useRef, useEffect } from "react";

export default function DuckName({ name, onChange }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]   = useState(name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commit = () => {
    onChange(draft.trim() || "Mr. Duck");
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        maxLength={20}
        style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: "30px",
          border: "none",
          borderBottom: "2px solid #FFD700",
          background: "transparent",
          textAlign: "center",
          outline: "none",
          color: "#3a3a3a",
          width: "160px",
        }}
      />
    );
  }

  return (
    <div
      onClick={() => { setDraft(name); setEditing(true); }}
      title="Click to rename your duck"
      style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: "30px",
        color: "#3a3a3a",
        cursor: "text",
        borderBottom: "2px dashed rgba(0,0,0,0.15)",
        paddingBottom: "2px",
        userSelect: "none",
      }}
    >
      {name}
    </div>
  );
}