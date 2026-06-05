// ─────────────────────────────────────────────────────────────────────────────
// ProjectPage – Single reusable component that renders any project.
// Layout, spacing, and structure are pixel-perfect from the Figma designs.
// Only data changes between projects; zero layout code is duplicated.
// ─────────────────────────────────────────────────────────────────────────────
import React, { memo, useMemo } from "react";
import type { ProjectData, GalleryScreen, FullImageScreen } from "../../../data/types";
import svgPaths from "../../../assets/svgPaths";

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

/** Left-arrow back button row (Intro screen) */
const BackButton = memo(function BackButton() {
  return (
    <div className="absolute content-stretch flex flex-col gap-px items-center left-[9px] top-[736px] w-[147px]">
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
  return (
    <div
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
      <div className="absolute bottom-[147px] h-[129px] right-[47px] w-[266px]">
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
        <p
          className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-none not-italic relative shrink-0 text-[100px] tracking-[-4px] whitespace-nowrap"
          style={{ color: data.projectNameColor }}
        >
          {data.projectName}
        </p>
        <p className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)] w-full">
          {data.description}
        </p>
      </div>

      {/* Side paragraph bottom-right */}
      <p className="[word-break:break-word] absolute bottom-[129px] font-['Hanken_Grotesk',sans-serif] leading-[normal] not-italic right-[313px] text-[14px] text-[rgba(0,0,0,0.8)] translate-x-full translate-y-full w-[287px]">
        {data.sideParagraph}
      </p>

      {/* Hero panel (left dark box with portrait) */}
      <div
        className="absolute h-[780px] left-0 overflow-clip top-0 w-[720px]"
        style={{ backgroundColor: data.heroPanelBg }}
      >
        {/* Framed portrait */}
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-[calc(50%-0.5px)]">
          <div className="content-stretch flex items-center overflow-clip p-[16px] relative rounded-[inherit] size-full">
            <div className="h-[327px] relative shrink-0 w-[232px]" data-name="image 55">
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
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex font-['EuropaNuova-Regular:Regular',sans-serif] items-center justify-between leading-[1.5] left-1/2 not-italic text-[#dad0ad] text-[12.8px] top-[calc(50%+207.5px)] tracking-[0.896px] w-[266px] whitespace-nowrap">
          <p className="relative shrink-0">{data.location}</p>
          <p className="relative shrink-0">{data.year}</p>
        </div>

        {/* Top caption */}
        <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-start left-[calc(50%+4px)] top-[calc(50%-208.5px)] w-[266px]">
          <div className="[word-break:break-word] content-stretch flex font-['EuropaNuova-Regular:Regular',sans-serif] items-center justify-between leading-[1.5] not-italic relative shrink-0 text-[#dad0ad] text-[12.8px] tracking-[0.896px] w-full whitespace-nowrap">
            <p className="relative shrink-0">{data.category}</p>
            <p className="relative shrink-0">{data.sqft}</p>
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

          {/* Pattern6 – 2% opacity cover layer (new) */}
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

      {/* Glow blobs – replaced feGaussianBlur SVG filters with CSS radial-gradient */}
      {/* Large glow blob: was 1181×1181 SVG with stdDeviation=150 */}
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
      {/* Small glow blob: was 765×765 SVG with stdDeviation=100 */}
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
        <div className="absolute h-[59px] left-[34px] top-[22px] w-[119px]" data-name="Primary Logos">
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
      <div className="absolute h-[670px] left-[calc(39.5%+15px)] top-[71px] w-[805px]" data-name="image 57">
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
      >
        Concept
      </p>

      {/* Sub-description */}
      <p className="[word-break:break-word] absolute font-['Hanken_Grotesk',sans-serif] leading-[normal] left-[24px] not-italic text-[14px] text-[rgba(0,0,0,0.6)] top-[392px] w-[233px]">
        {data.subDescription}
      </p>

      {/* Body paragraphs */}
      <div className="[word-break:break-word] absolute bottom-[251px] font-['Hanken_Grotesk',sans-serif] leading-[0] left-[24px] not-italic text-[rgba(0,0,0,0.6)] translate-y-full w-[467px] whitespace-pre-wrap" style={{ fontSize: "18px" }}>
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
  return (
    <div
      className="h-[780px] overflow-clip relative shrink-0 w-[1440px]"
      data-name="Experience"
      style={{ contain: "layout style paint" }}
    >
      {/* Background – texture as CSS background-image instead of <img> at opacity-3 */}
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
        <div key={i} className={img.className}>
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
      <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[20px] items-center left-[calc(33.33%+29px)] not-italic text-[#dad0ad] text-center top-[378px] w-[452px]">
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
      <div className="absolute h-[52px] left-[11px] top-[20px] w-[104px]" data-name="Component 20">
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
      {/* Background – texture as CSS background-image instead of <img> at opacity-3 */}
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
      <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[calc(33.33%+30px)] top-[191px] w-[587px]">
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
      >
        <p className="leading-[normal]">"</p>
      </div>

      {/* Accent line */}
      <div
        className="absolute h-0 left-[calc(33.33%+32px)] top-[450px] w-[132px]"
      >
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 132 1">
            <line stroke={data.lineColor} x2="132" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>

      {/* Monogram image top-left */}
      <div className="absolute h-[451px] left-0 top-[10px] w-[320px]" data-name="monogram_final4 2">
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
  // Fixed screens: Intro(1440) + Concept(1440) + Experience(1440) + 3×Gallery(1440) + Testimonial(1440) = 7×1440 = 10080
  const baseWidth = 7 * 1440;

  // Extra full-image screens (optional)
  const extraWidth =
    project.extraFullImageScreens?.reduce(
      (sum, s) => sum + (s.widthPx ?? 1129),
      0
    ) ?? 0;

  return baseWidth + extraWidth;
}

// ─────────────────────────────────────────────────────────────────────────────
// ProjectPage – The exported reusable component
// ─────────────────────────────────────────────────────────────────────────────
interface ProjectPageProps {
  project: ProjectData;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const totalWidth = useMemo(() => computeTotalWidth(project), [project]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <div style={{ width: `${totalWidth}px`, height: "780px", position: "relative" }}>
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
  );
}