// ─────────────────────────────────────────────────────────────────────────────
// useMobileReveal — a mobile-ONLY premium motion layer for the Project page
// (companion to useReveal — same "quiet-luxury" vocabulary, tuned for touch)
// ─────────────────────────────────────────────────────────────────────────────
//
// WHY THIS EXISTS (and why it is separate from useReveal)
//   The Project page's DESKTOP experience is final and approved — its motion is
//   owned by useReveal, which polls getBoundingClientRect() every frame because
//   the desktop strip lives inside a `transform: scale()` canvas where
//   IntersectionObserver is unreliable. The MOBILE tree has no such transform,
//   so we can use IntersectionObserver instead: it is passive, fires only when
//   geometry actually changes, and costs no battery while the user is idle. This
//   hook is therefore a small, self-contained engine that touches ONLY the
//   mobile markup and never runs its animations on desktop — desktop behaviour
//   is guaranteed byte-for-byte identical.
//
// THE MOTION LANGUAGE (matched to the studio's existing desktop reveals)
//   • images → a soft masked "rise + settle": the wrapper fades up while the
//     inner <img> drifts up a few percent and eases out of a whisper of scale.
//     The wrapper's existing `overflow-hidden` masks the drift, reading as a
//     gentle developing-photo reveal — the mobile cousin of the desktop "zoom".
//   • text   → big serif headings rise out of a soft offset (the mobile cousin
//     of the desktop clip-wipe), expo.out, unhurried.
//   • rise   → body copy / captions / UI lift in on a smaller offset.
//   • fade   → hairlines / dividers simply resolve in (no travel).
//   Easings (expo.out / power3.out) and the slow, staggered cadence are lifted
//   straight from useReveal so the two experiences feel authored by one hand.
//
// LAYOUT-SAFE BY CONSTRUCTION
//   • ONLY `opacity` and `transform` are animated — never a property that can
//     reflow. Both are GPU-composited, so the page holds 60fps on modest phones.
//   • Each element's RESTING opacity is captured first and restored as the tween
//     target, so baked-in opacities (captions at .75, links at .85, rules at
//     .15) are preserved exactly — the reveal never brightens the design.
//   • Every tween settles to identity (y:0 / scale:1), so the final frame is
//     pixel-identical to the un-animated layout. No spacing, size, aspect ratio
//     or position is ever changed.
//   • Initial hidden states are written in useLayoutEffect (pre-paint) → no FOUC.
//
// SCOPE GUARD (the desktop-safety contract)
//   The whole engine only arms while the viewport is below the `lg` breakpoint
//   (where the mobile tree is the one on screen). On desktop it does nothing and
//   leaves every node in its natural state; it re-arms / disarms cleanly if the
//   viewport is resized across the breakpoint.
//
// ACCESSIBILITY
//   Honors prefers-reduced-motion by default. BUT, like the desktop useReveal and
//   useScrollWordReveal, the Project page opts into `forceMotion: true` so its
//   signature reveal plays regardless of the OS setting — otherwise the page would
//   be half-animated (desktop reveals play, mobile stays static) on the many phones
//   that have Reduce Motion enabled. When forceMotion is NOT passed, reduce-motion
//   is respected and all content renders in its final, fully-visible state.
//
// USAGE (attributes only — no markup/layout restructuring)
//   useMobileReveal(rootRef, { forceMotion: true })  // call once, ref on mobile root
//   data-m-reveal                       // tag any element to reveal
//   data-m-variant="image|text|rise|fade"   (default "rise")
//   data-m-delay="0.12"                 // optional stagger (seconds)
// ─────────────────────────────────────────────────────────────────────────────
import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

type MVariant = "image" | "text" | "rise" | "fade";

export interface MobileRevealOptions {
  /**
   * Play the reveal even when the OS has "Reduce Motion" ON. Mirrors the
   * `forceMotion` opt-in on useReveal / useScrollWordReveal — the Project page
   * passes `true` so its mobile reveal isn't silently suppressed (and left out of
   * sync with the desktop reveals) on the many devices that enable Reduce Motion.
   * Default false → reduce-motion is honored and content shows fully, no motion.
   */
  forceMotion?: boolean;
}

// Below this width the mobile tree is what the user sees (mirrors Tailwind `lg`).
const MOBILE_QUERY = "(max-width: 1023.98px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

// Per-variant tuning. Slow, even decelerations read as premium — content glides
// into place rather than snapping. Values mirror the desktop reveal feel.
const DURATION = { image: 1.2, imageInner: 1.3, text: 1.1, rise: 0.9, fade: 0.9 };
const TEXT_Y = 28; // px — graceful heading lift
const RISE_Y = 18; // px — gentler body/UI lift
const IMG_YPCT = 5; // % of image height — subtle masked drift (kept < the scale
const IMG_SCALE = 1.12; //     overflow so the frame never shows an edge gap)

