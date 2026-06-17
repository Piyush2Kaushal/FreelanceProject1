import imgMonogram from "figma:asset/1e097404f088f36f9dff5f7f9dd3a94d8d74cdfa.webp";
import svgPaths from "../../../imports/svg-ejvbwqgg01";
import imgTexture from "../../../assets/f0cedf09760f97dc4e595fe82650e46b83a6e013.jpg";
// "in" glyph (LinkedIn) — drawn without its own background, since the
// surrounding tile already supplies the beige square.
const LINKEDIN_PATH =
  "M5.46 7.43h-.02c-1.22 0-2-.83-2-1.87 0-1.06.81-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM7.27 20.1H3.65V9h3.62v11.1zM20.34 20.1h-3.62v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.86 1.33-.1.23-.12.55-.12.88v6.04h-3.62s.05-9.79 0-10.8h3.62v1.53a3.6 3.6 0 0 1 3.26-1.79c2.39 0 4.18 1.56 4.18 4.89v6.17z";

function Star() {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
      <path d={svgPaths.p25b23d00} fill="#DAD0AD" />
    </svg>
  );
}

function SocialIcon({ path, clipId, href }: { path: string; clipId: string; href?: string }) {
  const inner = (
    <div
      className="relative rounded-[6px] flex-shrink-0 overflow-hidden"
      style={{ backgroundColor: "#dad0ad", width: "53px", height: "53px" }}
    >
      <svg
        className="absolute"
        style={{ left: "14px", top: "15px", width: "24px", height: "24px" }}
        fill="none"
        viewBox="0 0 24 24"
      >
        <g clipPath={`url(#${clipId})`}>
          <path d={path} fill="#5C593E" />
        </g>
        <defs>
          <clipPath id={clipId}>
            <rect fill="white" width="24" height="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex" }}>
        {inner}
      </a>
    );
  }
  return inner;
}

export function FooterSection() {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ backgroundColor: "#5d2834" }}
    >

      {/* Texture layer 1 - multiply 0.6 */}
<div
  aria-hidden
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imgTexture}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    mixBlendMode: "multiply",
    opacity: 0.6,
    pointerEvents: "none",
  }}
/>
{/* Texture layer 2 - multiply 0.6 */}
<div
  aria-hidden
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imgTexture}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    mixBlendMode: "multiply",
    opacity: 0.7,
    pointerEvents: "none",
  }}
