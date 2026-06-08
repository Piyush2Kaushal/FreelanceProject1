import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import imgRectangle29 from "../../assets/23497d1b739628a6a7bb08b118680a57cca44246.png";
import imgComponent20 from "../../assets/4e454c35d52b905142f0f45a93315e3a6c51ea01.png";
import imgTexture from "../../assets/texture.png";
import type { ArticleData } from "../../data/articles";

// ─── Nav items ────────────────────────────────────────────────────────────────
const navItems = [
  { label: "MENU", to: null },
  { label: "Home", to: "/home" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects/project-1" },
  { label: "Moodboard", to: "/" },
  { label: "Journal", to: "/journal" },
] as const;

function isBlogActive(label: string, pathname: string): boolean {
  if (label === "Home")     return pathname === "/home";
  if (label === "Projects") return pathname.startsWith("/projects");
  if (label === "About")    return pathname === "/about";
  if (label === "Journal")  return pathname.startsWith("/journal");
  if (label === "Moodboard") return pathname === "/";
  return false;
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────
function BlogMobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(68,43,0,0.35)", zIndex: 9998,
          opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "all" : "none",
          transition: "opacity 0.3s ease", backdropFilter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: "min(280px, 80vw)",
          background: "#703000E6", zIndex: 9999,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex", flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(68,43,0,0.22)", borderLeft: "1.5px solid #7B4A1E",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${imgTexture})`, backgroundSize: "cover", mixBlendMode: "screen", opacity: 0.4, pointerEvents: "none" }} />
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{ position: "absolute", top: 20, right: 20, background: "transparent", border: "none", cursor: "pointer", padding: 8, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="3" y1="3" x2="17" y2="17" stroke="#DCD1B1" strokeWidth="2" strokeLinecap="round" />
            <line x1="17" y1="3" x2="3" y2="17" stroke="#DCD1B1" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <nav style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", padding: "72px 32px 32px", gap: 0 }}>
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.to ?? "#"}
              onClick={item.to ? (e) => { e.preventDefault(); onClose(); navigate(item.to!); } : onClose}
              style={{
                fontSize: index === 0 ? 11 : 22, fontWeight: index === 0 ? 600 : 400,
                lineHeight: 1.2, letterSpacing: index === 0 ? "0.12em" : "-0.01em",
                color: "#DCD1B1", textDecoration: "none", padding: "12px 0",
                borderBottom: index < navItems.length - 1 ? "1px solid rgba(68,43,0,0.15)" : "none",
                opacity: index === 0 ? 0.6 : 1, transition: "opacity 0.18s",
              }}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => { onClose(); navigate("/contact"); }}
            style={{ marginTop: 32, display: "flex", alignItems: "center", justifyContent: "center", height: 48, borderRadius: 4, background: "#DCD1B1", fontSize: 16, fontWeight: 500, letterSpacing: "-0.01em", color: "white", border: "none", cursor: "pointer" }}
          >
            Contact
          </button>
        </nav>
      </div>
    </>
  );
}

// ─── DESKTOP Navbar ────────────────────────────────────────────────────────────
function BlogNavbarDesktop() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div
      className="hidden lg:flex items-center justify-between px-[33px] pt-[26px] pb-0"
      style={{ pointerEvents: "none" }}
    >
      <div className="h-[49.886px] relative shrink-0 w-[109px] pointer-events-auto">
        <img decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgComponent20} />
      </div>
      <nav className="relative h-[63px] z-10" style={{ width: "450px", pointerEvents: "auto" }} aria-label="Main navigation">
        <svg aria-hidden focusable="false" className="pointer-events-none absolute select-none left-0 top-0" width="450" height="63" viewBox="0 0 470 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="blogNavClip">
              <path d="M 12,1 L 458,1 L 469,12 L 469,51 L 458,62 L 12,62 L 1,51 L 1,12 Z" />
            </clipPath>
          </defs>
          <path d="M 12,1 L 458,1 L 469,12 L 469,51 L 458,62 L 12,62 L 1,51 L 1,12 Z" fill="#7030003D" stroke="#DCD1B1" strokeWidth="2" />
          <image href={imgTexture} x="0" y="0" width="470" height="63" clipPath="url(#blogNavClip)" preserveAspectRatio="xMidYMid slice" style={{ mixBlendMode: "screen", opacity: 0.4 }} />
          <path d="M 12,1 L 458,1 L 469,12 L 469,51 L 458,62 L 12,62 L 1,51 L 1,12 Z" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        </svg>
        <div className="relative flex h-full items-center pl-6 pr-5">
          <ul className="flex items-center gap-4 list-none m-0 p-0">
            {navItems.map((item, index) => {
              const active = isBlogActive(item.label, pathname);
              return (
                <li key={item.label} className="flex items-center gap-4">
                  {index === 1 && <span className="h-8 w-px shrink-0 bg-[#DCD1B1]" aria-hidden />}
                  <a
                    href={item.to ?? "#"}
                    onClick={item.to ? (e) => { e.preventDefault(); navigate(item.to!); } : undefined}
                    className="no-underline whitespace-nowrap transition-opacity hover:opacity-80"
                    style={{ fontSize: 14, fontWeight: index === 0 ? 600 : 450, lineHeight: 1.21, letterSpacing: index === 0 ? "0.08em" : "0em", color: "#DCD1B1", textDecoration: active ? "underline" : "none", textDecorationColor: "#DCD1B1", textUnderlineOffset: "3px" }}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      <button
        className="bg-[#dcd1b1] h-[41px] relative rounded-[4px] shrink-0 pointer-events-auto cursor-pointer border-none hover:opacity-90 transition-opacity"
        onClick={() => navigate("/contact")}
      >
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[28px] py-[24px] relative size-full">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#5f3223] text-[16px] tracking-[-0.48px] whitespace-nowrap">Contact</p>
          </div>
        </div>
      </button>
    </div>
  );
}

// ─── MOBILE Navbar ────────────────────────────────────────────────────────────
function BlogNavbarMobile() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-[100] w-full flex items-center justify-between px-5 py-4" style={{ background: "rgba(95,50,35,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(220,209,177,0.12)" }}>
        <div className="h-[40px] w-[88px] relative cursor-pointer" onClick={() => navigate("/home")}>
          <img decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgComponent20} />
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          style={{ width: 34, height: 34, borderRadius: "50%", background: "#7030003D", border: "1.5px solid #7B4A1E", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(68,43,0,0.18)" }}
        >
          <svg width="13" height="10" viewBox="0 0 18 14" fill="none">
            <line x1="0" y1="1" x2="18" y2="1" stroke="#DCD1B1" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="7" x2="18" y2="7" stroke="#DCD1B1" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="13" x2="18" y2="13" stroke="#DCD1B1" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <BlogMobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared section utilities
// ─────────────────────────────────────────────────────────────────────────────

function DotLineTop() {
  return (
    <div className="hidden lg:block h-[285px] relative shrink-0 w-[14px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 285">
        <circle cx="7" cy="7" fill="#DCD1B1" r="7" />
        <line stroke="#DCD1B1" x1="7.49999" x2="7.5" y1="13" y2="285" />
      </svg>
    </div>
  );
}

function DotLineBottom() {
  return (
    <div className="hidden lg:block h-[380px] relative shrink-0 w-[14px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 380">
        <line stroke="#DCD1B1" x1="7.5" x2="7.50002" y1="14" y2="367" />
        <circle cx="7" cy="373" fill="#DCD1B1" r="7" />
      </svg>
    </div>
  );
}

function MobileDivider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px bg-[#DCD1B1] opacity-25" />
      <div className="w-[6px] h-[6px] rounded-full bg-[#DCD1B1] opacity-60 shrink-0" />
      <div className="flex-1 h-px bg-[#DCD1B1] opacity-25" />
    </div>
  );
}

function SectionRule() {
  return <div className="w-full h-px bg-[#DCD1B1] opacity-25 my-8" />;
}

// Horizontal divider line — full-width with side padding, Figma style
function DesktopDivider() {
  return (
    <div className="hidden lg:block h-0 mx-[24px] relative">
      <div className="absolute inset-[-1px_0_0_0]">
        <svg className="block w-full" height="1" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1">
          <line stroke="#DCD1B1" x2="100%" y1="0.5" y2="0.5" />
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO — flex row, justify-between, items-end
// LEFT: heading + subheading  |  RIGHT: date
// ─────────────────────────────────────────────────────────────────────────────
function ArticleHero({ article }: { article: ArticleData }) {
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:flex items-end justify-between px-[33px] pt-[84px] pb-[60px] text-[#dcd1b1]">
        {/* Left — title + subheading */}
        <div className="flex flex-col gap-[16px]" style={{ maxWidth: "min(574px, 45vw)" }}>
          <p
            className="font-['Instrument_Serif',sans-serif] leading-[normal] whitespace-nowrap"
            style={{ fontSize: "clamp(52px, 5.5vw, 72px)" }}
          >
            {article.pageHeading}
          </p>
          <p
            className="font-['Inter',sans-serif] font-normal leading-[1.3] tracking-[-0.96px]"
            style={{ fontSize: "clamp(17px, 1.8vw, 24px)" }}
          >
            {article.pageSubHeading}
          </p>
        </div>
        {/* Right — date */}
        <p
          className="font-['Instrument_Serif',sans-serif] leading-[normal] whitespace-nowrap shrink-0 translate-y-[40px]"
          style={{ fontSize: "clamp(56px, 6.5vw, 84px)" }}
        >
          {article.pageDate}
        </p>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-5 pt-8 pb-6 text-[#dcd1b1]">
        <a href="/journal" className="inline-flex items-center gap-2 no-underline mb-6" style={{ color: "#DCD1B1", opacity: 0.75 }}>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M15 5H1M1 5L5 1M1 5L5 9" stroke="#DCD1B1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-['Hanken_Grotesk',sans-serif] leading-normal" style={{ fontSize: "clamp(13px, 3.5vw, 15px)", letterSpacing: "-0.01em" }}>
            Back to Journal
          </span>
        </a>
        <p className="font-['Instrument_Serif',sans-serif] leading-none mb-3" style={{ fontSize: "clamp(26px, 7.5vw, 44px)", opacity: 0.65 }}>
          {article.pageDate}
        </p>
        <p className="font-['Instrument_Serif',sans-serif] leading-[1.05] mb-5" style={{ fontSize: "clamp(34px, 9.5vw, 58px)" }}>
          {article.pageHeading}
        </p>
        <p className="font-['Inter',sans-serif] font-normal leading-[1.5]" style={{ fontSize: "clamp(15px, 4.2vw, 19px)", letterSpacing: "-0.03em", opacity: 0.88 }}>
          {article.pageSubHeading}
        </p>
        <SectionRule />
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — Image LEFT | Dot | Text RIGHT
// ─────────────────────────────────────────────────────────────────────────────
function ArticleSection1Block({ article }: { article: ArticleData }) {
  const { section1 } = article;
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:flex items-end gap-[82px] px-[33px] pt-15 pb-[80px]">
        {/* Image — fixed ratio, flex-shrink allowed, max at Figma 699px */}
        <div
          className="shrink-0"
          style={{ width: "min(699px, 48vw)", aspectRatio: "699/451", position: "relative" }}
        >
          <img decoding="async" alt="" className="absolute inset-0 w-full h-full object-cover" src={section1.image} />
        </div>
        <DotLineTop />
        {/* Text — fills remaining space */}
        <div className="flex-1 min-w-0 flex flex-col gap-[24px] font-['Hanken_Grotesk',sans-serif] text-[#dcd1b1] leading-[1.4]" style={{ fontSize: "clamp(15px, 1.5vw, 20px)" }}>
          {section1.content.type === "paragraphs" &&
            section1.content.texts.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-5 pb-10">
        <div className="w-full rounded-[2px] overflow-hidden mb-6" style={{ aspectRatio: "699/451" }}>
          <img decoding="async" alt="" className="w-full h-full object-cover" src={section1.image} />
        </div>
        <MobileDivider />
        <div className="mt-6 font-['Hanken_Grotesk',sans-serif] leading-[1.65] text-[#dcd1b1]" style={{ fontSize: "clamp(15px, 4.2vw, 17px)" }}>
          {section1.content.type === "paragraphs" &&
            section1.content.texts.map((text, i) => (
              <p key={i} className={i > 0 ? "mt-5" : ""}>{text}</p>
            ))}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — Text+Heading LEFT | Dot | Dual Image RIGHT
// ─────────────────────────────────────────────────────────────────────────────
function ArticleSection2Block({ article }: { article: ArticleData }) {
  const { section2 } = article;
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:flex items-end gap-[82px] px-[33px] py-[80px]">
        {/* Text column — fixed at Figma width, shrinks on smaller viewports */}
        <div className="flex flex-col gap-[22px]" style={{ width: "min(602px, 40vw)", flexShrink: 0 }}>
          <p className="font-['Instrument_Serif',sans-serif] leading-[1.1] text-[#dcd1b1] w-full" style={{ fontSize: "clamp(40px, 4.8vw, 64px)" }}>
            {section2.heading}
          </p>
          <div className="flex flex-col gap-[24px] font-['Hanken_Grotesk',sans-serif] text-[#dcd1b1] leading-[1.4]" style={{ fontSize: "clamp(15px, 1.5vw, 20px)" }}>
            {section2.content.type === "paragraphs" &&
              section2.content.texts.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
          </div>
        </div>
        <DotLineTop />
        {/* Dual images — flex-1 fills remaining space */}
        <div className="flex-1 min-w-0 flex gap-[24px] items-start">
          <div className="flex-1 min-w-0 relative" style={{ aspectRatio: "322/558" }}>
            <img loading="lazy" decoding="async" alt="" className="absolute inset-0 w-full h-full object-cover" src={section2.imageLeft} />
          </div>
          <div className="flex-1 min-w-0 relative" style={{ aspectRatio: "322/566" }}>
            <img loading="lazy" decoding="async" alt="" className="absolute inset-0 w-full h-full object-cover" src={section2.imageRight} />
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-5 pb-10">
        <SectionRule />
        <p className="font-['Instrument_Serif',sans-serif] leading-[1.1] text-[#dcd1b1] mb-5" style={{ fontSize: "clamp(28px, 7.5vw, 48px)" }}>
          {section2.heading}
        </p>
        <div className="font-['Hanken_Grotesk',sans-serif] leading-[1.65] text-[#dcd1b1] mb-8" style={{ fontSize: "clamp(15px, 4.2vw, 17px)" }}>
          {section2.content.type === "paragraphs" &&
            section2.content.texts.map((text, i) => (
              <p key={i} className={i > 0 ? "mt-5" : ""}>{text}</p>
            ))}
        </div>
        <MobileDivider />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-[2px] overflow-hidden" style={{ aspectRatio: "322/558" }}>
            <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={section2.imageLeft} />
          </div>
          <div className="rounded-[2px] overflow-hidden" style={{ aspectRatio: "322/566" }}>
            <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={section2.imageRight} />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION COST FACTORS — Image LEFT | Dot | Heading + Bullets RIGHT
// ─────────────────────────────────────────────────────────────────────────────
function ArticleSectionCostFactorsBlock({ article }: { article: ArticleData }) {
  const { sectionCostFactors } = article;
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:flex items-end gap-[82px] px-[33px] py-[80px]">
        {/* Image */}
        <div className="shrink-0" style={{ width: "min(662px, 45vw)", aspectRatio: "662/510", position: "relative" }}>
          <img loading="lazy" decoding="async" alt="" className="absolute inset-0 w-full h-full object-cover" src={sectionCostFactors.image} />
        </div>
        <DotLineBottom />
        {/* Heading + bullets */}
        <div className="flex-1 min-w-0 flex flex-col gap-[55px] items-start justify-end">
          <p className="font-['Instrument_Serif',sans-serif] leading-[1.1] text-[#dcd1b1] w-full" style={{ fontSize: "clamp(40px, 4.8vw, 64px)" }}>
            {sectionCostFactors.heading}
          </p>
          <ul className="font-['Hanken_Grotesk',sans-serif] leading-[1.4] list-disc text-[#dcd1b1] w-full" style={{ fontSize: "clamp(15px, 1.5vw, 20px)", paddingLeft: "33px" }}>
            {sectionCostFactors.bullets.map((bullet, i) => (
              <li key={i}><span>{bullet.text}</span></li>
            ))}
          </ul>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-5 pb-10">
        <SectionRule />
        <div className="w-full rounded-[2px] overflow-hidden mb-8" style={{ aspectRatio: "662/510" }}>
          <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={sectionCostFactors.image} />
        </div>
        <MobileDivider />
        <p className="font-['Instrument_Serif',sans-serif] leading-[1.1] text-[#dcd1b1] mt-6 mb-6" style={{ fontSize: "clamp(28px, 7.5vw, 48px)" }}>
          {sectionCostFactors.heading}
        </p>
        <ul className="list-disc font-['Hanken_Grotesk',sans-serif] text-[#dcd1b1] leading-[1.65] ml-5" style={{ fontSize: "clamp(15px, 4.2vw, 17px)" }}>
          {sectionCostFactors.bullets.map((bullet, i) => (
            <li key={i} className={i > 0 ? "mt-3" : ""}>{bullet.text}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — Text+Heading LEFT | Dot | Dual Image RIGHT
// ─────────────────────────────────────────────────────────────────────────────
function ArticleSection3Block({ article }: { article: ArticleData }) {
  const { section3 } = article;
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:flex items-end gap-[54px] px-[33px] py-[80px]">
        {/* Text column */}
        <div className="flex flex-col gap-[22px]" style={{ width: "min(602px, 40vw)", flexShrink: 0 }}>
          <p className="font-['Instrument_Serif',sans-serif] leading-[1.1] text-[#dcd1b1] w-full" style={{ fontSize: "clamp(40px, 4.8vw, 64px)" }}>
            {section3.heading}
          </p>
          <div className="flex flex-col font-['Hanken_Grotesk',sans-serif] text-[#dcd1b1] leading-[1.4]" style={{ fontSize: "clamp(15px, 1.5vw, 20px)" }}>
            {section3.content.type === "paragraphs" &&
              section3.content.texts.map((text, i) => (
                <p key={i} className={i > 0 ? "mt-5" : ""} style={{ whiteSpace: "pre-wrap" }}>{text}</p>
              ))}
          </div>
        </div>
        <DotLineBottom />
        {/* Dual images */}
        <div className="flex-1 min-w-0 flex gap-[20px] items-start">
          <div className="flex-1 min-w-0 relative" style={{ aspectRatio: "322/558" }}>
            <img loading="lazy" decoding="async" alt="" className="absolute inset-0 w-full h-full object-cover" src={section3.imageLeft} />
          </div>
          <div className="flex-1 min-w-0 relative" style={{ aspectRatio: "322/566" }}>
            <img loading="lazy" decoding="async" alt="" className="absolute inset-0 w-full h-full object-cover" src={section3.imageRight} />
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-5 pb-10">
        <SectionRule />
        <p className="font-['Instrument_Serif',sans-serif] leading-[1.1] text-[#dcd1b1] mb-5" style={{ fontSize: "clamp(28px, 7.5vw, 48px)" }}>
          {section3.heading}
        </p>
        <div className="font-['Hanken_Grotesk',sans-serif] leading-[1.65] text-[#dcd1b1] mb-8" style={{ fontSize: "clamp(15px, 4.2vw, 17px)" }}>
          {section3.content.type === "paragraphs" &&
            section3.content.texts.map((text, i) => (
              <p key={i} className={i > 0 ? "mt-5" : ""}>{text}</p>
            ))}
        </div>
        <MobileDivider />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-[2px] overflow-hidden" style={{ aspectRatio: "1/1.15" }}>
            <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={section3.imageLeft} />
          </div>
          <div className="rounded-[2px] overflow-hidden" style={{ aspectRatio: "1/1.15" }}>
            <img loading="lazy" decoding="async" alt="" className="w-full h-full object-cover" src={section3.imageRight} />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — Image LEFT | Text+Heading RIGHT
// ─────────────────────────────────────────────────────────────────────────────
function ArticleSection4Block({ article }: { article: ArticleData }) {
  const { section4 } = article;
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:flex items-end gap-[82px] px-[33px] py-[80px]">
        {/* Image */}
        <div className="shrink-0 overflow-hidden" style={{ width: "min(754px, 50vw)", aspectRatio: "754/527", position: "relative" }}>
          <img loading="lazy" decoding="async" alt="" className="absolute w-full object-cover" style={{ height: "117.09%", top: "-17.17%" }} src={section4.image} />
        </div>
        {/* Text column — fills remaining space */}
        <div className="flex-1 min-w-0 flex flex-col gap-[22px]">
          <p className="font-['Instrument_Serif',sans-serif] leading-[1.1] text-[#dcd1b1] w-full" style={{ fontSize: "clamp(40px, 4.8vw, 64px)" }}>
            {section4.heading}
          </p>
          <p className="font-['Hanken_Grotesk',sans-serif] leading-[1.4] text-[#dcd1b1]" style={{ fontSize: "clamp(15px, 1.5vw, 20px)" }}>
            {section4.bodyText}
          </p>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-5 pb-12">
        <SectionRule />
        <div className="w-full rounded-[2px] overflow-hidden mb-8" style={{ aspectRatio: "754/527" }}>
          <img loading="lazy" decoding="async" alt="" className="w-full h-[117%] object-cover -mt-[8.5%]" src={section4.image} />
        </div>
        <MobileDivider />
        <p className="font-['Instrument_Serif',sans-serif] leading-[1.1] text-[#dcd1b1] mt-6 mb-5" style={{ fontSize: "clamp(28px, 7.5vw, 48px)" }}>
          {section4.heading}
        </p>
        <p className="font-['Hanken_Grotesk',sans-serif] leading-[1.65] text-[#dcd1b1]" style={{ fontSize: "clamp(15px, 4.2vw, 17px)" }}>
          {section4.bodyText}
        </p>
        <SectionRule />
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogArticle({ article }: { article: ArticleData }) {
  return (
    <>
      {/* ════════════════════ DESKTOP (≥1024px) ════════════════════ */}
      <div className="hidden lg:block bg-[#5f3223] w-full relative" data-name="BLOG ARTICLE">
        {/* Background texture */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[rgba(95,50,35,0.1)] inset-0" />
          <img loading="lazy" decoding="async" alt="" className="absolute max-w-none object-cover opacity-4 size-full" src={imgRectangle29} />
        </div>

        {/* All content in normal flow — no absolute positioning on sections */}
        <div className="relative">
          <BlogNavbarDesktop />
          <ArticleHero article={article} />
          <ArticleSection1Block article={article} />
          <DesktopDivider />
          <ArticleSection2Block article={article} />
          <DesktopDivider />
          <ArticleSectionCostFactorsBlock article={article} />
          <DesktopDivider />
          <ArticleSection3Block article={article} />
          <DesktopDivider />
          <ArticleSection4Block article={article} />
        </div>
      </div>

      {/* ════════════════════ MOBILE / TABLET (<1024px) ════════════════════ */}
      <div className="lg:hidden bg-[#5f3223] w-full relative overflow-x-hidden" data-name="BLOG ARTICLE MOBILE">
        {/* Background texture */}
        <div aria-hidden className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute bg-[rgba(95,50,35,0.08)] inset-0" />
          <img loading="lazy" decoding="async" alt="" className="absolute max-w-none object-cover opacity-4 size-full" src={imgRectangle29} />
        </div>

        <div className="relative" style={{ zIndex: 1 }}>
          <BlogNavbarMobile />
          <ArticleHero article={article} />
          <ArticleSection1Block article={article} />
          <ArticleSection2Block article={article} />
          <ArticleSectionCostFactorsBlock article={article} />
          <ArticleSection3Block article={article} />
          <ArticleSection4Block article={article} />
        </div>
      </div>
    </>
  );
}