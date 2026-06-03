/**
 * FooterNavWithCTA.tsx
 *
 * Used ONLY on FinalMoodboard page.
 *
 * Behaviour:
 *   - Initially renders a single centered "+ Create Moodboard" octagon button
 *     in place of the footer nav (both desktop + mobile).
 *   - When the user clicks it, the CTA fades out and the real FooterNav /
 *     MobileBottomBar fade in with a clean, premium transition.
 *
 * Visual identity:
 *   - CTA button uses the identical octagon SVG shape, linen fill (#D7C9AB),
 *     brown border (#7B4A1E), and screen-blended texture as the other nav pills.
 *   - Sized at 260×58 on desktop and 240×52 on mobile.
 *
 * Constraints (do NOT violate):
 *   - FooterNav and MobileBottomBar are rendered unchanged — no props, no logic
 *     modification. We simply hide / show them via opacity + pointer-events.
 *   - SelectionContext, routing, and all existing functionality are untouched.
 */

import { useState, useCallback } from "react";
import imgTexture from "../../../assets/texture.png";
import FooterNav from "./FooterNav";
import MobileBottomBar from "./MobileBottomBar";

// ─── Octagon path helper ──────────────────────────────────────────────────────
function octPath(w: number, h: number, cut: number) {
  return `M ${cut},1 L ${w - cut},1 L ${w - 1},${cut} L ${w - 1},${h - cut} L ${w - cut},${h - 1} L ${cut},${h - 1} L 1,${h - cut} L 1,${cut} Z`;
}

// ─── Shared transition duration ───────────────────────────────────────────────
const DURATION   = "0.38s";
const EASING     = "cubic-bezier(0.4, 0, 0.2, 1)";
const TRANSITION = `opacity ${DURATION} ${EASING}, transform ${DURATION} ${EASING}`;

// ─── Desktop CTA pill (190×58) ────────────────────────────────────────────────
const D_W   = 190;
const D_H   = 58;
const D_CUT = 10;
const dPath = octPath(D_W, D_H, D_CUT);

// ─── Mobile CTA pill (175×52) ─────────────────────────────────────────────────
const M_W   = 175;
const M_H   = 52;
const M_CUT = 9;
const mPath = octPath(M_W, M_H, M_CUT);

// ─── Component ────────────────────────────────────────────────────────────────
export default function FooterNavWithCTA() {
  const [navRevealed, setNavRevealed] = useState(false);
  const [pressed, setPressed] = useState(false);

  const reveal = useCallback(() => setNavRevealed(true), []);

  return (
    <>
      {/* ── Shared keyframe + responsive helpers ─────────────────────────── */}
      <style>{`
        .fn-cta-desktop { display: flex; }
        .fn-cta-mobile  { display: flex; }
        @media (min-width: 768px) { .fn-cta-mobile  { display: none !important; } }
        @media (max-width: 767px) { .fn-cta-desktop { display: none !important; } }
      `}</style>

      {/* ══ Desktop CTA button (hidden on mobile) ══════════════════════════ */}
      <div
        className="fn-cta-desktop"
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          justifyContent: "center",
          alignItems: "center",
          opacity: navRevealed ? 0 : 1,
          pointerEvents: navRevealed ? "none" : "auto",
          transition: TRANSITION,
        }}
      >
        <button
          type="button"
          onClick={reveal}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          onTouchStart={() => setPressed(true)}
          onTouchEnd={() => setPressed(false)}
          aria-label="Create Moodboard"
          style={{
            position: "relative",
            width: D_W,
            height: D_H,
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            outline: "none",
            WebkitTapHighlightColor: "transparent",
            transform: pressed ? "scale(0.97)" : "scale(1)",
            filter: pressed ? "brightness(0.88)" : "brightness(1)",
            transition: pressed
              ? "transform 80ms ease-in, filter 80ms ease-in"
              : "transform 200ms ease-out, filter 200ms ease-out",
          }}
        >
          <svg
            aria-hidden
            focusable="false"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              userSelect: "none",
              display: "block",
            }}
            width={D_W}
            height={D_H}
            viewBox={`0 0 ${D_W} ${D_H}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="fnCtaDesktopClip">
                <path d={dPath} />
              </clipPath>
            </defs>
            <path d={dPath} fill="#D7C9AB" stroke="#7B4A1E" strokeWidth={3} />
            <image
              href={imgTexture}
              x="0" y="0"
              width={D_W} height={D_H}
              clipPath="url(#fnCtaDesktopClip)"
              preserveAspectRatio="xMidYMid slice"
              style={{ mixBlendMode: "screen", opacity: 0.4 }}
            />
            <path d={dPath} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          </svg>

          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#553500",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 600, lineHeight: 1, display: "flex", alignItems: "center", marginBottom: 5 }}>+</span>
            Create Moodboard
          </span>
        </button>
      </div>

      {/* ══ Mobile CTA button (hidden on desktop) ══════════════════════════ */}
      <div
        className="fn-cta-mobile"
        style={{
          position: "fixed",
          bottom: 16,
          left: 0,
          right: 0,
          zIndex: 100,
          justifyContent: "center",
          alignItems: "center",
          opacity: navRevealed ? 0 : 1,
          pointerEvents: navRevealed ? "none" : "auto",
          transition: TRANSITION,
        }}
      >
        <button
          type="button"
          onClick={reveal}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          onTouchStart={() => setPressed(true)}
          onTouchEnd={() => setPressed(false)}
          aria-label="Create Moodboard"
          style={{
            position: "relative",
            width: M_W,
            height: M_H,
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            outline: "none",
            WebkitTapHighlightColor: "transparent",
            transform: pressed ? "scale(0.97)" : "scale(1)",
            filter: pressed ? "brightness(0.88)" : "brightness(1)",
            transition: pressed
              ? "transform 80ms ease-in, filter 80ms ease-in"
              : "transform 200ms ease-out, filter 200ms ease-out",
          }}
        >
          <svg
            aria-hidden
            focusable="false"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              userSelect: "none",
              display: "block",
            }}
            width={M_W}
            height={M_H}
            viewBox={`0 0 ${M_W} ${M_H}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="fnCtaMobileClip">
                <path d={mPath} />
              </clipPath>
            </defs>
            <path d={mPath} fill="#D7C9AB" stroke="#7B4A1E" strokeWidth={2.5} />
            <image
              href={imgTexture}
              x="0" y="0"
              width={M_W} height={M_H}
              clipPath="url(#fnCtaMobileClip)"
              preserveAspectRatio="xMidYMid slice"
              style={{ mixBlendMode: "screen", opacity: 0.4 }}
            />
            <path d={mPath} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          </svg>

          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#553500",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 600, lineHeight: 1, display: "flex", alignItems: "center", marginBottom: 4 }}>+</span>
            Create Moodboard
          </span>
        </button>
      </div>

      {/* ══ Real FooterNav — fades in when navRevealed ═════════════════════ */}
      <div
        style={{
          opacity: navRevealed ? 1 : 0,
          pointerEvents: navRevealed ? "auto" : "none",
          transition: `opacity ${DURATION} ${EASING} ${navRevealed ? "0.12s" : "0s"}`,
        }}
      >
        <FooterNav />
      </div>

      {/* ══ Real MobileBottomBar — same fade-in treatment ═════════════════ */}
      <div
        style={{
          opacity: navRevealed ? 1 : 0,
          pointerEvents: navRevealed ? "auto" : "none",
          transition: `opacity ${DURATION} ${EASING} ${navRevealed ? "0.12s" : "0s"}`,
        }}
      >
        <MobileBottomBar />
      </div>
    </>
  );
}