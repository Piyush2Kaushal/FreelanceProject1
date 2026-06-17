import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelection } from "../context/SelectionContext";

export default function PageTransitionOverlay() {
  const { isNavigating } = useSelection();
  const location = useLocation();
  const isDetail = location.pathname.startsWith("/detail");

  const [visible, setVisible] = useState(isDetail);

  useEffect(() => {
    if (isNavigating) setVisible(true);
  }, [isNavigating]);

  useEffect(() => {
    if (isDetail) {
      setVisible(true);
      const id = setTimeout(() => setVisible(false), 80);
      return () => clearTimeout(id);
    }
  }, [location.pathname]);

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