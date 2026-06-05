import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imgRectangle29 from "../../assets/23497d1b739628a6a7bb08b118680a57cca44246.png";
import imgComponent20 from "../../assets/4e454c35d52b905142f0f45a93315e3a6c51ea01.png";
import imgTexture from "../../assets/texture.png";
import imgFrame2106258761 from "../../assets/c3f115f4d118ac4fcbf1d74ef8815d734c335bdf.png";
import imgFrame2106258762 from "../../assets/ac6073d80e685fa7af1967de631c324197e86adf.png";
import imgFrame2106258778 from "../../assets/e64d564294abdd4a684dd40d8a036f83e3763166.png";
import imgFrame2106258777 from "../../assets/4d2a01b2e517b7fee0f5f5b5f044518b28f7b7aa.png";
import imgFrame2106258779 from "../../assets/1a634773f3f63ad2485cb6c8342972dda6c1c84b.png";
import imgFrame2106258780 from "../../assets/d6a2ec2ae594fcd9566c40dbfd2f2939a0ece108.png";
import imgFrame2106258781 from "../../assets/212bee59b64bea89100d5d03e37b74df2cf0d4e4.png";

// ─── Nav items ────────────────────────────────────────────────────────────────
const navItems = [
  { label: "MENU", to: null },
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/" },
  { label: "Moodboard", to: "/" },
  { label: "Journal", to: "/journal" },
] as const;

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

