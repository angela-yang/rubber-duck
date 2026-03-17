const ABOUT_TEXT = `The Rubber Duck Debugging Method is a time-honored technique used by programmers everywhere.

The idea is simple: explain your problem out loud to a rubber duck, line-by-line and step-by-step.

By articulating the problem clearly enough for someone else (even an inanimate duck) to understand, you often spot the bug yourself. The act of explaining forces your brain to slow down, reconsider assumptions, and see what's actually there rather than what you think is there.

The duck doesn't judge. The duck doesn't get impatient. The duck just listens. 

It was popularized by the book "The Pragmatic Programmer" (1999), and has since become a beloved ritual in engineering culture.

So go ahead. Talk to your duck.`;

export default function About() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "570px",
          width: "100%",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(16px)",
          borderRadius: "28px",
          padding: "50px 38px",
          border: "1.5px solid rgba(0,0,0,0.07)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.06)",
        }}
      >
        <h2
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "30px",
            marginBottom: "20px",
            color: "#2a2a2a",
            textAlign: "center",
          }}
        >
          The Rubber Duck Method
        </h2>
        {ABOUT_TEXT.split("\n\n").map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "18px",
              lineHeight: 1.75,
              color: "#555",
              marginBottom: "16px",
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}