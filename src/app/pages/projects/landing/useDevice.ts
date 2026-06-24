import { useEffect, useState } from "react";

/**
 * Breakpoint hook — decides which experience to render.
 *
 *   mobile  : < 768px   → bespoke vertical, scroll-driven layout
 *   tablet  : 768–1023  → the conveyor, tuned for touch (tap, not hover)
 *   desktop : ≥ 1024px  → the original conveyor experience (unchanged)
 *
 * It also reports a coarse-pointer (touch) flag so the conveyor can swap
 * hover affordances for tap on touch tablets. SSR-safe: defaults to desktop
 * until the first measurement on the client.
 */

export type Device = "mobile" | "tablet" | "desktop";

const MOBILE_MAX = 767;
const TABLET_MAX = 1023;

function read(): { device: Device; touch: boolean } {
  if (typeof window === "undefined") return { device: "desktop", touch: false };
  const w = window.innerWidth;
  const touch =
    (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) ||
    "ontouchstart" in window;
  const device: Device = w <= MOBILE_MAX ? "mobile" : w <= TABLET_MAX ? "tablet" : "desktop";
  return { device, touch };
}

export function useDevice() {
  const [state, setState] = useState<{ device: Device; touch: boolean }>(() => read());

  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setState(read()));
    };
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
    // settle once after mount in case the first paint measured early
    onResize();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return state;
}