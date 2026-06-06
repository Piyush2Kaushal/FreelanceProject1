import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import imgLogo from "../../../assets/abca832675d93471023a757571b4ecb5a568e002.png";
import imgTexture from "../../../assets/texture.png";

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

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(68, 43, 0, 0.35)",
          zIndex: 9998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "opacity 0.3s ease",
          backdropFilter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(280px, 80vw)",
          background: "#D7C9AB",
          zIndex: 9999,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(68,43,0,0.22)",
          borderLeft: "1.5px solid #7B4A1E",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${imgTexture})`,
            backgroundSize: "cover",
            mixBlendMode: "screen",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="3" y1="3" x2="17" y2="17" stroke="#442b00" strokeWidth="2" strokeLinecap="round" />
            <line x1="17" y1="3" x2="3" y2="17" stroke="#442b00" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <nav
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "72px 32px 32px",
            gap: 0,
          }}
        >
          {navItems.map((item, index) => (
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
                fontSize: index === 0 ? 11 : 22,
                fontWeight: index === 0 ? 600 : 400,
                lineHeight: 1.2,
                letterSpacing: index === 0 ? "0.12em" : "-0.01em",
                color: "#442b00",
                textDecoration: item.label === activePage ? "underline" : "none",
                textDecorationColor: "#442b00",
                textUnderlineOffset: "3px",
                padding: "12px 0",
                borderBottom: index < navItems.length - 1 ? "1px solid rgba(68,43,0,0.15)" : "none",
                opacity: index === 0 ? 0.6 : 1,
                transition: "opacity 0.18s",
              }}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              onClose();
              navigate("/contact");
            }}
            style={{
              marginTop: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 48,
              borderRadius: 4,
              background: "#703000",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "white",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.18s",
            }}
          >
            Contact
          </button>
        </nav>
      </div>
    </>
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
        <img
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