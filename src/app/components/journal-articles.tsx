import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import imgTexture from "../../assets/f0cedf09760f97dc4e595fe82650e46b83a6e013.jpg";
import { ALL_ARTICLES } from "../../data/articles";
import type { ArticleData } from "../../data/articles";

// ─── Mobile Expanded Panel (slide-up overlay) ────────────────────────────────
function MobileExpandedPanel({
  article,
  onClose,
  navigate,
}: {
  article: ArticleData | null;
  onClose: () => void;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const [closing, setClosing] = useState(false);
  // FIX: track the close timeout so a re-open can cancel it before it fires
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = () => {
    // Cancel any already-running close timer before starting a new one
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
    }
    setClosing(true);
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setClosing(false);
      onClose();
    }, 600);
  };

  const isVisible = !!article && !closing;

  return (
    <div
      className="absolute inset-0 flex flex-col z-20"
      style={{
        backgroundColor: article?.bg ?? "transparent",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: closing
          ? "opacity 0.6s ease, transform 0.6s ease"
          : "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents: isVisible ? "all" : "none",
      }}
    >
      {/* Texture overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("${imgTexture}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("${imgTexture}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />

      {/* Back button */}
      <button
        onClick={handleClose}
        aria-label="Back to articles"
        className="relative z-10 flex items-center gap-2 self-start mt-5 mx-5"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "6px 0",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease 0.18s",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M14 10H6M6 10L10 6M6 10L10 14"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="font-['Inter',sans-serif]"
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.1em",
          }}
        >
          BACK
        </span>
      </button>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-center flex-1 px-5 pb-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.65s ease 0.18s, transform 0.65s ease 0.18s",
        }}
      >
        <p
          className="font-['Instrument_Serif',serif] text-white leading-[1.08] mb-4"
          style={{ fontSize: "clamp(28px, 7vw, 44px)", maxWidth: 420 }}
        >
          {article?.title}
        </p>
        <p
          className="font-['Inter',sans-serif] font-normal leading-[1.6] mb-7"
          style={{
            fontSize: "clamp(14px, 3.5vw, 16px)",
            color: "rgba(255,255,255,0.74)",
            maxWidth: 360,
          }}
        >
          {article?.description}
        </p>
        <button
          onClick={() => article && navigate(`/journal/article/${article.slug}`)}
          className="self-start font-['Inter',sans-serif] font-medium"
          style={{
            fontSize: "14px",
            letterSpacing: "0.04em",
            color: article?.bg,
            backgroundColor: "rgba(255,255,255,0.9)",
            border: "none",
            borderRadius: 3,
            padding: "9px 22px",
            cursor: "pointer",
          }}
        >
          Read Article
        </button>
      </div>
    </div>
  );
}