// ─── Navbar (only center octagon pill changed; logo + contact = original) ─────
function BlogNavbar() {
  const navigate = useNavigate();
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

        {/* ── CENTER: Octagon navbar pill (JournalHeader style) ── */}
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
              {navItems.map((item, index) => (
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
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ── Contact — original style ── */}
        <div className="navbar-desktop bg-[#dcd1b1] h-[41px] relative rounded-[4px] shrink-0 pointer-events-auto">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center px-[28px] py-[24px] relative size-full">
              <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#5f3223] text-[16px] tracking-[-0.48px] whitespace-nowrap">
                Contact
              </p>
            </div>
          </div>
        </div>
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

// ─── Rest of original components (unchanged) ─────────────────────────────────

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[262px] items-start relative shrink-0">
      <p className="font-['Instrument_Serif',sans-serif] leading-[normal] relative shrink-0 text-[72px] whitespace-nowrap">Bay Area home owners guide</p>
      <p className="font-['Inter',sans-serif] font-normal h-[116px] leading-[1.3] relative shrink-0 text-[24px] tracking-[-0.96px] w-[574px]">Learn how much interior design costs in San Jose, including hourly rates, flat fees, remodel design costs, and what affects your final budget.</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex items-end justify-between left-[33px] right-[33px] not-italic text-[#dcd1b1] top-[162px]">
      <Frame4 />
      <p className="font-['Instrument_Serif',sans-serif] leading-[normal] relative shrink-0 text-[84px] whitespace-nowrap">2/2026</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-[451px] relative shrink-0 w-[699px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame2106258761} />
    </div>
  );
}

function Frame8() {
  return (
    <div className="h-[285px] relative shrink-0 w-[14px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 285">
        <g id="Frame 2106258775">
          <circle cx="7" cy="7" fill="var(--fill-0, #DCD1B1)" id="Ellipse 31" r="7" />
          <line id="Line 83" stroke="var(--stroke-0, #DCD1B1)" x1="7.49999" x2="7.5" y1="13" y2="285" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Hanken_Grotesk',sans-serif] gap-[24px] items-start leading-[1.4] not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-[565px]">
      <p className="h-[214px] relative shrink-0 w-full">Hiring an interior designer in San Jose can feel confusing at first because every home, scope, and designer works differently. A single-room refresh, a furnishing project, and a full-home renovation are very different investments. For Bay Area homeowners, the cost is also influenced by local labor rates, permit needs, material choices, project complexity, and the level of customization.</p>
      <p className="h-[213px] relative shrink-0 w-full">In general, interior designers may charge hourly, flat-fee, percentage of project cost, square-foot pricing, or a hybrid model. Industry pricing references commonly place traditional interior designer fees around $2,000 to $15,000+ excluding furniture, depending on project size and complexity. Hourly rates can often range from $75 to $250+ per hour depending on experience and location.</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex gap-[82px] items-end left-[33px] top-[509px] w-[calc(100%-56px)]">
      <Frame6 />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="h-[510px] relative shrink-0 w-[662px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame2106258762} />
    </div>
  );
}

function Frame10() {
  return (
    <div className="h-[380px] relative shrink-0 w-[14px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 380">
        <g id="Frame 2106258775">
          <line id="Line 83" stroke="var(--stroke-0, #DCD1B1)" x1="7.5" x2="7.50002" y1="14" y2="367" />
          <circle cx="7" cy="373" fill="var(--fill-0, #DCD1B1)" id="Ellipse 31" r="7" />
        </g>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[602px]">
      <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#dcd1b1] text-[64px] w-full">What Affects Interior Design Cost?</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[565px]">
      <ul className="[word-break:break-word] block font-['Hanken_Grotesk',sans-serif] leading-[0] list-disc not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-full">
        <li className="mb-0 ms-[33px]">
          <span className="leading-[1.4]">Scope of work: Furnishing one room costs less than redesigning an entire home.</span>
        </li>
        <li className="mb-0 ms-[33px]">
          <span className="leading-[1.4]">{`Level of service: Full-service design costs more than consultation-only support.  `}</span>
        </li>
        <li className="mb-0 ms-[33px]">
          <span className="leading-[1.4]">{`Custom work: Built-ins, custom furniture, and specialty finishes increase investment.  `}</span>
        </li>
        <li className="mb-0 ms-[33px]">
          <span className="leading-[1.4]">{`Remodel complexity: Moving walls, plumbing, electrical, or structural elements requires more coordination. `}</span>
        </li>
        <li className="mb-0 ms-[33px]">
          <span className="leading-[1.4]">{` Material quality: Natural stone, custom cabinetry, designer lighting, and premium textiles increase the budget.`}</span>
        </li>
        <li className="ms-[33px]">
          <span className="leading-[1.4]">Procurement and installation: Ordering, tracking, receiving, inspecting, and installing items takes time and expertise.</span>
        </li>
      </ul>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[55px] items-start justify-end relative shrink-0">
      <Frame25 />
      <Frame11 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute content-stretch flex gap-[82px] items-end left-[33px] top-[2000px] w-[calc(100%-56px)]">
      <Frame7 />
      <Frame10 />
      <Frame26 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#dcd1b1] text-[64px] w-full">Common Interior Design Cost Ranges</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Hanken_Grotesk',sans-serif] gap-[24px] h-[572px] items-start leading-[1.4] not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-full">
      <p className="h-[154px] relative shrink-0 w-full">A design consultation may be a few hundred dollars to over $1,000 depending on the designer and session length. A singleroom design may range from a few thousand dollars upward, especially if it includes furniture selection, layout, custom finishes, procurement, and installation.</p>
      <p className="h-[185px] relative shrink-0 w-full">A full-service interior design project for a living room, kitchen, primary suite, or multiple rooms can move into a higher investment range because the designer is not just choosing furniture. They may handle space planning, finish selection, lighting, custom cabinetry direction, vendor coordination, construction documentation, and styling.</p>
      <p className="h-[185px] relative shrink-0 w-full">For major remodels, the design fee is only one part of the overall budget. Bay Area kitchen remodels are often cited in the $50,000 to $150,000 range depending on scope and finish level, while bathroom remodels can move from basic to luxury ranges depending on plumbing, tile, fixtures, lighting, and layout changes.</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-[602px]">
      <Frame24 />
      <Frame12 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="h-[285px] relative shrink-0 w-[14px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 285">
        <g id="Frame 2106258775">
          <circle cx="7" cy="7" fill="var(--fill-0, #DCD1B1)" id="Ellipse 31" r="7" />
          <line id="Line 83" stroke="var(--stroke-0, #DCD1B1)" x1="7.49999" x2="7.5" y1="13" y2="285" />
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div className="flex-[1_0_0] h-[558px] min-w-px relative">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame2106258778} />
    </div>
  );
}

function Frame17() {
  return (
    <div className="flex-[1_0_0] h-[566px] min-w-px relative">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame2106258777} />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-[668px]">
      <Frame16 />
      <Frame17 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="absolute content-stretch flex gap-[82px] items-end left-[33px] top-[1104px] w-[calc(100%-48px)]">
      <Frame27 />
      <Frame15 />
      <Frame28 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#dcd1b1] text-[64px] w-full">Why a Boutique Studio Can Be Worth the Investment</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[565px]">
      <p className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] h-[340px] leading-[1.4] not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-full whitespace-pre-wrap">
        {`A boutique residential interior design studio like Studio Inside Eye gives homeowners a more personal, highly involved process. Instead of receiving a generic design package, clients get a home shaped around their personality, routines, architecture, and long-term lifestyle. `}
        <br aria-hidden />
        <br aria-hidden />
        For San Jose homeowners, the real value of hiring an interior designer is not only making a home look beautiful. It is avoiding costly mistakes, choosing the right materials the first time, planning spaces properly, and creating a home that feels cohesive from room to room.
      </p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-[602px]">
      <Frame32 />
      <Frame18 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="h-[380px] relative shrink-0 w-[14px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 380">
        <g id="Frame 2106258775">
          <line id="Line 83" stroke="var(--stroke-0, #DCD1B1)" x1="7.5" x2="7.50002" y1="14" y2="367" />
          <circle cx="7" cy="373" fill="var(--fill-0, #DCD1B1)" id="Ellipse 31" r="7" />
        </g>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div className="flex-[1_0_0] h-[558px] min-w-px relative">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame2106258779} />
    </div>
  );
}

