// ─────────────────────────────────────────────────────────────────────────────
// useReveal — a tiny, dependency-free* motion engine
// (*uses only GSAP, which already ships with this project, + native APIs)
// ─────────────────────────────────────────────────────────────────────────────
//
// WHY THIS EXISTS
//   The Figma-exported pages are pixel-perfect but motionless. This hook layers
//   the studio's "quiet-luxury" motion vocabulary (the same clip-path wipes and
//   `expo.out` settles already used by the Project Intro and the shared-element
//   morph) on top of that markup WITHOUT changing a single layout value.
//
// HOW IT STAYS LAYOUT-SAFE
//   Almost every element in these pages is positioned with Tailwind `translate`
//   utilities (e.g. `-translate-x-1/2`). Animating `transform` on those would
//   overwrite the centering transform and shift the element. So the default
//   reveal animates ONLY properties that never touch the transform matrix:
//     • opacity
//     • clip-path   (the "wipe" that reads as a rise/reveal)
//     • filter:blur (an optional cinematic focus-pull)
//   This means a reveal is safe on ANY element regardless of its Tailwind
//   classes, and — crucially — it never changes getBoundingClientRect(), so the
//   Home → Project shared-element morph keeps measuring the exact same box.
//
//   The richer `zoom` variant DOES use scale, so it must only be applied to
//   wrappers that have no translate utility (decorative image frames, etc.).
//
// HOW TO USE (markup side — attributes only, no layout/markup restructuring)
//   data-anim="intro"            → plays immediately on mount (page entrance)
//   data-anim="reveal"           → plays when scrolled into view
//   data-anim="parallax"         → subtle scroll-linked depth (desktop only)
//
//   data-anim-variant="text" | "zoom" | "fade"   (default "text")
//   data-anim-order="0..n"       → stagger order for intro elements
//   data-anim-delay="0.0"        → extra delay (seconds) before a reveal plays
//   data-anim-blur="8"           → opt-in blur (px) for a focus-pull on reveal
//   data-parallax-speed="0.06"   → parallax intensity
//
// ACCESSIBILITY / PERF
//   • Honors prefers-reduced-motion: when set, NOTHING is hidden or animated —
//     content renders in its natural, fully-visible state.
//   • Initial hidden states are applied in useLayoutEffect (pre-paint) → no FOUC.
//   • Only opacity / clip-path / transform are animated → compositor-friendly,
//     comfortably 60fps. Parallax uses a single rAF loop + gsap.quickSetter and
//     is disabled on touch / small screens to protect low-end devices.
// ─────────────────────────────────────────────────────────────────────────────
import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

type Variant = "text" | "zoom" | "fade";

