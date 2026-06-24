import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import {
  SLOTS,
  STUDIO_TAGLINE,
  bannerTexture,
  projectLogo,
  imgPattern73,
  imgPattern72,
} from "./projectData";

/* ───────────────────────────────────────────────────────────────────
   MOBILE EXPERIENCE — a bespoke, Apple-style vertical story.

   Instead of the desktop conveyor, mobile gets a deliberate, scroll-driven
   editorial sequence: one project per "moment", each a tall full-bleed
   image whose colour-tinted info panel rises and settles into place as it
   enters the viewport. Everything is finger-controlled — no auto-motion —
   which reads as calm and intentional on a phone.

   Premium details:
   - Sticky, condensing header (title shrinks as you scroll past the intro).
   - Each project image does a slow, subtle scale "settle" on reveal (Ken-Burns
     restraint — no loud parallax).
   - Info panel: project colour + the shared grain texture, sliding up with a
     soft expo settle; title, subheading and index reveal in a tight stagger.
   - A thin progress rail on the right shows position through the collection.
   - Full reduced-motion support: everything resolves to its final state.
─────────────────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* One project "moment" — a tall image card with a rising info panel. */
function MobileProject({
  slot,
  index,
  total,
}: {
  slot: (typeof SLOTS)[number];
  index: number;
  total: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  const { name, subheading, color, logo, route, href } = slot.project;
  const panelLogo = logo ?? projectLogo;
  const navigate = useNavigate();
  const destination = route ?? href;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReduced()) {
      setRevealed(true);
      return;
    }

    // Reveal the moment when ~38% of it is in view; only once.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.38 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  // Drive the GSAP reveal once `revealed` flips true.
  useEffect(() => {
    if (!revealed) return;
    if (prefersReduced()) return;
    const img = imgRef.current;
    const panel = panelRef.current;

    const tl = gsap.timeline();
    if (img) {
      tl.fromTo(
        img,
        { scale: 1.12, filter: "brightness(0.82)" },
        { scale: 1, filter: "brightness(1)", duration: 1.4, ease: "power3.out" },
        0
      );
    }
    if (panel) {
      tl.fromTo(
        panel,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.0, ease: "expo.out" },
        0.12
      );
      const bits = panel.querySelectorAll<HTMLElement>("[data-stagger]");
      tl.fromTo(
        bits,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 },
        0.34
      );
    }
    return () => {
      tl.kill();
    };
  }, [revealed]);

  const open = () => {
    if (route) {
      navigate(route);
    } else if (href) {
      window.location.assign(href);
    }
  };

  return (
    <section
      ref={rootRef}
      onClick={open}
      style={{
        position: "relative",
        width: "100%",
        height: "88svh",
        marginBottom: "4svh",
        borderRadius: 22,
        overflow: "hidden",
        cursor: destination ? "pointer" : "default",
        boxShadow: "0 24px 60px -28px rgba(40,22,8,0.55)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* full-bleed image */}
      <img
        ref={imgRef}
        src={slot.src}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          willChange: "transform",
        }}
      />

      {/* editorial border to echo the desktop card frame */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          border: "1.5px solid #3e2113",
          borderRadius: 22,
          pointerEvents: "none",
        }}
      />

      {/* index marker, top-left */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 20,
          color: "#fff",
          fontFamily: "'Helvetica Neue','Arial',sans-serif",
          fontSize: 13,
          letterSpacing: "0.18em",
          mixBlendMode: "difference",
          opacity: 0.9,
        }}
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* rising info panel */}
      <div
        ref={panelRef}
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 14,
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: color,
          padding: "18px 20px",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          willChange: "transform, opacity",
        }}
      >
        {/* texture grain — two layers, colour stays dominant */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${bannerTexture}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "soft-light",
            opacity: 0.55,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${bannerTexture}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scaleX(-1)",
            mixBlendMode: "overlay",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 6 }}>
          <p
            data-stagger
            className="whitespace-pre-line"
            style={{
              color: "#fff",
              fontFamily: "'Helvetica Neue','Arial',sans-serif",
              fontWeight: 700,
              fontSize: 26,
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {name}
          </p>
          <p
            data-stagger
            style={{
              color: "rgba(255,255,255,0.92)",
              fontFamily: "'Helvetica Neue','Arial',sans-serif",
              fontWeight: 400,
              fontSize: 15,
              margin: 0,
            }}
          >
            {subheading}
          </p>
        </div>

        <img
          data-stagger
          src={panelLogo}
          alt=""
          className="select-none"
          style={{
            position: "relative",
            height: 40,
            width: "auto",
            alignSelf: "center",
            opacity: 0.32,
            mixBlendMode: "luminosity",
          }}
        />
      </div>
    </section>
  );
}

