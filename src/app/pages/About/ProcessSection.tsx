import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import imgTexture from "../../../assets/f0cedf09760f97dc4e595fe82650e46b83a6e013.jpg";

// ─────────────────────────────────────────────────────────────────────────────
// useCardStripReveal — reveals the Process cards ONCE, on VERTICAL scroll-in.
//
// WHY THIS IS SEPARATE FROM useReveal
//   The cards live inside a horizontally-scrolling strip. The shared useReveal
//   engine checks each element's on-screen box against the VERTICAL window
//   scroll, so cards parked off to the right (outside the viewport horizontally)
//   never trigger — they'd stay hidden until you scrolled the strip sideways.
//   That produced the "only first 3 cards appear, rest are empty" bug.
//
//   This hook instead watches the STRIP WRAPPER with an IntersectionObserver.
//   The moment the strip scrolls into view vertically, EVERY card animates in
//   together (staggered) — regardless of its horizontal position. After that the
//   cards are permanently visible, so sideways scrolling just shows them; no
//   card is ever hidden behind a horizontal-scroll trigger again.
//
// THE MOTION (deliberately different from the clip-wipe "zoom")
//   A soft, premium rise + fade with a whisper of scale-settle (y:40 → 0,
//   scale .955 → 1, opacity 0 → 1), eased on power3.out and staggered left→right.
//   Layout-safe: only opacity + transform animate, every card settles to
//   identity, so the resting layout is pixel-identical.
// ─────────────────────────────────────────────────────────────────────────────
function useCardStripReveal(stripRef: React.RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const strip = stripRef.current;
    if (!strip || typeof window === "undefined") return;

    const cards = Array.from(
      strip.querySelectorAll<HTMLElement>("[data-process-card]")
    );
    if (!cards.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // leave cards in their natural, fully-visible state

    const ctx = gsap.context(() => {
      gsap.set(cards, {
        opacity: 0,
        y: 40,
        scale: 0.955,
        transformOrigin: "50% 60%",
        willChange: "opacity, transform",
      });

      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.15,
          ease: "power3.out",
          stagger: 0.12, // left → right cascade
          onComplete: () => gsap.set(cards, { willChange: "auto" }),
        });
      };

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              play();
              io.disconnect();
            }
          });
        },
        // fire once the strip is ~12% into view from the bottom
        { rootMargin: "0px 0px -12% 0px", threshold: 0.01 }
      );
      io.observe(strip);

      // Safety: if it's already on-screen at mount, reveal on next frame.
      requestAnimationFrame(() => {
        const r = strip.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) play();
      });
    }, strip);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

import imgCardBg01 from "figma:asset/imgCardBg01.webp";
import imgCardBg02 from "figma:asset/imgCardBg02.webp";
import imgCardBg03 from "figma:asset/imgCardBg03.webp";
import imgCardBg04 from "figma:asset/imgCardBg04.webp";
import imgCardBg05 from "figma:asset/imgCardBg05.webp";
import imgCardBg06 from "figma:asset/imgCardBg06.webp";

