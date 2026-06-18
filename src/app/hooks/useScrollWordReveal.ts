// ─────────────────────────────────────────────────────────────────────────────
// useScrollWordReveal — scroll-linked, CHARACTER-by-character colour fill
// (companion to useReveal — same layout-safe, project-native technique)
// ─────────────────────────────────────────────────────────────────────────────
//
// THE EFFECT (matched to the reference recording, measured frame-by-frame)
//   The paragraph rests in a LIGHT WARM GREY. As the block scrolls up through
//   the viewport each LETTER turns to its full colour one-by-one — the head
//   moves through characters, so at any frozen scroll position a single word can
//   be half-grey / half-colour (e.g. "immers|ive"). The edge is crisp (~2 chars).
//   The fill is scrubbed to scroll and eases/catches-up smoothly, and reverses
//   when you scroll back up.
//
//   • light (resting) colour  = a neutral warm grey  → clearly lighter than the
//     text, so the per-letter darkening is obvious (the reference faded is the
//     ink at only ~20% — i.e. a light grey, NOT a tint of the text colour).
//   • dark (revealed) colour  = the element's OWN colour (e.g. #5d5e36), 1:1.
//
// WHY NOT GSAP ScrollTrigger
//   These pages render inside a `transform: scale()` canvas on desktop, where
//   ScrollTrigger's start/end math is unreliable (looks like "nothing happens").
//   This reads position exactly like the project's existing parallax does —
//   getBoundingClientRect + one rAF loop — which is proven on the scaled canvas.
//   The "scrub" smoothness is recreated with a per-frame lerp (no plugin).
//
// LAYOUT-SAFE
//   • Only TEXT NODES are split into per-character <span>s; whitespace stays
//     plain text → line wrapping / pre-wrap / <br> unchanged, words don't break.
//   • Only `color` is animated — never transform/opacity/clip — so it can't shift
//     a `-translate-x-1/2` element and never changes getBoundingClientRect.
//
// ACCESSIBILITY
//   • prefers-reduced-motion → letters render fully coloured, nothing animates.
//
// USAGE (attach the ref to the existing element — no markup change)
//   const ref = useScrollWordReveal<HTMLParagraphElement>();
//   <p ref={ref} className="… text-[#5d5e36] …">…</p>
// ─────────────────────────────────────────────────────────────────────────────
import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export interface ScrollWordRevealOptions {
  /** Resting (light) colour — any CSS rgb/hex. Default a warm light grey. */
  lightColor?: string;
  /** Revealed colour. Default = the element's own computed `color`. */
  darkColor?: string;
  /** Soft edge width in CHARACTERS. Default 2 (crisp, like the reference). */
  band?: number;
  /** Viewport fraction (element top) where the fill begins. Default 0.82. */
  start?: number;
  /** Viewport fraction (element top) where the fill completes. Default 0.22. */
  end?: number;
  /** Per-frame catch-up (0–1). Lower = smoother / more "scrub" lag. Default 0.075. */
  smooth?: number;
  /**
   * Opt-in: run the colour fill even when the OS has "Reduce Motion" ON.
   * Default false → reduce-motion is honored (text shows fully coloured, no
   * animation), so any element that doesn't pass this stays unaffected.
   */
  forceMotion?: boolean;
}

// Reference faded ink measured at ~ (202,198,190) — a warm light grey.
const DEFAULT_LIGHT: [number, number, number] = [199, 195, 187];

interface Entry {
  el: HTMLElement;
  chars: HTMLSpanElement[];
  light: [number, number, number];
  dark: [number, number, number];
  shown: number;   // current (lerped) head position, in characters
  last: number[];  // last progress written per char → skip no-op style writes
  band: number;
  start: number;
  end: number;
  smooth: number;
}

const registry = new Set<Entry>();
let rafId = 0;

function smoothstep(p: number) {
  return p * p * (3 - 2 * p);
}

function parseRGB(s: string): [number, number, number] | null {
  if (!s) return null;
  const hex = s.trim().match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = s.match(/\d+(\.\d+)?/g);
  return m && m.length >= 3 ? [+m[0], +m[1], +m[2]] : null;
}

function tick() {
  const vh = window.innerHeight || 1;
  registry.forEach((e) => {
    const startLine = vh * e.start;
    const endLine = vh * e.end;
    const r = e.el.getBoundingClientRect();
    let P = (startLine - r.top) / (startLine - endLine);
    P = P < 0 ? 0 : P > 1 ? 1 : P;

    const N = e.chars.length;
    const target = P * (N + e.band);
    e.shown += (target - e.shown) * e.smooth; // buttery "scrub" catch-up
    if (Math.abs(target - e.shown) < 0.01) e.shown = target;

    const head = e.shown;
    const [lr, lg, lb] = e.light;
    const [dr, dg, db] = e.dark;
    for (let i = 0; i < N; i++) {
      let p = (head - i) / e.band;
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      p = smoothstep(p);
      if (Math.abs(p - e.last[i]) > 0.004) {
        const cr = (lr + (dr - lr) * p) | 0;
        const cg = (lg + (dg - lg) * p) | 0;
        const cb = (lb + (db - lb) * p) | 0;
        e.chars[i].style.color = `rgb(${cr}, ${cg}, ${cb})`;
        e.last[i] = p;
      }
    }
  });
  rafId = registry.size ? requestAnimationFrame(tick) : 0;
}

function ensureRunning() {
  if (!rafId && registry.size) rafId = requestAnimationFrame(tick);
}

// Split text nodes into per-character spans; whitespace stays plain text so
// wrapping / pre-wrap / <br> behaviour is unchanged. Tagged `swr-ch` for safe re-query.
function splitChars(root: HTMLElement): HTMLSpanElement[] {
  const chars: HTMLSpanElement[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) textNodes.push(node as Text);

  for (const tn of textNodes) {
    const text = tn.nodeValue ?? "";
    if (text === "" || text.trim() === "") continue;
    const frag = document.createDocumentFragment();
    for (const ch of Array.from(text)) {
      if (ch.trim() === "") {
        frag.appendChild(document.createTextNode(ch));
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

    const band   = options.band   ?? 2;
    const start  = options.start  ?? 0.82;
    const end    = options.end    ?? 0.22;
    const smooth = options.smooth ?? 0.075;

    const dark =
      parseRGB(options.darkColor ?? "") ??
      parseRGB(getComputedStyle(el).color) ??
      [93, 94, 54];
    const light = parseRGB(options.lightColor ?? "") ?? DEFAULT_LIGHT;

    // Split once; reuse spans on any re-mount (React StrictMode double-invoke).
    let chars: HTMLSpanElement[];
    if (el.dataset.swrDone === "1") {
      chars = Array.from(el.querySelectorAll<HTMLSpanElement>("span.swr-ch"));
    } else {
      chars = splitChars(el);
      el.dataset.swrDone = "1";
    }
    if (!chars.length) return;

    if (!(options.forceMotion ?? false) && window.matchMedia(REDUCED_QUERY).matches) {
      chars.forEach((c) => (c.style.color = `rgb(${dark[0]}, ${dark[1]}, ${dark[2]})`));
      return;
    }

    // Paint the resting (light grey) state immediately so it's visible pre-scroll.
    chars.forEach((c) => (c.style.color = `rgb(${light[0]}, ${light[1]}, ${light[2]})`));

    const entry: Entry = {
      el,
      chars,
      light,
      dark,
      shown: 0,
      last: new Array(chars.length).fill(0),
      band,
      start,
      end,
      smooth,
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