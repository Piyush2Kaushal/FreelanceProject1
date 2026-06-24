import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";

/**
 * Conveyor (seamless left marquee).
 *
 * Duplicates the whole card group and slides the strip left forever; when one
 * group fully exits on the left it is already replaced by the identical group,
 * so the loop is invisible. Pure transform, GPU-friendly and reduced-motion safe.
 *
 * The running tween is handed back through `onReady` so the parent can
 * pause() it when a card is focused and resume() it on dismiss — pausing keeps
 * the exact playhead, so the strip never jumps.
 *
 * `setHover(true|false)` smoothly eases the strip's timeScale down to a gentle
 * crawl while a card is hovered (so the project banner can be read without the
 * card sliding away), and eases it back to full speed on leave. The transition
 * itself is tweened — never an instant snap — to keep the motion premium.
 */

export interface ConveyorRefs {
  track: RefObject<HTMLDivElement | null>;   // the strip that scrolls left
}

interface Options {
  /** width of ONE card group in design px (one marquee segment) */
  groupWidth: number;
  enabled?: boolean;
  /** receives the live gsap tween (or null on reduced-motion) once it starts */
  onReady?: (tween: gsap.core.Tween | null) => void;
}

export interface ConveyorControls {
  /** ease the strip into / out of its slow "reading" speed on hover */
  setHover: (hovering: boolean) => void;
}

export function useConveyorAnimation(refs: ConveyorRefs, opts: Options): ConveyorControls {
  const { groupWidth, enabled = true, onReady } = opts;
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const track = refs.track.current;
    if (!track) return;

    // respect users who don't want motion
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onReady?.(null);
      return;
    }

    let tween: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      gsap.set(track, { x: 0 });

      // ── continuous seamless conveyor ─────────────────────────
      // one group scrolls past every 8s; modifier wraps x so it never resets
      // visibly.
      const SCROLL_TIME = 8;
      tween = gsap.to(track, {
        x: -groupWidth,
        duration: SCROLL_TIME,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const v = parseFloat(x) % groupWidth;
            return `${v}px`;
          },
        },
      });

      tweenRef.current = tween;
      onReady?.(tween);
    });

    return () => {
      onReady?.(null);
      tweenRef.current = null;
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, groupWidth]);

  // Smoothly ease the strip's playback rate up/down. We tween timeScale itself
  // (not a hard set) so speeding up and slowing down both feel graceful.
  const HOVER_SCALE = 0.18; // gentle crawl while reading a card
  const setHover = (hovering: boolean) => {
    const tween = tweenRef.current;
    if (!tween) return;
    gsap.to(tween, {
      timeScale: hovering ? HOVER_SCALE : 1,
      duration: hovering ? 0.6 : 0.9,
      ease: "power2.out",
      overwrite: true,
    });
  };

  return { setHover };
}