import { useRef, useCallback, useState } from "react";
import imgTexture from "../../../assets/texture.png";
import { useSelection, ColorKey, StyleKey, COMBINATION_ROUTES } from "../../context/SelectionContext";

/**
 * MobileBottomBar — visible only on mobile/small-tablet screens (<768px).
 *
 * Layout:
 *   Row 1: Colors pill + Continue button (same row, Continue expands from width:0)
 *   Row 2: Styles pill (full width, centered)
 *
 * Continue appears only when both color + style are selected.
 * Navigation only on Continue click.
 */

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

// ─── Dimensions ───────────────────────────────────────────────────────────────
const C_W   = 162;
const C_H   = 52;
const C_CUT = 9;

const S_W   = 330;
const S_H   = 52;
const S_CUT = 9;

const CTA_W   = 162;
const CTA_H   = 52;
const CTA_CUT = 9;

const colorPath = `M ${C_CUT},1 L ${C_W - C_CUT},1 L ${C_W - 1},${C_CUT} L ${C_W - 1},${C_H - C_CUT} L ${C_W - C_CUT},${C_H - 1} L ${C_CUT},${C_H - 1} L 1,${C_H - C_CUT} L 1,${C_CUT} Z`;
const stylePath = `M ${S_CUT},1 L ${S_W - S_CUT},1 L ${S_W - 1},${S_CUT} L ${S_W - 1},${S_H - S_CUT} L ${S_W - S_CUT},${S_H - 1} L ${S_CUT},${S_H - 1} L 1,${S_H - S_CUT} L 1,${S_CUT} Z`;
const ctaPath   = `M ${CTA_CUT},1 L ${CTA_W - CTA_CUT},1 L ${CTA_W - 1},${CTA_CUT} L ${CTA_W - 1},${CTA_H - CTA_CUT} L ${CTA_W - CTA_CUT},${CTA_H - 1} L ${CTA_CUT},${CTA_H - 1} L 1,${CTA_H - CTA_CUT} L 1,${CTA_CUT} Z`;

const DURATION = "0.38s";
const EASING   = "cubic-bezier(0.4, 0, 0.2, 1)";

// ─── Component ────────────────────────────────────────────────────────────────

export default function MobileBottomBar() {
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
        .mobile-bottom-bar-v2 {
          display: flex;
        }
        @media (min-width: 768px) {
          .mobile-bottom-bar-v2 {
            display: none !important;
          }
        }
      `}</style>

      <div
        className="mobile-bottom-bar-v2"
        style={{
          position: "fixed",
          bottom: 16,
          left: 0,
          right: 0,
          zIndex: 100,
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          pointerEvents: "none",
        }}
      >

        {/* ══ Row 1: Colors pill + Continue button ═════════════════════════════ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            pointerEvents: "none",
          }}
        >
          {/* Colors pill */}
          <section
            aria-label="Color palette"
            style={{
              position: "relative",
              width: C_W,
              height: C_H,
              flexShrink: 0,
              pointerEvents: "auto",
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
              width={C_W}
              height={C_H}
              viewBox={`0 0 ${C_W} ${C_H}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="mobileColorsClip">
                  <path d={colorPath} />
                </clipPath>
              </defs>
              <path d={colorPath} fill="#D7C9AB" stroke="#7B4A1E" strokeWidth={2.5} />
              <image
                href={imgTexture}
                x="0" y="0"
                width={C_W} height={C_H}
                clipPath="url(#mobileColorsClip)"
                preserveAspectRatio="xMidYMid slice"
                style={{ mixBlendMode: "screen", opacity: 0.4 }}
              />
              <path d={colorPath} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
            </svg>

            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                paddingLeft: 14,
                paddingRight: 14,
                gap: 10,
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                  color: "#553500",
                  whiteSpace: "nowrap",
                }}
              >
                Colors
              </span>

              <span
                aria-hidden
                style={{ height: 22, width: 1, flexShrink: 0, background: "black", opacity: 0.7 }}
              />

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                        width: 30,
                        height: 30,
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

          {/* Continue button — expands from width:0 when showContinue */}
          <div
            style={{
              flexShrink: 0,
              overflow: "hidden",
              width: showContinue ? CTA_W : 0,
              opacity: showContinue ? 1 : 0,
              transform: showContinue ? "scale(1)" : "scale(0.92)",
              transition: [
                `width ${DURATION} ${EASING}`,
                `opacity ${DURATION} ${EASING}`,
                `transform ${DURATION} ${EASING}`,
              ].join(", "),
              pointerEvents: showContinue ? "auto" : "none",
              display: "flex",
              alignItems: "center",
              height: CTA_H,
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
                  <clipPath id="mobileContinueClip">
                    <path d={ctaPath} />
                  </clipPath>
                </defs>
                <path d={ctaPath} fill="#504D39" stroke="#D8CAAD" strokeWidth={2.5} />
                <image
                  href={imgTexture}
                  x="0" y="0"
                  width={CTA_W} height={CTA_H}
                  clipPath="url(#mobileContinueClip)"
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
                  fontSize: 13,
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

        {/* ══ Row 2: Styles pill ════════════════════════════════════════════════ */}
        <section
          aria-label="Interior styles"
          style={{
            position: "relative",
            width: S_W,
            height: S_H,
            flexShrink: 0,
            pointerEvents: "auto",
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
            width={S_W}
            height={S_H}
            viewBox={`0 0 ${S_W} ${S_H}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="mobileStylesClip">
                <path d={stylePath} />
              </clipPath>
            </defs>
            <path d={stylePath} fill="#D7C9AB" stroke="#7B4A1E" strokeWidth={2.5} />
            <image
              href={imgTexture}
              x="0" y="0"
              width={S_W} height={S_H}
              clipPath="url(#mobileStylesClip)"
              preserveAspectRatio="xMidYMid slice"
              style={{ mixBlendMode: "screen", opacity: 0.4 }}
            />
            <path d={stylePath} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          </svg>

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              paddingLeft: 14,
              paddingRight: 14,
              gap: 10,
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                flexShrink: 0,
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                color: "#553500",
                whiteSpace: "nowrap",
              }}
            >
              Styles
            </span>

            <span
              aria-hidden
              style={{ height: 22, width: 1, flexShrink: 0, background: "black", opacity: 0.7 }}
            />

            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "nowrap",
                overflow: "hidden",
              }}
            >
              {styleItems.map((style, i) => {
                const isSelected = selection.style === style;
                const isDimmed = selection.style !== null && !isSelected;
                return (
                  <li key={style} style={{ flexShrink: 0 }}>
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
                        fontSize: 13,
                        lineHeight: 1.21,
                        letterSpacing: "-0.03em",
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? "#82853D" : "#703000",
borderBottom: isSelected ? "1.5px solid #82853D" : "1.5px solid transparent",
                        opacity: isDimmed ? 0.4 : 1,
                        whiteSpace: "nowrap",
                        transition: "opacity 0.2s ease, font-weight 0.15s ease, border-color 0.2s ease",
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

      </div>
    </>
  );
}