// app/pages/projects/landing/useInfiniteHorizontalScroll.ts
// ─────────────────────────────────────────────────────────────────────────────
// useInfiniteHorizontalScroll
//
// Same heavy, eased, "quiet-luxury" feel as the project page's
// useSmoothHorizontalScroll (vertical wheel → horizontal glide, high
// resistance, slow settle, frame-rate independent) — BUT it loops forever.
//
// The strip is expected to contain N identical groups laid out side by side,
// each `segmentWidth` px wide (the on-screen, post-scale width of one group).
// We keep the user parked in a MIDDLE segment and silently wrap scrollLeft by
// one segment whenever they drift past a boundary, so they can scroll left or
// right endlessly with no visible jump and no hard edge.
//
// IDENTICAL feel knobs (ease / speed) are kept the same as the project page so
// the resistance is "same to same". Only the edge handling differs: instead of
// clamping to [0, maxScroll], we wrap.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, type RefObject } from "react";

interface InfiniteScrollOptions {
  /** width (in real on-screen px) of ONE repeated segment/group. */
  segmentWidth: number;
  /** Catch-up stiffness at 60fps (0–1). LOWER = heavier. Match project page. */
  ease?: number;
  /** Wheel-delta multiplier. LOWER = more resistance per notch. Match page. */
  speed?: number;
  /** Only activate at/above this viewport width (keeps mobile untouched). */
  minWidth?: number;
}

export function useInfiniteHorizontalScroll(
  scrollRef: RefObject<HTMLElement | null>,
  { segmentWidth, ease = 0.065, speed = 0.55, minWidth = 1024 }: InfiniteScrollOptions
): void {
  useEffect(() => {
    const el = scrollRef.current;
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

    // Park the user one full segment in from the start so there's always
    // room to wrap in BOTH directions without a visible jump.
    el.scrollLeft = segmentWidth;
    let target = el.scrollLeft;
    let current = el.scrollLeft;
    let rafId: number | null = null;
    let running = false;
    let lastTime = 0;

    const BASE = 1000 / 60; // one 60fps frame, in ms

    // Wrap a value back into [segmentWidth, 2*segmentWidth) so we stay in the
    // middle band. Keeps the same offset within the segment, so nothing jumps.
    const wrap = (v: number) => {
      const span = segmentWidth;
      while (v < span) v += span;
      while (v >= span * 2) v -= span;
      return v;
    };

    const tick = (now: number) => {
      const dt = lastTime ? now - lastTime : BASE;
      lastTime = now;
      const f = Math.min(Math.max(dt / BASE, 0.5), 3);

      // Frame-rate-independent heavy eased glide (identical to project page).
      const settle = 1 - Math.pow(1 - ease, f);
      current += (target - current) * settle;

      if (Math.abs(target - current) < 0.4) {
        current = target;
        el.scrollLeft = current;
        running = false;
        rafId = null;
        lastTime = 0;
        return;
      }

      el.scrollLeft = current;
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
      target += delta * speed;

      // Wrap the TARGET (and re-sync current by the same shift) so the eased
      // glide is never interrupted by a hard edge — the loop is seamless.
      const before = target;
      target = wrap(target);
      const shift = target - before;
      if (shift !== 0) {
        current += shift;
        el.scrollLeft = current; // apply the wrap immediately, invisibly
      }

      start();
    };

    // If scrollLeft is changed by any other means, keep our model in sync and
    // re-wrap into the middle band.
    const onScroll = () => {
      if (!running) {
        const wrapped = wrap(el.scrollLeft);
        if (wrapped !== el.scrollLeft) el.scrollLeft = wrapped;
        current = el.scrollLeft;
        target = el.scrollLeft;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [scrollRef, segmentWidth, ease, speed, minWidth]);
}