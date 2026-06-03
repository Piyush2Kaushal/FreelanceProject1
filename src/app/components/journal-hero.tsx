import JournalHeader from "./layout/JournalHeader";

export function JournalHero() {
  return (
    <div className="bg-[#dcd1b1] h-[646px] overflow-hidden relative w-full">

      {/* ── Header: Logo + Nav + Contact (shared component) ── */}
      <JournalHeader />

      {/* Hero heading + subtitle */}
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

      {/* 2026 year */}
      <p
        className="absolute font-['Instrument_Serif',serif] text-[#703000] leading-[normal] whitespace-nowrap z-10"
        style={{
          fontSize: "84px",
          left: "calc(83.33% + 78px)",
          top: "326px",
        }}
      >
        2026
      </p>
    </div>
  );
}