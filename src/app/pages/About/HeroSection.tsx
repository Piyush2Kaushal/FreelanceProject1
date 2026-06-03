import imgHeroBg from "figma:asset/576d2729c58c42b4db3109438f3caed132abc8c6.png";
import JournalHeader from "../../components/layout/JournalHeader";

export function HeroSection() {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ backgroundColor: "#dcd1b1", height: "839px" }}
    >
      {/* ── Header: Logo + Nav + Contact (shared JournalHeader, About active) ── */}
      <JournalHeader activePage="About" />

      {/* Hero image container */}
      <div
        className="absolute rounded-[8px] overflow-hidden"
        style={{ left: "33px", top: "118px", width: "calc(100% - 66px)",  height: "673px" }}
      >
        {/* Background image */}
        <img
          src={imgHeroBg}
          alt="Interior design space"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.8 }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 rounded-[8px]" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />

        {/* ROOTED · AUTHENTIC · YOURS — centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-3">
            {["R O O T E D", "A U T H E N T I C", "Y O U R S"].map((word, i) => (
              <span key={word} className="flex items-center gap-3">
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "24px",
                    fontWeight: 300,
                    letterSpacing: "-0.48px",
                    color: "#fff2dc",
                    lineHeight: 1.5,
                  }}
                >
                  {word}
                </span>
                {i < 2 && (
                  <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                    <circle cx="3" cy="3" r="3" fill="#DAB87A" />
                  </svg>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* "About" text — bottom left */}
        <p
          className="absolute"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "80px",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#efdcbc",
            lineHeight: 0.9,
            bottom: "44px",
            left: "48px",
          }}
        >
          About
        </p>

        {/* Talk to us → bottom right */}
        <div
          className="absolute flex flex-col items-end gap-[5px]"
          style={{ right: "32px", bottom: "44px" }}
        >
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "#efdcbc",
                lineHeight: 1.12,
              }}
            >
              Talk to us
            </span>
            <svg width="19" height="9" viewBox="0 0 19 8.5" fill="none">
              <g>
                <path d="M14.75 0.5L18.5 4.25L14.75 8" stroke="#EFDCBC" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18.5 4.25L0.5 4.25" stroke="#EFDCBC" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
          <div className="w-[90px] h-px" style={{ backgroundColor: "#EFDCBC" }} />
        </div>
      </div>
    </div>
  );
}