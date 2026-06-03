import { ReactNode } from "react";
import imgTexture from "../../../assets/texture.png";

interface OctagonPanelProps {
  /** Unique id suffix used for the SVG clipPath (must be unique per page) */
  clipId: string;
  /** Panel SVG width */
  svgWidth: number;
  /** Panel SVG height */
  svgHeight: number;
  /** Octagon path "d" value — derived from panel dimensions */
  pathD: string;
  /** SVG stroke width (default 3) */
  strokeWidth?: number;
  /** Inline style overrides on the outer wrapper (position, bottom, left, etc.) */
  style?: React.CSSProperties;
  /** Extra className on the outer wrapper */
  className?: string;
  /** Positioning of the SVG element relative to the wrapper */
  svgStyle?: React.CSSProperties;
  /** Content rendered on top of the panel */
  children: ReactNode;
}

/**
 * OctagonPanel — shared clipped SVG panel with linen fill, brown border, and
 * screen-blended texture overlay. Used by ColorsPanel and StylesPanel (and any
 * future panel that shares the same visual language).
 *
 * Pass a unique `clipId` per instance to avoid SVG clipPath id collisions.
 */
export default function OctagonPanel({
  clipId,
  svgWidth,
  svgHeight,
  pathD,
  strokeWidth = 3,
  style,
  className = "",
  svgStyle,
  children,
}: OctagonPanelProps) {
  return (
    <section className={`fixed z-[100] ${className}`} style={style}>
      <svg
        aria-hidden
        focusable="false"
        className="pointer-events-none absolute select-none"
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={svgStyle}
      >
        <defs>
          <clipPath id={clipId}>
            <path d={pathD} />
          </clipPath>
        </defs>
        {/* Background fill + border */}
        <path d={pathD} fill="#D7C9AB" stroke="#7B4A1E" strokeWidth={strokeWidth} />
        {/* Texture overlay */}
        <image
          href={imgTexture}
          x="0"
          y="0"
          width={svgWidth}
          height={svgHeight}
          clipPath={`url(#${clipId})`}
          preserveAspectRatio="xMidYMid slice"
          style={{ mixBlendMode: "screen", opacity: 0.4 }}
        />
        {/* Inner highlight ring */}
        <path d={pathD} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      </svg>

      {children}
    </section>
  );
}
