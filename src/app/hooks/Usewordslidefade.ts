// ─────────────────────────────────────────────────────────────────────────────
// useWordSlideFade — "slideAndFade" word-by-word entrance animation
// (companion to useReveal / useScrollWordReveal — same layout-safe technique)
// ─────────────────────────────────────────────────────────────────────────────
//
// THE EFFECT (matches the slideAndFade spec exactly)
//   effect:          slideAndFade
//   split:            words — each word animates on its own
//   order:            forward — first word plays first
//   slideDirection:   down — each word travels DOWN into place (so it starts
//                     ABOVE its resting spot and settles downward)
//   travelDistance:   50px
//   nodeDuration:     1067ms per word
//   offset:           267ms stagger between words
//   startTime:        400ms delay before the first word starts
//   easing:           slowDown ≈ ease-out  (power2.out)
//
// LAYOUT-SAFE
//   Only TEXT NODES are split — each word is wrapped in an inline-block
//   <span>, whitespace stays plain text so wrapping/line-breaks are
//   unaffected. The animated transform lives on the inner word spans, never
//   on the element itself, so it never fights a parent's own centering
//   `-translate-x-1/2` utility and never changes getBoundingClientRect of
//   the heading itself.
//
// TRIGGERS
//   'intro'  → plays once on mount (page-entrance headings, e.g. the hero).
//   'reveal' → plays once when the element scrolls into view (uses the same
//              getBoundingClientRect + rAF technique as useReveal, since
//              IntersectionObserver is unreliable inside this project's
//              `transform: scale()` desktop canvas).
//
// ACCESSIBILITY
//   Honors prefers-reduced-motion by default — words render fully visible,
//   nothing animates. Pass forceMotion to override.
// ─────────────────────────────────────────────────────────────────────────────
import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export interface WordSlideFadeOptions {
  /** 'intro' = plays once on mount. 'reveal' = plays once when scrolled into view. Default 'reveal'. */
  trigger?: "intro" | "reveal";
  /** ms delay before the first word starts. Default 400 (per spec). */
  startTime?: number;
  /** ms duration each word takes to travel. Default 1067 (per spec). */
  nodeDuration?: number;
  /** ms stagger between successive words. Default 267 (per spec). */
  offset?: number;
  /** px distance each word travels (starts this far ABOVE rest position). Default 50 (per spec). */
  travelDistance?: number;
  /** Scroll container ref for the 'reveal' trigger. Defaults to window. */
  scrollRoot?: RefObject<HTMLElement | null>;
  /** Opt-in: animate even when OS "Reduce Motion" is ON. Default false. */
  forceMotion?: boolean;
}

// Split text nodes into per-WORD spans; whitespace stays plain text so
// wrapping / pre-wrap / <br> behaviour is unchanged. Tagged `wsf-word`.
function splitWords(root: HTMLElement): HTMLSpanElement[] {
  const words: HTMLSpanElement[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) textNodes.push(node as Text);

  for (const tn of textNodes) {
    const text = tn.nodeValue ?? "";
    if (text === "") continue;
    const frag = document.createDocumentFragment();
    const tokens = text.match(/\s+|\S+/g) ?? [];
    for (const tok of tokens) {
      if (/^\s+$/.test(tok)) {
        frag.appendChild(document.createTextNode(tok));
      } else {
        const span = document.createElement("span");
        span.className = "wsf-word";
        span.style.display = "inline-block";
        span.textContent = tok;
        frag.appendChild(span);
        words.push(span);
      }
    }
    tn.parentNode?.replaceChild(frag, tn);
  }
  return words;
}

export function useWordSlideFade<T extends HTMLElement = HTMLParagraphElement>(
  options: WordSlideFadeOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const trigger = options.trigger ?? "reveal";
    const startTime = (options.startTime ?? 400) / 1000;
    const nodeDuration = (options.nodeDuration ?? 1067) / 1000;
    const offset = (options.offset ?? 267) / 1000;
    const travel = options.travelDistance ?? 50;

    const reduced = !(options.forceMotion ?? false) && window.matchMedia(REDUCED_QUERY).matches;

    let words: HTMLSpanElement[];
    if (el.dataset.wsfDone === "1") {
      words = Array.from(el.querySelectorAll<HTMLSpanElement>("span.wsf-word"));
    } else {
      words = splitWords(el);
      el.dataset.wsfDone = "1";
    }
    if (!words.length) return;

    if (reduced) {
      gsap.set(words, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(words, { opacity: 0, y: -travel });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: nodeDuration,
        ease: "power2.out",
        delay: startTime,
        stagger: offset,
        overwrite: "auto",
      });
    };

    if (trigger === "intro") {
      play();
      return;
    }

    // ── 'reveal' — fires once the heading actually scrolls into view ───────
    let raf = 0;
    const scroller: EventTarget = options.scrollRoot?.current ?? window;
    const check = () => {
      raf = 0;
      if (played) return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return; // not laid out yet
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const padX = vw * 0.09;
      const padY = vh * 0.04;
      const inView =
        r.left < vw - padX && r.right > padX && r.top < vh - padY && r.bottom > padY;
      if (inView) play();
    };
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(check);
    };

    scroller.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
    const t1 = window.setTimeout(schedule, 120);
    const t2 = window.setTimeout(schedule, 400);

    return () => {
      scroller.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      clearTimeout(t1);
      clearTimeout(t2);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}