export interface RevealOptions {
  /**
   * Scroll container to use as the IntersectionObserver root. Needed for
   * horizontally-scrolling pages (the Project page). Defaults to the viewport.
   */
  scrollRoot?: RefObject<HTMLElement | null>;
  /** Observer rootMargin. Defaults trigger a touch before the element is fully in. */
  rootMargin?: string;
  /** Enable scroll-linked parallax for [data-anim="parallax"] elements. */
  enableParallax?: boolean;
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

// ── Per-variant start/end states ─────────────────────────────────────────────
function fromState(variant: Variant, blur: number): gsap.TweenVars {
  const base: gsap.TweenVars = { opacity: 0 };
  if (blur > 0) base.filter = `blur(${blur}px)`;
  switch (variant) {
    case "zoom":
      // clip wipes up from the bottom + a gentle over-scale that settles in
      return { ...base, clipPath: "inset(0% 0% 100% 0%)", scale: 1.08, transformOrigin: "50% 50%" };
    case "fade":
      return { ...base };
    case "text":
    default:
      // top-inset 100% → element reveals from the bottom upward (a soft "rise")
      return { ...base, clipPath: "inset(100% 0% 0% 0%)" };
  }
}

function toState(variant: Variant, blur: number, delay: number): gsap.TweenVars {
  const base: gsap.TweenVars = { opacity: 1, delay, overwrite: "auto" };
  if (blur > 0) base.filter = "blur(0px)";
  switch (variant) {
    case "zoom":
      return { ...base, clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.3, ease: "expo.out" };
    case "fade":
      return { ...base, duration: 1.0, ease: "power2.out" };
    case "text":
    default:
      return { ...base, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.out" };
  }
}

function readVariant(el: HTMLElement): Variant {
  const v = el.dataset.animVariant;
  return v === "zoom" || v === "fade" || v === "text" ? v : "text";
}
function readBlur(el: HTMLElement): number {
  const b = Number(el.dataset.animBlur);
  return Number.isFinite(b) && b > 0 ? b : 0;
}
function readNum(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

const INTRO_BASE_DELAY = 0.12; // s — lets the page settle before the entrance
const INTRO_STAGGER = 0.11; // s — gap between successive intro elements

export function useReveal(
  rootRef: RefObject<HTMLElement | null>,
  options: RevealOptions = {}
): void {
  const { scrollRoot, rootMargin = "0px 0px -12% 0px", enableParallax = false } = options;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    // Respect reduced-motion: leave everything in its natural visible state.
    if (window.matchMedia(REDUCED_QUERY).matches) return;

    let observer: IntersectionObserver | null = null;
    let rafId = 0;

    const ctx = gsap.context(() => {
      // ── 1. Intro — entrance choreography on mount ──────────────────────────
      const introEls = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-anim="intro"]'));
      introEls.forEach((el) => {
        const variant = readVariant(el);
        const blur = readBlur(el);
        const order = readNum(el.dataset.animOrder, 0);
        const extra = readNum(el.dataset.animDelay, 0);
        gsap.set(el, { willChange: "opacity, clip-path, transform, filter" });
        gsap.set(el, fromState(variant, blur));
        gsap.to(el, {
          ...toState(variant, blur, INTRO_BASE_DELAY + order * INTRO_STAGGER + extra),
          onComplete: () => { gsap.set(el, { willChange: "auto", clearProps: "filter" }); },
        });
      });

      // ── 2. Reveal — play as elements enter the (scroll) viewport ───────────
      const revealEls = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-anim="reveal"]'));
      revealEls.forEach((el) => {
        const variant = readVariant(el);
        const blur = readBlur(el);
        gsap.set(el, fromState(variant, blur));
      });

      if (revealEls.length) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target as HTMLElement;
              const variant = readVariant(el);
              const blur = readBlur(el);
              const delay = readNum(el.dataset.animDelay, 0);
              gsap.set(el, { willChange: "opacity, clip-path, transform, filter" });
              gsap.to(el, {
                ...toState(variant, blur, delay),
                onComplete: () => { gsap.set(el, { willChange: "auto", clearProps: "filter" }); },
              });
              observer?.unobserve(el);
            });
          },
          { root: scrollRoot?.current ?? null, rootMargin, threshold: 0.12 }
        );
        revealEls.forEach((el) => observer!.observe(el));
      }

      // ── 3. Parallax — subtle scroll-linked depth (desktop / pointer only) ──
      // Baseline-relative: each element's offset is ZERO at the scroll position
      // it loads at, so the design renders pixel-identical at rest and only
      // drifts as the user scrolls. Keeps motion subtle and non-destructive.
      if (enableParallax && window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) {
        const parallaxEls = gsap.utils
          .toArray<HTMLElement>(root.querySelectorAll('[data-anim="parallax"]'))
          .map((el) => ({
            el,
            speed: readNum(el.dataset.parallaxSpeed, 0.06),
            baseline: null as number | null,
            setY: gsap.quickSetter(el, "y", "px") as (v: number) => void,
          }));

        if (parallaxEls.length) {
          const tick = () => {
            const vh = window.innerHeight;
            for (const p of parallaxEls) {
              const r = p.el.getBoundingClientRect();
              // distance of the element's centre from the viewport centre
              const rel = r.top + r.height / 2 - vh / 2;
              if (p.baseline === null) p.baseline = rel; // anchor at load position
              p.setY((rel - p.baseline) * -p.speed);
            }
            rafId = requestAnimationFrame(tick);
          };
          rafId = requestAnimationFrame(tick);
        }
      }
    }, root);

    return () => {
      if (observer) observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}