/>
      {/* ── DESKTOP LAYOUT (lg+) ── */}
      <div className="hidden lg:block relative" style={{ height: "660px" }}>
        {/* Decorative star — top left */}
        <div className="absolute" style={{ left: "33px", top: "170px" }}>
          <Star />
        </div>

        {/* Vertical line — left column */}
        <div
          className="absolute"
          style={{ left: "calc(33.33% + 64px)", top: "155px", width: "1px", height: "233px", backgroundColor: "#DAD0AD" }}
        />

        {/* Star — left-center */}
        <div className="absolute" style={{ left: "calc(33.33% + 53px)", top: "256px" }}>
          <Star />
        </div>

        {/* Vertical line — right column */}
        <div
          className="absolute"
          style={{ left: "calc(58.33% + 44px)", top: "155px", width: "1px", height: "233px", backgroundColor: "#DAD0AD" }}
        />

        {/* Star — right-center */}
        <div className="absolute" style={{ left: "calc(58.33% + 33px)", top: "256px" }}>
          <Star />
        </div>

        {/* Monogram — centered */}
        <div
          className="absolute"
          style={{ left: "50%", transform: "translateX(-50%)", top: "134px", width: "202px", height: "274px" }}
        >
          <img loading="lazy" decoding="async" src={imgMonogram} alt="Studio Inside Eye" className="w-full h-full object-cover" />
        </div>

        {/* Tagline text */}
        <p
          className="absolute"
          style={{ left: "33px", top: "235px", fontFamily: "Inter, sans-serif", fontSize: "22px", fontWeight: 400, color: "#decfae", whiteSpace: "nowrap", letterSpacing: "0.1px" }}
        >
          R O O T E D . A U T H E N T I C . Y O U R S
        </p>

        {/* Horizontal divider */}
        <div className="absolute" style={{ left: "20px", top: "461px", right: "20px", height: "1.4px", backgroundColor: "#DAD0AD", opacity: 0.6 }} />

        {/* Location pin icon */}
        <div className="absolute" style={{ left: "33px", top: "337px" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d={svgPaths.p299ddb70} fill="#DFD0B1" />
          </svg>
        </div>

        {/* Address */}
        <p
          className="absolute"
          style={{ left: "75px", top: "345px", fontFamily: "Inter, sans-serif", fontSize: "22px", fontWeight: 400, color: "#dacdac", lineHeight: 1.5, whiteSpace: "nowrap" }}
        >
          Studio Inside Eye
          <br />
          San Jose, California
        </p>

        {/* CTA — right */}
        <div
          className="absolute flex flex-col gap-8 items-start"
          style={{ left: "calc(66.67% + 8px)", top: "225px", width: "443px" }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "22px", fontWeight: 400, color: "#dacdac", letterSpacing: "-0.4px", lineHeight: "normal" }}>
            Lets shape your space.
          </p>
          <button
            className="flex items-center justify-center rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#dad0ad", padding: "16px 28px", fontFamily: "Inter, sans-serif", fontSize: "18px", fontWeight: 500, color: "#504d39", letterSpacing: "-0.54px", border: "none", whiteSpace: "nowrap" }}
          >
            Start your project
          </button>
        </div>

        {/* Bottom bar */}
        <div
          className="absolute flex items-center justify-between"
          style={{ left: "33px", top: "527px", width: "calc(100% - 48px)", maxWidth: "1392px" }}
        >
          <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "18px", fontWeight: 300, color: "#fef4db", letterSpacing: "-0.2px", lineHeight: "normal" }}>
            ©️ 2025 Studio Inside Eye. All rights reserved
          </p>
          <div className="flex items-center gap-3">
            <SocialIcon path={svgPaths.p2ea55bf0} clipId="about-instagram-clip" href="https://www.instagram.com/studioinsideeye?igsh=MWxvZ281YmhudTNv" />
            <SocialIcon path={svgPaths.p3cbf1700} clipId="about-tiktok-clip" />
            <SocialIcon path={svgPaths.p1dbc3000} clipId="about-twitter-clip" />
          </div>
        </div>
      </div>

      {/* ── TABLET LAYOUT (md–lg) ── */}
      <div className="hidden md:block lg:hidden relative py-12 px-8">
        {/* 3-col dividers */}
        <div className="relative flex justify-center mb-10">
          <div className="flex items-start justify-between w-full" style={{ maxWidth: "600px" }}>
            {/* Left col */}
            <div className="flex flex-col gap-3">
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400, color: "#decfae", letterSpacing: "0.1px" }}>
                R O O T E D . A U T H E N T I C . Y O U R S
              </p>
              <div className="flex items-start gap-2 mt-4">
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                  <path d={svgPaths.p299ddb70} fill="#DFD0B1" />
                </svg>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 400, color: "#dacdac", lineHeight: 1.5 }}>
                  Studio Inside Eye<br />San Jose, California
                </p>
              </div>
            </div>

            {/* Center: monogram */}
            <div style={{ width: "120px", height: "163px", flexShrink: 0 }}>
              <img loading="lazy" decoding="async" src={imgMonogram} alt="Studio Inside Eye" className="w-full h-full object-cover" />
            </div>

            {/* Right col: CTA */}
            <div className="flex flex-col gap-5 items-end">
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 400, color: "#dacdac", letterSpacing: "-0.3px", textAlign: "right" }}>
                Lets shape your space.
              </p>
              <button
                className="flex items-center justify-center rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#dad0ad", padding: "12px 20px", fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 500, color: "#504d39", border: "none" }}
              >
                Start your project
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px my-8" style={{ backgroundColor: "#DAD0AD", opacity: 0.6 }} />

        {/* Bottom bar */}
        <div className="flex items-center justify-between">
          <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "14px", fontWeight: 300, color: "#fef4db", letterSpacing: "-0.2px" }}>
            ©️ 2025 Studio Inside Eye. All rights reserved
          </p>
          <div className="flex items-center gap-2">
            <SocialIcon path={svgPaths.p2ea55bf0} clipId="about-instagram-clip-md" href="https://www.instagram.com/studioinsideeye?igsh=MWxvZ281YmhudTNv" />
            <SocialIcon path={svgPaths.p3cbf1700} clipId="about-tiktok-clip-md" />
            <SocialIcon path={svgPaths.p1dbc3000} clipId="about-twitter-clip-md" />
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT (< md) ── */}
      <div className="block md:hidden relative px-5 pt-10 pb-8">
        {/* Monogram centered */}
        <div className="flex justify-center mb-6">
          <div style={{ width: "110px", height: "150px" }}>
            <img loading="lazy" decoding="async" src={imgMonogram} alt="Studio Inside Eye" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Small star */}
        <div className="flex justify-center mb-4">
          <svg width="15" height="15" viewBox="0 0 23 23" fill="none">
            <path d={svgPaths.p25b23d00} fill="#DAD0AD" />
          </svg>
        </div>

        {/* Tagline */}
        <p
          className="text-center mb-6"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            color: "#decfae",
            letterSpacing: "0.12em",
          }}
        >
          R O O T E D . A U T H E N T I C . Y O U R S
        </p>

        {/* Vertical divider */}
        <div className="flex justify-center mb-6">
          <div className="w-px" style={{ height: "56px", backgroundColor: "#DAD0AD", opacity: 0.4 }} />
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              color: "#dacdac",
              letterSpacing: "-0.3px",
              textAlign: "center",
            }}
          >
            Lets shape your space.
          </p>
          <button
            className="flex items-center justify-center rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity w-full"
            style={{
              backgroundColor: "#dad0ad",
              padding: "15px 24px",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#504d39",
              letterSpacing: "-0.4px",
              border: "none",
            }}
          >
            Start your project
          </button>
        </div>

        {/* Horizontal divider with star, centered */}
        <div className="relative flex justify-center mb-8">
          <div className="w-full h-px" style={{ backgroundColor: "#DAD0AD", opacity: 0.4 }} />
          <div className="absolute" style={{ top: "50%", transform: "translateY(-50%)" }}>
            <Star />
          </div>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <SocialIcon path={svgPaths.p2ea55bf0} clipId="about-instagram-clip-sm" href="https://www.instagram.com/studioinsideeye?igsh=MWxvZ281YmhudTNv" />
          <SocialIcon path={LINKEDIN_PATH} clipId="about-linkedin-clip-sm" href="https://www.linkedin.com/in/haritha-prasad-a5b526208?utm_source=share_via&utm_content=profile&utm_medium=member_ios" />
          <SocialIcon path={svgPaths.p1dbc3000} clipId="about-twitter-clip-sm" />
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ backgroundColor: "#DAD0AD", opacity: 0.5 }} />

        {/* Copyright */}
        <p
          className="text-center"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: "12px",
            fontWeight: 300,
            color: "#fef4db",
            letterSpacing: "-0.1px",
          }}
        >
          ©️ 2025 Studio Inside Eye. All rights reserved
        </p>
      </div>
    </div>
  );
}