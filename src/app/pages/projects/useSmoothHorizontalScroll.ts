// app/pages/projects/useSmoothHorizontalScroll.ts
// ─────────────────────────────────────────────────────────────────────────────
// useSmoothHorizontalScroll
//
// Maps vertical wheel/trackpad input → smooth, eased HORIZONTAL movement on a
// native scroll container, with subtle inertia/resistance for a premium feel
// (à la high-end architecture portfolios).
//
// WHY NATIVE scrollLeft (and not CSS transform):
//   The page's useReveal() hook listens to the container's native "scroll"
//   event to trigger its scroll-linked reveals. By driving the real scrollLeft
//   (never a transform), every existing reveal, parallax, and layout behaviour
//   keeps firing untouched — we only change the *input feel*, not the output.
//
// PERFORMANCE:
//   • A single requestAnimationFrame loop runs ONLY while motion remains; it
//     parks itself (0% CPU) the instant target ≈ current.
//   • scrollLeft writes use the browser's own compositor scroll path.
//   • Honors prefers-reduced-motion and pointer:fine + min-width gates, so it
//     never touches touch / mobile, where the layout is vertical anyway.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, type RefObject } from "react";

interface SmoothScrollOptions {
  /** Catch-up factor per frame (0–1). Lower = heavier/more inertia. */
  ease?: number;
  /** Wheel delta multiplier. Tames raw input so motion never feels abrupt. */
  speed?: number;
  /** Only activate at/above this viewport width (keeps mobile untouched). */
  minWidth?: number;
}

export function useSmoothHorizontalScroll(
  scrollRef: RefObject<HTMLElement | null>,
  { ease = 0.085, speed = 0.9, minWidth = 1024 }: SmoothScrollOptions = {}
): void {
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof window === "undefined") return;

    // Gate: desktop + fine pointer + motion allowed. Otherwise leave native
    // scrolling completely as-is (mobile/tablet/touch/reduced-motion users).
    const allowed = window.matchMedia(
      `(min-width: ${minWidth}px) and (pointer: fine)`
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!allowed || reducedMotion) return;

    let target = el.scrollLeft; // where we want to be
    let current = el.scrollLeft; // where we visually are
    let rafId: number | null = null;
    let running = false;

    const maxScroll = () => el.scrollWidth - el.clientWidth;
    const clamp = (v: number) => Math.max(0, Math.min(v, maxScroll()));

    const tick = () => {
      // Ease current toward target (lerp) — this is the inertia/resistance.
      current += (target - current) * ease;

      // Snap & stop when the gap is sub-pixel: avoids endless idle frames.
      if (Math.abs(target - current) < 0.5) {
        current = target;
        el.scrollLeft = current;
        running = false;
        rafId = null;
        return;
      }

      el.scrollLeft = current;
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      // Let the OS/browser own pinch-zoom and modifier gestures.
      if (e.ctrlKey) return;

      // Only VERTICAL intent drives the horizontal journey. Horizontal wheel
      // input (trackpad two-finger left/right, deltaX) is deliberately ignored
      // so side-swipes do nothing — vertical scroll → horizontal motion only.
      // If the gesture is horizontal-dominant, swallow it: prevent the browser
      // from natively scrolling the overflow-x container sideways.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      if (delta === 0) return;

      const next = clamp(target + delta * speed);

      // At a hard edge with no remaining travel, release the event so the page
      // behaves naturally (e.g. nothing to scroll) instead of swallowing input.
      if (next === target) return;

      e.preventDefault(); // we're taking over this gesture
      target = next;
      start();
    };

    // Keep our model in sync if scrollLeft changes by any other means
    // (keyboard, programmatic, scrollbar drag, anchor jumps).
    const onScroll = () => {
      if (!running) {
        current = el.scrollLeft;
        target = el.scrollLeft;
      }
    };

    // Re-clamp on resize: scrollWidth/clientWidth (and the scaled strip) change.
    const onResize = () => {
      target = clamp(target);
      current = clamp(current);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [scrollRef, ease, speed, minWidth]);
}