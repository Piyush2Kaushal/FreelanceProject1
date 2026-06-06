import JournalHeader from "./layout/JournalHeader";

export function JournalHero() {
  return (
    <>
      {/*
        Responsive height strategy:
        - Desktop (≥1024px): 646px fixed — matches Figma pixel-perfect
        - Tablet  (768–1023px): 520px
        - Mobile  (<768px): auto, content-driven with min-height
      */}
      <style>{`
        .journal-hero-root {
          background-color: #dcd1b1;
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 646px;
        }
        @media (max-width: 1023px) {
          .journal-hero-root {
            height: 520px;
          }
        }
        @media (max-width: 767px) {
          .journal-hero-root {
            height: auto;
            min-height: 400px;
            padding-bottom: 32px;
          }
        }
        @media (max-width: 480px) {
          .journal-hero-root {
            min-height: 360px;
            padding-bottom: 24px;
          }
        }
      `}</style>

      <div className="journal-hero-root">

        {/* ── Header: Logo + Nav + Contact (shared component) ── */}
        <JournalHeader />

        {/* ── DESKTOP (≥1024px): Absolute pixel-perfect Figma layout ── */}
        <div className="hidden lg:block">
          <div className="absolute flex flex-col gap-4 items-start left-[33px] top-[128px] z-10">
            <p
              className="font-['Instrument_Serif',serif] text-[#703000] leading-[normal] w-min whitespace-nowrap"
              style={{ fontSize: "140px" }}
            >
              Journal
            </p>
            <p
              className="font-['Inter',sans-serif] font-normal text-[rgba(112,48,0,0.8)] tracking-[-1.28px] w-[683px] whitespace-pre-wrap"
              style={{ fontSize: "32px", height: "194px" }}
            >
              {`Thoughts, inspiration, and stories rooted in intentional living - exploring residential interiors, renovation ideas, materials, furnishing, and modern California homes through the lens of Studio Inside Eye`}
            </p>
          </div>
          <p
            className="absolute font-['Instrument_Serif',serif] text-[#703000] leading-[normal] whitespace-nowrap z-10"
            style={{
              fontSize: "clamp(64px, 6.5vw, 84px)",
              right: "33px",
              top: "326px",
            }}
          >
            2026
          </p>
        </div>

        {/* ── TABLET (768px–1023px): Scaled-down absolute layout ── */}
        <div className="hidden md:block lg:hidden">
          <div className="absolute flex flex-col gap-3 items-start left-[28px] top-[108px] z-10">
            <p
              className="font-['Instrument_Serif',serif] text-[#703000] leading-[normal] whitespace-nowrap"
              style={{ fontSize: "100px" }}
            >
              Journal
            </p>
            <p
              className="font-['Inter',sans-serif] font-normal text-[rgba(112,48,0,0.8)] leading-[1.45] whitespace-pre-wrap"
              style={{ fontSize: "22px", width: "500px", letterSpacing: "-0.96px" }}
            >
              {`Thoughts, inspiration, and stories rooted in intentional living - exploring residential interiors, renovation ideas, materials, furnishing, and modern California homes through the lens of Studio Inside Eye`}
            </p>
          </div>
          <p
            className="absolute font-['Instrument_Serif',serif] text-[#703000] leading-[normal] whitespace-nowrap z-10"
            style={{ fontSize: "64px", right: "28px", top: "272px" }}
          >
            2026
          </p>
        </div>

        {/* ── MOBILE (<768px): Stacked, fluid, premium layout ── */}
        <div className="flex md:hidden flex-col items-start px-5 pt-[88px] relative z-10">
          {/* Large title */}
          <p
            className="font-['Instrument_Serif',serif] text-[#703000] leading-[0.92]"
            style={{ fontSize: "clamp(74px, 19vw, 104px)" }}
          >
            Journal
          </p>

          {/* Thin rule */}
          <div
            className="w-full mt-4 mb-5"
            style={{ height: "1px", backgroundColor: "rgba(112,48,0,0.18)" }}
          />

          {/* Subtext */}
          <p
            className="font-['Inter',sans-serif] font-normal text-[rgba(112,48,0,0.8)] leading-[1.52]"
            style={{
              fontSize: "clamp(13px, 3.6vw, 17px)",
              letterSpacing: "-0.32px",
              maxWidth: "88%",
            }}
          >
            Thoughts, inspiration, and stories rooted in intentional living — exploring residential interiors, renovation ideas, materials, furnishing, and modern California homes through the lens of Studio Inside Eye.
          </p>

          {/* Year — lower right */}
          <p
            className="font-['Instrument_Serif',serif] text-[#703000] leading-[normal] self-end mt-4"
            style={{
              fontSize: "clamp(40px, 10.5vw, 58px)",
              opacity: 0.55,
            }}
          >
            2026
          </p>
        </div>
      </div>
    </>
  );
}