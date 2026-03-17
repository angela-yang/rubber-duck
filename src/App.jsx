import { useState, useRef, useCallback } from "react";

import NavBar from "./components/NavBar";
import About from "./components/About";
import Help from "./components/Help";
import Duck from "./components/Duck";
import DuckName from "./components/DuckName";
import SkinSwitcher from "./components/SkinSwitcher";
import MicButton from "./components/MicButton";
import TranscriptPanel from "./components/TranscriptPanel";

const GLB_URL = "ducks/duck.glb";
const DUCK_SKINS = [
  { id: "classic", label: "Classic Duck", color: "#FFD700", glbUrl: "/ducks/duck.glb", desc: "The OG." },
  { id: "bunny", label: "Bunny Duck", color: "#87CEEB", glbUrl: "/ducks/bunny.glb",  desc: "Cute and fluffy." },
  { id: "dino", label: "Dino Duck", color: "#90C67C", glbUrl: "/ducks/duck.glb",  desc: "Rawr." },
  { id: "alien", label: "Alien Duck", color: "#2C2C54", glbUrl: "/ducks/duck.glb",  desc: "Zlorp." },
  { id: "flower", label: "Flower Duck", color: "#FFB6C1", glbUrl: "/ducks/duck.glb",  desc: "Full of whimsy." },
];

export default function App() {
  const [page, setPage] = useState("duck");
  const [showHelp, setShowHelp] = useState(false);
  const [skinIdx, setSkinIdx] = useState(0);
  const [duckName, setDuckName] = useState("Mr. Duck");
  const [squeezed, setSqueezed] = useState(false);
  const [duckScale, setDuckScale] = useState(1.0);
  const [listening, setListening] = useState(false);
  const [transcriptLines, setTranscriptLines] = useState([]);
  const [summary, setSummary] = useState("");
  const [micError, setMicError] = useState("");
  const recognitionRef    = useRef(null);
  const fullTranscriptRef = useRef("");
  const skin = DUCK_SKINS[skinIdx];
  const audio = new Audio("/squeak.mp3");

  const handleDuckClick = useCallback(() => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setSqueezed(true);
    setTimeout(() => setSqueezed(false), 300);
  }, []);

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setMicError("Your browser doesn't support speech recognition. Try Chrome.");
      return;
    }
    setMicError("");

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onresult = (e) => {
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript;
      }
      if (!finalText) return;

      fullTranscriptRef.current += " " + finalText;
      setTranscriptLines((prev) => {
        const next = [...prev, finalText.trim()];
        // Duck grows every 3 lines, capped at 1.6×
        if (next.length % 5 === 0) setDuckScale((s) => Math.min(s + 0.06, 1.6));
        return next;
      });
    };

    rec.onerror = (e) => {
      if (e.error !== "no-speech") setMicError("Mic error: " + e.error);
    };

    rec.onend = () => {
      setListening(false);
      const words = fullTranscriptRef.current.trim().split(/\s+/);
      if (words.length > 4) {
        setSummary(`You spoke ${words.length} words. Great debugging session with ${duckName}!`);
      }
    };

    rec.start();
    recognitionRef.current = rec;
    setListening(true);
  }, [duckName]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const toggleMic = useCallback(() => {
    if (listening) stopListening();
    else startListening();
  }, [listening, startListening, stopListening]);

  const clearTranscript = useCallback(() => {
    setTranscriptLines([]);
    setSummary("");
    fullTranscriptRef.current = "";
  }, []);

  const bgGradient = `radial-gradient(ellipse at 50% 40%, ${skin.color}22 0%, ${skin.color}08 50%, #fafaf8 100%)`;
  const showTranscript = transcriptLines.length > 0 || listening;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafaf8; }
        button:hover { opacity: 0.8; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: bgGradient,
          transition: "background 0.8s ease",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <NavBar page={page} onNavigate={setPage} onHelp={() => setShowHelp(true)} />

        {page === "about" && <About />}
        {page === "duck" && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "20px",
            }}
          >
            <DuckName name={duckName} onChange={setDuckName} />
            <div
              style={{
                width: "min(380px, 85vw)",
                height: "min(380px, 85vw)",
                marginTop: "8px",
              }}
            >
              <Duck
                skin={skin}
                scale={duckScale}
                squeezed={squeezed}
                onClick={handleDuckClick}
                glbUrl={skin.glbUrl}
              />
            </div>

            <SkinSwitcher currentIdx={skinIdx} onChange={setSkinIdx} />

            <div style={{ marginTop: "24px" }}>
              <MicButton
                listening={listening}
                transcriptCount={transcriptLines.length}
                onToggle={toggleMic}
                error={micError}
              />
            </div>

            {duckScale > 1.05 && (
              <div style={{ marginTop: "8px", fontSize: "16px", color: "#aaa" }}>
                {duckName} is{" "}
                {duckScale > 1.4 ? "enormous" : duckScale > 1.2 ? "getting big!" : "growing"}
              </div>
            )}

            {showTranscript && (
              <TranscriptPanel
                lines={transcriptLines}
                summary={summary}
                duckName={duckName}
                onClear={clearTranscript}
              />
            )}
          </div>
        )}

        {showHelp && <Help onClose={() => setShowHelp(false)} />}
      </div>
    </>
  );
}