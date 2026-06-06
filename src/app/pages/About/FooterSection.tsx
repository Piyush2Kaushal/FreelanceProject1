import imgMonogram from "figma:asset/1e097404f088f36f9dff5f7f9dd3a94d8d74cdfa.png";
import svgPaths from "../../../imports/svg-ejvbwqgg01";

function Star() {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
      <path d={svgPaths.p25b23d00} fill="#DAD0AD" />
    </svg>
  );
}

function SocialIcon({ path, clipId }: { path: string; clipId: string }) {
  return (
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
}

export function FooterSection() {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ backgroundColor: "#64313d" }}
    >
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
          <img src={imgMonogram} alt="Studio Inside Eye" className="w-full h-full object-cover" />
        </div>

        {/* Tagline text */}
        <p
          className="absolute"
          style={{ left: "33px", top: "235px", fontFamily: "Inter, sans-serif", fontSize: "22px", fontWeight: 400, color: "#decfae", whiteSpace: "nowrap", letterSpacing: "0.1px" }}
        >
          R O O T E D. A U T H E N T I C. Y O U R S
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
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "28px", fontWeight: 400, color: "#dacdac", letterSpacing: "-0.4px", lineHeight: "normal" }}>
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
            <SocialIcon path={svgPaths.p2ea55bf0} clipId="about-instagram-clip" />
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
                R O O T E D. A U T H E N T I C. Y O U R S
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
              <img src={imgMonogram} alt="Studio Inside Eye" className="w-full h-full object-cover" />
            </div>

            {/* Right col: CTA */}
            <div className="flex flex-col gap-5 items-end">
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", fontWeight: 400, color: "#dacdac", letterSpacing: "-0.3px", textAlign: "right" }}>
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
            <SocialIcon path={svgPaths.p2ea55bf0} clipId="about-instagram-clip-md" />
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
            <img src={imgMonogram} alt="Studio Inside Eye" className="w-full h-full object-cover" />
          </div>
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
          R O O T E D. A U T H E N T I C. Y O U R S
        </p>

        {/* Divider */}
        <div className="h-px mb-6" style={{ backgroundColor: "#DAD0AD", opacity: 0.4 }} />

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "22px",
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

        {/* Location */}
        <div className="flex items-start gap-2 mb-8">
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
            <path d={svgPaths.p299ddb70} fill="#DFD0B1" />
          </svg>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "#dacdac",
              lineHeight: 1.5,
            }}
          >
            Studio Inside Eye
            <br />
            San Jose, California
          </p>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ backgroundColor: "#DAD0AD", opacity: 0.5 }} />

        {/* Bottom: copyright + socials */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p
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
          <div className="flex items-center gap-2">
            <SocialIcon path={svgPaths.p2ea55bf0} clipId="about-instagram-clip-sm" />
            <SocialIcon path={svgPaths.p3cbf1700} clipId="about-tiktok-clip-sm" />
            <SocialIcon path={svgPaths.p1dbc3000} clipId="about-twitter-clip-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}