function Frame21() {
  return (
    <div className="flex-[1_0_0] h-[566px] min-w-px relative">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame2106258780} />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-[1_0_0] right-[23px] gap-[20px] items-start  relative">
      <Frame20 />
      <Frame21 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute content-stretch flex gap-[54px] items-end left-[33px] top-[2765px] w-[calc(100%-48px)]">
      <Frame31 />
      <Frame19 />
      <Frame33 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="h-full relative shrink-0 w-[754px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[117.09%] left-0 max-w-none top-[-17.17%] w-full" src={imgFrame2106258781} />
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex h-[527px] items-start relative shrink-0 w-[754px]">
      <Frame22 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-[1.1] not-italic relative shrink-0 text-[#dcd1b1] text-[64px] w-full">Final Takeaway</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] h-[216px] leading-[1.4] not-italic relative shrink-0 text-[#dcd1b1] text-[20px] w-[608px]">{`Interior design in San Jose can range widely, but the right way to think about cost is not "What is the cheapest option?" It is "What level of design support does my home actually need?" If you are planning a remodel, furnishing a new home, or upgrading a long-term residence, working with a boutique designer can help you make smarter decisions from the beginning`}</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[22px] items-start min-w-px relative">
      <Frame37 />
      <Frame23 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute content-stretch flex gap-[82px] items-end left-[33px] top-[3562px] w-[calc(100%-48px)]">
      <Frame35 />
      <Frame36 />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogArticle() {
  return (
    <div className="bg-[#5f3223] relative size-full" data-name="BLOG ARTICLE">
      <div className="absolute h-[4120px] left-0 top-0 w-full">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[rgba(95,50,35,0.1)] inset-0" />
          <img alt="" className="absolute max-w-none object-cover opacity-4 size-full" src={imgRectangle29} />
        </div>
      </div>

      {/* ← NEW navbar replaces Frame3 */}
      <BlogNavbar />

      <Frame5 />
      <Frame13 />
      <Frame14 />
      <Frame29 />
      <Frame30 />
      <Frame34 />

      {/* Divider lines */}
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