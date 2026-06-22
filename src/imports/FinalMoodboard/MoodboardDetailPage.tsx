import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSelection } from "../../app/context/SelectionContext";
import imgPrimaryLogos from "../../assets/b00689a4e710d92b1f3dbd433c68cba70f10fc2e.webp";
import FooterNav from "../../app/components/layout/FooterNav";
import Navbar from "../../app/components/layout/Navbar";
import MobileBottomBar from "../../app/components/layout/MobileBottomBar";

import imgRedScandinavian from "../../assets/Img6.webp";
import imgRedTransitional from "../../assets/Img4.webp";
import imgRedMidcentury from "../../assets/Img2.webp";
import imgBeigeScandinavian from "../../assets/Img5.webp";
import imgBeigeTransitional from "../../assets/Img3.webp";
import imgBeigeMidcentury from "../../assets/Img1.webp";

// ─── Single source of truth: route params → moodboard image ──────────────────
// Keyed by the exact :color/:style URL params so all 6 combinations are
// served by ONE route + ONE mounted component instead of 6 separate
// lazy-loaded pages. That's what lets the chrome (navbar, footer, logo)
// stay mounted across "Generate" clicks — only the image itself swaps.
const MOODBOARD_IMAGES: Record<string, { src: string; alt: string }> = {
  "red/scandinavian":   { src: imgRedScandinavian,   alt: "Red Scandinavian Moodboard" },
  "red/transitional":   { src: imgRedTransitional,   alt: "Red Transitional Moodboard" },
  "red/midcentury":     { src: imgRedMidcentury,     alt: "Red Mid Century Moodboard" },
  "beige/scandinavian": { src: imgBeigeScandinavian, alt: "Beige Scandinavian Moodboard" },
  "beige/transitional": { src: imgBeigeTransitional, alt: "Beige Transitional Moodboard" },
  "beige/midcentury":   { src: imgBeigeMidcentury,   alt: "Beige Mid Century Moodboard" },
};

// ─── Premium crossfade ─────────────────────────────────────────────────────
// Restraint is what reads as premium — no blur, no zoom, no movement.
// Just a slow, perfectly synced opacity dissolve: the old image fades out
// exactly as the new one fades in, both eased identically so the midpoint
// blend is smooth rather than "wipe-y". This is the classic crossfade used
// across high-end fashion/architecture portfolios.
const CROSSFADE_DURATION = 1.2;
const CROSSFADE_EASE = "power2.inOut";

function useImageCrossfade(src: string, alt: string) {
  const [layers, setLayers] = useState(() => [{ id: 0, src, alt }]);
  const nextId = useRef(1);
  const prevSrc = useRef(src);
  const nodesRef = useRef<Map<number, HTMLImageElement>>(new Map());

  useEffect(() => {
    if (src === prevSrc.current) return;
    prevSrc.current = src;
    const id = nextId.current++;
    setLayers((prev) => [...prev, { id, src, alt }]);
  }, [src, alt]);

  useEffect(() => {
    if (layers.length < 2) return;
    const incoming = layers[layers.length - 1];
    const outgoing = layers[layers.length - 2];
    const incomingEl = nodesRef.current.get(incoming.id);
    const outgoingEl = nodesRef.current.get(outgoing.id);
    if (!incomingEl) return;

    gsap.killTweensOf(incomingEl);
    if (outgoingEl) gsap.killTweensOf(outgoingEl);

    gsap.set(incomingEl, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Clean up everything beneath the now-settled top layer.
        setLayers((prev) => prev.filter((l) => l.id === incoming.id));
      },
    });

    tl.to(
      incomingEl,
      { opacity: 1, duration: CROSSFADE_DURATION, ease: CROSSFADE_EASE },
      0
    );

    if (outgoingEl) {
      tl.to(
        outgoingEl,
        { opacity: 0, duration: CROSSFADE_DURATION, ease: CROSSFADE_EASE },
        0
      );
    }

    return () => {
      tl.kill();
    };
  }, [layers]);

  const registerNode = (id: number, el: HTMLImageElement | null) => {
    if (el) nodesRef.current.set(id, el);
    else nodesRef.current.delete(id);
  };

  return { layers, registerNode };
}

function Logo() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")} style={{ cursor: "pointer" }} className="logo-fixed fixed h-[49px] left-[15px] top-[36px] w-[98px] z-[100]">
      <img decoding="async" alt="Studio Inside Eye" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPrimaryLogos} />
    </div>
  );
}

export default function MoodboardDetailPage() {
  const navigate = useNavigate();
  const { color = "", style = "" } = useParams<{ color: string; style: string }>();
  const { resetSelection, markNavigated } = useSelection();
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const paramKey = `${color}/${style}`;
  const current = MOODBOARD_IMAGES[paramKey] ?? MOODBOARD_IMAGES["red/scandinavian"];
  const { layers, registerNode } = useImageCrossfade(current.src, current.alt);

  useEffect(() => {
    // Hide Continue button on page 2 — page 1 button stays visible during transition
    markNavigated();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    const background = backgroundRef.current;
    if (!content || !background) return;
    // Fade in from FinalMoodboard — pure opacity dissolve matching the premium
    // crossfade used when switching between detail pages (no slide, no blur).
    gsap.set([content, background], { opacity: 0 });
    gsap.to([content, background], {
      opacity: 1,
      duration: CROSSFADE_DURATION,
      ease: CROSSFADE_EASE,
    });
    // Runs once — this component stays mounted for every "Generate" click
    // within the detail view, so the entry animation never replays.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    resetSelection();
    navigate(-1);
  };

  return (
    <>
      {/* Background */}
      <div ref={backgroundRef} style={{ position: "fixed", inset: 0, backgroundColor: "rgb(245, 245, 220)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", zIndex: 0 }}>
        <div
          style={{
            position: "relative",
            maxWidth: "min(480px, 62vw)",
            maxHeight: "min(520px, 62vh)",
            width: "min(480px, 62vw)",
            height: "min(520px, 62vh)",
          }}
        >
          {layers.map((layer) => (
            <img
              key={layer.id}
              ref={(el) => registerNode(layer.id, el)}
              decoding="async"
              src={layer.src}
              alt={layer.alt}
              draggable={false}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 8,
                userSelect: "none",
                pointerEvents: "none",
                willChange: "opacity",
              }}
            />
          ))}
        </div>
      </div>

      {/* UI overlay */}
      <div ref={contentRef} style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
        <div style={{ pointerEvents: "auto" }}>
          <Logo />

          <button
            onClick={handleBack}
            aria-label="Go back"
            className="detail-back-btn"
            style={{
              position: "fixed",
              top: 96,
              left: 15,
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontSize: 14,
              color: "#7B4A1E",
              fontFamily: "inherit",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            <svg width={16} height={10} viewBox="0 0 16 10" fill="none" style={{ flexShrink: 0 }}>
              <path d="M15 5H1M1 5L5 1M1 5L5 9" stroke="#7B4A1E" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Go back
          </button>

          <Navbar />
          <FooterNav />
          <MobileBottomBar />
        </div>
      </div>
    </>
  );
}