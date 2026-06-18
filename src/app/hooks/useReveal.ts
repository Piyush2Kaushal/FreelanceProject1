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
  /**
   * Opt-in: play animations even when the OS has "Reduce Motion" ON.
   * Default false → reduce-motion is honored (content shows fully, no motion),
   * so pages that DON'T pass this stay unaffected. The Project page passes
   * `true` so its signature scroll reveal works regardless of the OS setting.
   */
  forceMotion?: boolean;
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

// ─────────────────────────────────────────────────────────────────────────────
// DEBUG — set to `false` once everything works. While `true`, a small live badge
// is pinned to the bottom-left of the screen reporting WHY animations may not be
// playing (reduced-motion, wrong viewport width, gsap missing, no targets found,
// nothing triggered). This turns "nothing seems to happen" into a hard answer.
// ─────────────────────────────────────────────────────────────────────────────
const DEBUG = false;

// ── Per-variant start/end states ─────────────────────────────────────────────
function fromState(variant: Variant, blur: number): gsap.TweenVars {
  const base: gsap.TweenVars = { opacity: 0 };
  if (blur > 0) base.filter = `blur(${blur}px)`;
  switch (variant) {
    case "zoom": {
      // PREMIUM IMAGE REVEAL — a soft bottom-to-top clip wipe paired with a
      // gentle upward drift and a whisper of scale that settles in. The clip is
      // collapsed to the BOTTOM edge so the image unveils from the bottom
      // upward; transformOrigin at the bottom anchors it as it settles,
      // reinforcing the rise. A subtle focus-pull (blur) gives the quiet,
      // "developing" feel — classic and unhurried, never flashy.
      const softBlur = blur > 0 ? blur : 5;
      return {
        opacity: 0,
        filter: `blur(${softBlur}px)`,
        clipPath: "inset(100% 0% 0% 0%)", // collapsed to bottom edge → reveals upward
        y: 34,
        scale: 1.045,
        transformOrigin: "50% 100%",
      };
    }
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
      // Long, even deceleration (power3.out) reads as smooth & premium — the
      // image glides up into its resting position rather than snapping.
      return {
        ...base,
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power3.out",
      };
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
  const { scrollRoot, enableParallax = false, forceMotion = false } = options;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const osReduced = window.matchMedia(REDUCED_QUERY).matches;
    // Effective gate: only suppress motion if the OS asks AND this call did NOT
    // opt into forceMotion. So pages that don't pass forceMotion keep honoring
    // the OS setting and are completely unaffected.
    const reduced = osReduced && !forceMotion;

    // ── Live diagnostic badge (DEBUG only) ─────────────────────────────────
    // Reports the exact reason animations may not play. Stays pinned bottom-left.
    const counts = { found: 0, revealed: 0 };
    let hud: HTMLElement | null = null;
    const paintHud = () => {
      if (!hud) return;
      const w = window.innerWidth;
      const hasGsap = typeof gsap !== "undefined" && !!gsap;
      const motionLine = osReduced
        ? forceMotion
          ? "reduce-motion: ON (OS) \u2192 overridden, animating \u2713"
          : "reduce-motion: ON  \u26a0 OS is blocking ALL animation"
        : "reduce-motion: off \u2713";
      hud.textContent =
        "useReveal · diagnostics\n" +
        `viewport: ${w}\u00d7${window.innerHeight}px` +
        (w < 1024 ? "  \u26a0 <1024 \u2192 MOBILE layout (desktop anims off)" : "  (desktop)") + "\n" +
        motionLine + "\n" +
        `gsap loaded: ${hasGsap ? "yes \u2713" : "NO  \u26a0 gsap not installed"}\n` +
        `reveal targets found: ${counts.found}${counts.found === 0 ? "  (scroll/await load)" : " \u2713"}\n` +
        `revealed so far: ${counts.revealed}`;
    };
    if (DEBUG) {
      hud = document.createElement("div");
      hud.style.cssText =
        "position:fixed;left:12px;bottom:12px;z-index:2147483647;" +
        "font:11px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre;" +
        "background:rgba(10,10,12,.86);color:#f4f4f5;padding:10px 13px;border-radius:10px;" +
        "box-shadow:0 6px 24px rgba(0,0,0,.35);pointer-events:none;max-width:72vw;letter-spacing:.2px;";
      document.body.appendChild(hud);
      paintHud();
      window.addEventListener("resize", paintHud, { passive: true });
    }
    const teardownHud = () => {
      if (DEBUG) window.removeEventListener("resize", paintHud);
      if (hud && hud.parentNode) hud.parentNode.removeChild(hud);
      hud = null;
    };

    // Respect reduced-motion: leave everything in its natural visible state.
    // (The badge stays up so you can SEE this is why nothing animates.)
    if (reduced) return teardownHud;

    let rafId = 0;        // parallax rAF loop
    let revealRaf = 0;    // reveal scroll-check rAF
    const cleanups: Array<() => void> = [];

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

      // ── 2. Reveal — scroll-driven, tied directly to scroll position ────────
      // We deliberately DON'T use IntersectionObserver here. On this page the
      // reveal targets live inside a `transform: scale()` strip, and IO is
      // unreliable when the root / ancestors are transformed — it often reports
      // elements as "already visible", so the wipe never actually plays (which
      // is why no change was felt). Reading getBoundingClientRect() each frame
      // returns the TRUE on-screen box (it accounts for every transform + the
      // horizontal scroll), so each image reveals exactly as it slides into
      // view — "jaise jaise scroll, vaise vaise reveal".
      const revealEls = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll('[data-anim="reveal"]')
      );
      const pending = new Set<HTMLElement>(); // still hidden / waiting to trigger
      revealEls.forEach((el) => {
        gsap.set(el, fromState(readVariant(el), readBlur(el)));
        pending.add(el);
      });
      counts.found = revealEls.length;
      paintHud();

      if (revealEls.length) {
        const reveal = (el: HTMLElement) => {
          pending.delete(el);
          counts.revealed++;
          paintHud();
          const variant = readVariant(el);
          const blur = readBlur(el);
          const delay = readNum(el.dataset.animDelay, 0);
          gsap.set(el, { willChange: "opacity, clip-path, transform, filter" });
          gsap.to(el, {
            ...toState(variant, blur, delay),
            onComplete: () =>
              gsap.set(el, { willChange: "auto", clearProps: "filter" }),
          });
        };

        const check = () => {
          revealRaf = 0;
          if (!pending.size) return;
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          // Fire once an element has entered ~9% past the viewport edge (and is
          // not yet leaving) so the bottom-to-top wipe is always actually seen.
          const padX = vw * 0.09;
          const padY = vh * 0.04;
          pending.forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.width === 0 && r.height === 0) return; // not laid out yet
            const inView =
              r.left < vw - padX &&
              r.right > padX &&
              r.top < vh - padY &&
              r.bottom > padY;
            if (inView) reveal(el);
          });
        };

        const schedule = () => {
          if (revealRaf) return;
          revealRaf = requestAnimationFrame(check);
        };

        // Drive off the horizontal scroll container (falls back to the window).
        const scroller: EventTarget = scrollRoot?.current ?? window;
        scroller.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule, { passive: true });
        cleanups.push(() => scroller.removeEventListener("scroll", schedule));
        cleanups.push(() => window.removeEventListener("resize", schedule));

        // Initial passes — reveal whatever is already on screen, with a couple of
        // follow-ups to catch the scale-strip's late layout after fonts/images.
        schedule();
        const t1 = window.setTimeout(schedule, 120);
        const t2 = window.setTimeout(schedule, 400);
        cleanups.push(() => { clearTimeout(t1); clearTimeout(t2); });
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
      teardownHud();
      cleanups.forEach((fn) => fn());
      if (rafId) cancelAnimationFrame(rafId);
      if (revealRaf) cancelAnimationFrame(revealRaf);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}