interface ProcessStep {
  number: string;
  title: React.ReactNode;
  description: string;
  numberColor: string;
  textColor: string;
  bgImage: string;
  overlayColor: string;
  bgColor: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "Every project begins with a conversation. We start with a complimentary Zoom consultation to understand your vision, lifestyle, needs, project goals, and overall scope. This helps us align on the right direction for your space and ensures we're the right fit to work together.",
    numberColor: "#dcd1b1",
    textColor: "#dcd1b1",
    bgImage: imgCardBg01,
    overlayColor: "#3F3004CC",
    bgColor: "#C4C4C4",
  },
  {
    number: "02",
    title: "Onboarding",
    description:
      "Once we move forward, we guide you through a seamless onboarding experience with detailed questionnaires, timelines, and a clear understanding of the design journey ahead.",
    numberColor: "#d7c195",
    textColor: "#ffe9bd",
    bgImage: imgCardBg05,
    overlayColor: "#703000",
    bgColor: "white",
  },
  {
    number: "03",
    title: "Design Phase",
    description:
      "This is where ideas begin to take shape. Through mood boards, material palettes, layouts, renderings, and thoughtful design presentations, we develop a space that feels rooted in your lifestyle and aesthetic. Once finalized, we prepare all technical drawings and documentation for execution.",
    numberColor: "#dcd1b1",
    textColor: "#dcd1b1",
    bgImage: imgCardBg06,
    overlayColor: "#521E1F",
    bgColor: "white",
  },
  {
    number: "04",
    title: "Project Management",
    description:
      "During construction, we remain actively involved through site visits, coordination, and collaboration with contractors and vendors to ensure the design is executed thoughtfully and accurately.",
    numberColor: "#dcd1b1",
    textColor: "#dcd1b1",
    bgImage: imgCardBg04,
    overlayColor: "#46521E",
    bgColor: "white",
  },
  {
    number: "05",
    title: (
      <>
        Sourcing &amp;
        <br />
        Procurement
      </>
    ),
    description:
      "We carefully source and procure selected materials, furnishings, lighting, and finishes — managing orders and deliveries to create a smooth and organized process.",
    numberColor: "#dcd1b1",
    textColor: "#dcd1b1",
    bgImage: imgCardBg03,
    overlayColor: "#1E4752",
    bgColor: "white",
  },
  {
    number: "06",
    title: <>Installation &amp; Styling</>,
    description:
      "The final layer brings the home together. Through furniture installation, styling, and finishing touches, the space transforms into a complete home that feels warm, intentional, and truly yours.",
    numberColor: "#dcd1b1",
    textColor: "#dcd1b1",
    bgImage: imgCardBg02,
    overlayColor: "#CAB76800",
    bgColor: "#2a2418",
  },
];

/* ── Desktop card ── */
function ProcessCardDesktop({ step }: { step: ProcessStep }) {
  return (
    <div
      data-process-card
      className="relative flex-shrink-0 overflow-hidden rounded-[24px]"
      style={{ width: "460px", height: "580px", backgroundColor: step.bgColor }}
    >
      <img
        decoding="async"
        src={step.bgImage}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.22 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: step.overlayColor, mixBlendMode: "multiply" }}
      />
      <div className="absolute h-px left-0 right-0" style={{ top: "24px", backgroundColor: "#DCD1B1", opacity: step.number === "01" ? 0.5 : 0.3 }} />
      <div className="absolute h-px left-0 right-0" style={{ top: "556px", backgroundColor: "#DCD1B1", opacity: step.number === "01" ? 0.5 : 0.3 }} />
      <div className="absolute w-px top-0 bottom-0" style={{ left: step.number === "01" ? "24px" : "20px", backgroundColor: "#DCD1B1", opacity: step.number === "01" ? 0.5 : 0.3 }} />
      <div className="absolute w-px top-0 bottom-0" style={{ left: "436px", backgroundColor: "#DCD1B1", opacity: step.number === "01" ? 0.5 : 0.3 }} />

      <p className="absolute" style={{ left: "32px", top: "34px", fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "66px", fontWeight: 400, color: step.numberColor, lineHeight: 1 }}>
        {step.number}
      </p>
      <div className="absolute" style={{ left: "32px", top: "118px", fontFamily: "'Instrument Serif', serif", fontSize: "50px", fontWeight: 400, color: step.textColor, lineHeight: 1, width: "400px" }}>
        {step.title}
      </div>
      <p className="absolute" style={{ left: "32px", bottom: "48px", fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "19px", fontWeight: 400, color: step.textColor, lineHeight: 1.4, width: "390px" }}>
        {step.description}
      </p>
    </div>
  );
}

/* ── Mobile card ── */
function ProcessCardMobile({ step }: { step: ProcessStep }) {
  return (
    <div
      data-process-card
      className="relative overflow-hidden rounded-[16px] flex-shrink-0"
      style={{
        backgroundColor: step.bgColor,
        width: "75vw",
        maxWidth: "300px",
        minHeight: "420px",
        scrollSnapAlign: "start",
      }}
    >
      <img
        decoding="async"
        src={step.bgImage}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.22 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: step.overlayColor, mixBlendMode: "multiply" }}
      />
      <div className="absolute h-px left-0 right-0" style={{ top: "16px", backgroundColor: "#DCD1B1", opacity: 0.3 }} />
      <div className="absolute w-px top-0 bottom-0" style={{ left: "16px", backgroundColor: "#DCD1B1", opacity: 0.3 }} />

      <div className="relative px-6 pt-8 flex flex-col h-full">
        <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "48px", fontWeight: 400, color: step.numberColor, lineHeight: 1, marginBottom: "10px" }}>
          {step.number}
        </p>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: "30px", fontWeight: 400, color: step.textColor, lineHeight: 1.1, marginBottom: "14px" }}>
          {step.title}
        </div>
        <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "14px", fontWeight: 400, color: step.textColor, lineHeight: 1.6, paddingBottom: "24px" }}
  className="mt-auto"