function variantOf(el: HTMLElement): MVariant {
  const v = el.dataset.mVariant;
  return v === "image" || v === "text" || v === "fade" || v === "rise" ? v : "rise";
}
function delayOf(el: HTMLElement): number {
  const d = Number(el.dataset.mDelay);
  return Number.isFinite(d) && d > 0 ? d : 0;
}
function restingOpacity(el: HTMLElement): number {
  const o = parseFloat(getComputedStyle(el).opacity);
  return Number.isFinite(o) ? o : 1;
}

export function useMobileReveal(
  rootRef: RefObject<HTMLElement | null>,
  options: MobileRevealOptions = {}
): void {
  const { forceMotion = false } = options;
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const mobileMQ = window.matchMedia(MOBILE_QUERY);
    const reduceMQ = window.matchMedia(REDUCED_QUERY);

    // Resting opacity per element, captured before it is hidden so the reveal can
    // restore it exactly (never override a baked-in opacity).
    const natural = new WeakMap<HTMLElement, number>();

    let ctx: gsap.Context | null = null;
    let observer: IntersectionObserver | null = null;
    let armed = false;

    const innerImg = (el: HTMLElement) => el.querySelector<HTMLElement>("img");

    const setHidden = (el: HTMLElement, v: MVariant) => {
      natural.set(el, restingOpacity(el));
      if (v === "image") {
        gsap.set(el, { opacity: 0, willChange: "opacity" });
        const img = innerImg(el);
        if (img)
          gsap.set(img, {
            yPercent: IMG_YPCT,
            scale: IMG_SCALE,
            transformOrigin: "50% 50%",
            willChange: "transform",
          });
      } else if (v === "text") {
        gsap.set(el, { opacity: 0, y: TEXT_Y, willChange: "opacity, transform" });
      } else if (v === "fade") {
        gsap.set(el, { opacity: 0, willChange: "opacity" });
      } else {
        gsap.set(el, { opacity: 0, y: RISE_Y, willChange: "opacity, transform" });
      }
    };

    const reveal = (el: HTMLElement) => {
      const v = variantOf(el);
      const delay = delayOf(el);
      const target = natural.get(el) ?? 1;
      const release = () => gsap.set(el, { willChange: "auto" });

      if (v === "image") {
        gsap.to(el, { opacity: target, duration: DURATION.image, ease: "power2.out", delay, onComplete: release });
        const img = innerImg(el);
        if (img)
          gsap.to(img, {
            yPercent: 0,
            scale: 1,
            duration: DURATION.imageInner,
            ease: "power3.out",
            delay,
            onComplete: () => gsap.set(img, { willChange: "auto" }),
          });
      } else if (v === "text") {
        gsap.to(el, { opacity: target, y: 0, duration: DURATION.text, ease: "expo.out", delay, onComplete: release });
      } else if (v === "fade") {
        gsap.to(el, { opacity: target, duration: DURATION.fade, ease: "power2.out", delay, onComplete: release });
      } else {
        gsap.to(el, { opacity: target, y: 0, duration: DURATION.rise, ease: "expo.out", delay, onComplete: release });
      }
    };

    const arm = () => {
      if (armed) return;
      armed = true;
      // Reduce-motion: leave everything in its natural, fully-visible state — UNLESS
      // this call opted into forceMotion (the Project page does, to stay in sync with
      // its desktop useReveal / useScrollWordReveal, which also force motion).
      if (reduceMQ.matches && !forceMotion) return;

      const els = Array.from(root.querySelectorAll<HTMLElement>("[data-m-reveal]"));
      if (!els.length) return;

      // gsap.context scopes every set/tween so a single revert() cleans up.
      ctx = gsap.context(() => {
        els.forEach((el) => setHidden(el, variantOf(el)));

        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target as HTMLElement;
              observer?.unobserve(el); // one-shot — never re-hide on scroll-back
              reveal(el);
            });
          },
          // Trigger a touch after the element starts entering from the bottom so
          // the rise is actually witnessed; above-the-fold elements fire at once.
          { rootMargin: "0px 0px -12% 0px", threshold: 0.01 }
        );

        els.forEach((el) => observer!.observe(el));
      }, root);
    };

    const disarm = () => {
      if (!armed) return;
      armed = false;
      observer?.disconnect();
      observer = null;
      ctx?.revert(); // restores pre-context inline styles → natural, visible layout
      ctx = null;
    };

    // Arm now if we loaded on a mobile-sized viewport.
    if (mobileMQ.matches) arm();

    // Re-evaluate when the viewport crosses the breakpoint (desktop ⇄ mobile).
    const onChange = () => (mobileMQ.matches ? arm() : disarm());
    if (mobileMQ.addEventListener) mobileMQ.addEventListener("change", onChange);
    else mobileMQ.addListener(onChange); // Safari < 14 fallback

    return () => {
      if (mobileMQ.removeEventListener) mobileMQ.removeEventListener("change", onChange);
      else mobileMQ.removeListener(onChange);
      observer?.disconnect();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}