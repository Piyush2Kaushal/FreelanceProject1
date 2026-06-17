import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import imgTexture from "../../../assets/texture.webp";
import imgLogo from "../../../assets/lockup5.png";
import imgTexture2 from "../../../assets/f0cedf09760f97dc4e595fe82650e46b83a6e013.jpg";

const navItems = ["MENU", "Home", "Projects", "About", "Journal"] as const;

const NAV_ROUTES: Record<string, string> = {
  Home:     "/home",
  Projects: "/projects/project-1",
  About:    "/about",
  Journal:  "/journal",
  Contact:  "/contact",
};

function isActive(item: string, pathname: string): boolean {
  if (item === "Home")     return pathname === "/home";
  if (item === "Projects") return pathname.startsWith("/projects");
  if (item === "About")    return pathname === "/about";
  if (item === "Journal")  return pathname.startsWith("/journal");
  return false;
}

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

  const visibleItems = [...navItems.filter((item) => item !== "MENU"), "Contact"] as const;

  const columns = [
    { delay: 0,    duration: 0.65 },
    { delay: 0.1,  duration: 0.65 },
    { delay: 0.2,  duration: 0.65 },
    { delay: 0.3,  duration: 0.65 },
  ];

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
            background: "#D7C9AB",
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
<div
  aria-hidden
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imgTexture2}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    mixBlendMode: "multiply",
    opacity: isOpen ? 0.4 : 0,
    pointerEvents: "none",
    transition: isOpen ? "opacity 0.3s ease 0.65s" : "opacity 0.2s ease 0s",
    zIndex: 2,
  }}
/>
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
          <line x1="3" y1="3" x2="17" y2="17" stroke="#442b00" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="17" y1="3" x2="3" y2="17" stroke="#442b00" strokeWidth="1.6" strokeLinecap="round" />
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
        {visibleItems.map((item, index) => {
          const route = NAV_ROUTES[item];
          return (
            <a
              key={item}
              href={route ?? "#"}
              onClick={
                route
                  ? (e) => { e.preventDefault(); onClose(); navigate(route); }
                  : onClose
              }
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: 22,
                fontWeight: 400,
                lineHeight: 1.4,
                letterSpacing: "0",
                color: "#442b00",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: index < visibleItems.length - 1 ? "1px solid #442b00" : "none",
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(24px)",
                transition: isOpen
                  ? `opacity 0.45s ease ${0.85 + index * 0.07}s, transform 0.45s ease ${0.85 + index * 0.07}s`
                  : "none",
              }}
            >
              {item}
            </a>
          );
        })}
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
  ? `opacity 1.4s ease ${0.85 + visibleItems.length * 0.07}s`
  : "none",
  }}
>
        <img
          src={imgLogo}
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

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/contact");
  };

  return (
    <>
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
            {navItems.map((item, index) => {
              const route = NAV_ROUTES[item];
              const active = isActive(item, pathname);
              return (
                <li key={item} className="flex items-center gap-4">
                  {index === 1 && (
                    <span className="h-8 w-px shrink-0 bg-[#442b00]" aria-hidden />
                  )}
                  <a
                    href={route ?? "#"}
                    onClick={
                      route
                        ? (e) => { e.preventDefault(); navigate(route); }
                        : undefined
                    }
                    className="whitespace-nowrap transition-opacity hover:opacity-80"
                    style={{
                      fontSize: 14,
                      fontWeight: 450,
                      lineHeight: 1.21,
                      letterSpacing: "0em",
                      color: "#442b00",
                      textDecoration: active ? "underline" : "none",
                      textDecorationColor: "#442b00",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href="/contact"
            onClick={handleContactClick}
            className="absolute right-5 top-[14px] flex h-[35px] items-center justify-center rounded-[4px] bg-[#703000] px-5 text-[16px] font-medium leading-[1.21] tracking-[-0.01em] text-white transition-opacity hover:opacity-90 no-underline whitespace-nowrap"
          >
            Contact
          </a>
        </div>
      </nav>

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

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}