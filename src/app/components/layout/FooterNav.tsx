/**
 * FooterNav.tsx
 *
 * Two separate octagon pills — Colors + Styles — visually identical to the
 * original ColorsPanel + StylesPanel.
 *
 * CHANGES:
 *  1. Added a "Continue" octagon button to the right of the Styles pill.
 *     - Hidden (width: 0, overflow: hidden) until both color + style are selected,
 *       so the two pills stay perfectly centered at all times.
 *     - Smoothly expands into view (width + opacity + scale) once both are selected.
 *  2. Removed direct navigation from color/style selection — navigation now
 *     happens only when the Continue button is clicked.
 *
 * Everything else is completely unchanged.
 */

import { useRef, useCallback, useState } from "react";
import imgTexture from "../../../assets/texture.png";
import { useSelection, ColorKey, StyleKey, COMBINATION_ROUTES } from "../../context/SelectionContext";

// ─── Data ─────────────────────────────────────────────────────────────────────

const colorSwatches = [
  {
    value: "#B59E84",
    key: "beige" as ColorKey,
    label: "Beige",
  },
  {
    value:
      "radial-gradient(circle at 50% 50%, rgba(255, 106, 106, 1) 0%, rgba(153, 64, 64, 1) 100%)",
    key: "red" as ColorKey,
    label: "Red",
  },
] as const;

const styleItems = ["Scandinavian", "Transitional", "Mid century"] as const;

// ─── Continue button dimensions ───────────────────────────────────────────────
const CTA_W   = 160;
const CTA_H   = 58;
const CTA_CUT = 10;
const ctaPath = `M ${CTA_CUT},1 L ${CTA_W - CTA_CUT},1 L ${CTA_W - 1},${CTA_CUT} L ${CTA_W - 1},${CTA_H - CTA_CUT} L ${CTA_W - CTA_CUT},${CTA_H - 1} L ${CTA_CUT},${CTA_H - 1} L 1,${CTA_H - CTA_CUT} L 1,${CTA_CUT} Z`;

const DURATION = "0.38s";
const EASING   = "cubic-bezier(0.4, 0, 0.2, 1)";

// ─── Component ────────────────────────────────────────────────────────────────

