import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useSelection } from "../../app/context/SelectionContext";
import imgPrimaryLogos from "../../assets/abca832675d93471023a757571b4ecb5a568e002.png";
import FooterNav from "../../app/components/layout/FooterNav";
import Navbar from "../../app/components/layout/Navbar";
import MobileBottomBar from "../../app/components/layout/MobileBottomBar";

function Logo() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")} style={{ cursor: "pointer" }} className="logo-fixed fixed h-[49px] left-[15px] top-[36px] w-[98px] z-[100]">
      <img alt="Studio Inside Eye" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPrimaryLogos} />
    </div>
  );
}

// ─── Shared layout used by all 6 detail pages ─────────────────────────────────
interface MoodboardDetailPageProps {
  imageSrc: string;
  imageAlt?: string;
}

export default function MoodboardDetailPage({ imageSrc, imageAlt = "Moodboard" }: MoodboardDetailPageProps) {
  const navigate = useNavigate();
  const { resetSelection, markNavigated } = useSelection();
  const contentRef = useRef<HTMLDivElement>(null);

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
    const el = contentRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 24 });
    gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.36 });
  }, []);

  const handleBack = () => {
    resetSelection();
    navigate(-1);
  };

  return (
    <>
      {/* Background */}
      <div style={{ position: "fixed", inset: 0, backgroundColor: "rgb(245, 245, 220)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", zIndex: 0 }}>
        <img
          src={imageSrc}
          alt={imageAlt}
          draggable={false}
          style={{
            maxWidth: "min(480px, 62vw)",
            maxHeight: "min(520px, 62vh)",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            borderRadius: 8,
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
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