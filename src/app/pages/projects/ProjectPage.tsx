// ─────────────────────────────────────────────────────────────────────────────
// ProjectPage – Single reusable component that renders any project.
//
// DESKTOP (≥1024px): Original pixel-perfect horizontal scroll — now scaled
//   uniformly via transform: scale() based on viewport height, so the
//   780px-tall Figma design fits ANY desktop screen height while preserving
//   exact proportions and relative positioning.
// MOBILE/TABLET (<1024px): Premium vertical-scroll layout — each screen
//   becomes a full-width vertical section with premium styling.
// ─────────────────────────────────────────────────────────────────────────────
import React, { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { ProjectData, GalleryScreen, FullImageScreen } from "../../../data/types";
import { useTransition } from "../../context/TransitionContext";
import { useReveal } from "../../hooks/useReveal";
import gsap from "gsap";
import svgPaths from "../../../assets/svgPaths";
import imgDrawerTexture from "../../../assets/f0cedf09760f97dc4e595fe82650e46b83a6e013.jpg";

// ─────────────────────────────────────────────────────────────────────────────
// Small shared sub-components (internal, not exported)
// ─────────────────────────────────────────────────────────────────────────────

/** Three-line hamburger / nav icon with configurable stroke color */
const HamburgerIcon = memo(function HamburgerIcon({ strokeColor }: { strokeColor: string }) {
  return (
    <div className="h-[12px] relative shrink-0 w-[20px]">
      <div className="absolute inset-[-8.33%_0_0_0]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 20 13"
        >
          <g id="Frame 2106258423">
            <line stroke={strokeColor} x2="20" y1="0.5"  y2="0.5"  />
            <line stroke={strokeColor} x2="20" y1="6.5"  y2="6.5"  />
            <line stroke={strokeColor} x2="20" y1="12.5" y2="12.5" />
          </g>
        </svg>
      </div>
    </div>
  );
});

/** Floating hamburger nav button */
const NavButton = memo(function NavButton({
  strokeColor,
  leftCalc,
  top = "26px",
}: {
  strokeColor: string;
  leftCalc: string;
  top?: string;
}) {
  return (
    <div
      className="absolute content-stretch flex gap-[8px] items-center"
      style={{ left: leftCalc, top }}
    >
      <p
        className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[20px] text-center whitespace-nowrap"
        style={{ color: strokeColor }}
      >
        ​{/* zero-width space preserved from Figma */}
      </p>
      <HamburgerIcon strokeColor={strokeColor} />
    </div>
  );
});

const PROJECT_ORDER = [
  "/projects/project-1",
  "/projects/project-2",
];

/** Left-arrow back button row (Intro screen) */
const BackButton = memo(function BackButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleBack() {
    const idx = PROJECT_ORDER.findIndex((p) => pathname.startsWith(p));
    if (idx > 0) {
      navigate(PROJECT_ORDER[idx - 1]);
    } else {
      navigate("/");
    }
  }

  return (
    <div
      className="absolute content-stretch flex flex-col gap-px items-center left-[9px] top-[736px] w-[147px]"
      onClick={handleBack}
      style={{ cursor: "pointer" }}
    >
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
        <div className="relative shrink-0 size-[14px]" data-name="arrow-back 1">
          <svg
            className="absolute block inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 14 14"
          >
            <g id="arrow-back 1">
              <path
                d={svgPaths.p20a77b00}
                stroke="var(--stroke-0, #DAD0AD)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
              />
              <path
                d="M3.28125 7H11.2656"
                stroke="var(--stroke-0, #DAD0AD)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0.5"
              />
            </g>
          </svg>
        </div>
        <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[#dad0ad] text-[14px] text-center whitespace-nowrap">
          Go back to Previous project
        </p>
      </div>
      
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-0.5px_0_0_0]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 147 0.5"
          >
            <line
              stroke="var(--stroke-0, #DAD0AD)"
              strokeWidth="0.5"
              x2="147"
              y1="0.25"
              y2="0.25"
            />
          </svg>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Screen 1 – Intro
// ─────────────────────────────────────────────────────────────────────────────
const IntroScreen = memo(function IntroScreen({ data }: { data: ProjectData["intro"] }) {
  // While a shared-element morph is in flight, keep the real hero hidden so the
  // flying clone is the only visible image (no double-image flash). The
  // SharedElementLayer reveals it imperatively the instant the clone lands.
  const { active } = useTransition();
  const navigate = useNavigate();
  // Capture (once) whether we arrived via the card→page morph, so the content
  // entrance can be delayed to land in sync with the flying image.
  const [viaTransition] = useState(() => active);
  const rootRef = useRef<HTMLDivElement>(null);
  

  // ── Intro content entrance — mersi-style "quiet luxury" reveal ─────────────
  // Text rises out from behind a mask (overflow-hidden wrapper + yPercent),
  // images wipe + settle via clip-path & a micro-scale. expo.out easing, slow
  // durations and a gentle stagger give the unhurried premium feel.
  // The framed portrait (shared target) is intentionally NOT animated here —
  // it is owned by the image morph and must stay untouched.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const lines = Array.from(
        root.querySelectorAll<HTMLElement>("[data-reveal-line]")
      );
      const clips = Array.from(
        root.querySelectorAll<HTMLElement>("[data-reveal-clip]")
      );

      if (lines.length) gsap.set(lines, { yPercent: 120 });
      if (clips.length)
        gsap.set(clips, {
          clipPath: "inset(0% 0% 100% 0%)",
          scale: 1.06,
          transformOrigin: "50% 50%",
        });

      const start = viaTransition ? 0.45 : 0.1; // land in sync with the image
      const tl = gsap.timeline({ delay: start });

      if (clips.length)
        tl.to(
          clips,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
          },
          0
        );

      if (lines.length)
        tl.to(
          lines,
          {
            yPercent: 0,
            duration: 1.05,
            ease: "expo.out",
            stagger: 0.12,
          },
          0.12
        );
    }, root);

    return () => ctx.revert();
  }, [viaTransition]);

  return (
    <div
      ref={rootRef}
      className="bg-[#dad0ad] h-[780px] overflow-clip relative shrink-0 w-[1440px]"
      data-name="Intro"
      style={{ contain: "layout style paint" }}
    >
      {/* Invisible placeholder rectangle from Figma */}
      <div className="absolute h-[120px] left-[calc(58.33%-14px)] top-[-210.5px] w-[734px]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 32 32"
        >
          <g id="Rectangle 16" />
        </svg>
      </div>

      {/* Decorative top-right image */}
      <div className="absolute bottom-[147px] h-[129px] right-[47px] w-[266px] overflow-hidden" data-reveal-clip>
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={data.decorativeTopRightImg}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Project name + description block */}
      <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[calc(50%+43px)] top-[97px] w-[332px]">
        <div className="overflow-hidden">
          <p
            data-reveal-line
            className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-none not-italic relative shrink-0 text-[100px] tracking-[-4px] whitespace-nowrap"
            style={{ color: data.projectNameColor }}
          >
            {data.projectName}
          </p>
        </div>
        <div className="overflow-hidden w-full">
          <p
            data-reveal-line
            className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)] w-full"
          >
            {data.description}
          </p>
        </div>
      </div>

      {/* Side paragraph bottom-right */}
      <div className="absolute bottom-[129px] right-[313px] translate-x-full translate-y-full w-[287px]">
        <div className="overflow-hidden w-full">
          <p
            data-reveal-line
            className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] leading-[normal] not-italic text-[14px] text-[rgba(0,0,0,0.8)] w-full"
          >
            {data.sideParagraph}
          </p>
        </div>
      </div>

      {/* Hero panel (left dark box with portrait) */}
      <div
        className="absolute h-[780px] left-0 overflow-clip top-0 w-[720px]"
        style={{ backgroundColor: data.heroPanelBg }}
      >
        {/* Framed portrait */}
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-[calc(50%-0.5px)]">
          <div className="content-stretch flex items-center overflow-clip p-[16px] relative rounded-[inherit] size-full">
            <div
              className="h-[327px] relative shrink-0 w-[232px]"
              data-name="image 55"
              data-shared-target
              style={{ opacity: active ? 0 : 1 }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  alt=""
                  className="absolute h-[100.11%] left-[-10.38%] max-w-none top-[-0.05%] w-[110.38%]"
                  src={data.heroPortraitImg}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute border-4 border-[#dad0ad] border-solid inset-0 pointer-events-none"
          />
        </div>

        {/* Bottom caption */}
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-[calc(50%+207.5px)] w-[266px]">
          <div className="overflow-hidden w-full">
            <div
              data-reveal-line
              className="[word-break:break-word] content-stretch flex font-['EuropaNuova-Regular:Regular',sans-serif] items-center justify-between leading-[1.5] not-italic text-[#dad0ad] text-[12.8px] tracking-[0.896px] w-full whitespace-nowrap"
            >
              <p className="relative shrink-0">{data.location}</p>
              <p className="relative shrink-0">{data.year}</p>
            </div>
          </div>
        </div>

        {/* Top caption */}
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%+4px)] top-[calc(50%-208.5px)] w-[266px]"
        >
          <div className="overflow-hidden w-full">
            <div
              data-reveal-line
              className="[word-break:break-word] content-stretch flex font-['EuropaNuova-Regular:Regular',sans-serif] items-center justify-between leading-[1.5] not-italic relative shrink-0 text-[#dad0ad] text-[12.8px] tracking-[0.896px] w-full whitespace-nowrap"
            >
              <p className="relative shrink-0">{data.category}</p>
              <p className="relative shrink-0">{data.sqft}</p>
            </div>
          </div>
        </div>

        {/* Overlay tint */}
        <div className="absolute h-[780px] left-0 top-0 w-[720px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{ backgroundColor: data.heroPanelOverlayBg }}
            />
          </div>
        </div>

        {data.logoImg && (
       <div
  className="absolute h-[52px] left-[11px] top-[20px] w-[104px] z-10 cursor-pointer"
  data-name="Component 20"
  onClick={() => navigate("/")}
>
  <img
    alt=""
    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
    src={data.logoImg}
    loading="eager"
    decoding="async"
  />
</div>
        )}

        <BackButton />
      </div>

      {/* Optional decorative pattern (Project 2 only) */}
      {data.patternImg && (
        <div className="absolute h-[146px] left-[calc(75%+32px)] top-[489px] w-[290px]" data-name="Pattern6 5">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              alt=""
              className="absolute h-[263.42%] left-[-56.75%] max-w-none top-[-153.42%] w-[187.18%]"
              src={data.patternImg}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}

      {/* Nav button */}
      <NavButton strokeColor={data.navStrokeColor} leftCalc={data.navLeftCalc} />
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Screen 2 – Concept
// ─────────────────────────────────────────────────────────────────────────────
const ConceptScreen = memo(function ConceptScreen({ data }: { data: ProjectData["concept"] }) {
  const navigate = useNavigate();
  return (
    <div
      className="h-[780px] overflow-clip relative shrink-0 w-[1440px]"
      data-name="Concept"
      style={{ contain: "layout style paint" }}
    >
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-gradient-to-r from-[#dad0ad] inset-0 to-[#fff1c2]" />
        <div
          className="absolute bg-size-[1024px_1024px] bg-top-left inset-0 opacity-59"
          style={{ backgroundImage: `url("${data.bgTextureImg}")` }}
        />

        {data.bgPatternImg && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${data.bgPatternImg}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.02,
            }}
          />
        )}
        {data.logoImg && (
          <img
            alt=""
            className="absolute max-w-none object-cover opacity-2 size-full"
            src={data.logoImg}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      {/* Glow blobs */}
      <div
        aria-hidden
        className="absolute left-[calc(33.33%+102px)] size-[581px] top-[649px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FFF1C7 0%, rgba(255,241,199,0.6) 30%, transparent 70%)",
          filter: "blur(60px)",
          borderRadius: "50%",
          willChange: "auto",
        }}
      />
      <div
        aria-hidden
        className="absolute left-[calc(75%+83px)] size-[365px] top-[-184px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FFF1C7 0%, rgba(255,241,199,0.6) 30%, transparent 70%)",
          filter: "blur(50px)",
          borderRadius: "50%",
          willChange: "auto",
        }}
      />

      {/* Optional logo top-left */}
      {data.logoImg && (
     <div
     className="absolute h-[59px] left-[34px] top-[22px] w-[119px] cursor-pointer"
     data-name="Primary Logos"
     onClick={() => navigate("/")}
   >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={data.logoImg}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {/* Main right-side image */}
      <div
        className="absolute h-[670px] left-[calc(39.5%+15px)] top-[71px] w-[805px]"
        data-name="image 57"
        data-anim="reveal"
        data-anim-variant="zoom"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={data.mainImg}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Concept heading */}
      <div
        className="[word-break:break-word] absolute font-['Instrument_Serif',sans-serif] leading-[0] left-[calc(8.33%-96px)] not-italic text-[64px] top-[260px] whitespace-nowrap"
        style={{ color: data.headingColor }}
        data-anim="reveal"
        data-anim-variant="text"
        data-anim-blur="6"
        data-anim-delay="0.05"
      >
        <p className="leading-[0.9] mb-0 whitespace-pre">{data.headingLine1}</p>
        <p className="font-['Instrument_Serif',sans-serif] italic leading-[0.9] whitespace-pre">
          {data.headingLine2}
        </p>
      </div>

      {/* "Concept" label */}
      <p
        className="[word-break:break-word] absolute font-['Instrument_Serif',sans-serif] leading-[0.9] left-[calc(4.17%-31px)] not-italic text-[16px] top-[229px] whitespace-nowrap"
        style={{ color: data.headingColor }}
        data-anim="reveal"
        data-anim-variant="text"
      >
        Concept
      </p>

      {/* Sub-description */}
      <p
        className="[word-break:break-word] absolute font-['Hanken_Grotesk',sans-serif] leading-[normal] left-[24px] not-italic text-[14px] text-[rgba(0,0,0,0.6)] top-[392px] w-[233px]"
        data-anim="reveal"
        data-anim-variant="text"
        data-anim-delay="0.12"
      >
        {data.subDescription}
      </p>

      {/* Body paragraphs */}
      <div
        className="[word-break:break-word] absolute bottom-[251px] font-['Hanken_Grotesk',sans-serif] leading-[0] left-[24px] not-italic text-[rgba(0,0,0,0.6)] translate-y-full w-[467px] whitespace-pre-wrap"
        style={{ fontSize: "18px" }}
        data-anim="reveal"
        data-anim-variant="text"
        data-anim-delay="0.18"
      >
        <p className="leading-[normal] mb-0">{data.bodyParagraph1}</p>
        <p className="leading-[normal] mb-0">​</p>
        <p className="leading-[normal]">{data.bodyParagraph2}</p>
      </div>

      <NavButton strokeColor={data.navStrokeColor} leftCalc={data.navLeftCalc} />
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Screen 3 – Experience Overview (scattered images)
// ─────────────────────────────────────────────────────────────────────────────
const ExperienceScreen = memo(function ExperienceScreen({ data }: { data: ProjectData["experience"] }) {
  const navigate = useNavigate();
  return (
    <div
      className="h-[780px] overflow-clip relative shrink-0 w-[1440px]"
      data-name="Experience"
      style={{ contain: "layout style paint" }}
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundColor: data.bgColor }} />
        <div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `url("${data.bgTextureImg}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Scattered images */}
      {data.images.map((img, i) => (
        <div
          key={i}
          className={img.className}
          data-anim="reveal"
          data-anim-variant="text"
          data-anim-delay={(0.06 * i).toFixed(2)}
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={img.src}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}

      {/* "The Experience" centred text block */}
      <div
        className="[word-break:break-word] absolute content-stretch flex flex-col gap-[20px] items-center left-[calc(33.33%+29px)] not-italic text-[#dad0ad] text-center top-[378px] w-[452px]"
        data-anim="reveal"
        data-anim-variant="text"
        data-anim-blur="6"
        data-anim-delay="0.1"
      >
        <p className="font-['Instrument_Serif',sans-serif] leading-[0] min-w-full relative shrink-0 text-[0px] w-[min-content]">
          <span className="leading-[0.9] text-[84px]">The </span>
          <span className="font-['Instrument_Serif',sans-serif] italic leading-[0.9] text-[84px]">
            Experience
          </span>
        </p>
        <p className="font-['Hanken_Grotesk',sans-serif] leading-[normal] relative shrink-0 text-[13px] w-[320px]">
          {data.experienceSubtitle}
        </p>
      </div>

      {/* Logo top-left */}
      <div
  className="absolute h-[52px] left-[11px] top-[20px] w-[104px] cursor-pointer"
  data-name="Component 20"
  onClick={() => navigate("/")}
>
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={data.logoImg}
          loading="lazy"
          decoding="async"
        />
      </div>

      <NavButton strokeColor={data.navStrokeColor} leftCalc={data.navLeftCalc} top="21px" />
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Screens 4-6 – Gallery screens (3 per project)
// ─────────────────────────────────────────────────────────────────────────────
const GalleryScreenItem = memo(function GalleryScreenItem({
  screen,
  bgColor,
  bgTextureImg,
}: {
  screen: GalleryScreen;
  bgColor: string;
  bgTextureImg: string;
}) {
  const containerH = screen.containerHeightClass ?? "h-[716px]";
  const alignClass = screen.alignClass ?? "items-end";

  return (
    <div
      className="h-[780px] overflow-clip relative shrink-0 w-[1440px]"
      data-name="Experience"
      style={{ contain: "layout style paint" }}
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundColor: bgColor }} />
        <div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `url("${bgTextureImg}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Images container */}
      <div
        className={`absolute content-stretch flex gap-[24px] ${containerH} items-end left-[24px] top-[32px] w-[1392px]`}
      >
        {screen.images.map((img, i) => {
          const isFlexGrow = !img.widthClass;
          return (
            <div
              key={i}
              className={[
                isFlexGrow ? "flex-[1_0_0] min-w-px relative" : `relative shrink-0`,
                img.heightClass,
                img.widthClass ?? "",
              ]
                .filter(Boolean)
                .join(" ")}
              data-name={`gallery-img-${i}`}
              data-anim="reveal"
              data-anim-variant="zoom"
              data-anim-delay={(0.09 * i).toFixed(2)}
            >
              <img
                alt=""
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={img.src}
                loading="lazy"
                decoding="async"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Screens 7-8 (optional) – Extra full-image screens (Project 2 only)
// ─────────────────────────────────────────────────────────────────────────────
const FullImageScreenItem = memo(function FullImageScreenItem({
  screen,
  bgColor,
}: {
  screen: FullImageScreen;
  bgColor: string;
}) {
  const widthPx = screen.widthPx ?? 1129;

  return (
    <div
      className="h-[780px] overflow-clip relative shrink-0"
      style={{ width: `${widthPx}px`, backgroundColor: bgColor, contain: "layout style paint" }}
      data-name="Experience"
    >
      <div
        className="absolute content-stretch flex h-[721px] items-end left-[24px] top-[29px]"
        style={{ width: `${widthPx - 24 * 2}px` }}
      >
        <div className="flex flex-row items-end self-stretch">
          <div
            className="h-full relative shrink-0"
            style={{ width: `${widthPx - 24 * 2}px` }}
            data-name="full-image"
            data-anim="reveal"
            data-anim-variant="zoom"
          >
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={screen.src}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Last screen – Testimonial
// ─────────────────────────────────────────────────────────────────────────────
const TestimonialScreen = memo(function TestimonialScreen({ data }: { data: ProjectData["testimonial"] }) {
  return (
    <div
      className="h-[780px] overflow-clip relative shrink-0 w-[1440px]"
      style={{ backgroundColor: data.testimonialBgColor, contain: "layout style paint" }}
      data-name="testtimonial"
    >
      {/* Testimonial text block */}
      <div
        className="absolute content-stretch flex flex-col gap-[16px] items-start left-[calc(33.33%+30px)] top-[191px] w-[587px]"
        data-anim="reveal"
        data-anim-variant="text"
        data-anim-blur="6"
        data-anim-delay="0.05"
      >
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-[496px]">
          <p
            className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[normal] not-italic relative shrink-0 text-[64px] text-center whitespace-nowrap"
            style={{ color: data.quoteAccentColor }}
          >
            Client Testimonial
          </p>
        </div>
        <p className="[word-break:break-word] font-['Cormorant_Garamond',serif]  leading-[normal] min-w-full italic relative shrink-0 text-[22px] text-[#3A3636CC] w-[min-content]">
          {data.quote}
        </p>
        <p className="[word-break:break-word] font-['Cormorant_Garamond',serif]  leading-[normal] min-w-full italic relative shrink-0 text-[18px] text-[#3A3636CC] w-[min-content]">
          {data.attribution}
        </p>
      </div>

      {/* Large quote mark */}
      <div
        className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Cormorant_Garamond',serif] font-semibold justify-center leading-[0] left-[calc(58.33%+83px)] not-italic text-[128px] top-[233px] whitespace-nowrap"
        style={{ color: data.quoteAccentColor }}
        data-anim="reveal"
        data-anim-variant="fade"
        data-anim-delay="0.25"
      >
        <p className="leading-[normal]">"</p>
      </div>

      {/* Accent line */}
      <div className="absolute h-0 left-[calc(33.33%+32px)] top-[450px] w-[132px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 132 1">
            <line stroke={data.lineColor} x2="132" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>

      {/* Monogram image top-left */}
      <div
        className="absolute h-[451px] left-0 top-[10px] w-[320px]"
        data-name="monogram_final4 2"
        data-anim="reveal"
        data-anim-variant="zoom"
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={data.monogramImg}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Rotated banner right-side */}
      <div className="absolute bottom-[-0.85px] flex h-[780.844px] items-center justify-center right-[-55.7px] w-[132.703px]">
        <div className="flex-none rotate-[90.14deg]">
          <div className="h-[130.751px] relative w-[780.52px]">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={data.rotatedBannerImg}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* Credits + enquiry row */}
      <div className="absolute content-stretch flex items-end justify-between left-[24px] top-[554px] w-[1313px]">
        {/* Credits list */}
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
          {data.credits.map((credit, i) => (
            <React.Fragment key={i}>
              <div
                className="[word-break:break-word] flex flex-col font-['Hanken_Grotesk',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[22px] whitespace-nowrap"
                style={{ color: data.quoteAccentColor }}
              >
                <p className="leading-[normal]">
                  {credit.label}: {credit.value}
                </p>
              </div>
              {i < data.credits.length - 1 && (
                <div className="h-0 relative shrink-0 w-[327px]">
                  <div className="absolute inset-[-0.6px_0_0_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 327 0.6">
                      <line stroke="#846C43" strokeOpacity="0.7" strokeWidth="0.6" x2="327" y1="0.3" y2="0.3" />
                    </svg>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Enquiry block */}
        <div className="content-stretch flex flex-col h-[134px] items-end justify-between relative shrink-0">
          <div className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#747272] text-[0px] text-right w-[439px]">
            <p className="font-['Hanken_Grotesk',sans-serif] leading-[normal] mb-0 text-[22px]">
              We would love to hear from you;
            </p>
            <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['Hanken_Grotesk',sans-serif] leading-[normal] text-[22px] underline">
              {data.enquiryEmail}
            </p>
          </div>
          <div className="content-stretch flex items-center relative shrink-0">
            <div
              className="bg-[rgba(112,48,0,0.08)] content-stretch flex items-center justify-center px-[16px] py-[12px] relative rounded-[59px] shrink-0"
            >
              <div
                aria-hidden
                className="absolute border border-solid inset-0 pointer-events-none rounded-[59px]"
                style={{ borderColor: data.quoteAccentColor }}
              />
              <p
                className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[16px] tracking-[-0.48px] whitespace-nowrap"
                style={{ color: data.quoteAccentColor }}
              >
                Send an Enquiry
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Compute total scroll width
// ─────────────────────────────────────────────────────────────────────────────
function computeTotalWidth(project: ProjectData): number {
  const baseWidth = 7 * 1440;
  const extraWidth =
    project.extraFullImageScreens?.reduce(
      (sum, s) => sum + (s.widthPx ?? 1129),
      0
    ) ?? 0;
  return baseWidth + extraWidth;
}

// ═════════════════════════════════════════════════════════════════════════════
// MOBILE / TABLET COMPONENTS  (<1024px — vertical scroll)
// ═════════════════════════════════════════════════════════════════════════════

// ─── Mobile Navbar ────────────────────────────────────────────────────────────
// ─── Mobile Navbar ────────────────────────────────────────────────────────────
function MobileProjectNav({ logoImg, bgColor, bgTextureImg }: { 
  logoImg?: string; 
  bgColor: string;
  bgTextureImg: string;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Home", to: "/home" },
    { label: "About", to: "/about" },
    { label: "Projects", to: "/projects/project-1" },
    { label: "Journal", to: "/journal" },
    { label: "Moodboard", to: "/" },
    { label: "Contact", to: "/contact" },
  ];

  function isNavActive(label: string): boolean {
    if (label === "Home") return pathname === "/home";
    if (label === "Projects") return pathname.startsWith("/projects");
    if (label === "About") return pathname === "/about";
    if (label === "Journal") return pathname.startsWith("/journal");
    if (label === "Moodboard") return pathname === "/";
    return false;
  }

  return (
    <>
      {/* Sticky mobile navbar */}
      <div
        className="sticky top-0 left-0 right-0 z-[100] w-full flex items-center justify-between px-5 py-4"
        style={{
          backgroundColor: bgColor,
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(218,208,173,0.15)",
        }}
      >

<div
  aria-hidden
  style={{
    position: "absolute", inset: 0,
    backgroundImage: `url("${bgTextureImg}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.06,
    pointerEvents: "none",
  }}
/>
        {/* Logo */}
        {logoImg ? (
          <div
            className="h-[40px] w-[88px] relative cursor-pointer shrink-0"
            onClick={() => navigate("/home")}
          >
            <img
              alt="Studio Inside Eye"
              className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
              src={logoImg}
            />
          </div>
        ) : (
          <div
            className="font-['Instrument_Serif',sans-serif] text-[#dad0ad] text-[18px] cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Studio Inside Eye
          </div>
        )}

        {/* Hamburger */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(218,208,173,0.12)",
            border: "1.5px solid rgba(218,208,173,0.3)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="16" height="12" viewBox="0 0 18 14" fill="none">
            <line x1="0" y1="1" x2="18" y2="1" stroke="#DAD0AD" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="7" x2="18" y2="7" stroke="#DAD0AD" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="13" x2="18" y2="13" stroke="#DAD0AD" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Slide-in drawer — Navbar.tsx-style 4-column scaleY animation */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: drawerOpen ? "all" : "none",
          overflow: "hidden",
          opacity: drawerOpen ? 1 : 0,
          transition: drawerOpen ? "opacity 0s 0s" : "opacity 0.35s ease 0s",
        }}
      >
        {[
          { delay: 0,   duration: 0.65 },
          { delay: 0.1, duration: 0.65 },
          { delay: 0.2, duration: 0.65 },
          { delay: 0.3, duration: 0.65 },
        ].map((col, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${i * 25}%`,
              width: i < 3 ? "calc(25% + 1px)" : "25%",
              background: bgColor,
              transform: drawerOpen ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "bottom",
              transition: drawerOpen
                ? `transform ${col.duration}s cubic-bezier(0.76, 0, 0.24, 1) ${col.delay}s`
                : "none",
              overflow: "hidden",
            }}
          />
        ))}

        {/* Texture overlay on drawer background */}
     {/* Texture layer 1 - multiply 0.6 */}
<div
  aria-hidden
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imgDrawerTexture}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    mixBlendMode: "multiply",
    opacity: drawerOpen ? 0.3 : 0,
    pointerEvents: "none",
    transition: drawerOpen ? "opacity 0.3s ease 0.65s" : "opacity 0.2s ease 0s",
    zIndex: 2,
  }}
/>
{/* Texture layer 2 - multiply 0.6 */}
<div
  aria-hidden
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imgDrawerTexture}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    mixBlendMode: "multiply",
    opacity: drawerOpen ? 0.7 : 0,
    pointerEvents: "none",
    transition: drawerOpen ? "opacity 0.3s ease 0.65s" : "opacity 0.2s ease 0s",
    zIndex: 3,
  }}
/>

        {/* Close button */}
        <button
          onClick={() => setDrawerOpen(false)}
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
            opacity: drawerOpen ? 1 : 0,
            transition: drawerOpen ? "opacity 0.3s ease 0.85s" : "none",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <line x1="3" y1="3" x2="17" y2="17" stroke="#DAD0AD" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="17" y1="3" x2="3" y2="17" stroke="#DAD0AD" strokeWidth="1.6" strokeLinecap="round" />
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
         {navLinks.map((item, index) => (
  <a
    key={item.label}
    href={item.to}
    onClick={(e) => {
      e.preventDefault();
      setDrawerOpen(false);
      navigate(item.to);
    }}
    style={{
      fontFamily: "'Poppins', sans-serif",
      fontSize: 22,
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: "0",
      color: "#DAD0AD",
      textDecoration: isNavActive(item.label) ? "underline" : "none",
      textDecorationColor: "#DAD0AD",
      textUnderlineOffset: "4px",
      padding: "14px 0",
      borderBottom:
        index < navLinks.length - 1
          ? "1px solid #DAD0AD"
          : "none",
      opacity: drawerOpen ? 1 : 0,
      transform: drawerOpen
        ? "translateY(0)"
        : "translateY(24px)",
      transition: drawerOpen
        ? `opacity 0.45s ease ${0.85 + index * 0.07}s,
           transform 0.45s ease ${0.85 + index * 0.07}s`
        : "none",
    }}
  >
    {item.label}
  </a>
))}
        </nav>

        {/* Bottom logo */}
        {logoImg && (
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
              opacity: drawerOpen ? 1 : 0,
              transform: drawerOpen ? "scale(1)" : "scale(0.92)",
              transition: drawerOpen
                ? `opacity 1.4s ease ${0.85 + navLinks.length * 0.07}s`
                : "none",
            }}
          >
            <img
              src={logoImg}
              alt="Studio Inside Eye"
              style={{
                width: "auto",
                maxWidth: "300px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

// ─── Mobile Section Label ─────────────────────────────────────────────────────
function MobileSectionLabel({ number, label, color }: { number: string; label: string; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="font-['Hanken_Grotesk',sans-serif] text-[11px] tracking-[0.15em] uppercase opacity-50"
        style={{ color }}
      >
        {number}
      </span>
      <div className="flex-1 h-px opacity-20" style={{ backgroundColor: color }} />
      <span
        className="font-['Hanken_Grotesk',sans-serif] text-[11px] tracking-[0.15em] uppercase opacity-50"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Mobile: Intro Section ────────────────────────────────────────────────────
function MobileIntroSection({ data, mainImg, bgTextureImg }: { 
  data: ProjectData["intro"]; 
  mainImg: string;
  bgTextureImg: string;
}) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* ── Top: Maroon hero panel ── */}
      <div
        className="relative w-full px-6 pt-8 pb-12"
        style={{ backgroundColor: data.heroPanelBg }}
      >
        {/* Overlay tint */}
        <div
  aria-hidden
  className="absolute inset-0 pointer-events-none"
  style={{ backgroundColor: data.heroPanelOverlayBg }}
/>
<div
  aria-hidden
  className="absolute inset-0 pointer-events-none"
  style={{ backgroundImage: `url("${bgTextureImg}")`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06 }}
/>

        <div className="relative">
          {/* AREA caption row */}
          <div className="flex items-center justify-between mb-5">
            <span
              className="font-['EuropaNuova-Regular',sans-serif] uppercase"
              style={{ fontSize: "clamp(10px, 2.6vw, 12px)", letterSpacing: "0.15em", color: "#dad0ad", opacity: 0.75 }}
            >
              Area
            </span>
            <span
              className="font-['EuropaNuova-Regular',sans-serif] uppercase"
              style={{ fontSize: "clamp(10px, 2.6vw, 12px)", letterSpacing: "0.15em", color: "#dad0ad", opacity: 0.75 }}
            >
              {data.sqft}
            </span>
          </div>

          {/* Framed portrait image */}
          <div
            className="relative w-full p-[10px]"
            style={{ aspectRatio: "4/5", border: "1px solid rgba(218,208,173,0.35)" }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                alt={`${data.projectName} project`}
                className="absolute inset-0 w-full h-full object-cover"
                src={data.heroPortraitImg}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* COMPLETED caption row */}
          <div className="flex items-center justify-between mt-5 mb-10">
            <span
              className="font-['EuropaNuova-Regular',sans-serif] uppercase"
              style={{ fontSize: "clamp(10px, 2.6vw, 12px)", letterSpacing: "0.15em", color: "#dad0ad", opacity: 0.75 }}
            >
              Completed
            </span>
            <span
              className="font-['EuropaNuova-Regular',sans-serif] uppercase"
              style={{ fontSize: "clamp(10px, 2.6vw, 12px)", letterSpacing: "0.15em", color: "#dad0ad", opacity: 0.75 }}
            >
              {data.year}
            </span>
          </div>

          {/* Big project title */}
          <p
            className="font-['Instrument_Serif',sans-serif] text-center leading-none uppercase"
            style={{ fontSize: "clamp(64px, 22vw, 110px)", color: "#dad0ad", letterSpacing: "-0.03em" }}
          >
            {data.projectName}
          </p>
        </div>
      </div>

      {/* ── Bottom: Cream content panel ── */}
      <div
        className="relative w-full px-6 pt-12 pb-12"
        style={{ background: "linear-gradient(135deg, #dad0ad 0%, #fff1c2 100%)" }}
      >
        {/* Project name */}
        <p
          className="font-['Instrument_Serif',sans-serif] leading-none mb-4 uppercase"
          style={{ fontSize: "clamp(40px, 13vw, 64px)", color: data.heroPanelBg, letterSpacing: "-0.02em" }}
        >
          {data.projectName}
        </p>

        {/* Description */}
        <p
          className="font-['Hanken_Grotesk',sans-serif] leading-[1.65] mb-10 opacity-75"
          style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "rgba(0,0,0,0.65)" }}
        >
          {data.description}
        </p>

        {/* Secondary image */}
        <div className="w-full rounded-[2px] overflow-hidden mb-10" style={{ aspectRatio: "4/3" }}>
          <img
            alt={`${data.projectName} detail`}
            className="w-full h-full object-cover"
            src={mainImg}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Texture pattern swatch */}
        <div className="flex justify-end mb-8">
          <div
            aria-hidden
            className="w-[120px] h-[64px] rounded-[2px]"
            style={
              data.decorativeTopRightImg
                ? {
                    backgroundImage: `url("${data.decorativeTopRightImg}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {
                    backgroundImage:
                      "repeating-linear-gradient(90deg, #b5563b 0px, #b5563b 2px, transparent 2px, transparent 4px)",
                    backgroundColor: "rgba(139,44,27,0.08)",
                  }
            }
          />
        </div>

        {/* Side paragraph */}
        <p
          className="font-['Hanken_Grotesk',sans-serif] leading-[1.7] text-center opacity-70"
          style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "rgba(0,0,0,0.6)" }}
        >
          {data.sideParagraph}
        </p>
      </div>
    </section>
  );
}

// ─── Mobile: Concept Section ──────────────────────────────────────────────────
// ─── Mobile: Concept Section ──────────────────────────────────────────────────
function MobileConceptSection({ data }: { data: ProjectData["concept"] }) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "linear-gradient(135deg, #dad0ad 0%, #fff1c2 100%)" }}
    >
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-size-[1024px_1024px] bg-top-left opacity-59"
          style={{ backgroundImage: `url("${data.bgTextureImg}")` }}
        />
        {data.bgPatternImg && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${data.bgPatternImg}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.02,
            }}
          />
        )}
        {data.logoImg && (
          <img
            alt=""
            className="absolute max-w-none object-cover opacity-2 size-full"
            src={data.logoImg}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className="relative px-6 pt-12 pb-10">
        <MobileSectionLabel number="02" label="Concept" color={data.headingColor} />

        {/* Heading */}
        <div className="mb-4">
          <p
            className="font-['Instrument_Serif',sans-serif] leading-[0.9]"
            style={{
              fontSize: "clamp(44px, 13vw, 72px)",
              color: data.headingColor,
            }}
          >
            {data.headingLine1}
          </p>
          <p
            className="font-['Instrument_Serif',sans-serif] italic leading-[0.9]"
            style={{
              fontSize: "clamp(44px, 13vw, 72px)",
              color: data.headingColor,
            }}
          >
            {data.headingLine2}
          </p>
        </div>

        {/* Sub-description — BEFORE image */}
        <p
          className="font-['Hanken_Grotesk',sans-serif] leading-[1.6] mb-6 opacity-70"
          style={{
            fontSize: "clamp(13px, 3.5vw, 15px)",
            color: data.headingColor,
          }}
        >
          {data.subDescription}
        </p>

        {/* Main image */}
        <div
          className="w-full rounded-[2px] overflow-hidden mb-8"
          style={{ aspectRatio: "3/4" }}
        >
          <img
            alt="Concept"
            className="w-full h-full object-cover"
            src={data.mainImg}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Body paragraphs */}
        <div
          className="font-['Hanken_Grotesk',sans-serif] leading-[1.7]"
          style={{
            fontSize: "clamp(14px, 3.8vw, 16px)",
            color: "rgba(0,0,0,0.65)",
          }}
        >
          <p className="mb-4">{data.bodyParagraph1}</p>
          <p>{data.bodyParagraph2}</p>
        </div>
      </div>
    </section>
  );
}
// ─── Mobile: Experience Section ───────────────────────────────────────────────
function MobileExperienceSection({ data }: { data: ProjectData["experience"] }) {
  const images = data.images.slice(0, 5);

  const heroImg = images[0];
  const gridImgs = images.slice(1);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: data.bgColor }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${data.bgTextureImg}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.06,
        }}
      />

      <div className="relative pt-12 pb-10">

        {/* Hero image — centered, ~65% width */}
        {heroImg && (
          <div className="flex justify-center mb-8 px-6">
            <div
              className="overflow-hidden rounded-[2px]"
              style={{ width: "65%", aspectRatio: "3/4" }}
            >
              <img
                alt=""
                className="w-full h-full object-cover"
                src={heroImg.src}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        )}

        {/* Heading */}
        <div className="mb-5 text-center px-6">
          <p
            className="font-['Instrument_Serif',sans-serif] leading-[1]"
            style={{
              fontSize: "clamp(40px, 12vw, 68px)",
              color: "#dad0ad",
            }}
          >
            The <span className="italic">Experience</span>
          </p>
        </div>

        {/* Subtitle */}
        <p
          className="font-['Hanken_Grotesk',sans-serif] leading-[1.6] text-center mb-12 px-8"
          style={{
            fontSize: "clamp(13px, 3.5vw, 15px)",
            color: "rgba(218,208,173,0.75)",
          }}
        >
          {data.experienceSubtitle}
        </p>

        {/* Bottom grid — smaller images, more gap, horizontal padding */}
        {gridImgs.length > 0 && (
          <div className="grid grid-cols-2 gap-10 px-5 pt-8">
            {gridImgs.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[2px]"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  alt=""
                  className="w-full h-full object-cover"
                  src={img.src}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

// ─── Mobile: Gallery Section ─────────────────────────────────────────────────
function MobileGallerySection({
  screens,
  bgColor,
  bgTextureImg,
  extraScreens,
}: {
  screens: GalleryScreen[];
  bgColor: string;
  bgTextureImg: string;
  extraScreens?: FullImageScreen[];
}) {
  const twoImages = screens.flatMap((screen) => screen.images).slice(0, 2);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${bgTextureImg}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.06,
        }}
      />

      <div className="relative px-6 pt-12 pb-10">
        <MobileSectionLabel number="04" label="Gallery" color="#dad0ad" />

        <div className="flex flex-col gap-8">
          {twoImages.map((img, i) => (
            <div
              key={i}
              className="w-full overflow-hidden rounded-[2px]"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                alt=""
                className="w-full h-full object-cover"
                src={img.src}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Mobile: Testimonial Section ──────────────────────────────────────────────
function MobileTestimonialSection({ data }: { data: ProjectData["testimonial"] }) {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: data.testimonialBgColor }}
    >
      {/* ── Top block: Monogram + Heading ── */}
      <div className="relative px-6 pt-10 pb-0">
        {/* Monogram — top-left, large ~45% width */}
        <div
          className="mb-4"
          style={{ width: "45%", maxWidth: "160px" }}
        >
          <img
            alt=""
            className="w-full h-auto object-contain"
            src={data.monogramImg}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* "Client Testimonial" heading — below monogram, left-aligned */}
        <h2
          className="font-['Instrument_Serif',sans-serif] leading-[1.05] mb-4 ml-12"
          style={{
            fontSize: "clamp(30px, 9vw, 48px)",
            color: data.quoteAccentColor,
          }}
        >
          Client Testimonial
        </h2>
      </div>

      {/* ── Quote block ── */}
      <div className="px-6 pb-0 ml-12 font-semibold">
        <p
          className="font-['Cormorant_Garamond',serif] italic leading-[1.55] mb-5"
          style={{
            fontSize: "clamp(15px, 4vw, 19px)",
            color: "rgba(58,54,54,0.85)",
          }}
        >
          {data.quote}
        </p>

        {/* Attribution — italic, no dash prefix in image but keep for semantic */}
        <p
          className="font-['Cormorant_Garamond',serif] italic mb-10"
          style={{
            fontSize: "clamp(14px, 3.8vw, 17px)",
            color: "rgba(58,54,54,0.75)",
          }}
        >
          {data.attribution}
        </p>
      </div>
      {/* ── Divider ── */}
      <div
        className="mx-6 mb-8"
        style={{
          height: "1px",
          backgroundColor: data.quoteAccentColor,
          opacity: 0.15,
        }}
      />

      {/* ── Enquiry block ── */}
      <div className="px-6 pb-0 text-end">
        <p
          className="font-['Hanken_Grotesk',sans-serif] mb-1"
          style={{
            fontSize: "clamp(13px, 3.5vw, 15px)",
            color: "#747272",
            opacity: 0.75,
          }}
        >
          We would love to hear from you;
        </p>
        <a
          href={`mailto:${data.enquiryEmail}`}
          className="block mb-8"
          style={{
            fontSize: "clamp(13px, 3.5vw, 15px)",
            color: "#747272",
            fontFamily: "'Hanken Grotesk', sans-serif",
            textDecoration: "underline",
            textDecorationColor: "#747272",
            opacity: 0.85,
          }}
        >
          {data.enquiryEmail}
        </a>

        {/* Send Enquiry pill button */}
        <div className="flex justify-end mb-10">
          <button
            onClick={() => navigate("/contact")}
            className="flex items-center justify-center px-8 py-3 rounded-[59px] transition-opacity hover:opacity-80"
            style={{
              background: "transparent",
              border: `1px solid ${data.quoteAccentColor}`,
              color: data.quoteAccentColor,
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "clamp(13px, 3.5vw, 15px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              cursor: "pointer",
            }}
          >
            Send an Enquiry
          </button>
        </div>
      </div>

      {/* ── Bottom decorative banner strip (rotated banner image used as full-width strip) ── */}
      <div
        className="w-full overflow-hidden"
        style={{ height: "32px" }}
      >
        <img
          alt=""
          className="w-full h-full object-cover object-center"
          src={data.rotatedBannerImg}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// MobileProjectPage – Full vertical-scroll mobile layout
// ─────────────────────────────────────────────────────────────────────────────
function MobileProjectPage({ project }: { project: ProjectData }) {
  const logoImg = project.intro.logoImg ?? project.experience.logoImg;
  const navBgColor = project.intro.heroPanelBg;

  return (
    <div
      className="w-full min-h-screen overflow-x-hidden"
      style={{ backgroundColor: project.intro.heroPanelBg }}
    >
      {/* Sticky Mobile Navbar */}
      <MobileProjectNav 
  logoImg={logoImg} 
  bgColor={navBgColor}
  bgTextureImg={project.experience.bgTextureImg}
/>

      {/* Screen 1: Intro */}
      <MobileIntroSection 
  data={project.intro} 
  mainImg={project.concept.mainImg}
  bgTextureImg={project.experience.bgTextureImg}
/>

      {/* Screen 2: Concept */}
      <MobileConceptSection data={project.concept} />

      {/* Screen 3: Experience */}
      <MobileExperienceSection data={project.experience} />

      {/* Screens 4-6+: Gallery (all gallery screens merged) */}
      <MobileGallerySection
        screens={project.galleryScreens}
        bgColor={project.galleryBgColor}
        bgTextureImg={project.galleryBgTextureImg}
        extraScreens={project.extraFullImageScreens}
      />

      {/* Last screen: Testimonial */}
      <MobileTestimonialSection data={project.testimonial} />

  
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DesktopProjectPage – Original horizontal scroll, now height-responsive
//
// PROBLEM: All desktop screens are hardcoded to 780px height (Figma frame),
// with children absolutely positioned using fixed px offsets relative to that
// 780px frame. On viewports where the actual height != 780px, this either
// clips content (height < 780) or leaves empty space (height > 780).
//
// FIX: Render the entire 1440x780-based scroll strip at its native size,
// then apply a CSS transform: scale() to a wrapper based on the ratio of the
// real viewport height to 780px. This scales every absolute position, font
// size, image, etc. uniformly — preserving the exact Figma proportions and
// relative layout — while making the whole composition fit the user's actual
// screen height. The outer scroll container is sized to the scaled content
// dimensions so horizontal scrolling still spans the full (scaled) content.
// ─────────────────────────────────────────────────────────────────────────────
function DesktopProjectPage({ project }: { project: ProjectData }) {
  const totalWidth = useMemo(() => computeTotalWidth(project), [project]);
  const DESIGN_HEIGHT = 780; // Figma frame height all screens are built against

  // Track the real viewport height so we can compute a scale factor.
  // Defaults to DESIGN_HEIGHT (scale = 1) until mounted, avoiding SSR issues.
  const [viewportHeight, setViewportHeight] = useState<number>(
    typeof window !== "undefined" ? window.innerHeight : DESIGN_HEIGHT
  );

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    handleResize(); // sync immediately on mount in case of SSR mismatch
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ratio of the user's real viewport height to the 780px Figma design height.
  // scale > 1 on tall screens (content grows), scale < 1 on short screens
  // (content shrinks) — proportions/positions stay identical either way.
  const scale = viewportHeight / DESIGN_HEIGHT;

  // The visually-rendered width of the content after scaling. The outer
  // scroll container needs this width so the scrollbar/scroll range matches
  // what's actually visible (transform doesn't change layout size of
  // ancestors, so we set it manually here).
  const scaledWidth = totalWidth * scale;

  // ── Scroll-linked reveals for the horizontal journey ───────────────────────
  // As each screen AFTER the intro scrolls into the horizontal viewport, its
  // tagged elements wipe/settle in — the same quiet-luxury language as the
  // intro, scoped to this scroll container. The intro screen owns its own
  // entrance (data-reveal-*) and the shared-element target is never tagged, so
  // the Home → Project morph and the intro choreography stay exactly as-is.
  const scrollRef = useRef<HTMLDivElement>(null);
  useReveal(scrollRef, {
    scrollRoot: scrollRef,
    rootMargin: "0px -7% 0px -7%",
    forceMotion: true, // project page plays its reveal even if OS Reduce Motion is ON
  });

  return (
    <div
      ref={scrollRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      {/* Outer sizing wrapper — dimensions reflect the SCALED size */}
      <div style={{ width: `${scaledWidth}px`, height: "100vh", position: "relative" }}>
        {/*
          Inner wrapper — rendered at native Figma size (totalWidth x 780px),
          then scaled from the top-left corner via CSS transform. Every child
          below this point is 100% identical to the original implementation;
          nothing inside has been modified.
        */}
        <div
          style={{
            width: `${totalWidth}px`,
            height: `${DESIGN_HEIGHT}px`,
            position: "absolute",
            top: 0,
            left: 0,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* Scroll strip */}
          <div className="content-stretch flex items-center relative size-full">
            {/* Screen 1 – Intro */}
            <IntroScreen data={project.intro} />

            {/* Screen 2 – Concept */}
            <ConceptScreen data={project.concept} />

            {/* Screen 3 – Experience overview */}
            <ExperienceScreen data={project.experience} />

            {/* Screens 4-6 – Gallery */}
            {project.galleryScreens.map((screen, i) => (
              <GalleryScreenItem
                key={`gallery-${i}`}
                screen={screen}
                bgColor={project.galleryBgColor}
                bgTextureImg={project.galleryBgTextureImg}
              />
            ))}

            {/* Screens 7-8 (optional) – Extra full-image screens */}
            {project.extraFullImageScreens?.map((screen, i) => (
              <FullImageScreenItem
                key={`extra-${i}`}
                screen={screen}
                bgColor={project.galleryBgColor}
              />
            ))}

            {/* Last screen – Testimonial */}
            <TestimonialScreen data={project.testimonial} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProjectPage – The exported reusable component
// Renders desktop horizontal scroll on ≥1024px, mobile vertical scroll on <1024px
// ─────────────────────────────────────────────────────────────────────────────
interface ProjectPageProps {
  project: ProjectData;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  return (
    <>
      {/* ── DESKTOP (≥1024px): Original horizontal scroll, now scaled to fit any viewport height ── */}
      <div className="hidden lg:block">
        <DesktopProjectPage project={project} />
      </div>

      {/* ── MOBILE / TABLET (<1024px): Premium vertical scroll layout — unchanged ── */}
      <div className="lg:hidden">
        <MobileProjectPage project={project} />
      </div>
    </>
  );
}