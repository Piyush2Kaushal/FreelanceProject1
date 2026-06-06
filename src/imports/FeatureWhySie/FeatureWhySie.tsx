import svgPaths from "./svg-yx504ut4xt";
import imgMonogramFinal61 from "../../assets/1e097404f088f36f9dff5f7f9dd3a94d8d74cdfa.png";
import imgRectangle30 from "../../assets/23497d1b739628a6a7bb08b118680a57cca44246.png";

// ── Icon frames ───────────────────────────────────────────────────────────────
function Frame() {
  return (
    <div className="absolute left-[14px] size-[24px] top-[15px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_8_97)" id="Frame">
          <g id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_8_97">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute left-[14px] size-[24px] top-[15px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_8_89)" id="Frame">
          <path d={svgPaths.p2ea55bf0} fill="var(--fill-0, #633728)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_8_89">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#dad0ad] overflow-clip relative rounded-[6px] shrink-0 size-[53px]">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute left-[14px] size-[24px] top-[15px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <g id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute left-[15px] size-[24px] top-[14px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_8_77)" id="Frame">
          <path d={svgPaths.p178bf610} fill="var(--fill-0, #623628)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_8_77">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[#dad0ad] overflow-clip relative rounded-[6px] shrink-0 size-[53px]">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute left-[14px] size-[24px] top-[15px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_8_86)" id="Frame">
          <g id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_8_86">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute left-[14px] size-[24px] top-[15px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_8_83)" id="Frame">
          <path d={svgPaths.p1dbc3000} fill="var(--fill-0, #633728)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_8_83">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#dad0ad] overflow-clip relative rounded-[6px] shrink-0 size-[53px]">
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Frame10 />
      <Frame11 />
      <Frame12 />
    </div>
  );
}

// ── Location pin icon ─────────────────────────────────────────────────────────
function LocationPin() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Frame">
          <path d={svgPaths.p299ddb70} fill="#DFD0B1" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

// ── Star decoration ───────────────────────────────────────────────────────────
function StarDecoration() {
  return (
    <div className="size-[23px] shrink-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <path d={svgPaths.p25b23d00} fill="#DAD0AD" id="Star 9" />
      </svg>
    </div>
  );
}

export default function FeatureWhySie() {
  return (
    <>
      {/* ── DESKTOP: original absolute layout ── */}
      <div className="hidden lg:block bg-[#5f3223] relative size-full" data-name="Feature why SIE">
        {/* Copyright + social row */}
        <div className="absolute content-stretch flex items-center justify-between left-[33px] right-[33px] top-[527px]">
          <p className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#fef4db] text-[19px] tracking-[-0.2px] w-[457px]">©️ 2025 Studio Inside Eye. All rights reserved</p>
          <SocialIcons />
        </div>
        {/* Monogram */}
        <div className="-translate-x-1/2 absolute h-[274px] left-1/2 top-[134px] w-[202px]" data-name="monogram_final6 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMonogramFinal61} />
        </div>
        {/* Stars */}
        <div className="absolute left-[calc(58.33%+33px)] size-[23px] top-[256px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
            <path d={svgPaths.p25b23d00} fill="var(--fill-0, #DAD0AD)" id="Star 9" />
          </svg>
        </div>
        <div className="absolute left-[33px] size-[23px] top-[170px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
            <path d={svgPaths.p25b23d00} fill="var(--fill-0, #DAD0AD)" id="Star 9" />
          </svg>
        </div>
        <div className="absolute left-[calc(33.33%+53px)] size-[23px] top-[256px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
            <path d={svgPaths.p25b23d00} fill="var(--fill-0, #DAD0AD)" id="Star 9" />
          </svg>
        </div>
        {/* Vertical divider lines (right column) */}
        <div className="absolute flex h-[233px] items-center justify-center left-[calc(58.33%+44px)] top-[155px] w-0">
          <div className="flex-none rotate-90">
            <div className="h-0 relative w-[233px]">
              <div className="absolute inset-[-1.4px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 233 1.4">
                  <line stroke="var(--stroke-0, #DAD0AD)" strokeWidth="1.4" x2="233" y1="0.7" y2="0.7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Horizontal divider */}
        <div className="absolute h-0 left-[20px] top-[461px] w-[calc(100%-40px)]">
          <div className="absolute inset-[-1.4px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1396 1.4">
              <line stroke="var(--stroke-0, #DAD0AD)" strokeOpacity="0.6" strokeWidth="1.4" x2="1396" y1="0.7" y2="0.7" />
            </svg>
          </div>
        </div>
        {/* Vertical divider lines (center column) */}
        <div className="absolute flex h-[233px] items-center justify-center left-[calc(33.33%+64px)] top-[155px] w-0">
          <div className="flex-none rotate-90">
            <div className="h-0 relative w-[233px]">
              <div className="absolute inset-[-1.4px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 233 1.4">
                  <line stroke="var(--stroke-0, #DAD0AD)" strokeWidth="1.4" x2="233" y1="0.7" y2="0.7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Tagline */}
        <p className="[word-break:break-word] absolute font-['Inter',sans-serif] font-normal leading-[normal] left-[33px] not-italic text-[#decfae] text-[22px] top-[235px] whitespace-nowrap">R O O T E D. A U TE N T I C. Y O U R S</p>
        {/* Location pin + address */}
        <div className="absolute left-[33px] size-[32px] top-[337px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Frame">
              <path d={svgPaths.p299ddb70} fill="var(--fill-0, #DFD0B1)" id="Vector" />
            </g>
          </svg>
        </div>
        <p className="[word-break:break-word] absolute font-['Inter',sans-serif] font-normal leading-[normal] left-[80px] not-italic text-[#dacdac] text-[22px] top-[345px] whitespace-nowrap">
          Studio Inside Eye
          <br aria-hidden />
          San Jose, California
        </p>
        {/* CTA column */}
        <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[calc(66.67%+8px)] top-[225px] w-[443px]">
          <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#dacdac] text-[28px] tracking-[-0.4px] w-full">Lets shape your space.</p>
          <div className="content-stretch flex gap-[22px] items-center relative shrink-0 w-full">
            <div className="bg-[#dad0ad] content-stretch flex items-center justify-center px-[28px] py-[16px] relative rounded-[4px] shrink-0">
              <p className="[word-break:break-word] font-['Inter',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#504d39] text-[18px] tracking-[-0.54px] whitespace-nowrap">{` Start your project`}</p>
            </div>
            <div className="content-stretch flex items-center justify-center px-[28px] py-[16px] relative rounded-[4px] shrink-0">
              <div aria-hidden className="absolute border border-[#dad0ad] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <p className="[word-break:break-word] font-['Inter',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#dad0ad] text-[18px] tracking-[-0.54px] whitespace-nowrap">Discovery Call</p>
            </div>
          </div>
        </div>
        {/* Background texture */}
        <div className="absolute h-[660px] left-0 top-0 w-full">
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-[rgba(95,50,35,0.1)] inset-0" />
            <img alt="" className="absolute max-w-none object-cover opacity-4 size-full" src={imgRectangle30} />
          </div>
        </div>
      </div>

      {/* ── MOBILE/TABLET: responsive footer ── */}
      <div className="lg:hidden bg-[#5f3223] relative w-full overflow-x-hidden" data-name="Feature why SIE Mobile">
        {/* Background texture */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute bg-[rgba(95,50,35,0.1)] inset-0" />
          <img alt="" className="absolute max-w-none object-cover opacity-4 size-full" src={imgRectangle30} />
        </div>

        {/* Content */}
        <div className="relative px-5 pt-12 pb-8" style={{ zIndex: 1 }}>
          {/* Tagline row with stars */}
          <div className="flex items-center gap-3 mb-8">
            <StarDecoration />
            <p
              className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#decfae] tracking-[0.06em]"
              style={{ fontSize: "clamp(11px, 3vw, 14px)" }}
            >
              R O O T E D. &nbsp;A U T H E N T I C. &nbsp;Y O U R S
            </p>
            <StarDecoration />
          </div>

          {/* Monogram — centered */}
          <div className="flex justify-center mb-8">
            <div className="w-[120px] h-[163px] relative">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMonogramFinal61} />
            </div>
          </div>

          {/* CTA section */}
          <div className="flex flex-col items-start gap-5 mb-10">
            <p
              className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#dacdac]"
              style={{ fontSize: "clamp(20px, 5.5vw, 26px)", letterSpacing: "-0.02em" }}
            >
              Lets shape your space.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-[#dad0ad] flex items-center justify-center px-6 py-3 rounded-[4px] border-none cursor-pointer hover:opacity-90 transition-opacity">
                <p className="font-['Inter',sans-serif] font-medium leading-normal not-italic text-[#504d39] text-[16px] tracking-[-0.02em] whitespace-nowrap">Start your project</p>
              </button>
              <button className="relative flex items-center justify-center px-6 py-3 rounded-[4px] border border-[#dad0ad] bg-transparent cursor-pointer hover:opacity-90 transition-opacity">
                <p className="font-['Inter',sans-serif] font-medium leading-normal not-italic text-[#dad0ad] text-[16px] tracking-[-0.02em] whitespace-nowrap">Discovery Call</p>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full mb-8" style={{ background: "rgba(218,208,173,0.4)" }} />

          {/* Address row */}
          <div className="flex items-start gap-3 mb-8">
            <LocationPin />
            <div>
              <p
                className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#dacdac]"
                style={{ fontSize: "clamp(14px, 4vw, 18px)" }}
              >
                Studio Inside Eye
              </p>
              <p
                className="font-['Inter',sans-serif] font-normal leading-normal not-italic text-[#dacdac]"
                style={{ fontSize: "clamp(14px, 4vw, 18px)" }}
              >
                San Jose, California
              </p>
            </div>
          </div>

          {/* Copyright + social row */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p
              className="font-['Hanken_Grotesk',sans-serif] leading-normal not-italic text-[#fef4db]"
              style={{ fontSize: "clamp(12px, 3.2vw, 15px)", letterSpacing: "-0.01em" }}
            >
              ©️ 2025 Studio Inside Eye. All rights reserved
            </p>
            <SocialIcons />
          </div>
        </div>
      </div>
    </>
  );
}