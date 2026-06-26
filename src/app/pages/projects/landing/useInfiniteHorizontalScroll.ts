// app/pages/projects/landing/useInfiniteHorizontalScroll.ts
// ─────────────────────────────────────────────────────────────────────────────
// useInfiniteHorizontalScroll  (transform-driven, GPU / sub-pixel smooth)
//
// Same heavy, eased, "quiet-luxury" feel as the project page's
// useSmoothHorizontalScroll (vertical wheel → horizontal glide, high
// resistance, slow settle, frame-rate independent) and it loops forever — BUT
// motion is now driven by translate3d() on an inner strip instead of integer
// `scrollLeft`. Native scrollLeft snaps to whole pixels, which truncates the
// easing curve and makes the glide feel steppy/laggy. A GPU transform renders
// sub-pixel, giving a buttery, premium glide while the WEIGHT + RESISTANCE
// (ease / speed math) stay identical.
//
// The strip contains N identical groups laid side by side, each `segmentWidth`
// px wide (on-screen, post-scale). We keep a continuous `offset` and wrap it
// modulo segmentWidth at RENDER time, so the loop is seamless in both
// directions with no visible jump and no hard edge.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, type RefObject } from "react";

interface InfiniteScrollOptions {
  /** width (in real on-screen px) of ONE repeated segment/group. */
  segmentWidth: number;
  /** Catch-up stiffness at 60fps (0–1). LOWER = heavier. */
  ease?: number;
  /** Wheel-delta multiplier. LOWER = more resistance per notch. */
  speed?: number;
  /** Only activate at/above this viewport width (keeps mobile untouched). */
  minWidth?: number;
}

export function useInfiniteHorizontalScroll(
  stripRef: RefObject<HTMLElement | null>,
  { segmentWidth, ease = 0.075, speed = 0.7, minWidth = 1024 }: InfiniteScrollOptions
): void {
  useEffect(() => {
    const el = stripRef.current;
    if (!el || typeof window === "undefined") return;
    if (!segmentWidth || segmentWidth <= 0) return;

    // Gate: desktop + fine pointer + motion allowed.
    const allowed = window.matchMedia(
      `(min-width: ${minWidth}px) and (pointer: fine)`
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!allowed || reducedMotion) return;

    let target = 0;   // where the glide wants to be (continuous, unwrapped)
    let current = 0;  // where it actually is (eased toward target)
    let rafId: number | null = null;
    let running = false;
    let lastTime = 0;

    const BASE = 1000 / 60; // one 60fps frame, in ms

    // Wrap ONLY for render. Positive modulo so translate stays clean. Because
    // the segments are identical, wrapping the visual offset is invisible.
    const render = () => {
      let v = current % segmentWidth;
      if (v < 0) v += segmentWidth;
      // negative translate = strip moves left as the offset grows
      el.style.transform = `translate3d(${-v}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const dt = lastTime ? now - lastTime : BASE;
      lastTime = now;
      const f = Math.min(Math.max(dt / BASE, 0.5), 3);

      // Frame-rate-independent heavy eased glide (identical weight to before).
      const settle = 1 - Math.pow(1 - ease, f);
      current += (target - current) * settle;

      if (Math.abs(target - current) < 0.05) {
        current = target;
        render();
        running = false;
        rafId = null;
        lastTime = 0;
        return;
      }

      render();
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTime = 0;
      rafId = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // leave pinch-zoom to the browser

      // Only VERTICAL intent drives the horizontal journey (same as page).
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      if (delta === 0) return;

      e.preventDefault();

      // Clamp a violent trackpad flick so the target can't spike → no jerk.
      // Keeps the resistance steady note-to-note.
      const clamped = Math.max(-140, Math.min(140, delta));
      target += clamped * speed;

      start();
    };

    el.style.willChange = "transform";
    el.style.backfaceVisibility = "hidden";
    render(); // initial paint at offset 0

    // Wheel is captured on the SCROLL WRAPPER (parent), not the transformed
    // strip itself, so the transform never fights the listener.
    const listenEl = el.parentElement ?? el;
    listenEl.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      listenEl.removeEventListener("wheel", onWheel);
      if (rafId !== null) cancelAnimationFrame(rafId);
      el.style.willChange = "";
      el.style.backfaceVisibility = "";
    };
  }, [stripRef, segmentWidth, ease, speed, minWidth]);
}