export function SelectedWorksMobile() {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Condensing sticky header + progress rail, driven by scroll.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const title = titleRef.current;
    const rail = railRef.current;
    if (!scroller) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = scroller.scrollTop;
        const max = scroller.scrollHeight - scroller.clientHeight;
        const p = max > 0 ? Math.min(1, y / max) : 0;

        if (title) {
          // condense the title from 1 → 0.78 over the first 160px
          const k = Math.min(1, y / 160);
          const s = 1 - k * 0.22;
          title.style.transform = `scale(${s})`;
          title.style.opacity = String(1 - k * 0.12);
        }
        if (rail) rail.style.transform = `scaleY(${p})`;
        ticking = false;
      });
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  // gentle intro for the header itself
  useEffect(() => {
    if (prefersReduced()) return;
    const header = headerRef.current;
    if (!header) return;
    const bits = header.querySelectorAll<HTMLElement>("[data-intro]");
    const tl = gsap.fromTo(
      bits,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", stagger: 0.12, delay: 0.1 }
    );
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        backgroundColor: "#dad0ad",
        overflow: "hidden",
      }}
    >
      {/* faint background pattern, same texture language as desktop */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          maskImage: `url("${imgPattern72}")`,
          WebkitMaskImage: `url("${imgPattern72}")`,
          maskSize: "cover",
          WebkitMaskSize: "cover",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      >
        <img
          alt=""
          src={imgPattern73}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.13 }}
        />
      </div>

      {/* sticky condensing header */}
      <div
        ref={headerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          padding: "20px 20px 14px",
          background:
            "linear-gradient(180deg, rgba(218,208,173,0.96) 0%, rgba(218,208,173,0.86) 60%, rgba(218,208,173,0) 100%)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          pointerEvents: "none",
        }}
      >
        <p
          ref={titleRef}
          data-intro
          style={{
            margin: 0,
            color: "#553500",
            fontFamily: "'Instrument Serif', serif",
            fontSize: 34,
            lineHeight: 0.95,
            transformOrigin: "left center",
            willChange: "transform, opacity",
          }}
        >
          Selected Works
        </p>
        <p
          data-intro
          style={{
            margin: "8px 0 0",
            maxWidth: 280,
            color: "#553500",
            fontFamily: "'Helvetica Neue','Arial',sans-serif",
            fontWeight: 300,
            fontSize: 14,
            lineHeight: 1.35,
            opacity: 0.9,
          }}
        >
          {STUDIO_TAGLINE}
        </p>
      </div>

      {/* thin progress rail on the right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          right: 8,
          transform: "translateY(-50%)",
          width: 3,
          height: 120,
          borderRadius: 3,
          background: "rgba(85,53,0,0.16)",
          zIndex: 20,
          overflow: "hidden",
        }}
      >
        <div
          ref={railRef}
          style={{
            position: "absolute",
            inset: 0,
            background: "#553500",
            borderRadius: 3,
            transformOrigin: "top center",
            transform: "scaleY(0)",
            willChange: "transform",
          }}
        />
      </div>

      {/* the scrolling story */}
      <div
        ref={scrollerRef}
        style={{
          position: "absolute",
          inset: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          padding: "118px 16px 40px",
          scrollBehavior: "smooth",
        }}
      >
        {SLOTS.map((slot, i) => (
          <MobileProject key={i} slot={slot} index={i} total={SLOTS.length} />
        ))}

        {/* closing footer line */}
        <div
          style={{
            textAlign: "center",
            padding: "10px 0 18px",
            color: "#553500",
            opacity: 0.7,
            fontFamily: "'Instrument Serif', serif",
            fontSize: 20,
          }}
        >
          Studio Inside Eye
        </div>
      </div>
    </div>
  );
}