// app/pages/projects/useSmoothHorizontalScroll.ts
// ─────────────────────────────────────────────────────────────────────────────
// useSmoothHorizontalScroll
//
// Maps vertical wheel / trackpad input → smooth, eased HORIZONTAL movement on a
// native scroll container. The feel is a heavy, controlled glide — high
// resistance, slow settle — exactly the "quiet luxury" of high-end architecture
// portfolios. No bounce, no overshoot, no gimmickry. Classic and composed.
//
// MODEL — single critically-damped lerp (the version that felt right), now with
// two refinements:
//   • HEAVY tuning  — a low ease + tamed input gain give a weighted, unhurried
//     catch-up that reads as expensive resistance, never fast or light.
//   • FRAME-RATE INDEPENDENCE — the lerp is normalised by real frame delta-time,
//     so the resistance feels IDENTICAL on 60 / 90 / 120 / 144Hz displays instead
//     of speeding up on high-refresh screens.
//
// WHY NATIVE scrollLeft (and not a CSS transform):
//   The page's useReveal() hook listens to this container's native "scroll"
//   event to fire its scroll-linked reveals. Driving the real scrollLeft keeps
//   every reveal, parallax and layout behaviour firing untouched — we change
//   only the *input feel*, never the output.
//
// PERFORMANCE:
//   • One rAF loop, alive ONLY while motion remains; it parks itself (0% CPU)
//     the instant target ≈ current.
//   • scrollLeft writes ride the browser's own compositor scroll path.
//   • Honors prefers-reduced-motion and the pointer:fine + min-width gate, so
//     touch / mobile (already a vertical layout) is never touched.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, type RefObject } from "react";

interface SmoothScrollOptions {
  /**
   * Catch-up stiffness at 60fps (0–1). LOWER = heavier / slower / more
   * resistance. Frame-rate normalised internally.
   */
  ease?: number;
  /** Wheel-delta multiplier. LOWER = more resistance per notch (less travel). */
  speed?: number;
  /** Only activate at/above this viewport width (keeps mobile untouched). */
  minWidth?: number;
}

export function useSmoothHorizontalScroll(
  scrollRef: RefObject<HTMLElement | null>,
  { ease = 0.065, speed = 0.55, minWidth = 1024 }: SmoothScrollOptions = {}
): void {
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof window === "undefined") return;

    // Gate: desktop + fine pointer + motion allowed. Otherwise leave native
    // scrolling completely as-is (mobile / tablet / touch / reduced-motion).
    const allowed = window.matchMedia(
      `(min-width: ${minWidth}px) and (pointer: fine)`
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!allowed || reducedMotion) return;

    let target = el.scrollLeft;  // where we want to be
    let current = el.scrollLeft; // where we visually are
    let rafId: number | null = null;
    let running = false;
    let lastTime = 0;

    const maxScroll = () => el.scrollWidth - el.clientWidth;
    const clamp = (v: number) => Math.max(0, Math.min(v, maxScroll()));

    const BASE = 1000 / 60; // one 60fps frame, in ms

    const tick = (now: number) => {
      // Real elapsed time, clamped so a tab-switch / GC pause can't jump the
      // page. `f` = how many 60fps-frames worth of time this frame represents.
      const dt = lastTime ? now - lastTime : BASE;
      lastTime = now;
      const f = Math.min(Math.max(dt / BASE, 0.5), 3);

      // Frame-rate-independent lerp: 1 - (1-ease)^f keeps the catch-up curve
      // constant whatever the refresh rate. This is the heavy, eased glide.
      const settle = 1 - Math.pow(1 - ease, f);
      current += (target - current) * settle;

      // Snap & stop when the gap is sub-pixel: avoids endless idle frames.
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
      // Let the OS / browser own pinch-zoom and modifier gestures.
      if (e.ctrlKey) return;

      // Only VERTICAL intent drives the horizontal journey. A horizontal-
      // dominant gesture (trackpad two-finger left/right) is swallowed so the
      // browser can't natively scroll the overflow-x container sideways, and
      // contributes nothing to motion.
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

    // Re-clamp on resize: scrollWidth / clientWidth (and the scaled strip)
    // change with viewport height.
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