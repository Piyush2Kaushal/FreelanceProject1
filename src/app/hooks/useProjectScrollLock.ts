// app/hooks/useProjectScrollLock.ts
// ─────────────────────────────────────────────────────────────────────────────
// useProjectScrollLock  —  premium scroll-locked project slideshow controller
//
// GOAL
//   Turn the Home "Projects" section into a scroll-driven, weighted slideshow
//   that feels exactly as composed and heavy as the Project Page's
//   useSmoothHorizontalScroll: no auto-cycle, no jank, no scroll-fighting.
//   Vertical wheel intent advances projects one at a time, with a real eased
//   transition between every slide. After the last slide, control is handed
//   back to the page so normal scrolling continues to Services — and the
//   reverse re-enters the lock at the last slide.
//
// HOW IT STAYS SMOOTH (the important part)
//   • ONE rAF loop owns a single continuous value `progress` ∈ [0 … count-1].
//     `current` chases `target` with a frame-rate-independent eased lerp — the
//     identical heavy-glide model as the horizontal scroll hook. The crossfade
//     between two slides is driven by the FRACTIONAL part of `progress`, so the
//     wipe is genuinely analog (you can feel the resistance mid-transition), not
//     a stepped state flip.
//   • While locked we do NOT call scrollTo on every wheel event (that is what
//     caused stutter). Instead we hold the window at a fixed anchor with a
//     single cheap correction only when it actually drifts, and we consume the
//     wheel delta into `target`. The browser's own scroll is parked.
//   • The loop parks itself (0% CPU) the instant motion settles.
//
// LAYOUT-SAFE
//   The desktop home is a fixed 1440×5097 "scale-to-fit" canvas (absolute
//   sections, no normal flow). We never restructure it: we only read the
//   section's document offset and hold window.scrollY there during the lock.
//
// ACCESSIBILITY / SCOPE
//   Desktop + fine-pointer + motion-allowed only. Touch / tablet / mobile /
//   prefers-reduced-motion are never intercepted — the section keeps its
//   natural stacked scroll and existing reveals.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState, type RefObject } from "react";

interface ScrollLockOptions {
  /** Total number of project slides. */
  count: number;
  /** Element whose top edge marks where the lock engages (document offset). */
  anchorRef: RefObject<HTMLElement | null>;
  /**
   * Catch-up stiffness at 60fps (0–1). LOWER = heavier / slower / more
   * resistance. Frame-rate normalised internally. Matched to the Project Page.
   */
  ease?: number;
  /**
   * Wheel-delta → progress gain. Tuned so one decisive scroll gesture moves
   * ~one slide. LOWER = more resistance (must scroll more to advance).
   */
  sensitivity?: number;
  /**
   * Stiffness of the scroll-pin glide (0–1). LOWER = softer, more cushioned
   * arrival/hold at the lock. Kept gentle so engaging never feels like a snap.
   */
  pinEase?: number;
  /** Only activate at/above this viewport width (keeps mobile untouched). */
  minWidth?: number;
}

interface ScrollLockState {
  /** Continuous progress 0 … count-1 (fractional during a transition). */
  progress: number;
  /** Nearest settled integer index. */
  index: number;
  /** True while the section is pinned / locked. */
  locked: boolean;
  /** 0→1 reveal weight for the final-slide "View all projects" button. */
  outroReveal: number;
}

