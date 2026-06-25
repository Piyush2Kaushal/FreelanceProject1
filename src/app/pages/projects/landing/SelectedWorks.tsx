import { useRef, useLayoutEffect, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
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
import { useConveyorAnimation } from "./useConveyorAnimation";
import { useTransition } from "../../../context/TransitionContext";

/* ───────────────────────────────────────────────────────────────────
   Design canvas authored at exactly 1494 × 760 (the Figma frame).
   Rendered at that fixed size and scaled with a CSS transform, so the
   pixel-perfect layout is identical on every screen size.

   CARDS carry the EXACT positions / sizes / borders from the original
   component — nothing about the look changes, we only animate transforms.

   CLICK-TO-FOCUS (premium):
   - click a card → conveyor PAUSES (keeps its exact playhead)
   - a focus clone GROWS from the card's real on-screen position to centre
   - the rest of the strip + background get a soft depth blur + dim + push-back
   - the project banner auto-slides up on the focused card
   - click the focused card → opens its case-study link
   - click the scrim / ✕ / Esc → everything smoothly returns
─────────────────────────────────────────────────────────────────── */

const DESIGN_W = 1494;
const DESIGN_H = 760;

type Card = {
  left: number;
  top: number;
  w: number;
  h: number;
  src: string;
  border: string;       // exact border width from Figma
  borderColor?: string; // exact border colour (start colour for the morph)
  overflow?: boolean;   // image wrapped in overflow-hidden (matches original)
  label?: { name: string; year: string };
  project: Project;     // hover banner content
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

// span of one card group (for the seamless conveyor wrap) + one trailing gap
const GROUP_W = (() => {
  const minLeft = Math.min(...CARDS.map((c) => c.left));
  const maxRight = Math.max(...CARDS.map((c) => c.left + c.w));
  return maxRight - minLeft + GAP;
})();

/* Banner sizing (in design px) */
/* ── Hover banner proportions ──────────────────────────────────────
   All values are RATIOS of the card's own width/height, so a small card
   gets a proportionally smaller banner / text / logo, and a big card a
   larger one — matching the reference where the banner is inset with
   equal padding on the left, right and bottom (NOT full-bleed). */
const BANNER = {
  insetRatio: 0.026,   // equal margin (L/R/B) around the banner ≈ ref ~12/461
  heightRatio: 0.22,   // banner height as a fraction of card height
  padRatio: 0.058,     // inner padding (fraction of banner width)
  titleRatio: 0.072,   // title font size  (fraction of card width)
  subRatio: 0.040,     // subheading size  (fraction of card width)
  logoHeightRatio: 0.90, // logo height (fraction of banner inner height)
};

// common easing — soft & smooth, gentle settle (matches the reference clip)
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ── The visual contents of a card (image + border + banner). ───────
   Extracted so BOTH the in-strip card and the focused clone render
   identically. `forceBanner` drives the banner open without hover. */
function CardFace({
  card,
  hover,
  forceBanner = false,
}: {
  card: Card;
  hover: boolean;
  forceBanner?: boolean;
}) {
  const { name, subheading, color, logo } = card.project;
  const bannerLogo = logo ?? projectLogo;
  const open = hover || forceBanner;

  // responsive measurements derived from THIS card's size
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

      {/* ── BANNER ───────────────────────────────────────────────────
          Inset from the card edges with EQUAL padding on left / right /
          bottom (reference). Slides up from below + fades in smoothly. */}
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
          {/* texture grain over the colour — TWO layers, matching the mobile
              project-page side drawer exactly (same image, multiply blend,
              opacity 0.3 then 0.7). Colour stays dominant. */}
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

          {/* right: per-project logo — embossed/tinted, vertically centred */}
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

/* In-strip card: handles hover + reports a click (with its live rect) up.
   On hover it also signals the conveyor to ease into its slow "reading"
   speed (via onHoverChange) so the banner can be read without the card
   sliding away. */
function CardEl({
  card,
  index,
  onPick,
  onOpenDirect,
  onHoverChange,
}: {
  card: Card;
  index: number;
  onPick: (index: number, card: Card, rect: DOMRect) => void;
  onOpenDirect: (index: number, card: Card, rect: DOMRect) => void;
  onHoverChange: (hovering: boolean) => void;
}) {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // A double-click fires click→click→dblclick. We delay the single-click zoom
  // briefly; if a dblclick lands within that window we cancel the zoom and open
  // the project directly instead.
  const clickTimer = useRef<number | null>(null);

  const enter = () => {
    setHover(true);
    onHoverChange(true);
  };
  const leave = () => {
    setHover(false);
    onHoverChange(false);
  };

  return (
    <div
      ref={ref}
      className="absolute card-reveal"
      style={{ left: card.left, top: card.top, width: card.w, height: card.h, cursor: "pointer" }}
      onMouseEnter={enter}
      onMouseLeave={leave}
      // single click → zoom the card in (focus overlay), debounced for dblclick
      onClick={() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (clickTimer.current) window.clearTimeout(clickTimer.current);
        clickTimer.current = window.setTimeout(() => {
          clickTimer.current = null;
          onPick(index, card, rect);
        }, 220);
      }}
      // double click → cancel the pending zoom and open the project directly
      onDoubleClick={() => {
        const el = ref.current;
        if (clickTimer.current) {
          window.clearTimeout(clickTimer.current);
          clickTimer.current = null;
        }
        if (el) onOpenDirect(index, card, el.getBoundingClientRect());
      }}
    >
      <CardFace card={card} hover={hover} />
    </div>
  );
}

/* ── Focus overlay ─────────────────────────────────────────────────
   A fixed-position clone of the picked card that GROWS from the card's
   real screen rect to a centred, enlarged size. Banner auto-opens.
   Clicking it opens the project link; the scrim/✕/Esc dismiss it. */
function FocusOverlay({
  data,
  onClose,
  onOpen,
}: {
  data: { card: Card; rect: DOMRect } | null;
  onClose: () => void;
  onOpen: (card: Card, rect: DOMRect) => void;
}) {
  const cloneRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // FLIP-style grow: start at the real rect, animate to the centred target.
  useLayoutEffect(() => {
    if (!data) return;
    setMounted(true);

    const clone = cloneRef.current;
    const scrim = scrimRef.current;
    if (!clone) return;

    const { rect, card } = data;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // target size: scale the card up to fill ~78% of viewport height,
    // preserving its aspect ratio, capped so big cards don't overflow width.
    const aspect = card.w / card.h;
    let targetH = Math.min(vh * 0.78, 720);
    let targetW = targetH * aspect;
    const maxW = vw * 0.86;
    if (targetW > maxW) {
      targetW = maxW;
      targetH = targetW / aspect;
    }
    const targetX = (vw - targetW) / 2;
    const targetY = (vh - targetH) / 2;

    // place the clone exactly over the real card first…
    gsap.set(clone, {
      position: "fixed",
      left: 0,
      top: 0,
      width: rect.width,
      height: rect.height,
      x: rect.left,
      y: rect.top,
      transformOrigin: "top left",
      zIndex: 60,
    });

    const tl = gsap.timeline();
    // …then grow to centre. Width/height tween + position tween in lockstep.
    // Slightly longer duration + a soft expo settle reads as a deliberate,
    // premium lift — no bounce or overshoot (that cheapens it).
    tl.to(clone, {
      x: targetX,
      y: targetY,
      width: targetW,
      height: targetH,
      duration: 0.72,
      ease: "expo.out",
    }, 0);

    if (scrim) {
      tl.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0);
    }

    return () => {
      tl.kill();
    };
  }, [data]);

  // Esc to close
  useEffect(() => {
    if (!data) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") animateClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const animateClose = useCallback(() => {
    const clone = cloneRef.current;
    const scrim = scrimRef.current;
    if (!data || !clone) {
      onClose();
      return;
    }
    const { rect } = data;
    const tl = gsap.timeline({
      onComplete: () => {
        setMounted(false);
        onClose();
      },
    });
    tl.to(clone, {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      duration: 0.5,
      ease: "expo.inOut",
    }, 0);
    if (scrim) tl.to(scrim, { opacity: 0, duration: 0.45, ease: "power2.in" }, 0);
  }, [data, onClose]);

  if (!data && !mounted) return null;

  // Click the zoomed card → open its project page using the shared-element
  // morph, starting from the clone's CURRENT on-screen rect (so it flies from
  // the centred/enlarged card, not from the small strip card).
  const openProject = () => {
    if (!data) return;
    const clone = cloneRef.current;
    const liveRect = clone ? clone.getBoundingClientRect() : data.rect;
    onOpen(data.card, liveRect);
  };

  return (
    <>
      {/* scrim — catches outside clicks + dims the page */}
      <div
        ref={scrimRef}
        onClick={animateClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(28,16,7,0.42)",
          zIndex: 55,
          cursor: "pointer",
          opacity: 0,
        }}
      />

      {/* the growing clone */}
      {data && (
        <div ref={cloneRef} style={{ position: "fixed", overflow: "visible" }}>
          <div
            onClick={openProject}
            style={{ position: "absolute", inset: 0, cursor: "pointer" }}
            role="link"
            aria-label={`Open ${data.card.project.name.replace(/\n/g, " ")} case study`}
          >
            <CardFace card={data.card} hover={false} forceBanner />
          </div>

          {/* ✕ close — sits just outside the top-right corner */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              animateClose();
            }}
            aria-label="Close"
            style={{
              position: "absolute",
              top: -10,
              right: -10,
              width: 25,
              height: 25,
              borderRadius: "50%",
              background: "#3e2113",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 22px rgba(0,0,0,0.28)",
            }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

export function SelectedWorks() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const [focused, setFocused] = useState<{ card: Card; rect: DOMRect } | null>(null);
  const isFocused = focused !== null;

  // responsive: scale the fixed 1494×760 canvas to COVER the full viewport so
  // there's never empty space top/bottom or sides. We take the larger of the
  // width- and height-fit ratios (cover, not contain); overflow is hidden so
  // the extra simply crops. A floor keeps the photos from getting too small,
  // and we bias slightly toward the height fit on short/wide windows so the
  // cards always feel substantial rather than tiny.
  const MIN_SCALE = 0.62;
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const apply = () => {
      const wRatio = wrap.clientWidth / DESIGN_W;
      const hRatio = wrap.clientHeight / DESIGN_H;
      // cover fit, then a gentle floor so nothing shrinks into postage stamps.
      const cover = Math.max(wRatio, hRatio);
      setScale(Math.max(MIN_SCALE, cover));
    };
    const ro = new ResizeObserver(apply);
    ro.observe(wrap);
    apply();
    return () => ro.disconnect();
  }, []);

  const conveyor = useConveyorAnimation(
    { track: trackRef },
    {
      groupWidth: GROUP_W,
      onReady: (t) => {
        tweenRef.current = t;
      },
    }
  );

  // ── Shared-element navigation (SAME as Home → Project) ───────────────
  // On card click we fly the card image into the destination project's hero
  // using the app-wide TransitionContext, then navigate ~300ms later — the
  // identical handshake used by the Home page hero. SharedElementLayer (mounted
  // once at the App root) runs the GSAP morph and reveals the [data-shared-target].
  const navigate = useNavigate();
  const { startTransition } = useTransition();
  const pickingRef = useRef(false);

  // While a card is focused the strip is paused, so ignore hover speed changes.
  const handleHoverChange = useCallback(
    (hovering: boolean) => {
      if (isFocused) return;
      conveyor.setHover(hovering);
    },
    [conveyor, isFocused]
  );

  // Shared helper: run the shared-element morph from `rect` into the project
  // hero, then navigate to that route ~300ms later (same handshake as Home).
  const navigateToProject = useCallback(
    (card: Card, rect: DOMRect) => {
      const route = card.project.route;
      if (!route || pickingRef.current) return;
      pickingRef.current = true;

      // freeze the conveyor so the source frame doesn't slide mid-morph
      conveyor.setHover(false);
      tweenRef.current?.pause();

      // parse the card's exact border width (e.g. "5.4px" → 5.4)
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
    [conveyor, navigate, startTransition]
  );

  // Single click a card → freeze the strip and ZOOM the card in (focus overlay).
  // The project page is NOT opened yet — clicking the zoomed card opens it.
  const handlePick = useCallback(
    (_i: number, card: Card, rect: DOMRect) => {
      if (!card.project.route) return;
      conveyor.setHover(false); // restore full speed before pausing
      tweenRef.current?.pause();
      setFocused({ card, rect });
    },
    [conveyor]
  );

  // Double click a card in the strip → skip the zoom, open the project directly.
  const handleOpenDirect = useCallback(
    (_i: number, card: Card, rect: DOMRect) => {
      navigateToProject(card, rect);
    },
    [navigateToProject]
  );

  // Click the already-zoomed card → open its project page (morph from the
  // enlarged clone's live rect).
  const handleOpenFromFocus = useCallback(
    (card: Card, rect: DOMRect) => {
      navigateToProject(card, rect);
    },
    [navigateToProject]
  );

  const handleClose = useCallback(() => {
    setFocused(null);
    tweenRef.current?.resume();
  }, []);

  // ── First-load entrance ──────────────────────────────────────────
  // Classic, simple, smooth: the WHOLE page eases in as one quiet fade —
  // background, header and cards together — instead of cards rising from
  // below in a staggered "reveal". One unified motion reads as premium and
  // calm. We fade the page wrapper's opacity only (never transform/y), so
  // nothing shifts and the conveyor keeps its exact horizontal motion.
  // Runs a single time on mount and is reduced-motion safe.
  const didReveal = useRef(false);
  useLayoutEffect(() => {
    if (didReveal.current) return;
    const wrap = wrapRef.current;
    const cards = trackRef.current
      ? Array.from(trackRef.current.querySelectorAll<HTMLElement>(".card-reveal"))
      : [];
    if (!wrap) return;
    didReveal.current = true;

    // cards have an authored opacity-0 start (.card-reveal) — clear it so the
    // whole page shares the single wrapper fade rather than fading twice.
    if (cards.length) gsap.set(cards, { opacity: 1, y: 0 });

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(wrap, { opacity: 1 });
      return;
    }

    gsap.fromTo(
      wrap,
      { opacity: 0 },
      { opacity: 1, duration: 0.85, ease: "power2.out" }
    );
  }, []);

  const renderGroup = (prefix: string, offset: number) => (
    <div key={prefix} className="absolute top-0 left-0" style={{ transform: `translateX(${offset}px)` }}>
      {CARDS.map((c, i) => (
        <CardEl key={`${prefix}-${i}`} card={c} index={i} onPick={handlePick} onOpenDirect={handleOpenDirect} onHoverChange={handleHoverChange} />
      ))}
    </div>
  );

  return (
    <div className="bg-[#dad0ad] relative w-full overflow-hidden" style={{ height: "100vh" }} ref={wrapRef}>
      {/* responsive canvas: fixed design size, scaled to fit, centred both axes.
          When a card is focused, the whole canvas gets a soft depth blur + a
          gentle push-back so the focused clone reads as lifted toward the viewer. */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `translate(-50%, -50%) scale(${scale * (isFocused ? 0.985 : 1)})`,
          transformOrigin: "center center",
          filter: isFocused ? "blur(7px) brightness(0.66)" : "none",
          transition: "filter 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)",
          willChange: "filter, transform",
        }}
      >
        {/* Background pattern — untouched */}
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

          {/* Header moved OUT of the scaled canvas — see viewport-fixed header
              below — so it never crops on different desktop widths. */}

          {/* CONVEYOR TRACK — two identical groups for a seamless loop */}
          <div ref={trackRef} className="absolute inset-0" style={{ willChange: "transform" }}>
            {renderGroup("g1", 0)}
            {renderGroup("g2", GROUP_W)}
          </div>
      </div>

      {/* ── Viewport-fixed header ────────────────────────────────────────
          Lives OUTSIDE the scaled/cropped canvas so it always sits inside the
          real viewport — title pinned to the left edge, tagline to the right —
          and never gets clipped on any desktop width. It dims/blurs in step
          with the canvas when a card is focused. */}
      <div
        className="absolute top-0 left-0 right-0 flex items-start justify-between gap-6 pointer-events-none"
        style={{
          padding: "clamp(28px, 3.4vw, 51px) clamp(24px, 2vw, 40px) 0",
          zIndex: 10,
          color: "#553500",
          filter: isFocused ? "blur(7px) brightness(0.66)" : "none",
          opacity: isFocused ? 0.85 : 1,
          transition: "filter 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.55s cubic-bezier(0.16,1,0.3,1)",
          willChange: "filter, opacity",
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

      {/* focus overlay lives OUTSIDE the blurred canvas so it stays crisp */}
      <FocusOverlay data={focused} onClose={handleClose} onOpen={handleOpenFromFocus} />
    </div>
  );
}