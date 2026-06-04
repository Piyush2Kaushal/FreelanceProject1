import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imgTexture from "../../../assets/texture.png";

const navItems = ["MENU", "Home", "Projects", "About", "Journal"] as const;

// ─── Mobile Side Drawer ───────────────────────────────────────────────────────
function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleContactClick = () => {
    onClose();
    navigate("/contact");
  };

  return (
    <>
      {/* Backdrop */}
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

      {/* Drawer panel */}
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
        {/* Texture overlay */}
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

        {/* Close button */}
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

        {/* Nav links */}
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
              key={item}
              href={item === "Journal" ? "/journal" : item === "About" ? "/about" : item === "Home" ? "/home" : item === "Projects" ? "/projects/project-1" : "#"}
              onClick={
                item === "Journal"
                  ? (e) => { e.preventDefault(); onClose(); navigate("/journal"); }
                  : item === "About"
                  ? (e) => { e.preventDefault(); onClose(); navigate("/about"); }
                  : item === "Home"
                  ? (e) => { e.preventDefault(); onClose(); navigate("/home"); }
                  : item === "Projects"
                  ? (e) => { e.preventDefault(); onClose(); navigate("/projects/project-1"); }
                  : onClose
              }
              style={{
                fontSize: index === 0 ? 11 : 22,
                fontWeight: index === 0 ? 600 : 400,
                lineHeight: 1.2,
                letterSpacing: index === 0 ? "0.12em" : "-0.01em",
                color: "#442b00",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: index < navItems.length - 1 ? "1px solid rgba(68,43,0,0.15)" : "none",
                opacity: index === 0 ? 0.6 : 1,
                transition: "opacity 0.18s",
              }}
            >
              {item}
            </a>
          ))}

          {/* Contact CTA in drawer */}
          <button
            onClick={handleContactClick}
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

/**
 * Navbar — responsive navigation bar.
 * Desktop: fixed top-centre octagon-clipped panel (unchanged from original).
 * Mobile: compact bar with hamburger button + side drawer.
 */
export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/contact");
  };

  return (
    <>
      {/* ── DESKTOP navbar (≥768px) — exactly as original ──────────────────── */}
      <nav
        className="navbar-desktop -translate-x-1/2 fixed h-[63px] left-[calc(50%+3.5px)] top-[27px] w-[470px] z-[100]"
        aria-label="Main navigation"
      >
        <svg
          aria-hidden
          focusable="false"
          className="pointer-events-none absolute select-none left-0 top-0"
          width="470"
          height="63"
          viewBox="0 0 470 63"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="navClip">
              <path d="M 12,1 L 458,1 L 469,12 L 469,51 L 458,62 L 12,62 L 1,51 L 1,12 Z" />
            </clipPath>
          </defs>
          <path
            d="M 12,1 L 458,1 L 469,12 L 469,51 L 458,62 L 12,62 L 1,51 L 1,12 Z"
            fill="#D7C9AB"
            stroke="#7B4A1E"
            strokeWidth="2"
          />
          <image
            href={imgTexture}
            x="0"
            y="0"
            width="470"
            height="63"
            clipPath="url(#navClip)"
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
              <li key={item} className="flex items-center gap-4">
                {index === 1 && (
                  <span className="h-8 w-px shrink-0 bg-[#442b00]" aria-hidden />
                )}
                <a
                  href={item === "Journal" ? "/journal" : item === "About" ? "/about" : item === "Home" ? "/home" : item === "Projects" ? "/projects/project-1" : "#"}
                  onClick={
                    item === "Journal"
                      ? (e) => { e.preventDefault(); navigate("/journal"); }
                      : item === "About"
                      ? (e) => { e.preventDefault(); navigate("/about"); }
                      : item === "Home"
                      ? (e) => { e.preventDefault(); navigate("/home"); }
                      : item === "Projects"
                      ? (e) => { e.preventDefault(); navigate("/projects/project-1"); }
                      : undefined
                  }
                  className="text-[14px] leading-[1.21] tracking-[0em] text-[#442b00] transition-opacity hover:opacity-80 no-underline whitespace-nowrap" style={{ fontWeight: 450 }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/contact"
            onClick={handleContactClick}
            className="absolute right-5 top-[11px] flex h-[38px] items-center justify-center rounded-[4px] bg-[#703000] px-6 text-[16px] font-medium leading-[1.21] tracking-[-0.01em] text-white transition-opacity hover:opacity-90 no-underline whitespace-nowrap"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* ── MOBILE hamburger button (hidden on desktop) ──────────────────────── */}
      <button
        className="navbar-mobile-btn"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
        style={{
          position: "fixed",
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

      {/* Side Drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