// ─── Mobile Article Cards ────────────────────────────────────────────────────
function MobileArticleCards({
  onSelect,
}: {
  onSelect: (article: ArticleData) => void;
}) {
  return (
    <div className="flex flex-col w-full">
      {ALL_ARTICLES.map((article, index) => (
        <button
          key={article.id}
          className="relative w-full overflow-hidden text-left"
          onClick={() => onSelect(article)}
          style={{
            backgroundColor: article.bg,
            border: "none",
            cursor: "pointer",
            minHeight: "88px",
            padding: 0,
          }}
        >
          {/* Hover shine */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          />

          <div className="relative flex items-center justify-between px-5 py-5">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Number */}
              <span
                className="font-['Inter',sans-serif] font-normal text-white shrink-0"
                style={{
                  fontSize: "clamp(16px, 4vw, 20px)",
                  opacity: 0.7,
                  minWidth: "28px",
                }}
              >
                {article.id}
              </span>
              {/* Divider */}
              <span
                className="shrink-0 self-stretch"
                style={{
                  width: "1px",
                  backgroundColor: "rgba(255,255,255,0.25)",
                  minHeight: "22px",
                  margin: "2px 0",
                }}
              />
              {/* Title */}
              <span
                className="font-['Inter',sans-serif] font-normal text-[#d5c9a8] leading-[1.3]"
                style={{
                  fontSize: "clamp(13px, 3.6vw, 16px)",
                  letterSpacing: article.tracking ?? "normal",
                  paddingRight: "4px",
                }}
              >
                {article.title}
              </span>
            </div>

            {/* Arrow right */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              className="shrink-0 opacity-65 ml-2"
            >
              <path
                d="M7 4L13 10L7 16"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Bottom separator */}
          {index < ALL_ARTICLES.length - 1 && (
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)" }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Tablet Articles Section (768px – 1023px) ────────────────────────────────
function TabletArticlesSection() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  // FIX: ref to cancel in-flight close timer
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const expanded = ALL_ARTICLES.find((a) => a.id === expandedId) ?? null;

  const handleClose = () => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
    }
    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setExpandedId(null);
      setIsClosing(false);
    }, 1000);
  };

  return (
    <div
      className="hidden md:flex lg:hidden flex-col bg-[#dcd1b1] w-full relative overflow-hidden"
      style={{ minHeight: "max(560px, calc(100dvh - 520px))" }}
    >
      {/* Texture */}
      <div aria-hidden className="absolute inset-0 pointer-events-none z-0">
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("${imgTexture}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "multiply",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("${imgTexture}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "multiply",
            opacity: 0.7,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 px-7 pt-10 pb-5 flex items-baseline justify-between">
        <p
          className="font-['Instrument_Serif',serif] text-[#703000]"
          style={{ fontSize: "40px", lineHeight: 1.1 }}
        >
          Articles
        </p>
        <span
          className="font-['Inter',sans-serif] text-[rgba(112,48,0,0.5)]"
          style={{ fontSize: "11px", letterSpacing: "0.1em" }}
        >
          {ALL_ARTICLES.length} PIECES
        </span>
      </div>
      <div className="relative z-10 mx-7 h-px bg-[rgba(112,48,0,0.18)] mb-1" />

      {/* Article rows */}
      <div className="relative z-10 pb-8">
        {ALL_ARTICLES.map((article, index) => (
          <button
            key={article.id}
            className="relative w-full text-left overflow-hidden"
            onClick={() => setExpandedId(article.id)}
            style={{
              backgroundColor: article.bg,
              border: "none",
              cursor: "pointer",
              minHeight: "76px",
              padding: 0,
            }}
          >
            <div className="flex items-center justify-between px-7 py-[18px]">
              <div className="flex items-center gap-5 flex-1 min-w-0">
                <span
                  className="font-['Inter',sans-serif] font-normal text-white shrink-0"
                  style={{ fontSize: "17px", opacity: 0.7, minWidth: "26px" }}
                >
                  {article.id}
                </span>
                <span
                  className="shrink-0 self-stretch"
                  style={{
                    width: "1px",
                    backgroundColor: "rgba(255,255,255,0.25)",
                    minHeight: "20px",
                    margin: "2px 0",
                  }}
                />
                <span
                  className="font-['Inter',sans-serif] font-normal text-[#d5c9a8] leading-[1.3]"
                  style={{ fontSize: "17px", letterSpacing: article.tracking ?? "normal" }}
                >
                  {article.title}
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                className="shrink-0 opacity-60 ml-4"
              >
                <path
                  d="M7 4L13 10L7 16"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {index < ALL_ARTICLES.length - 1 && (
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Expanded article overlay */}
      {expandedId && (
        <div
          className="absolute inset-0 z-20 flex flex-col"
          style={{
            backgroundColor: expanded?.bg ?? "transparent",
            opacity: !isClosing ? 1 : 0,
            transform: !isClosing ? "translateX(0)" : "translateX(-24px)",
            transition: isClosing
              ? "opacity 1.0s ease, transform 1.0s ease"
              : "opacity 0.72s cubic-bezier(0.22,1,0.36,1), transform 0.72s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Texture */}
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `url("${imgTexture}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "multiply",
              opacity: 0.3,
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `url("${imgTexture}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "multiply",
              opacity: 0.7,
              pointerEvents: "none",
            }}
          />
          {/* Back button */}
          <button
            onClick={handleClose}
            className="relative z-10 flex items-center gap-2 self-start mt-6 mx-7"
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: "6px 0" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M14 10H6M6 10L10 6M6 10L10 14"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="font-['Inter',sans-serif]"
              style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em" }}
            >
              BACK
            </span>
          </button>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center flex-1 px-7 pb-10">
            <p
              className="font-['Instrument_Serif',serif] text-white leading-[1.08] mb-4"
              style={{ fontSize: "clamp(36px, 5.5vw, 52px)", maxWidth: 520 }}
            >
              {expanded?.title}
            </p>
            <p
              className="font-['Inter',sans-serif] font-normal leading-[1.65] mb-8"
              style={{
                fontSize: "17px",
                color: "rgba(255,255,255,0.74)",
                maxWidth: 500,
              }}
            >
              {expanded?.description}
            </p>
            <button
              onClick={() => expanded && navigate(`/journal/article/${expanded.slug}`)}
              className="self-start font-['Inter',sans-serif] font-medium"
              style={{
                fontSize: "15px",
                letterSpacing: "0.04em",
                color: expanded?.bg,
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "none",
                borderRadius: 3,
                padding: "9px 24px",
                cursor: "pointer",
              }}
            >
              Read Article
            </button>
          </div>
        </div>
      )}

      <div className="h-10 relative z-10" />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function JournalArticles() {
  const navigate = useNavigate();

  // ── Desktop state ────────────────────────────────────────────────────────
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // FIX: refs to cancel in-flight timers on desktop
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const switchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Mobile state ─────────────────────────────────────────────────────────
  const [mobileExpanded, setMobileExpanded] = useState<ArticleData | null>(null);

  const expanded: ArticleData | null =
    ALL_ARTICLES.find((a) => a.id === expandedId) ?? null;

  // ── handleDesktopOpen ────────────────────────────────────────────────────
  // FIX: cancel any pending close or switch timers before acting, so rapid
  // clicks never leave a stale setTimeout callback mutating state unexpectedly.
  const handleDesktopOpen = useCallback((id: string) => {
    // Cancel any in-flight close
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    // Cancel any in-flight switch
    if (switchTimerRef.current !== null) {
      clearTimeout(switchTimerRef.current);
      switchTimerRef.current = null;
    }

    setExpandedId((current) => {
      if (current === id) return current; // already open — no-op

      if (current !== null) {
        // Switch: instantly hide panel (transition:none via pendingId),
        // then after 50ms set new expandedId → open animation plays normally
        setPendingId(id);
        setIsClosing(false);
        switchTimerRef.current = setTimeout(() => {
          switchTimerRef.current = null;
          setPendingId(null);
          setExpandedId(id);
        }, 50);
        return null; // clear current immediately
      }

      // Nothing open — open with animation
      setIsClosing(false);
      return id;
    });
  }, []);

  // ── handleDesktopClose ───────────────────────────────────────────────────
  // FIX: guard against double-calls and cancel any in-flight switch timer
  // so it can't re-open after we've started closing.
  const handleDesktopClose = useCallback(() => {
    if (isClosing) return;

    // Cancel any in-flight switch timer — user closed before it resolved
    if (switchTimerRef.current !== null) {
      clearTimeout(switchTimerRef.current);
      switchTimerRef.current = null;
      setPendingId(null);
    }
    // Cancel any previously scheduled close (shouldn't normally happen, but safe)
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
    }

    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setExpandedId(null);
      setIsClosing(false);
    }, 2000);
  }, [isClosing]);

  const getClipPath = () => {
    if (expanded && !isClosing) return "inset(0 0% 0 0%)";
    if (isClosing) return "inset(0 0% 0 100%)";
    return "inset(0 0% 0 100%)";
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════
          DESKTOP (≥1024px) — pixel-perfect original Figma
          ══════════════════════════════════════════════════ */}
      <div className="hidden lg:block bg-[#dcd1b1] h-[800px] overflow-hidden relative w-full">
        {/* Expanded article panel */}
        {/* transition:none when pendingId is set (instant reset) */}
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: expanded?.bg ?? "transparent",
            clipPath: getClipPath(),
            transition: pendingId
              ? "none"
              : isClosing
              ? "clip-path 2.0s cubic-bezier(0.22, 1, 0.36, 1)"
              : "clip-path 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
            zIndex: 4,
            pointerEvents: expanded && !isClosing ? "all" : "none",
          }}
        >
          {/* Texture on expanded panel */}
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `url("${imgTexture}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "multiply",
              opacity: 0.3,
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `url("${imgTexture}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "multiply",
              opacity: 0.7,
              pointerEvents: "none",
            }}
          />

          {/* Back arrow */}
          <button
            onClick={handleDesktopClose}
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
              transition: "opacity 0.5s ease 0.55s",
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
              transform:
                expanded && !isClosing ? "translateX(0)" : "translateX(-24px)",
              transition:
                "opacity 0.75s ease 0.35s, transform 0.85s cubic-bezier(0.22,1,0.36,1) 0.35s",
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

        {/* ── STRIPS — original desktop layout ── */}
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
              {ALL_ARTICLES.map((article, index) => {
                // While closing, ignore expandedId so the hidden strips
                // fade back in immediately via their own opacity transition,
                // instead of staying hidden until the 2s close timeout fires.
                const activeId = isClosing ? null : (pendingId ?? expandedId);
                const expandedIndex = activeId
                  ? ALL_ARTICLES.findIndex((a) => a.id === activeId)
                  : -1;
                const shouldHide = activeId !== null && index <= expandedIndex;
                const isHovered = hoveredId === article.id && !shouldHide;
                return (
                  <button
                    key={article.id}
                    className="absolute left-0 right-0 cursor-pointer block"
                    onClick={() => handleDesktopOpen(article.id)}
                    onMouseEnter={() => setHoveredId(article.id)}
                    onMouseLeave={() =>
                      setHoveredId((current) =>
                        current === article.id ? null : current
                      )
                    }
                    style={{
                      backgroundColor: article.bg,
                      top: `${index * 100}px`,
                      height: "100px",
                      border: "none",
                      opacity: shouldHide ? 0 : 1,
                      pointerEvents: shouldHide ? "none" : "auto",
                      transform: isHovered
                        ? "scaleY(1.06) translateX(-6px)"
                        : "scaleY(1) translateX(0)",
                      transformOrigin: "center",
                      zIndex: isHovered ? 10 : 1,
                      boxShadow: isHovered
                        ? "0 10px 32px rgba(0,0,0,0.32)"
                        : "0 0 0 rgba(0,0,0,0)",
                      filter: isHovered ? "brightness(1.08)" : "brightness(1)",
                      transition:
                        "opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s cubic-bezier(0.22,1,0.36,1), filter 0.35s ease",
                      willChange: "transform",
                    }}
                  >
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ pointerEvents: "none" }}
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
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          TABLET (768px–1023px)
          ══════════════════════════════════════════════════ */}
      <TabletArticlesSection />

      {/* ══════════════════════════════════════════════════
          MOBILE (<768px) — stacked card list with slide panel
          ══════════════════════════════════════════════════ */}
      <div className="flex md:hidden flex-col bg-[#dcd1b1] relative w-full overflow-hidden min-h-[calc(100dvh-400px)] max-[480px]:min-h-[calc(100dvh-360px)]">

        {/* Section header */}
        <div className="relative z-10 px-5 pt-8 pb-5 flex items-baseline justify-between">
          <p
            className="font-['Instrument_Serif',serif] text-[#703000]"
            style={{ fontSize: "clamp(26px, 7vw, 34px)", lineHeight: 1.1 }}
          >
            Articles
          </p>
          <span
            className="font-['Inter',sans-serif] text-[rgba(112,48,0,0.5)]"
            style={{ fontSize: "11px", letterSpacing: "0.1em" }}
          >
            {ALL_ARTICLES.length} PIECES
          </span>
        </div>

        {/* Thin top divider */}
        <div className="relative z-10 mx-5 mb-0 h-px bg-[rgba(112,48,0,0.18)]" />

        {/* Article cards */}
        <div className="relative z-10">
          <MobileArticleCards onSelect={(article) => setMobileExpanded(article)} />
        </div>

        {/* Expanded article overlay */}
        {mobileExpanded && (
          <div
            className="absolute inset-0 z-20"
            style={{ minHeight: "100%" }}
          >
            <MobileExpandedPanel
              article={mobileExpanded}
              onClose={() => setMobileExpanded(null)}
              navigate={navigate}
            />
          </div>
        )}
      </div>
    </>
  );
}