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
          background: "#7030003D", zIndex: 9999,
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

// ─── DESKTOP Navbar (absolute positioned inside 4120px canvas) ────────────────
function BlogNavbarDesktop() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div
      className="absolute content-stretch flex items-center justify-between left-[33px] right-[33px] top-[26px]"
      style={{ pointerEvents: "none" }}
    >
      <div className="h-[49.886px] relative shrink-0 w-[109px] pointer-events-auto">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgComponent20} />
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

// ─── MOBILE Navbar (sticky, flow layout) ────────────────────────────────────────
function BlogNavbarMobile() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-[100] w-full flex items-center justify-between px-5 py-4" style={{ background: "rgba(95,50,35,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid rgba(220,209,177,0.12)" }}>
        {/* Logo */}
        <div
          className="h-[40px] w-[88px] relative cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgComponent20} />
        </div>
        {/* Hamburger */}
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
// Section utility components
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

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
function ArticleHero({ article }: { article: ArticleData }) {
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:flex [word-break:break-word] absolute content-stretch items-end justify-between left-[33px] right-[33px] not-italic text-[#dcd1b1] top-[162px]">
        <div className="content-stretch flex flex-col gap-[16px] h-[262px] items-start relative shrink-0">
          <p className="font-['Instrument_Serif',sans-serif] leading-[normal] relative shrink-0 text-[72px] whitespace-nowrap">
            {article.pageHeading}
          </p>
          <p className="font-['Inter',sans-serif] font-normal h-[116px] leading-[1.3] relative shrink-0 text-[24px] tracking-[-0.96px] w-[574px]">
            {article.pageSubHeading}
          </p>
        </div>
        <p className="font-['Instrument_Serif',sans-serif] leading-[normal] relative shrink-0 text-[84px] whitespace-nowrap">
          {article.pageDate}
        </p>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-5 pt-8 pb-6 text-[#dcd1b1]">
        {/* Date — subtle, placed above title */}
        <p
          className="font-['Instrument_Serif',sans-serif] leading-none mb-3"
          style={{ fontSize: "clamp(26px, 7.5vw, 44px)", opacity: 0.65 }}
        >
          {article.pageDate}
        </p>
        {/* Title */}
        <p
          className="font-['Instrument_Serif',sans-serif] leading-[1.05] mb-5"
          style={{ fontSize: "clamp(34px, 9.5vw, 58px)" }}
        >
          {article.pageHeading}
        </p>
        {/* Subheading */}
        <p
          className="font-['Inter',sans-serif] font-normal leading-[1.5]"
          style={{ fontSize: "clamp(15px, 4.2vw, 19px)", letterSpacing: "-0.03em", opacity: 0.88 }}
        >
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
      <div className="hidden lg:flex absolute content-stretch gap-[82px] items-end left-[33px] top-[509px] w-[calc(100%-56px)]">
        <div className="h-[451px] relative shrink-0 w-[699px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={section1.image} />
        </div>
        <DotLineTop />
        <div className="[word-break:break-word] content-stretch flex flex-col font-['Hanken_Grotesk',sans-serif] gap-[24px] items-start leading-[1.4] not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-[565px]">
          {section1.content.type === "paragraphs" &&
            section1.content.texts.map((text, i) => (
              <p key={i} className={`relative shrink-0 w-full ${i === 0 ? "h-[214px]" : "h-[213px]"}`}>{text}</p>
            ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-5 pb-10">
        {/* Full-width image */}
        <div className="w-full rounded-[2px] overflow-hidden mb-6" style={{ aspectRatio: "699/451" }}>
          <img alt="" className="w-full h-full object-cover" src={section1.image} />
        </div>
        <MobileDivider />
        {/* Text */}
        <div
          className="mt-6 font-['Hanken_Grotesk',sans-serif] leading-[1.65] text-[#dcd1b1]"
          style={{ fontSize: "clamp(15px, 4.2vw, 17px)" }}
        >
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
      <div className="hidden lg:flex absolute content-stretch gap-[82px] items-end left-[33px] top-[1104px] w-[calc(100%-48px)]">
        <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-[602px]">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#dcd1b1] text-[64px] w-full">{section2.heading}</p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col font-['Hanken_Grotesk',sans-serif] gap-[24px] h-[572px] items-start leading-[1.4] not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-full">
            {section2.content.type === "paragraphs" &&
              section2.content.texts.map((text, i) => (
                <p key={i} className={`relative shrink-0 w-full ${i === 0 ? "h-[154px]" : "h-[185px]"}`}>{text}</p>
              ))}
          </div>
        </div>
        <DotLineTop />
        <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-[668px]">
          <div className="flex-[1_0_0] h-[558px] min-w-px relative">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={section2.imageLeft} />
          </div>
          <div className="flex-[1_0_0] h-[566px] min-w-px relative">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={section2.imageRight} />
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-5 pb-10">
        <SectionRule />
        {/* Heading */}
        <p
          className="font-['Instrument_Serif',sans-serif] leading-[1.1] text-[#dcd1b1] mb-5"
          style={{ fontSize: "clamp(28px, 7.5vw, 48px)" }}
        >
          {section2.heading}
        </p>
        {/* Body text */}
        <div
          className="font-['Hanken_Grotesk',sans-serif] leading-[1.65] text-[#dcd1b1] mb-8"
          style={{ fontSize: "clamp(15px, 4.2vw, 17px)" }}
        >
          {section2.content.type === "paragraphs" &&
            section2.content.texts.map((text, i) => (
              <p key={i} className={i > 0 ? "mt-5" : ""}>{text}</p>
            ))}
        </div>
        <MobileDivider />
        {/* Dual images: stacked mobile, side-by-side tablet */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-[2px] overflow-hidden" style={{ aspectRatio: "322/558" }}>
            <img alt="" className="w-full h-full object-cover" src={section2.imageLeft} />
          </div>
          <div className="rounded-[2px] overflow-hidden" style={{ aspectRatio: "322/566" }}>
            <img alt="" className="w-full h-full object-cover" src={section2.imageRight} />
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
      <div className="hidden lg:flex absolute content-stretch gap-[82px] items-end left-[33px] top-[2000px] w-[calc(100%-56px)]">
        <div className="h-[510px] relative shrink-0 w-[662px]">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={sectionCostFactors.image} />
        </div>
        <DotLineBottom />
        <div className="content-stretch flex flex-col gap-[55px] items-start justify-end relative shrink-0">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[602px]">
            <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#dcd1b1] text-[64px] w-full">{sectionCostFactors.heading}</p>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[565px]">
            <ul className="[word-break:break-word] block font-['Hanken_Grotesk',sans-serif] leading-[0] list-disc not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-full">
              {sectionCostFactors.bullets.map((bullet, i) => (
                <li key={i} className="ms-[33px]"><span className="leading-[1.4]">{bullet.text}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-5 pb-10">
        <SectionRule />
        {/* Image */}
        <div className="w-full rounded-[2px] overflow-hidden mb-8" style={{ aspectRatio: "662/510" }}>
          <img alt="" className="w-full h-full object-cover" src={sectionCostFactors.image} />
        </div>
        <MobileDivider />
        {/* Heading */}
        <p
          className="font-['Instrument_Serif',sans-serif] leading-[1.1] text-[#dcd1b1] mt-6 mb-6"
          style={{ fontSize: "clamp(28px, 7.5vw, 48px)" }}
        >
          {sectionCostFactors.heading}
        </p>
        {/* Bullets */}
        <ul
          className="list-disc font-['Hanken_Grotesk',sans-serif] text-[#dcd1b1] leading-[1.65] ml-5"
          style={{ fontSize: "clamp(15px, 4.2vw, 17px)" }}
        >
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
      <div className="hidden lg:flex absolute content-stretch gap-[54px] items-end left-[33px] top-[2765px] w-[calc(100%-48px)]">
        <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-[602px]">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#dcd1b1] text-[64px] w-full">{section3.heading}</p>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-[565px]">
            {section3.content.type === "paragraphs" &&
              section3.content.texts.map((text, i) => (
                <p key={i} className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] h-[340px] leading-[1.4] not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-full whitespace-pre-wrap">{text}</p>
              ))}
          </div>
        </div>
        <DotLineBottom />
        <div className="content-stretch flex flex-[1_0_0] right-[23px] gap-[20px] items-start relative">
          <div className="flex-[1_0_0] h-[558px] min-w-px relative">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={section3.imageLeft} />
          </div>
          <div className="flex-[1_0_0] h-[566px] min-w-px relative">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={section3.imageRight} />
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-5 pb-10">
        <SectionRule />
        <p
          className="font-['Instrument_Serif',sans-serif] leading-[1.1] text-[#dcd1b1] mb-5"
          style={{ fontSize: "clamp(28px, 7.5vw, 48px)" }}
        >
          {section3.heading}
        </p>
        <div
          className="font-['Hanken_Grotesk',sans-serif] leading-[1.65] text-[#dcd1b1] mb-8"
          style={{ fontSize: "clamp(15px, 4.2vw, 17px)" }}
        >
          {section3.content.type === "paragraphs" &&
            section3.content.texts.map((text, i) => (
              <p key={i} className={i > 0 ? "mt-5" : ""}>{text}</p>
            ))}
        </div>
        <MobileDivider />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-[2px] overflow-hidden" style={{ aspectRatio: "1/1.15" }}>
            <img alt="" className="w-full h-full object-cover" src={section3.imageLeft} />
          </div>
          <div className="rounded-[2px] overflow-hidden" style={{ aspectRatio: "1/1.15" }}>
            <img alt="" className="w-full h-full object-cover" src={section3.imageRight} />
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
      <div className="hidden lg:flex absolute content-stretch gap-[82px] items-end left-[33px] top-[3562px] w-[calc(100%-48px)]">
        <div className="content-stretch flex h-[527px] items-start relative shrink-0 w-[754px]">
          <div className="h-full relative shrink-0 w-[754px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[117.09%] left-0 max-w-none top-[-17.17%] w-full" src={section4.image} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[22px] items-start min-w-px relative">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#dcd1b1] text-[64px] w-full">{section4.heading}</p>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
            <p className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] h-[216px] leading-[1.4] not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-[608px]">{section4.bodyText}</p>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden px-5 pb-12">
        <SectionRule />
        {/* Image with parallax-like overflow crop */}
        <div className="w-full rounded-[2px] overflow-hidden mb-8" style={{ aspectRatio: "754/527" }}>
          <img alt="" className="w-full h-[117%] object-cover -mt-[8.5%]" src={section4.image} />
        </div>
        <MobileDivider />
        <p
          className="font-['Instrument_Serif',sans-serif] leading-[1.1] text-[#dcd1b1] mt-6 mb-5"
          style={{ fontSize: "clamp(28px, 7.5vw, 48px)" }}
        >
          {section4.heading}
        </p>
        <p
          className="font-['Hanken_Grotesk',sans-serif] leading-[1.65] text-[#dcd1b1]"
          style={{ fontSize: "clamp(15px, 4.2vw, 17px)" }}
        >
          {section4.bodyText}
        </p>
        {/* Article end rule */}
        <SectionRule />
        {/* Back to journal */}
        <a
          href="/journal"
          className="inline-flex items-center gap-2 no-underline group"
          style={{ color: "#DCD1B1", opacity: 0.75 }}
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M15 5H1M1 5L5 1M1 5L5 9" stroke="#DCD1B1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            className="font-['Hanken_Grotesk',sans-serif] leading-normal"
            style={{ fontSize: "clamp(13px, 3.5vw, 15px)", letterSpacing: "-0.01em" }}
          >
            Back to Journal
          </span>
        </a>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogArticle({ article }: { article: ArticleData }) {
  return (
    <>
      {/* ════════════════════ DESKTOP (≥1024px) ════════════════════ */}
      {/* Absolute positioned canvas — original Figma layout preserved 100% */}
      <div className="hidden lg:block bg-[#5f3223] relative size-full" data-name="BLOG ARTICLE">
        <div className="absolute h-[4120px] left-0 top-0 w-full">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[rgba(95,50,35,0.1)] inset-0" />
            <img alt="" className="absolute max-w-none object-cover opacity-4 size-full" src={imgRectangle29} />
          </div>
        </div>

        <BlogNavbarDesktop />
        <ArticleHero article={article} />
        <ArticleSection1Block article={article} />
        <ArticleSection2Block article={article} />
        <ArticleSectionCostFactorsBlock article={article} />
        <ArticleSection3Block article={article} />
        <ArticleSection4Block article={article} />

        {/* Divider lines — pixel-perfect positions preserved */}
        <div className="absolute h-0 left-[24px] top-[1019px] w-[calc(100%-48px)]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1">
              <line stroke="#DCD1B1" x2="1392" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <div className="absolute h-0 left-[24px] top-[2680px] w-[calc(100%-48px)]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1">
              <line stroke="#DCD1B1" x2="1392" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <div className="absolute h-0 left-[24px] top-[1926px] w-[calc(100%-48px)]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1">
              <line stroke="#DCD1B1" x2="1392" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <div className="absolute h-0 left-[28px] top-[3486px] w-[calc(100%-56px)]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1">
              <line stroke="#DCD1B1" x2="1392" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* ════════════════════ MOBILE / TABLET (<1024px) ════════════════════ */}
      {/* Normal flow layout — premium reading experience */}
      <div className="lg:hidden bg-[#5f3223] w-full relative overflow-x-hidden" data-name="BLOG ARTICLE MOBILE">
        {/* Background texture (fixed so it covers whole scroll) */}
        <div aria-hidden className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute bg-[rgba(95,50,35,0.08)] inset-0" />
          <img alt="" className="absolute max-w-none object-cover opacity-4 size-full" src={imgRectangle29} />
        </div>

        {/* Scrollable content */}
        <div className="relative" style={{ zIndex: 1 }}>
          {/* Sticky mobile navbar */}
          <BlogNavbarMobile />

          {/* Article sections */}
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