export default function FooterNav() {
  const { selection, setColor, setStyle, navigate, hasNavigated } = useSelection();

  const colorRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const styleRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const bothSelected = selection.color !== null && selection.style !== null;
  const showContinue = bothSelected && !hasNavigated;
  const [ctaPressed, setCtaPressed] = useState(false);

  const handleColorClick = (key: ColorKey, idx: number) => {
    const el = colorRefs.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setColor(
      selection.color === key ? null : key,
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
  };

  const handleStyleClick = (style: StyleKey, idx: number) => {
    const el = styleRefs.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setStyle(
      selection.style === style ? null : style,
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
  };

  const handleContinue = useCallback(() => {
    if (!selection.color || !selection.style) return;
    const key = `${selection.color}|${selection.style}`;
    const route = COMBINATION_ROUTES[key];
    if (!route) return;
    setCtaPressed(true);
    setTimeout(() => {
      setCtaPressed(false);
      navigate(route);
    }, 150);
  }, [selection.color, selection.style, navigate]);

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .footer-nav-wrapper {
            display: flex !important;
          }
        }
      `}</style>

      {/*
        Centered wrapper — both pills live inside this.
        display:none on mobile, flex on desktop.
        Horizontally centered via left:50% + translateX(-50%).

        The Continue button slot uses width:0 / overflow:hidden when hidden,
        so it occupies zero space and the two pills stay truly centered.
        When bothSelected, the slot smoothly expands to CTA_W + the gap.
      */}
      <div
        className="footer-nav-wrapper"
        style={{
          display: "none",
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          alignItems: "center",
          gap: 8,
          flexWrap: "nowrap",
          whiteSpace: "nowrap",
        }}
      >

        {/* ── Colors pill (172×58, h=63) ── */}
        <section
          aria-label="Color palette"
          className="colors-panel-desktop"
          style={{
            position: "relative",
            height: 67,
            width: 186,
            flexShrink: 0,
          }}
        >
          <svg
            aria-hidden
            focusable="false"
            style={{
              position: "absolute",
              left: 7,
              top: 3,
              pointerEvents: "none",
              userSelect: "none",
            }}
            width={172}
            height={58}
            viewBox="0 0 172 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="footerNavColorsClip">
                <path d="M 10,1 L 162,1 L 171,10 L 171,48 L 162,57 L 10,57 L 1,48 L 1,10 Z" />
              </clipPath>
            </defs>
            <path
              d="M 10,1 L 162,1 L 171,10 L 171,48 L 162,57 L 10,57 L 1,48 L 1,10 Z"
              fill="#D7C9AB"
              stroke="#7B4A1E"
              strokeWidth={3}
            />
            <image
              href={imgTexture}
              x="0" y="0"
              width={172} height={58}
              clipPath="url(#footerNavColorsClip)"
              preserveAspectRatio="xMidYMid slice"
              style={{ mixBlendMode: "screen", opacity: 0.4 }}
            />
            <path
              d="M 10,1 L 162,1 L 171,10 L 171,48 L 162,57 L 10,57 L 1,48 L 1,10 Z"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
            />
          </svg>

          <div
            style={{
              position: "absolute",
              left: 19,
              top: 13,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 1.21,
                letterSpacing: "-0.03em",
                color: "#553500",
                whiteSpace: "nowrap",
              }}
            >
              Colors
            </span>

            <span
              aria-hidden
              style={{ height: 26, width: 1, flexShrink: 0, background: "black" }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 5 }}>
              {colorSwatches.map((swatch, i) => {
                const isSelected = selection.color === swatch.key;
                return (
                  <button
                    key={swatch.key}
                    ref={(el) => { colorRefs.current[i] = el; }}
                    type="button"
                    onClick={() => handleColorClick(swatch.key, i)}
                    aria-label={`Select ${swatch.label} color`}
                    aria-pressed={isSelected}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: swatch.value,
                      boxShadow: isSelected
                        ? "inset 0 0 0 2px rgba(255,255,255,0.85), 0 0 0 1.5px #7B4A1E, 0 4px 12px rgba(80,35,0,0.28)"
                        : "0 1px 4px rgba(0,0,0,0.15)",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "box-shadow 0.22s ease",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Styles pill (375×58, h=67) ── */}
        <section
          aria-label="Interior styles"
          className="styles-panel-desktop"
          style={{
            position: "relative",
            height: 67,
            width: 375,
            flexShrink: 0,
          }}
        >
          <svg
            aria-hidden
            focusable="false"
            style={{
              position: "absolute",
              left: 0,
              top: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
            width={375}
            height={58}
            viewBox="0 0 375 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="footerNavStylesClip">
                <path d="M 10,1 L 365,1 L 374,10 L 374,48 L 365,57 L 10,57 L 1,48 L 1,10 Z" />
              </clipPath>
            </defs>
            <path
              d="M 10,1 L 365,1 L 374,10 L 374,48 L 365,57 L 10,57 L 1,48 L 1,10 Z"
              fill="#D7C9AB"
              stroke="#7B4A1E"
              strokeWidth={3}
            />
            <image
              href={imgTexture}
              x="0" y="0"
              width={375} height={58}
              clipPath="url(#footerNavStylesClip)"
              preserveAspectRatio="xMidYMid slice"
              style={{ mixBlendMode: "screen", opacity: 0.4 }}
            />
            <path
              d="M 10,1 L 365,1 L 374,10 L 374,48 L 365,57 L 10,57 L 1,48 L 1,10 Z"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1"
            />
          </svg>

          <div
            style={{
              position: "absolute",
              left: 19,
              top: 17,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 1.21,
                letterSpacing: "-0.03em",
                color: "#553500",
                whiteSpace: "nowrap",
              }}
            >
              Styles
            </span>

            <span
              aria-hidden
              style={{ height: 23, width: 1, flexShrink: 0, background: "black" }}
            />

            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              {styleItems.map((style, i) => {
                const isSelected = selection.style === style;
                const isDimmed = selection.style !== null && !isSelected;
                return (
                  <li key={style}>
                    <button
                      ref={(el) => { styleRefs.current[i] = el; }}
                      type="button"
                      onClick={() => handleStyleClick(style as StyleKey, i)}
                      aria-pressed={isSelected}
                      style={{
                        margin: 0,
                        padding: 0,
                        paddingBottom: 1,
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: 14,
                        lineHeight: 1.21,
                        letterSpacing: "-0.03em",
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? "#82853D" : "#703000",
borderBottom: isSelected ? "1.5px solid #82853D" : "1.5px solid transparent",
                        opacity: 1,
                        whiteSpace: "nowrap",
                        transition:
                          "opacity 0.2s ease, font-weight 0.15s ease, border-color 0.2s ease",
                      }}
                    >
                      {style}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/*
          ── Continue button slot ──────────────────────────────────────────────
          When hidden: width 0, overflow hidden → occupies zero layout space,
          so Colors + Styles pills remain perfectly centered.
          When bothSelected: expands smoothly to CTA_W px with fade + scale.
          The extra 8px of gap on the wrapper only adds space once this grows.
        */}
        <div
          style={{
            flexShrink: 0,
            height: 67,
            overflow: "hidden",
            // Width drives the layout shift — 0 when hidden, full when shown
            width: showContinue ? CTA_W : 0,
            // Fade + scale for the inner button
            opacity: showContinue ? 1 : 0,
            transform: showContinue ? "scale(1)" : "scale(0.92)",
            transition: [
              `width ${DURATION} ${EASING}`,
              `opacity ${DURATION} ${EASING}`,
              `transform ${DURATION} ${EASING}`,
            ].join(", "),
            pointerEvents: showContinue ? "auto" : "none",
            // Align vertically with the pills
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={handleContinue}
            onMouseDown={() => setCtaPressed(true)}
            onMouseUp={() => setCtaPressed(false)}
            onMouseLeave={() => setCtaPressed(false)}
            onTouchStart={() => setCtaPressed(true)}
            onTouchEnd={() => setCtaPressed(false)}
            aria-label="Continue to next page"
            style={{
              position: "relative",
              marginTop: -7,
              width: CTA_W,
              height: CTA_H,
              flexShrink: 0,
              padding: 0,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              outline: "none",
              WebkitTapHighlightColor: "transparent",
              transform: ctaPressed ? "scale(0.97)" : "scale(1)",
              filter: ctaPressed ? "brightness(0.88)" : "brightness(1)",
              transition: ctaPressed
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
              width={CTA_W}
              height={CTA_H}
              viewBox={`0 0 ${CTA_W} ${CTA_H}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="footerContinueClip">
                  <path d={ctaPath} />
                </clipPath>
              </defs>
              <path d={ctaPath} fill="#504D39" stroke="#D8CAAD" strokeWidth={2.5} />
              <image
                href={imgTexture}
                x="0" y="0"
                width={CTA_W} height={CTA_H}
                clipPath="url(#footerContinueClip)"
                preserveAspectRatio="xMidYMid slice"
                style={{ mixBlendMode: "screen", opacity: 0.35 }}
              />
              <path d={ctaPath} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
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
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#E8DFC8",
                whiteSpace: "nowrap",
                userSelect: "none",
              }}
            >
              Continue
            </span>
          </button>
        </div>

      </div>
    </>
  );
}