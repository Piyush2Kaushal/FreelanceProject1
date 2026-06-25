// ─────────────────────────────────────────────────────────────────────────────
// NotFoundPage — Premium 404 (Studio Inside Eye)
// ─────────────────────────────────────────────────────────────────────────────
// Standalone, full-viewport 404 screen reached via the catch-all route in
// App.tsx (<Route path="*" />). Intentionally NO Navbar / Footer — it is a
// quiet, self-contained "dead end" moment that matches the studio's editorial,
// cream-and-brown design language.
//
// Design language sourced from the live site:
//   • Display type  → Instrument Serif  (var(--font-instrument-serif))
//   • Body type     → Hanken Grotesk    (var(--font-hanken))
//   • Cream ground  → #dcd1b1 / #DAD0AD
//   • Deep brown    → #442b00  (ink)   · #703000 (CTA)   · #8e3219 (rust accent)
//
// Behaviour:
//   • A huge "404" set in Instrument Serif anchors the page.
//   • Soft entrance animation (respects prefers-reduced-motion).
//   • Two clear exits: primary "Back to Home" (→ "/") and a quiet "Contact"
//     ghost link, so a lost visitor is never stranded.
// ─────────────────────────────────────────────────────────────────────────────
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import imgLogo from "../../assets/lockup5.png";

const COLOR = {
  cream:     "#dcd1b1",
  creamDeep: "#d5c9a8",
  ink:       "#442b00",
  inkSoft:   "rgba(68,43,0,0.62)",
  rust:      "#8e3219",
  cta:       "#703000",
  hair:      "rgba(68,43,0,0.18)",
};

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main
      role="main"
      aria-labelledby="nf-heading"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "32px 24px",
        boxSizing: "border-box",
        background:
          `radial-gradient(120% 90% at 50% 0%, ${COLOR.cream} 0%, ${COLOR.creamDeep} 100%)`,
        fontFamily: "var(--font-hanken), 'Hanken Grotesk', sans-serif",
      }}
    >
      {/* Scoped styles + keyframes (kept local so the page is fully portable) */}
      <style>{`
        @keyframes nf-rise {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nf-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .nf-anim { animation: nf-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .nf-anim-1 { animation-delay: 0.06s; }
        .nf-anim-2 { animation-delay: 0.16s; }
        .nf-anim-3 { animation-delay: 0.28s; }
        .nf-anim-4 { animation-delay: 0.40s; }
        .nf-logo   { animation: nf-fade 1.1s ease 0.05s both; }

        .nf-btn {
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.25s ease, opacity 0.25s ease, background 0.25s ease;
          will-change: transform;
        }
        .nf-btn:hover { transform: translateY(-2px); }
        .nf-btn:active { transform: translateY(0); }
        .nf-btn:focus-visible {
          outline: 2px solid ${COLOR.ink};
          outline-offset: 3px;
        }

        .nf-primary:hover {
          box-shadow: 0 10px 28px rgba(112,48,0,0.28);
        }
        .nf-ghost { transition: opacity 0.2s ease, border-color 0.2s ease; }
        .nf-ghost:hover { opacity: 1; border-color: ${COLOR.ink}; }
        .nf-ghost:focus-visible { outline: 2px solid ${COLOR.ink}; outline-offset: 3px; }

        @media (prefers-reduced-motion: reduce) {
          .nf-anim, .nf-logo { animation: none !important; opacity: 1 !important; transform: none !important; }
          .nf-btn { transition: none !important; }
        }

        @media (max-width: 600px) {
          .nf-code { font-size: 120px !important; }
        }
      `}</style>

      {/* Faint corner mark — purely decorative texture, never announced */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(142,50,25,0.05) 0, transparent 38%)," +
            "radial-gradient(circle at 82% 78%, rgba(68,43,0,0.05) 0, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* Logo (kept small + quiet for brand presence without a full navbar) */}
      <img
        src={imgLogo}
        alt="Studio Inside Eye"
        className="nf-logo"
        style={{
          position: "absolute",
          top: 32,
          left: "50%",
          transform: "translateX(-50%)",
          height: 40,
          width: "auto",
          objectFit: "contain",
          opacity: 0.85,
        }}
      />

      {/* The 404 itself */}
      <p
        className="nf-anim nf-anim-1 nf-code"
        aria-hidden
        style={{
          fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif",
          fontSize: 200,
          lineHeight: 0.9,
          color: COLOR.ink,
          margin: 0,
          letterSpacing: "-0.02em",
          position: "relative",
          zIndex: 1,
        }}
      >
        404
      </p>

      {/* Hairline divider */}
      <div
        aria-hidden
        className="nf-anim nf-anim-2"
        style={{
          width: 64,
          height: 1,
          background: COLOR.hair,
          margin: "26px 0 22px",
          zIndex: 1,
        }}
      />

      <h1
        id="nf-heading"
        className="nf-anim nf-anim-2"
        style={{
          fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif",
          fontSize: 34,
          fontWeight: 400,
          lineHeight: 1.15,
          color: COLOR.rust,
          margin: 0,
          maxWidth: 520,
          zIndex: 1,
        }}
      >
        This page wandered off
      </h1>

      <p
        className="nf-anim nf-anim-3"
        style={{
          fontSize: 16,
          lineHeight: 1.6,
          color: COLOR.inkSoft,
          margin: "14px 0 0",
          maxWidth: 420,
          zIndex: 1,
        }}
      >
        The page you’re looking for doesn’t exist or may have been moved.
        Let’s get you back to something beautiful.
      </p>

      {/* Actions */}
      <div
        className="nf-anim nf-anim-4"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 34,
          zIndex: 1,
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="nf-btn nf-primary"
          style={{
            fontFamily: "var(--font-hanken), 'Hanken Grotesk', sans-serif",
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "#fff",
            background: COLOR.cta,
            border: "none",
            borderRadius: 6,
            padding: "13px 28px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>

        <button
          type="button"
          onClick={() => navigate("/contact")}
          className="nf-btn nf-ghost"
          style={{
            fontFamily: "var(--font-hanken), 'Hanken Grotesk', sans-serif",
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: COLOR.ink,
            background: "transparent",
            border: `1px solid ${COLOR.hair}`,
            borderRadius: 6,
            padding: "13px 24px",
            cursor: "pointer",
            opacity: 0.85,
          }}
        >
          Get in touch
        </button>
      </div>
    </main>
  );
}

export default memo(NotFoundPage);