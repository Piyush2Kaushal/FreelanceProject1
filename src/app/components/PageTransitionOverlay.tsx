import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelection } from "../context/SelectionContext";

export default function PageTransitionOverlay() {
  const { isNavigating } = useSelection();
  const location = useLocation();
  const isDetail = location.pathname.startsWith("/detail");

  const [visible, setVisible] = useState(isDetail);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (isNavigating) setVisible(true);
  }, [isNavigating]);

  useEffect(() => {
    const wasDetail = prevPathRef.current.startsWith("/detail");
    const enteringDetail = isDetail && !wasDetail;
    prevPathRef.current = location.pathname;

    // Only cover the swap when arriving at /detail from somewhere else.
    // Moving between two /detail/* combinations (regenerate) is handled by
    // MoodboardDetailPage's own image crossfade — covering it here would
    // just reintroduce the "reload" flash we're trying to avoid.
    if (enteringDetail) {
      setVisible(true);
      const id = setTimeout(() => setVisible(false), 80);
      return () => clearTimeout(id);
    }
  }, [location.pathname, isDetail]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#f5f0eb",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
        transition: visible
          ? "opacity 0.45s cubic-bezier(0.4, 0, 1, 1)"
          : "opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "opacity",
      }}
    />
  );
}