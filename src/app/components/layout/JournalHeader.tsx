import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import imgLogo from "../../../assets/abca832675d93471023a757571b4ecb5a568e002.webp";
import imgLogoAbout from "../../../assets/Newlogo.png";
import imgTexture from "../../../assets/texture.webp";
import imgDrawerTexture from "../../../assets/f0cedf09760f97dc4e595fe82650e46b83a6e013.jpg";

type ActivePage = "Journal" | "About" | "Home" | "Projects" | "Moodboard";

interface JournalHeaderProps {
  activePage?: ActivePage;
}

const navItems = [
  { label: "MENU", to: null },
  { label: "Home", to: "/home" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects/project-1" },
  { label: "Moodboard", to: "/" },
  { label: "Journal", to: "/journal" },
] as const;


const drawerNavItems = [
  ...navItems,
  { label: "Contact", to: "/contact" },
] as const;
// ─── Mobile Side Drawer ───────────────────────────────────────────────────────
function JournalMobileDrawer({
  isOpen,
  onClose,
  activePage,
}: {
  isOpen: boolean;
  onClose: () => void;
  activePage: ActivePage;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const columns = [
    { delay: 0,    duration: 0.65 },
    { delay: 0.1,  duration: 0.65 },
    { delay: 0.2,  duration: 0.65 },
    { delay: 0.3,  duration: 0.65 },
  ];

  // ── About page gets its own bg, text/underline color, and logo ──────────────
  const isAbout   = activePage === "About";
  const drawerBg  = isAbout ? "#6B2938" : "#D7C9AB";
  const textColor = isAbout ? "#9EB1AB" : "#442b00";
  const drawerLogo = isAbout ? imgLogoAbout : imgLogo;
  const drawerTexture = isAbout ? imgDrawerTexture : imgTexture;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: isOpen ? "all" : "none",
        overflow: "hidden",
        opacity: isOpen ? 1 : 0,
        transition: isOpen ? "opacity 0s 0s" : "opacity 0.35s ease 0s",
      }}
    >
      {columns.map((col, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${i * 25}%`,
            // Each column overlaps the next by 1px to eliminate the gap/line between them
            width: i < columns.length - 1 ? "calc(25% + 1px)" : "25%",
            background: drawerBg,
            transform: isOpen ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "bottom",
            transition: isOpen
            ? `transform ${col.duration}s cubic-bezier(0.76, 0, 0.24, 1) ${col.delay}s`
            : "none",
            overflow: "hidden",
          }}
        >

        </div>
      ))}
      {/* Texture overlay on drawer background */}
     {/* Texture overlay on drawer background */}
{/* Texture overlay on drawer background */}
<div
  aria-hidden
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imgDrawerTexture}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    mixBlendMode: "multiply",
    opacity: isOpen ? 0.4 : 0,
    pointerEvents: "none",
    transition: isOpen ? "opacity 0.3s ease 0.65s" : "opacity 0.2s ease 0s",
    zIndex: 2,
  }}
/>
{/* Second texture layer - only for About page */}
{isAbout && (
  <div
    aria-hidden
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `url("${imgDrawerTexture}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      mixBlendMode: "multiply",
      opacity: isOpen ? 0.7: 0,
      pointerEvents: "none",
      transition: isOpen ? "opacity 0.3s ease 0.65s" : "opacity 0.2s ease 0s",
      zIndex: 3,
    }}
  />
)}
      <button
        onClick={onClose}
        aria-label="Close menu"
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 8,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isOpen ? 1 : 0,
          transition: isOpen ? "opacity 0.3s ease 0.85s" : "none",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <line x1="3" y1="3" x2="17" y2="17" stroke={textColor} strokeWidth="1.6" strokeLinecap="round" />
          <line x1="17" y1="3" x2="3" y2="17" stroke={textColor} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <nav
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          padding: "84px 32px 0",
          gap: 0,
        }}
      >
  {drawerNavItems.map((item, index) => (
          <a
            key={item.label}
            href={item.to ?? "#"}
            onClick={
              item.to
                ? (e) => {
                    e.preventDefault();
                    onClose();
                    navigate(item.to!);
                  }
                : onClose
            }
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: index === 0 ? 16 : 22,
              fontWeight: index === 0 ? 600 : 400,
              lineHeight: 1.4,
              letterSpacing: index === 0 ? "0.12em" : "0",
              color: textColor,
              textDecoration: item.label === activePage ? "underline" : "none",
              textDecorationColor: textColor,
              textUnderlineOffset: "3px",
              textTransform: index === 0 ? "uppercase" : "none",
              opacity: isOpen ? (index === 0 ? 0.6 : 1) : 0,
              padding: "14px 0",
              borderBottom: index < drawerNavItems.length - 1 ? `1px solid ${textColor}` : "none",
              transform: isOpen ? "translateY(0)" : "translateY(24px)",
              transition: isOpen
                ? `opacity 0.45s ease ${0.85 + index * 0.07}s, transform 0.45s ease ${0.85 + index * 0.07}s`
                : "none",
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div
        style={{
          position: "absolute",
          bottom: 25,
          left: 0,
          right: 0,
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          padding: "0 32px",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1)" : "scale(0.92)",
          transition: isOpen
          ? `opacity 1.4s ease ${0.85 + drawerNavItems.length * 0.07}s`
          : "none",
        }}
      >
        <img
          src={drawerLogo}
          alt="Studio Inside Eye"
          style={{
            width: "auto",
            maxWidth: "300px",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}

// ─── Journal Header (Logo + Nav + Contact + Mobile Drawer) ────────────────────
export default function JournalHeader({ activePage = "Journal" }: JournalHeaderProps) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Logo */}
      <div
        className="journal-header-logo absolute left-[33px] top-[30px] z-10 h-[51px] w-[104px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img decoding="async"
          alt="Studio Inside Eye"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={imgLogo}
        />
      </div>

      {/* ── DESKTOP: Octagon-clipped navbar ── */}
      <nav
        className="navbar-desktop absolute h-[63px] z-10"
        style={{
          left: "calc(50% + 3.5px)",
          top: "27px",
          width: "450px",
          transform: "translateX(-50%)",
        }}
        aria-label="Main navigation"
      >
        <svg
          aria-hidden
          focusable="false"
          className="pointer-events-none absolute select-none left-0 top-0"
          width="450"
          height="63"
          viewBox="0 0 470 63"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="journalNavClip">
              <path d="M 12,1 L 458,1 L 469,12 L 469,51 L 458,62 L 12,62 L 1,51 L 1,12 Z" />
            </clipPath>
          </defs>
          <path
            d="M 12,1 L 458,1 L 469,12 L 469,51 L 458,62 L 12,62 L 1,51 L 1,12 Z"
            fill="#D7C9AB"
            stroke="#703000"
            strokeWidth="2"
          />
          <image
            href={imgTexture}
            x="0"
            y="0"
            width="470"
            height="63"
            clipPath="url(#journalNavClip)"
            preserveAspectRatio="xMidYMid slice"
            style={{ mixBlendMode: "screen", opacity: 0.4 }}
          />
          <path
            d="M 12,1 L 458,1 L 469,12 L 469,51 L 458,62 L 12,62 L 1,51 L 1,12 Z"
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
          />
        </svg>

        <div className="relative flex h-full items-center justify-between pl-6 pr-5">
          <ul className="flex items-center gap-4 list-none m-0 p-0">
            {navItems.map((item, index) => (
              <li key={item.label} className="flex items-center gap-4">
                {index === 1 && (
                  <span className="h-8 w-px shrink-0 bg-[#442b00]" aria-hidden />
                )}
                <a
                  href={item.to ?? "#"}
                  onClick={
                    item.to
                      ? (e) => {
                          e.preventDefault();
                          navigate(item.to!);
                        }
                      : undefined
                  }
                  className="no-underline whitespace-nowrap transition-opacity hover:opacity-80"
                  style={{
                    fontSize: 14,
                    fontWeight: index === 0 ? 600 : 450,
                    lineHeight: 1.21,
                    letterSpacing: index === 0 ? "0.08em" : "0em",
                    color: "#442b00",
                    textDecoration: item.label === activePage ? "underline" : "none",
                    textDecorationColor: "#442b00",
                    textUnderlineOffset: "3px",
                    opacity: index === 0 ? 0.75 : 1,
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Contact button — desktop only (hidden on mobile where drawer has it) */}
      <button
        onClick={() => navigate("/contact")}
        className="navbar-desktop absolute right-[33px] top-[37px] z-10 bg-[#703000] h-[41px] rounded-[4px] px-7 text-white font-['Inter',sans-serif] font-medium text-base tracking-[-0.48px] whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer"
      >
        Contact
      </button>

      {/* ── MOBILE: hamburger button ── */}
      <button
        className="navbar-mobile-btn"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
        style={{
          position: "absolute",
          top: 20,
          right: 16,
          zIndex: 200,
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "#D7C9AB",
          border: "1.5px solid #7B4A1E",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(68,43,0,0.18)",
        }}
      >
        <svg width="13" height="10" viewBox="0 0 18 14" fill="none">
          <line x1="0" y1="1" x2="18" y2="1" stroke="#442b00" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="0" y1="7" x2="18" y2="7" stroke="#442b00" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="0" y1="13" x2="18" y2="13" stroke="#442b00" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <JournalMobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activePage={activePage}
      />
    </>
  );
}