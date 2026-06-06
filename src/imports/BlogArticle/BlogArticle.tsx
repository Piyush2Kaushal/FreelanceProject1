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

// Active check for blog/article navbar (text color: #DCD1B1)
function isBlogActive(label: string, pathname: string): boolean {
  if (label === "Home")     return pathname === "/home";
  if (label === "Projects") return pathname.startsWith("/projects");
  if (label === "About")    return pathname === "/about";
  if (label === "Journal")  return pathname.startsWith("/journal");
  if (label === "Moodboard") return pathname === "/";
  return false;
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────
function BlogMobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();

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
      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(280px, 80vw)",
          background: "#7030003D",
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
            <line x1="3" y1="3" x2="17" y2="17" stroke="#DCD1B1" strokeWidth="2" strokeLinecap="round" />
            <line x1="17" y1="3" x2="3" y2="17" stroke="#DCD1B1" strokeWidth="2" strokeLinecap="round" />
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
                color: "#DCD1B1",
                textDecoration: "none",
                padding: "12px 0",
                borderBottom:
                  index < navItems.length - 1 ? "1px solid rgba(68,43,0,0.15)" : "none",
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
              background: "#DCD1B1",
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

// ─── Navbar ───────────────────────────────────────────────────────────────────
function BlogNavbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* ── Logo — original style ── */}
      <div
        className="absolute content-stretch flex items-center justify-between left-[33px] right-[33px] top-[26px]"
        style={{ pointerEvents: "none" }}
      >
        {/* Logo */}
        <div className="h-[49.886px] relative shrink-0 w-[109px] pointer-events-auto" data-name="Component 20">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgComponent20}
          />
        </div>

        {/* ── CENTER: Octagon navbar pill ── */}
        <nav
          className="navbar-desktop relative h-[63px] z-10"
          style={{ width: "450px", pointerEvents: "auto" }}
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
              <clipPath id="blogNavClip">
                <path d="M 12,1 L 458,1 L 469,12 L 469,51 L 458,62 L 12,62 L 1,51 L 1,12 Z" />
              </clipPath>
            </defs>
            <path
              d="M 12,1 L 458,1 L 469,12 L 469,51 L 458,62 L 12,62 L 1,51 L 1,12 Z"
              fill="#7030003D"
              stroke="#DCD1B1"
              strokeWidth="2"
            />
            <image
              href={imgTexture}
              x="0"
              y="0"
              width="470"
              height="63"
              clipPath="url(#blogNavClip)"
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

          <div className="relative flex h-full items-center pl-6 pr-5">
            <ul className="flex items-center gap-4 list-none m-0 p-0">
              {navItems.map((item, index) => {
                const active = isBlogActive(item.label, pathname);
                return (
                <li key={item.label} className="flex items-center gap-4">
                  {index === 1 && (
                    <span className="h-8 w-px shrink-0 bg-[#DCD1B1]" aria-hidden />
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
                      color: "#DCD1B1",
                      textDecoration: active ? "underline" : "none",
                      textDecorationColor: "#DCD1B1",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {item.label}
                  </a>
                </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* ── Contact — original style ── */}
        <button
          className="navbar-desktop bg-[#dcd1b1] h-[41px] relative rounded-[4px] shrink-0 pointer-events-auto cursor-pointer border-none hover:opacity-90 transition-opacity"
          onClick={() => navigate("/contact")}
        >
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center px-[28px] py-[24px] relative size-full">
              <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#5f3223] text-[16px] tracking-[-0.48px] whitespace-nowrap">
                Contact
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* ── MOBILE: hamburger ── */}
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
          background: "#7030003D",
          border: "1.5px solid #7B4A1E",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(68,43,0,0.18)",
        }}
      >
        <svg width="13" height="10" viewBox="0 0 18 14" fill="none">
          <line x1="0" y1="1" x2="18" y2="1" stroke="#DCD1B1" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="0" y1="7" x2="18" y2="7" stroke="#DCD1B1" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="0" y1="13" x2="18" y2="13" stroke="#DCD1B1" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <BlogMobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section components — each reads from ArticleData prop
// Pixel-perfect copies of the original hardcoded Frame components.
// ─────────────────────────────────────────────────────────────────────────────

/** Hero heading + date (Frame5) */
function ArticleHero({ article }: { article: ArticleData }) {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex items-end justify-between left-[33px] right-[33px] not-italic text-[#dcd1b1] top-[162px]">
      {/* Left: title + description */}
      <div className="content-stretch flex flex-col gap-[16px] h-[262px] items-start relative shrink-0">
        <p className="font-['Instrument_Serif',sans-serif] leading-[normal] relative shrink-0 text-[72px] whitespace-nowrap">
          {article.pageHeading}
        </p>
        <p className="font-['Inter',sans-serif] font-normal h-[116px] leading-[1.3] relative shrink-0 text-[24px] tracking-[-0.96px] w-[574px]">
          {article.pageSubHeading}
        </p>
      </div>
      {/* Right: date */}
      <p className="font-['Instrument_Serif',sans-serif] leading-[normal] relative shrink-0 text-[84px] whitespace-nowrap">
        {article.pageDate}
      </p>
    </div>
  );
}

/** Section 1 — Image LEFT | dotLine-top | Text RIGHT (Frame13, top: 509px) */
function ArticleSection1Block({ article }: { article: ArticleData }) {
  const { section1 } = article;

  return (
    <div className="absolute content-stretch flex gap-[82px] items-end left-[33px] top-[509px] w-[calc(100%-56px)]">
      {/* Image */}
      <div className="h-[451px] relative shrink-0 w-[699px]">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={section1.image}
        />
      </div>

      {/* Dot-line: circle top, line down */}
      <div className="h-[285px] relative shrink-0 w-[14px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 285">
          <g id="Frame 2106258775">
            <circle cx="7" cy="7" fill="var(--fill-0, #DCD1B1)" id="Ellipse 31" r="7" />
            <line id="Line 83" stroke="var(--stroke-0, #DCD1B1)" x1="7.49999" x2="7.5" y1="13" y2="285" />
          </g>
        </svg>
      </div>

      {/* Text content */}
      <div className="[word-break:break-word] content-stretch flex flex-col font-['Hanken_Grotesk',sans-serif] gap-[24px] items-start leading-[1.4] not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-[565px]">
        {section1.content.type === "paragraphs" &&
          section1.content.texts.map((text, i) => (
            <p
              key={i}
              className={`relative shrink-0 w-full ${i === 0 ? "h-[214px]" : "h-[213px]"}`}
            >
              {text}
            </p>
          ))}
      </div>
    </div>
  );
}

/** Section 2 — Text+heading LEFT | dotLine-top | DualImage RIGHT (Frame29, top: 1104px) */
function ArticleSection2Block({ article }: { article: ArticleData }) {
  const { section2 } = article;

  return (
    <div className="absolute content-stretch flex gap-[82px] items-end left-[33px] top-[1104px] w-[calc(100%-48px)]">
      {/* Text block */}
      <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-[602px]">
        {/* Heading */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#dcd1b1] text-[64px] w-full">
            {section2.heading}
          </p>
        </div>
        {/* Body */}
        <div className="[word-break:break-word] content-stretch flex flex-col font-['Hanken_Grotesk',sans-serif] gap-[24px] h-[572px] items-start leading-[1.4] not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-full">
          {section2.content.type === "paragraphs" &&
            section2.content.texts.map((text, i) => (
              <p
                key={i}
                className={`relative shrink-0 w-full ${
                  i === 0 ? "h-[154px]" : "h-[185px]"
                }`}
              >
                {text}
              </p>
            ))}
        </div>
      </div>

      {/* Dot-line: circle top, line down */}
      <div className="h-[285px] relative shrink-0 w-[14px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 285">
          <g id="Frame 2106258775">
            <circle cx="7" cy="7" fill="var(--fill-0, #DCD1B1)" id="Ellipse 31" r="7" />
            <line id="Line 83" stroke="var(--stroke-0, #DCD1B1)" x1="7.49999" x2="7.5" y1="13" y2="285" />
          </g>
        </svg>
      </div>

      {/* Dual image */}
      <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-[668px]">
        <div className="flex-[1_0_0] h-[558px] min-w-px relative">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={section2.imageLeft}
          />
        </div>
        <div className="flex-[1_0_0] h-[566px] min-w-px relative">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={section2.imageRight}
          />
        </div>
      </div>
    </div>
  );
}

/** Cost Factors Section — Image LEFT | dotLine-bottom | Bullets RIGHT (Frame14, top: 2000px) */
function ArticleSectionCostFactorsBlock({ article }: { article: ArticleData }) {
  const { sectionCostFactors } = article;

  return (
    <div className="absolute content-stretch flex gap-[82px] items-end left-[33px] top-[2000px] w-[calc(100%-56px)]">
      {/* Image */}
      <div className="h-[510px] relative shrink-0 w-[662px]">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={sectionCostFactors.image}
        />
      </div>

      {/* Dot-line: line top, circle bottom */}
      <div className="h-[380px] relative shrink-0 w-[14px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 380">
          <g id="Frame 2106258775">
            <line id="Line 83" stroke="var(--stroke-0, #DCD1B1)" x1="7.5" x2="7.50002" y1="14" y2="367" />
            <circle cx="7" cy="373" fill="var(--fill-0, #DCD1B1)" id="Ellipse 31" r="7" />
          </g>
        </svg>
      </div>

      {/* Heading + bullets */}
      <div className="content-stretch flex flex-col gap-[55px] items-start justify-end relative shrink-0">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-[602px]">
          <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#dcd1b1] text-[64px] w-full">
            {sectionCostFactors.heading}
          </p>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-[565px]">
          <ul className="[word-break:break-word] block font-['Hanken_Grotesk',sans-serif] leading-[0] list-disc not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-full">
            {sectionCostFactors.bullets.map((bullet, i) => (
              <li
                key={i}
                className={`ms-[33px] ${i < sectionCostFactors.bullets.length - 1 ? "mb-0" : ""}`}
              >
                <span className="leading-[1.4]">{bullet.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Section 3 — Text+heading LEFT | dotLine-bottom | DualImage RIGHT (Frame30, top: 2765px) */
function ArticleSection3Block({ article }: { article: ArticleData }) {
  const { section3 } = article;

  return (
    <div className="absolute content-stretch flex gap-[54px] items-end left-[33px] top-[2765px] w-[calc(100%-48px)]">
      {/* Text block */}
      <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-[602px]">
        {/* Heading */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#dcd1b1] text-[64px] w-full">
            {section3.heading}
          </p>
        </div>
        {/* Body */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-[565px]">
          {section3.content.type === "paragraphs" &&
            section3.content.texts.map((text, i) => (
              <p
                key={i}
                className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] h-[340px] leading-[1.4] not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-full whitespace-pre-wrap"
              >
                {text}
              </p>
            ))}
        </div>
      </div>

      {/* Dot-line: line top, circle bottom */}
      <div className="h-[380px] relative shrink-0 w-[14px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 380">
          <g id="Frame 2106258775">
            <line id="Line 83" stroke="var(--stroke-0, #DCD1B1)" x1="7.5" x2="7.50002" y1="14" y2="367" />
            <circle cx="7" cy="373" fill="var(--fill-0, #DCD1B1)" id="Ellipse 31" r="7" />
          </g>
        </svg>
      </div>

      {/* Dual image */}
      <div className="content-stretch flex flex-[1_0_0] right-[23px] gap-[20px] items-start relative">
        <div className="flex-[1_0_0] h-[558px] min-w-px relative">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={section3.imageLeft}
          />
        </div>
        <div className="flex-[1_0_0] h-[566px] min-w-px relative">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={section3.imageRight}
          />
        </div>
      </div>
    </div>
  );
}

/** Section 4 — Image LEFT | Text+heading RIGHT (Frame34, top: 3562px) */
function ArticleSection4Block({ article }: { article: ArticleData }) {
  const { section4 } = article;

  return (
    <div className="absolute content-stretch flex gap-[82px] items-end left-[33px] top-[3562px] w-[calc(100%-48px)]">
      {/* Image */}
      <div className="content-stretch flex h-[527px] items-start relative shrink-0 w-[754px]">
        <div className="h-full relative shrink-0 w-[754px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              alt=""
              className="absolute h-[117.09%] left-0 max-w-none top-[-17.17%] w-full"
              src={section4.image}
            />
          </div>
        </div>
      </div>

      {/* Text block */}
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[22px] items-start min-w-px relative">
        {/* Heading */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#dcd1b1] text-[64px] w-full">
            {section4.heading}
          </p>
        </div>
        {/* Body */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <p className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] h-[216px] leading-[1.4] not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-[608px]">
            {section4.bodyText}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogArticle({ article }: { article: ArticleData }) {
  return (
    <div className="bg-[#5f3223] relative size-full" data-name="BLOG ARTICLE">
      <div className="absolute h-[4120px] left-0 top-0 w-full">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[rgba(95,50,35,0.1)] inset-0" />
          <img alt="" className="absolute max-w-none object-cover opacity-4 size-full" src={imgRectangle29} />
        </div>
      </div>

      <BlogNavbar />

      {/* ── Dynamic sections — data from ArticleData prop ── */}
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
            <line id="Line 84" stroke="var(--stroke-0, #DCD1B1)" x2="1392" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[24px] top-[2680px] w-[calc(100%-48px)]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1">
            <line id="Line 84" stroke="var(--stroke-0, #DCD1B1)" x2="1392" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[24px] top-[1926px] w-[calc(100%-48px)]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1">
            <line id="Line 84" stroke="var(--stroke-0, #DCD1B1)" x2="1392" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[28px] top-[3486px] w-[calc(100%-56px)]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1">
            <line id="Line 84" stroke="var(--stroke-0, #DCD1B1)" x2="1392" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}