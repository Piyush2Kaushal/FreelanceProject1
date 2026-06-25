import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import {
  SLOTS,
  STUDIO_TAGLINE,
  bannerTexture,
  projectLogo,
  imgPattern73,
  imgPattern72,
} from "./projectData";
import imgStudioLogo from "../../../../assets/lockup5.png";

/* ───────────────────────────────────────────────────────────────────
   MOBILE EXPERIENCE — a bespoke, Apple-style vertical story.

   Instead of the desktop conveyor, mobile gets a deliberate, scroll-driven
   editorial sequence: one project per "moment", each a tall full-bleed
   image whose colour-tinted info panel rises and settles into place as it
   enters the viewport. Everything is finger-controlled — no auto-motion —
   which reads as calm and intentional on a phone.

   Premium details:
   - Header (logo + menu) and Hero (heading + subheading) share one seamless
     background and scroll away normally with the page — no sticky/fixed
     positioning, matching the About and Contact pages.
   - Each project image does a slow, subtle scale "settle" on reveal (Ken-Burns
     restraint — no loud parallax).
   - Info panel: project colour + the shared grain texture, sliding up with a
     soft expo settle; title, subheading and index reveal in a tight stagger.
   - A thin progress rail on the right shows position through the collection.
   - Full reduced-motion support: everything resolves to its final state.
─────────────────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

// ─── Landing page mobile navbar + drawer ──────────────────────────────────────
// Exact same structure & animations as MobileProjectNav in ProjectPage.tsx.
// Colors match the landing page palette (#dad0ad bg, #553500 text/strokes).
const LANDING_BG    = "#dad0ad";
const LANDING_FG    = "#553500";
const LANDING_FG_MID = "rgba(85,53,0,0.5)";

const navLinks = [
  { label: "Home",      to: "/home" },
  { label: "About",     to: "/about" },
  { label: "Projects",  to: "/projects" },
  { label: "Journal",   to: "/journal" },
  { label: "Moodboard", to: "/" },
  { label: "Contact",   to: "/contact" },
];

function MobileLandingNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function isActive(label: string) {
    if (label === "Home")      return pathname === "/home";
    if (label === "Projects")  return pathname.startsWith("/projects");
    if (label === "About")     return pathname === "/about";
    if (label === "Journal")   return pathname.startsWith("/journal");
    if (label === "Moodboard") return pathname === "/";
    return false;
  }

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      {/* ── Top bar — scrolls normally with the page (no sticky/fixed
            positioning, no divider); background + texture now live on the
            shared Header+Hero wrapper so the two read as one section ──── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
        }}
      >
        {/* Studio logo → navigates home */}
        <div
          style={{ height: 38, width: 84, position: "relative", cursor: "pointer", flexShrink: 0 }}
          onClick={() => navigate("/home")}
        >
          <img
            src={imgStudioLogo}
            alt="Studio Inside Eye"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}
          />
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          style={{
            width: 36, height: 36,
            borderRadius: "50%",
            background: "rgba(85,53,0,0.08)",
            border: `1.5px solid ${LANDING_FG_MID}`,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="16" height="12" viewBox="0 0 18 14" fill="none">
            <line x1="0" y1="1"  x2="18" y2="1"  stroke={LANDING_FG} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="7"  x2="18" y2="7"  stroke={LANDING_FG} strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="13" x2="18" y2="13" stroke={LANDING_FG} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* ── Full-screen drawer ───────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          pointerEvents: drawerOpen ? "all" : "none",
          overflow: "hidden",
          opacity: drawerOpen ? 1 : 0,
          transition: drawerOpen ? "opacity 0s 0s" : "opacity 0.35s ease 0s",
        }}
      >
        {/* 4-column scaleY wipe — same as Navbar.tsx */}
        {[
          { delay: 0,   duration: 0.65 },
          { delay: 0.1, duration: 0.65 },
          { delay: 0.2, duration: 0.65 },
          { delay: 0.3, duration: 0.65 },
        ].map((col, i) => (
          <div
            key={i}
            style={{
              position: "absolute", top: 0, bottom: 0,
              left: `${i * 25}%`,
              width: i < 3 ? "calc(25% + 1px)" : "25%",
              background: LANDING_BG,
              transform: drawerOpen ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "bottom",
              transition: drawerOpen
                ? `transform ${col.duration}s cubic-bezier(0.76,0,0.24,1) ${col.delay}s`
                : "none",
              overflow: "hidden",
            }}
          />
        ))}

        {/* Texture — two multiply layers (same as desktop banner) */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, zIndex: 2,
            backgroundImage: `url("${bannerTexture}")`,
            backgroundSize: "cover", backgroundPosition: "center",
            mixBlendMode: "multiply",
            opacity: drawerOpen ? 0.3 : 0,
            pointerEvents: "none",
            transition: drawerOpen ? "opacity 0.3s ease 0.65s" : "opacity 0.2s ease 0s",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, zIndex: 3,
            backgroundImage: `url("${bannerTexture}")`,
            backgroundSize: "cover", backgroundPosition: "center",
            mixBlendMode: "multiply",
            opacity: drawerOpen ? 0.7 : 0,
            pointerEvents: "none",
            transition: drawerOpen ? "opacity 0.3s ease 0.65s" : "opacity 0.2s ease 0s",
          }}
        />

        {/* Close (×) button */}
        <button
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
          style={{
            position: "absolute", top: 24, left: 24, zIndex: 10,
            background: "transparent", border: "none", cursor: "pointer",
            padding: 10, display: "flex", alignItems: "center", justifyContent: "center",
            opacity: drawerOpen ? 1 : 0,
            transition: drawerOpen ? "opacity 0.3s ease 0.85s" : "none",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <line x1="3" y1="3" x2="17" y2="17" stroke={LANDING_FG} strokeWidth="1.6" strokeLinecap="round" />
            <line x1="17" y1="3" x2="3"  y2="17" stroke={LANDING_FG} strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        {/* Nav links */}
        <nav
          style={{
            position: "relative", zIndex: 5,
            display: "flex", flexDirection: "column",
            padding: "84px 32px 0", gap: 0,
          }}
        >
          {navLinks.map((item, index) => (
            <a
              key={item.label}
              href={item.to}
              onClick={(e) => { e.preventDefault(); setDrawerOpen(false); navigate(item.to); }}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 22, fontWeight: 400, lineHeight: 1.4,
                color: LANDING_FG,
                textDecoration: isActive(item.label) ? "underline" : "none",
                textDecorationColor: LANDING_FG,
                textUnderlineOffset: "4px",
                padding: "14px 0",
                borderBottom: index < navLinks.length - 1 ? `1px solid ${LANDING_FG}` : "none",
                opacity: drawerOpen ? 1 : 0,
                transform: drawerOpen ? "translateY(0)" : "translateY(24px)",
                transition: drawerOpen
                  ? `opacity 0.45s ease ${0.85 + index * 0.07}s, transform 0.45s ease ${0.85 + index * 0.07}s`
                  : "none",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Bottom studio logo */}
        <div
          style={{
            position: "absolute", bottom: 25, left: 0, right: 0, zIndex: 5,
            display: "flex", justifyContent: "center", padding: "0 32px",
            opacity: drawerOpen ? 1 : 0,
            transform: drawerOpen ? "scale(1)" : "scale(0.92)",
            transition: drawerOpen
              ? `opacity 1.4s ease ${0.85 + navLinks.length * 0.07}s`
              : "none",
          }}
        >
          <img
            src={imgStudioLogo}
            alt="Studio Inside Eye"
            style={{ width: "auto", maxWidth: 300, height: "auto", objectFit: "contain" }}
          />
        </div>
      </div>
    </>
  );
}

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
        height: "65svh",
        marginBottom: "3svh",
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
            mixBlendMode: "multiply",
            opacity: 0.3,
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
            mixBlendMode: "multiply",
            opacity: 0.7,
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
            opacity: 1,
            mixBlendMode: "normal",
          }}
        />
      </div>
    </section>
  );
}