export function useProjectScrollLock({
  count,
  anchorRef,
  ease = 0.08,
  sensitivity = 1 / 900,
  pinEase = 0.14,
  minWidth = 1024,
}: ScrollLockOptions): ScrollLockState {
  const [progress, setProgress] = useState(0);
  const [locked, setLocked] = useState(false);

  // ── Imperative state (read/written inside the non-reactive rAF + wheel) ──
  const targetRef = useRef(0); // desired progress
  const currentRef = useRef(0); // eased, displayed progress
  const lockedRef = useRef(false);
  const anchorYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const runningRef = useRef(false);
  const reengageBlockUntilRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const maxIndex = count - 1;
    if (maxIndex <= 0) return;

    const allowed = window.matchMedia(
      `(min-width: ${minWidth}px) and (pointer: fine)`
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!allowed || reducedMotion) return;

    const BASE = 1000 / 60; // one 60fps frame in ms
    const clampP = (v: number) => Math.max(0, Math.min(v, maxIndex));

    const measureAnchor = () => {
      const el = anchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      anchorYRef.current = Math.round(rect.top + window.scrollY);
    };
    measureAnchor();

    const setLockedState = (v: boolean) => {
      if (lockedRef.current === v) return;
      lockedRef.current = v;
      setLocked(v);
      // Lock CSS scrolling chrome (overscroll glow / rubber-band) cleanly.
      document.documentElement.style.overscrollBehaviorY = v ? "none" : "";
    };

    // ── The single smooth loop ───────────────────────────────────────────
    const tick = (now: number) => {
      const dt = lastTimeRef.current ? now - lastTimeRef.current : BASE;
      lastTimeRef.current = now;
      const f = Math.min(Math.max(dt / BASE, 0.5), 3);
      const settle = 1 - Math.pow(1 - ease, f);
      // A gentler curve for the scroll-pin glide so arriving at / holding the
      // lock feels cushioned, never a hard snap.
      const pinSettle = 1 - Math.pow(1 - pinEase, f);

      const cur = currentRef.current;
      const tgt = targetRef.current;
      const nextCur = cur + (tgt - cur) * settle;

      // Ease the window scroll toward the anchor rather than teleporting. This
      // removes the abrupt "stuck/snap" feel on entry and while held.
      if (lockedRef.current) {
        const y = window.scrollY;
        const gap = anchorYRef.current - y;
        if (Math.abs(gap) > 0.5) {
          window.scrollTo(0, y + gap * pinSettle);
        }
      }

      const progressSettled = Math.abs(tgt - cur) < 0.0005;
      const pinSettled =
        !lockedRef.current ||
        Math.abs(anchorYRef.current - window.scrollY) < 0.6;

      if (progressSettled && pinSettled) {
        currentRef.current = tgt;
        setProgress(tgt);
        runningRef.current = false;
        rafRef.current = null;
        lastTimeRef.current = 0;
        return;
      }

      currentRef.current = nextCur;
      setProgress(nextCur);
      rafRef.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    };

    const engage = (atProgress: number) => {
      measureAnchor();
      // Do NOT teleport — let the loop glide the page to the anchor smoothly.
      targetRef.current = atProgress;
      currentRef.current = atProgress;
      setProgress(atProgress);
      setLockedState(true);
      startLoop();
    };

    const release = (settleProgress: number, exitDir: 1 | -1) => {
      targetRef.current = settleProgress;
      currentRef.current = settleProgress;
      setProgress(settleProgress);
      setLockedState(false);
      // Briefly block re-locking so the user's ongoing scroll momentum carries
      // the page naturally into the next/previous section without snapping back.
      reengageBlockUntilRef.current = performance.now() + 600;
      // Hand a small push in the exit direction so native scroll has somewhere
      // to go this frame; the browser's own momentum continues from there.
      window.scrollBy(0, exitDir > 0 ? 40 : -40);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch-zoom belongs to the browser

      const el = anchorRef.current;
      if (!el) return;

      // Live viewport position of the section's top edge. This is what the user
      // actually perceives — far more reliable than absolute document math on a
      // scaled canvas.
      const vTop = el.getBoundingClientRect().top;
      const dir: 1 | -1 = e.deltaY >= 0 ? 1 : -1;

      // ── Engage from outside the lock ─────────────────────────────────────
      if (!lockedRef.current) {
        if (performance.now() < reengageBlockUntilRef.current) return;

        // Lock the instant the section's top reaches the top of the viewport
        // while scrolling DOWN — it has just become the thing on screen.
        if (dir > 0 && vTop <= 2 && vTop > -110) {
          e.preventDefault();
          engage(0);
          return;
        }
        // Scrolling UP from below: the section top sits just ABOVE the viewport
        // top (vTop slightly negative) and is rising toward it → re-enter at the
        // last slide.
        if (dir < 0 && vTop >= -110 && vTop < -2) {
          e.preventDefault();
          engage(maxIndex);
          return;
        }
        return;
      }

      // ── Locked: drive progress, keep pinned ──────────────────────────────
      e.preventDefault();

      const tgt = targetRef.current;

      // Exit conditions BEFORE consuming, so a push past either end releases
      // crisply instead of dead-zoning at the edge.
      if (dir > 0 && tgt >= maxIndex - 1e-4) {
        release(maxIndex, 1);
        return;
      }
      if (dir < 0 && tgt <= 1e-4) {
        release(0, -1);
        return;
      }

      targetRef.current = clampP(tgt + e.deltaY * sensitivity);
      startLoop();
    };

    const onScroll = () => {
      // While unlocked, keep the anchor fresh against layout shifts.
      if (!lockedRef.current) measureAnchor();
    };
    const onResize = () => measureAnchor();

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      document.documentElement.style.overscrollBehaviorY = "";
    };
  }, [anchorRef, count, ease, sensitivity, pinEase, minWidth]);

  const index = Math.round(progress);
  // Button reveals as the final slide settles (last ~30% of the final leg).
  const outroReveal =
    count > 1
      ? Math.max(0, Math.min(1, (progress - (count - 1 - 0.3)) / 0.3))
      : 1;

  return { progress, index, locked, outroReveal };
}