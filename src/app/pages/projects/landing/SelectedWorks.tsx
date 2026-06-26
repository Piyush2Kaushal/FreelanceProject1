import { useRef, useLayoutEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  SLOTS,
  STUDIO_TAGLINE,
  bannerTexture,
  projectLogo,
  imgPattern73,
  imgPattern72,
  CARD_BORDER_COLOR,
  type Project,
} from "./projectData";
import { useInfiniteHorizontalScroll } from "./useInfiniteHorizontalScroll";
import { useTransition } from "../../../context/TransitionContext";

/* ───────────────────────────────────────────────────────────────────
   Design canvas authored at exactly 1494 × 760 (the Figma frame).
   Cards carry the EXACT positions / sizes / borders from the original.

   BEHAVIOUR (updated per brief):
   - NO auto-motion. The continuous left "conveyor" marquee is gone, along
     with the click-to-centre grow zoom (FocusOverlay). The strip is
     completely still until the user scrolls.
   - HOVER kept exactly as the original: hovering a card slides its project
     banner up + fades it in (same transitions); it hides again on leave.
   - INFINITE HORIZONTAL SCROLL. Vertical wheel / trackpad input is mapped to
     a heavy, eased horizontal glide that loops forever (seamless, both
     directions) — using the SAME resistance feel as the project page
     (useInfiniteHorizontalScroll mirrors useSmoothHorizontalScroll's ease /
     speed).
   - CLICK a card → runs the original shared-element image morph (the card
     image flies into the project hero), then navigates. The grow-to-centre
     zoom is gone; the navigate morph is kept.
─────────────────────────────────────────────────────────────────── */

const DESIGN_H = 760;

type Card = {
  left: number;
  top: number;
  w: number;
  h: number;
  src: string;
  border: string;       // exact border width from Figma
  borderColor?: string; // exact border colour
  overflow?: boolean;   // image wrapped in overflow-hidden (matches original)
  label?: { name: string; year: string };
  project: Project;     // banner content
};

/* ── Two fixed sizes only ──────────────────────────────────────────
   Every BIG card is identical; every SMALL card is identical; the gap
   between consecutive cards is always the same. Cards alternate
   big → small → big → small and are vertically centred on the canvas. */
const BIG_W = 369;
const BIG_H = 473;
const SMALL_W = 290;
const SMALL_H = 372;
const GAP = 73;            // fixed gap between every card
const FIRST_LEFT = 28;     // left padding before the first card
const VERTICAL_OFFSET = 60; // push the whole card row down (increase = lower)

// build cards left→right with equal gaps; centre each vertically
const CARDS: Card[] = (() => {
  let x = FIRST_LEFT;
  return SLOTS.map((s) => {
    const w = s.big ? BIG_W : SMALL_W;
    const h = s.big ? BIG_H : SMALL_H;
    const top = Math.round((DESIGN_H - h) / 2) + VERTICAL_OFFSET;
    const card: Card = { left: x, top, w, h, src: s.src, border: s.border, borderColor: s.borderColor, overflow: s.overflow, label: s.label, project: s.project };
    x += w + GAP;
    return card;
  });
})();

// span of one card group (one repeated segment) + one trailing gap, so the
// spacing between the last card of one group and the first of the next equals
// the spacing inside a group → the infinite repeat is perfectly even.
const GROUP_W = (() => {
  const minLeft = Math.min(...CARDS.map((c) => c.left));
  const maxRight = Math.max(...CARDS.map((c) => c.left + c.w));
  return maxRight - minLeft + GAP;
})();

// How many identical groups we lay down. The infinite-scroll hook parks the
// user in the 2nd segment and wraps within the band [seg, 2·seg), so the
// furthest-right visible edge is 2·seg + clientWidth. To guarantee that window
// is always covered (no empty edge — even on ultra-wide monitors) we need
//   GROUP_COUNT · seg ≥ 2·seg + clientWidth  ⇒  GROUP_COUNT ≥ 2 + clientWidth/seg.
// 3 is the floor (covers any screen up to one segment wide); wider screens add
// more. Computed at runtime from the live segment width + viewport.
const MIN_GROUP_COUNT = 3;
function computeGroupCount(segmentWidthPx: number): number {
  if (typeof window === "undefined" || segmentWidthPx <= 0) return MIN_GROUP_COUNT;
  const needed = Math.ceil(2 + window.innerWidth / segmentWidthPx) + 1; // +1 safety
  return Math.max(MIN_GROUP_COUNT, needed);
}

/* ── Hover banner proportions ──────────────────────────────────────
   All values are RATIOS of the card's own width/height. */
const BANNER = {
  insetRatio: 0.026,
  heightRatio: 0.22,
  padRatio: 0.058,
  titleRatio: 0.072,
  subRatio: 0.040,
  logoHeightRatio: 0.90,
};

// common easing — soft & smooth, gentle settle (matches the reference clip)
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ── The visual contents of a card (image + border + banner). ───────
   The project banner slides up + fades in on hover (original behaviour),
   driven by `hover`. */