export function SelectedWorksMobile() {
  const headerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Progress rail, now driven by normal page scroll — Header & Hero are no
  // longer pinned/sticky, so the only thing left to track is overall scroll
  // position through the page (the rail itself stays viewport-anchored via
  // position: fixed, same as before, it just no longer reads from an
  // internal scroll container).
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        rail.style.transform = `scaleY(${p})`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
        backgroundColor: "#dad0ad",
      }}
    >
      {/* ── Header + Hero — one seamless section, no divider, no sticky/
            fixed positioning. Both the navbar and the heading/subheading
            scroll away normally with the rest of the page, just like the
            About and Contact pages. ─────────────────────────────────── */}
      <div ref={headerRef} style={{ position: "relative", backgroundColor: "#dad0ad" }}>
        {/* one shared texture layer across the whole Header+Hero block so
            there's no visible seam between the two */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${bannerTexture}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "multiply",
            opacity: 0.08,
            pointerEvents: "none",
          }}
        />

        {/* Header — logo + menu button */}
        <MobileLandingNav />

        {/* Hero — heading + subheading */}
        <div style={{ position: "relative", padding: "15px 20px 0px" }}>
          <p
            data-intro
            style={{
              margin: 0,
              color: "#553500",
              fontFamily: "'Instrument Serif', serif",
              fontSize: 34,
              lineHeight: 0.95,
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
      </div>

      {/* ── Project list — normal page flow ─────────────────────────────── */}
      <div style={{ position: "relative", padding: "24px 16px 40px" }}>

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

        {SLOTS.map((slot, i) => (
          <MobileProject key={i} slot={slot} index={i} total={SLOTS.length} />
        ))}

        {/* closing footer line */}
        <div
          style={{
            position: "relative",
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

      {/* thin progress rail on the right — viewport-anchored, tracks page scroll */}
      <div
        aria-hidden
        style={{
          position: "fixed",
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
    </div>
  );
}