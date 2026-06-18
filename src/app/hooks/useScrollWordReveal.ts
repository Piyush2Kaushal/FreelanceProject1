// ─────────────────────────────────────────────────────────────────────────────
// useScrollWordReveal — scroll-linked, CHARACTER-by-character colour fill
// (companion to useReveal — same layout-safe, project-native technique)
// ─────────────────────────────────────────────────────────────────────────────
//
// WHAT IT DOES
//   A paragraph sits in a faded version of its own colour, then each LETTER
//   fills to its full colour one-by-one as the block scrolls up through the
//   viewport — with a soft multi-character leading edge, exactly like the
//   reference (the head moves through characters, so it can sit mid-word).
//   The fill is SCRUBBED to scroll position and eases/catches-up smoothly
//   (the buttery "lag"), and reverses when you scroll back up.
//
// WHY THIS APPROACH (and not GSAP ScrollTrigger)
//   These pages render inside a `transform: scale()` "fit-to-width" canvas on
//   desktop. ScrollTrigger's start/end math is unreliable against a transformed
//   ancestor, which is why a ScrollTrigger version can look like "nothing
//   happens". So this reads position the SAME way the project's existing
//   parallax already does — getBoundingClientRect + one rAF loop — which is
//   proven to work on the scaled canvas. The smooth "scrub" feel is recreated
//   with a per-frame lerp toward the scroll-derived target (no plugin needed).
//
// LAYOUT-SAFE (same guarantees as useReveal)
//   • Only TEXT NODES are split into <span>s; whitespace stays plain text, so
//     line-wrapping / pre-wrap / <br> are unchanged and words never break apart.
//   • Only `color` is animated — never transform/opacity/clip — so it can't
//     shift a `-translate-x-1/2` element and never changes getBoundingClientRect.
//   • The reveal colour IS the element's existing colour at varying alpha — no
//     new hues; the end state equals the original colour 1:1.
//
// ACCESSIBILITY
//   • prefers-reduced-motion → letters render fully coloured, nothing animates.
//
// USAGE (attach the returned ref to the existing text element — no markup change)
//   const ref = useScrollWordReveal<HTMLParagraphElement>();
//   <p ref={ref} className="… text-[#5d5e36] …">…</p>
// ─────────────────────────────────────────────────────────────────────────────
import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export interface ScrollWordRevealOptions {
  /** Resting alpha of the faded "before-scroll" colour (0–1). Default 0.30. */
  rest?: number;
  /** Soft leading-edge width in CHARACTERS. Higher = softer. Default 12. */
  band?: number;
  /** Viewport fraction (element top) where the fill begins. Default 0.82. */
  start?: number;
  /** Viewport fraction (element top) where the fill completes. Default 0.30. */
  end?: number;
  /** Per-frame catch-up (0–1). Lower = smoother / more "scrub" lag. Default 0.1. */
  smooth?: number;
}

// ── Shared rAF engine (one loop for every registered block) ──────────────────
interface Entry {
  el: HTMLElement;
  chars: HTMLSpanElement[];
  rgb: string;
  shown: number;        // current (lerped) head position, in characters
  last: number[];       // last alpha written per char → skip no-op style writes
  opt: Required<ScrollWordRevealOptions>;
}

const registry = new Set<Entry>();
let rafId = 0;

function smoothstep(p: number) {
  return p * p * (3 - 2 * p);
}

function tick() {
  const vh = window.innerHeight || 1;
  registry.forEach((e) => {
    const { rest, band, start, end, smooth } = e.opt;
    const startLine = vh * start;
    const endLine = vh * end;
    const r = e.el.getBoundingClientRect();
    let P = (startLine - r.top) / (startLine - endLine);
    P = P < 0 ? 0 : P > 1 ? 1 : P;

    const N = e.chars.length;
    const target = P * (N + band);
    // ease the displayed head toward the scroll target → buttery "scrub" lag
    e.shown += (target - e.shown) * smooth;
    if (Math.abs(target - e.shown) < 0.01) e.shown = target;

    const head = e.shown;
    for (let i = 0; i < N; i++) {
      let p = (head - i) / band;
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      p = smoothstep(p);
      const a = rest + (1 - rest) * p;
      if (Math.abs(a - e.last[i]) > 0.004) {
        e.chars[i].style.color = `rgba(${e.rgb}, ${a.toFixed(3)})`;
        e.last[i] = a;
      }
    }
  });
  rafId = registry.size ? requestAnimationFrame(tick) : 0;
}

function ensureRunning() {
  if (!rafId && registry.size) rafId = requestAnimationFrame(tick);
}

// Split every text node under `root` into per-character spans, leaving
// whitespace as plain text so wrapping / pre-wrap behaviour is unchanged.
function splitChars(root: HTMLElement): HTMLSpanElement[] {
  const chars: HTMLSpanElement[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) textNodes.push(node as Text);

  for (const tn of textNodes) {
    const text = tn.nodeValue ?? "";
    if (text === "" || text.trim() === "") continue; // keep pure-whitespace nodes
    const frag = document.createDocumentFragment();
    for (const ch of Array.from(text)) {
      if (ch.trim() === "") {
        frag.appendChild(document.createTextNode(ch)); // whitespace stays plain text
      } else {
        const span = document.createElement("span");
        span.className = "swr-ch";
        span.textContent = ch;
        frag.appendChild(span);
        chars.push(span);
      }
    }
    tn.parentNode?.replaceChild(frag, tn);
  }
  return chars;
}

export function useScrollWordReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollWordRevealOptions = {}
): RefObject<T> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const opt: Required<ScrollWordRevealOptions> = {
      rest: options.rest ?? 0.3,
      band: options.band ?? 12,
      start: options.start ?? 0.82,
      end: options.end ?? 0.3,
      smooth: options.smooth ?? 0.1,
    };

    // The reveal colour is the element's own computed colour, varied by alpha.
    const m = getComputedStyle(el).color.match(/\d+(\.\d+)?/g);
    const rgb = m && m.length >= 3 ? `${m[0]}, ${m[1]}, ${m[2]}` : "93, 94, 54";

    // Split once; on any later (re)mount — e.g. React StrictMode's double-invoke
    // — reuse the spans already in the DOM instead of skipping registration.
    let chars: HTMLSpanElement[];
    if (el.dataset.swrDone === "1") {
      chars = Array.from(el.querySelectorAll<HTMLSpanElement>("span.swr-ch"));
    } else {
      chars = splitChars(el);
      el.dataset.swrDone = "1";
    }
    if (!chars.length) return;

    // Reduced motion → straight to full colour, no animation.
    if (window.matchMedia(REDUCED_QUERY).matches) {
      chars.forEach((c) => (c.style.color = `rgb(${rgb})`));
      return;
    }

    // Paint the resting (faded) state immediately so it's visible pre-scroll.
    chars.forEach((c) => (c.style.color = `rgba(${rgb}, ${opt.rest})`));

    const entry: Entry = {
      el,
      chars,
      rgb,
      shown: 0,
      last: new Array(chars.length).fill(opt.rest),
      opt,
    };
    registry.add(entry);
    ensureRunning();

    return () => {
      registry.delete(entry);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}