>
  {step.description}
</p>
      
      </div>
    </div>
  );
}

export function ProcessSection() {
  // Strip refs — each card-row is watched independently so the cards reveal on
  // vertical scroll-in (not tied to horizontal scrolling). Only the visible
  // breakpoint's strip is in the DOM, so the other ref simply stays null.
  const desktopStripRef = useRef<HTMLDivElement>(null);
  const mobileStripRef = useRef<HTMLDivElement>(null);
  useCardStripReveal(desktopStripRef);
  useCardStripReveal(mobileStripRef);

  return (
    <div className="relative overflow-hidden w-full" style={{ backgroundColor: "#5d2834" }}>
  {/* Texture layer 1 - multiply 0.6 */}
<div
  aria-hidden
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imgTexture}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    mixBlendMode: "multiply",
    opacity: 0.6,
    pointerEvents: "none",
  }}
/>
{/* Texture layer 2 - multiply 0.6 */}
<div
  aria-hidden
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imgTexture}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    mixBlendMode: "multiply",
    opacity: 0.7,
    pointerEvents: "none",
  }}
/>
      {/* ── DESKTOP LAYOUT (lg+) ── */}
      <div className="hidden lg:block relative" style={{ height: "850px" }}>
        <div
          className="absolute flex items-center justify-between"
          style={{ left: "33px", top: "71px", width: "calc(100% - 66px)" }}
        >
          <p data-anim="reveal" data-anim-variant="text" style={{ fontFamily: "'Instrument Serif', serif", fontSize: "64px", fontWeight: 400, color: "#dcd1b1", lineHeight: 1.49, whiteSpace: "nowrap" }}>
            Our Process
          </p>
          <p data-anim="reveal" data-anim-variant="text" data-anim-blur="6" data-anim-delay="0.12" style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "22px", fontWeight: 400, color: "#dcd1b1", lineHeight: 1.2, width: "519px", textAlign: "right" }}>
            A structured approach that balances{" "}
            <strong style={{ fontWeight: 700 }}>creativity, clarity, and execution.</strong>
          </p>
        </div>

        <div
          className="absolute left-0 right-0 overflow-x-auto"
          style={{ top: "252px", paddingLeft: "33px", paddingRight: "33px", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`.process-scroll::-webkit-scrollbar { display: none; }`}</style>
          <div ref={desktopStripRef} className="process-scroll flex gap-7 items-center" style={{ width: "max-content" }}>
            {steps.map((step) => (
              <ProcessCardDesktop key={step.number} step={step} />
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT (< lg) ── */}
      <div className="block lg:hidden relative">
        <div className="px-5 sm:px-8 pt-10 sm:pt-12 pb-6">
          <p
            data-anim="reveal"
            data-anim-variant="text"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(36px, 8vw, 52px)",
              fontWeight: 400,
              color: "#dcd1b1",
              lineHeight: 1.2,
              marginBottom: "12px",
            }}
          >
            Our Process
          </p>
          <p
            data-anim="reveal"
            data-anim-variant="text"
            data-anim-blur="6"
            data-anim-delay="0.1"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "clamp(14px, 3.5vw, 18px)",
              fontWeight: 400,
              color: "#dcd1b1",
              lineHeight: 1.5,
            }}
          >
            A structured approach that balances{" "}
            <strong style={{ fontWeight: 700 }}>creativity, clarity, and execution.</strong>
          </p>
        </div>

        {/* Horizontal scroll */}
        <div
          style={{
            paddingLeft: "20px",
            marginLeft:"20px",
            paddingBottom: "20px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
            scrollbarWidth: "none" as React.CSSProperties["scrollbarWidth"],
            msOverflowStyle: "none",
          }}
        >
          <style>{`.mobile-process-scroll::-webkit-scrollbar { display: none; }`}</style>
          <div
            ref={mobileStripRef}
            className="mobile-process-scroll flex gap-4"
            style={{ width: "max-content", paddingRight: "20px" }}
          >
            {steps.map((step) => (
              <ProcessCardMobile key={step.number} step={step} />
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
}