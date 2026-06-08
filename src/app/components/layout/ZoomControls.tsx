import { memo } from "react";
interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

/**
 * ZoomControls — fixed bottom-right floating zoom-in / zoom-out button pair.
 *
 * Reusable: pass onZoomIn / onZoomOut callbacks from any canvas-based page.
 * On mobile: lifts above the bottom bar via .zoom-controls-fixed media query.
 */
const ZoomControls = memo(function ZoomControls({ onZoomIn, onZoomOut }: ZoomControlsProps) {
  return (
    <div
      className="zoom-controls-fixed"
      style={{
        position: "fixed",
        right: "24px",
        bottom: "24px",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        gap: "0px",
        filter:
          "drop-shadow(0px 4px 16px rgba(60,35,10,0.18)) drop-shadow(0px 1px 4px rgba(60,35,10,0.10))",
      }}
      aria-label="Zoom controls"
    >
      {/* Zoom In */}
      <button
        className="zoom-btn"
        onClick={onZoomIn}
        aria-label="Zoom in"
        style={{ marginBottom: "8px" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <line x1="8" y1="3" x2="8" y2="13" stroke="#442b00" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="3" y1="8" x2="13" y2="8" stroke="#442b00" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {/* Zoom Out */}
      <button
        className="zoom-btn"
        onClick={onZoomOut}
        aria-label="Zoom out"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <line x1="3" y1="8" x2="13" y2="8" stroke="#442b00" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
});

export default ZoomControls;