function CardFace({
  card,
  hover = false,
}: {
  card: Card;
  hover?: boolean;
}) {
  const { name, subheading, color, logo } = card.project;
  const bannerLogo = logo ?? projectLogo;
  const open = hover;

  const inset = card.w * BANNER.insetRatio;
  const bannerH = card.h * BANNER.heightRatio;
  const innerW = card.w - inset * 2;
  const pad = innerW * BANNER.padRatio;
  const titleSize = card.w * BANNER.titleRatio;
  const subSize = card.w * BANNER.subRatio;
  const logoH = (bannerH - pad * 2) * BANNER.logoHeightRatio;

  const img = (
    <img
      alt=""
      className="absolute inset-0 max-w-none object-cover size-full pointer-events-none"
      src={card.src}
      style={card.overflow ? { height: "100.08%", top: "-0.04%", left: 0, width: "100%" } : undefined}
    />
  );

  return (
    <>
      {card.overflow ? <div className="absolute inset-0 overflow-hidden pointer-events-none">{img}</div> : img}

      {/* exact border from original */}
      <div aria-hidden className="absolute inset-0 border-solid pointer-events-none" style={{ borderColor: "#3e2113", borderWidth: card.border }} />

      {/* ── BANNER ─────────────────────────────────────────────────── */}
      <div
        className="absolute overflow-hidden pointer-events-none"
        style={{ left: inset, right: inset, bottom: inset, height: bannerH }}
      >
        <div
          className="absolute inset-0 flex items-stretch justify-between"
          style={{
            backgroundColor: color,
            padding: pad,
            transform: open ? "translateY(0%)" : "translateY(105%)",
            opacity: open ? 1 : 0,
            transition: `transform 0.95s ${EASE}, opacity 0.7s ease`,
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("${bannerTexture}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "multiply",
              opacity: open ? 0.3 : 0,
              transition: "opacity 0.7s ease",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("${bannerTexture}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "multiply",
              opacity: open ? 0.7 : 0,
              transition: "opacity 0.7s ease",
            }}
          />
          {/* left: title + subheading, pinned to bottom */}
          <div
            className="flex flex-col justify-between"
            style={{
              color: "#fff",
              transform: open ? "translateY(0)" : "translateY(8px)",
              opacity: open ? 1 : 0,
              transition: `transform 0.95s ${EASE} 0.12s, opacity 0.8s ease 0.12s`,
            }}
          >
            <p
              className="whitespace-pre-line"
              style={{
                fontFamily: "'Helvetica Neue','Arial',sans-serif",
                fontWeight: 700,
                fontSize: titleSize,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              {name}
            </p>
            <p
              style={{
                fontFamily: "'Helvetica Neue','Arial',sans-serif",
                fontWeight: 400,
                fontSize: subSize,
                margin: 0,
                opacity: 0.92,
              }}
            >
              {subheading}
            </p>
          </div>

          {/* right: per-project logo */}
          <img
            src={bannerLogo}
            alt=""
            className="select-none"
            style={{
              height: logoH,
              width: "auto",
              alignSelf: "center",
              opacity: open ? 1 : 0,
              mixBlendMode: "normal",
              transition: `opacity 0.9s ease 0.18s`,
            }}
          />
        </div>
      </div>

      {/* original opacity-0 label kept (unchanged) */}
      {card.label && (
        <div
          className="[word-break:break-word] absolute content-stretch flex items-start justify-between leading-[normal] not-italic opacity-0 text-[18px] whitespace-nowrap pointer-events-none"
          style={{ inset: "92.83% 4.61% 2.91% 4.61%", fontFamily: "'Helvetica Neue','Arial',sans-serif" }}
        >
          <p className="relative shrink-0 text-white">{card.label.name}</p>
          <p className="relative shrink-0" style={{ color: "rgba(255,255,255,0.8)" }}>{card.label.year}</p>
        </div>
      )}
    </>
  );
}

/* In-strip card: hover → banner slides up (original effect). Click → run the
   shared-element image morph into the project hero, then navigate. No zoom. */
function CardEl({
  card,
  onOpen,
}: {
  card: Card;
  onOpen: (card: Card, rect: DOMRect) => void;
}) {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="absolute"
      style={{ left: card.left, top: card.top, width: card.w, height: card.h, cursor: "pointer" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        const el = ref.current;
        if (el) onOpen(card, el.getBoundingClientRect());
      }}
      role="link"
      aria-label={`Open ${card.project.name.replace(/\n/g, " ")} project`}
    >
      <CardFace card={card} hover={hover} />
    </div>
  );
}

export function SelectedWorks() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Height-fit scale: one design-height group is scaled so the cards fill the
  // viewport height (same substantial feel the conveyor had). Horizontal size
  // is free — that's the scrollable axis now.
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const apply = () => {
      setScale(wrap.clientHeight / DESIGN_H);
    };
    const ro = new ResizeObserver(apply);
    ro.observe(wrap);
    apply();
    return () => ro.disconnect();
  }, []);

  // on-screen width of one repeated group (post-scale) → drives the wrap point.
  const segmentWidth = GROUP_W * scale;

  // number of identical groups to render (viewport-aware; see computeGroupCount)
  const [groupCount, setGroupCount] = useState(MIN_GROUP_COUNT);
  useLayoutEffect(() => {
    const apply = () => setGroupCount(computeGroupCount(segmentWidth));
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [segmentWidth]);

  // Infinite, heavy, eased horizontal scroll — same resistance as the project
  // page, but seamless-looping instead of clamped at the edges.
  useInfiniteHorizontalScroll(scrollRef, {
    segmentWidth,
    ease: 0.075,
    speed: 0.7,
  });

  // Click a card → run the SAME shared-element image morph the page used
  // before (card image flies into the destination project's hero), then
  // navigate ~300ms later. No zoom / FocusOverlay — just the morph.
  const navigate = useNavigate();
  const { startTransition } = useTransition();
  const pickingRef = useRef(false);
  const handleOpen = useCallback(
    (card: Card, rect: DOMRect) => {
      const route = card.project.route;
      if (!route || pickingRef.current) return;
      pickingRef.current = true;

      // parse the card's exact border width (e.g. "4px" → 4)
      const borderWidth = parseFloat(card.border) || 4;

      // On small viewports skip the morph and just route (matches Home behaviour)
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        navigate(route);
        return;
      }

      startTransition({
        src: card.src,
        rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        borderColor: card.borderColor ?? CARD_BORDER_COLOR,
        borderWidth,
      });
      window.setTimeout(() => navigate(route), 300);
    },
    [navigate, startTransition]
  );

  // ── First-load entrance ──────────────────────────────────────────
  // Quiet single fade of the whole page (no transform, nothing shifts).
  const [revealed, setRevealed] = useState(false);
  useLayoutEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealed(true);
      return;
    }
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // one repeated group of cards, pushed to its position in the long strip
  const renderGroup = (index: number) => (
    <div
      key={`g${index}`}
      className="absolute top-0"
      style={{ left: index * GROUP_W, width: GROUP_W, height: DESIGN_H }}
    >
      {CARDS.map((c, i) => (
        <CardEl key={`g${index}-${i}`} card={c} onOpen={handleOpen} />
      ))}
    </div>
  );

  return (
    <div
      ref={wrapRef}
      className="bg-[#dad0ad] relative w-full overflow-hidden"
      style={{
        height: "100vh",
        opacity: revealed ? 1 : 0,
        transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Background pattern — fixed behind the scrolling strip (untouched art). */}
      <div
        className="absolute left-1/2 top-1/2 pointer-events-none"
        style={{
          width: 1494,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <div className="absolute contents left-[-154.72px] top-[349px]">
          <div
            className="absolute h-[1335.432px] left-[-311.44px] top-[-53.13px] w-[1888.787px]"
            style={{
              maskImage: `url("${imgPattern72}")`,
              maskRepeat: "no-repeat",
              maskPosition: "-295.867px -49.367px",
              maskSize: "2654.609px 1473.897px",
              WebkitMaskImage: `url("${imgPattern72}")`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "-295.867px -49.367px",
              WebkitMaskSize: "2654.609px 1473.897px",
            }}
          >
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" style={{ opacity: 0.13 }} src={imgPattern73} />
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE STRIP (transform-driven, GPU sub-pixel smooth) ──
          The parent captures the wheel; useInfiniteHorizontalScroll glides an
          inner strip via translate3d (no native scrollLeft, so the easing
          renders buttery). Weight + resistance are unchanged. */}
      <div className="absolute inset-0 overflow-hidden">
        {/* strip the hook translates (horizontal offset only) */}
        <div
          ref={scrollRef}
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: GROUP_W * groupCount * scale,
            height: DESIGN_H * scale,
            transform: "translate3d(0,0,0)",
            willChange: "transform",
          }}
        >
          {/* design-height layer, scaled to fit viewport height + centred */}
          <div
            style={{
              width: GROUP_W * groupCount,
              height: DESIGN_H,
              position: "absolute",
              top: 0,
              left: 0,
              transform: `translateY(-50%) scale(${scale})`,
              transformOrigin: "left center",
            }}
          >
            {Array.from({ length: groupCount }, (_, i) => renderGroup(i))}
          </div>
        </div>
      </div>

      {/* ── Viewport-fixed header ──────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-start justify-between gap-6 pointer-events-none"
        style={{
          padding: "clamp(28px, 3.4vw, 51px) clamp(24px, 2vw, 40px) 0",
          zIndex: 10,
          color: "#553500",
        }}
      >
        <p
          className="shrink-0 whitespace-nowrap"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(26px, 2.2vw, 32px)",
            lineHeight: 0.9,
            margin: 0,
          }}
        >
          Selected Works
        </p>
        <p
          className="shrink-0 text-right"
          style={{
            fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(14px, 1.25vw, 18px)",
            lineHeight: 1.3,
            width: "clamp(200px, 18vw, 249px)",
            margin: 0,
          }}
        >
          {STUDIO_TAGLINE}
        </p>
      </div>
    </div>
  );
}