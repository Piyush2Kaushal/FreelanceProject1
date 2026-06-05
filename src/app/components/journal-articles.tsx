import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgTexture from "../../assets/23497d1b739628a6a7bb08b118680a57cca44246.png";
import { ALL_ARTICLES } from "../../data/articles";
import type { ArticleData } from "../../data/articles";

// Build the article list from the data file — no hardcoded data here
// The strip card properties (bg, gap, leftOffset, tracking) all come from ArticleData

export function JournalArticles() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const expanded: ArticleData | null =
    ALL_ARTICLES.find((a) => a.id === expandedId) ?? null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setExpandedId(null);
      setIsClosing(false);
    }, 1500);
  };

  const getClipPath = () => {
    if (expanded && !isClosing) return "inset(0 0% 0 0%)";
    if (isClosing) return "inset(0 0% 0 100%)";
    return "inset(0 0% 0 100%)";
  };

  return (
    <div className="bg-[#dcd1b1] h-[800px] overflow-hidden relative w-full">
      {/* Texture overlay */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[rgba(220,209,177,0.1)] inset-0" />
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover opacity-10 w-full h-full"
          src={imgTexture}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: expanded?.bg ?? "transparent",
          clipPath: getClipPath(),
          transition: isClosing
            ? "clip-path 1.5s cubic-bezier(0.22, 1, 0.36, 1)"
            : "clip-path 0.85s cubic-bezier(0.22, 1, 0.36, 1)",
          zIndex: 4,
          pointerEvents: expanded && !isClosing ? "all" : "none",
        }}
      >
        {/* Texture on expanded panel */}
        <img
          aria-hidden
          alt=""
          className="absolute inset-0 max-w-none object-cover opacity-10 w-full h-full pointer-events-none"
          src={imgTexture}
        />

        {/* Back arrow */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 24,
            left: 32,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
            zIndex: 10,
            opacity: expanded && !isClosing ? 1 : 0,
            transition: "opacity 0.3s ease 0.55s",
          }}
        >
          <svg width="22" height="18" viewBox="0 0 13 9" fill="none">
            <path d="M6.5 0L13 9H0L6.5 0Z" fill="rgba(255,255,255,0.85)" />
          </svg>
        </button>

        {/* Article content */}
        <div
          style={{
            position: "absolute",
            left: 39,
            top: 0,
            bottom: 0,
            right: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: expanded && !isClosing ? 1 : 0,
            transform: expanded && !isClosing ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 0.55s ease 0.35s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.35s",
          }}
        >
          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(28px, 4vw, 62px)",
              lineHeight: 1.08,
              color: "white",
              margin: "0 0 18px",
              maxWidth: 620,
            }}
          >
            {expanded?.title}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 20,
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.74)",
              margin: "0 0 34px",
              maxWidth: 500,
            }}
          >
            {expanded?.description}
          </p>
          <div>
            <button
              onClick={() =>
                expanded && navigate(`/journal/article/${expanded.slug}`)
              }
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: "0.04em",
                color: expanded?.bg,
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "none",
                borderRadius: 3,
                padding: "8px 21px",
                cursor: "pointer",
              }}
            >
              Read Article
            </button>
          </div>
        </div>
      </div>

      {/* ── STRIPS ── */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          right: "0px",
          top: "64px",
          width: "400px",
          height: "736px",
          zIndex: 6,
        }}
      >
        <div className="flex-none" style={{ transform: "rotate(-90deg)" }}>
          <div className="relative" style={{ width: "736px", height: "400px" }}>
            {ALL_ARTICLES.map((article, index) => (
              <button
                key={article.id}
                className="absolute left-0 right-0 overflow-hidden cursor-pointer block"
                onClick={() => setExpandedId(article.id)}
                style={{
                  backgroundColor: article.bg,
                  top: `${index * 100}px`,
                  height: "100px",
                  border: "none",
                }}
              >
                <div
                  className="absolute flex items-center whitespace-nowrap"
                  style={{
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: `${article.leftOffset}px`,
                    gap: `${article.gap}px`,
                  }}
                >
                  <span
                    className="font-['Inter',sans-serif] font-normal text-white"
                    style={{ fontSize: "22px" }}
                  >
                    {article.id}
                  </span>
                  <span
                    className="font-['Inter',sans-serif] font-normal text-[#fff7f7]"
                    style={{
                      fontSize: "22px",
                      letterSpacing: article.tracking ?? "normal",
                    }}
                  >
                    {article.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
