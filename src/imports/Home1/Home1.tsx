// ─────────────────────────────────────────────────────────────────────────────
// Home1.tsx  —  Studio Inside Eye · Home Page
//
// AUTO-CYCLING HERO:
//   Every CYCLE_MS milliseconds the hero section smoothly transitions to the
//   next project in HOME_PROJECTS (data/index.ts).
//
//   Things that change per project:
//     • Hero section background color  (intro.heroPanelBg)
//     • Pattern / texture overlay      (intro.patternImg  |  intro.decorativeTopRightImg)
//     • Portrait image in the frame    (intro.heroPortraitImg)
//     • Project name heading           (intro.projectName)
//     • Description paragraph          (intro.description)
//     • Contact / footer section bg    (intro.heroPanelBg)
//     • Big hero image in the light section (intro.heroPortraitImg)
//
//   Everything else (navbar, services text, footer links, etc.) is STATIC.
//
// TO ADD A NEW PROJECT:
//   Just add it to data/index.ts → HOME_PROJECTS array.
//   Home page will automatically include it in the cycle. Done.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import svgPaths from "./svg-n029qayjm7";
import JournalHeader from "../../app/components/layout/JournalHeader";

// ── Static assets (never change) ─────────────────────────────────────────────
import imgEntireWebsite    from "../../assets/0dd65294414a90d32335209969f40ac5042eb287.png";
import imgFrame2106258500  from "../../assets/86bf7c0a9e2c9ce1971e67dfc02e8d7713a8c5f3.png";
import imgFrame2106258502  from "../../assets/e7d8029b679abc3818d7b0073eb12f469c5282c0.png";
import imgFrame2106258503  from "../../assets/78998cedd18b8246f027b5575f3ff5264b04c564.png";
import imgImage48          from "../../assets/d0553f6129a7fac1b174ec3e794d941d51287eea.png";
import imgFrame2106258466  from "../../assets/3c69fed734b46e09bcbca5fd64d204e588c1d31e.png";
import imgComponent21      from "../../assets/51db19e7ba1176f759ee55b5c3fc2f8561581637.png";
import imgPrimaryLogos     from "../../assets/752d89eaef873a887cf65268bf35b398d34fcd07.png";
import imgComponent22      from "../../assets/ef5789f32fa9b15364e39033c5d7cb0a9747ec22.png";
import imgRectangle30      from "../../assets/23497d1b739628a6a7bb08b118680a57cca44246.png";
import imgServicesSection  from "../../assets/79ba139c3a44f7977c3a8ad1f6ade8cf14fbb105.png";
import imgFrame2106258506  from "../../assets/75226685f4f76f704b886f96c7d3f66fad2ea681.png";
import imgPrimaryLogos1    from "../../assets/088c9c2511f4f4a6d40114530c14c0b9ef4ace9e.png";
import imgContactPage      from "../../assets/afae93e180d21f30c2ae138886efb63bc064a5e6.png";
import imgPrimaryLogos2    from "../../assets/4e454c35d52b905142f0f45a93315e3a6c51ea01.png";

// ── Project data ──────────────────────────────────────────────────────────────
import { HOME_PROJECTS, CYCLE_MS, FADE_MS } from "../../data/homeProjects";
import type { HomeProject } from "../../data/homeProjects";

// ── Auto-cycle interval ───────────────────────────────────────────────────────



// ─────────────────────────────────────────────────────────────────────────────
// STATIC SECTIONS  (unchanged from original)
// ─────────────────────────────────────────────────────────────────────────────

function Frame7() {
  return (
    <div className="h-[306px] relative shrink-0 w-[224px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-34.64%] max-w-none top-0 w-[156.95%]" src={imgFrame2106258500} />
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="h-[441px] relative shrink-0 w-[254px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFrame2106258502} />
    </div>
  );
}

function Frame9() {
  return (
    <div className="h-[375px] relative shrink-0 w-[280px]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-46.74%] max-w-none top-0 w-[236.34%]" src={imgFrame2106258503} />
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="absolute content-stretch flex gap-[20px] items-end left-[33px] top-[281px]">
      <Frame7 />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function EntireWebsite() {
  return (
    <div className="absolute h-[770px] left-0 overflow-clip top-0 w-full" data-name="Entire Website">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[rgba(254,244,219,0.95)] inset-0" />
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgEntireWebsite} />
      </div>
      <JournalHeader activePage="Home" />
      <Frame43 />
      <p className="-translate-x-full [word-break:break-word] absolute capitalize font-['IBM_Plex_Serif',serif] h-[66px] leading-[0] left-[calc(59.50%+579px)] not-italic text-[#553319] text-[0px] text-right top-[566px] tracking-[-0.88px] w-[558px]">
        <span className="font-['IBM_Plex_Serif',serif] leading-[1.2] text-[22px] font font-semibold">A Boutique interior design studio</span>
        <span className="leading-[1.2] text-[22px]">{` creating spaces`}</span>
        <span className="leading-[1.2] text-[22px]">{` `}</span>
        <span className="leading-[1.2] text-[22px]">that are rooted, intentional, and designed for you.</span>
      </p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute capitalize font-['Instrument_Serif'] italic leading-[1.2] left-[calc(59.50%+317px)] text-[#703000] text-[96px] text-center top-[632px] tracking-[-3.84px] w-[524px]">Studio Inside eye</p>
      <div className="absolute h-[319px] left-[calc(58.33%+82px)] top-[-63px] w-[237px]" data-name="image 48">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage48} />
      </div>
      <div className="absolute h-[365px] left-[calc(75%-14px)] top-[-6px] w-[272px]" data-name="image 49">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage48} />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[33px] left-[calc(54.17%+41.5px)] rounded-[8px] top-[calc(50%+145px)] w-[71px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgFrame2106258466} />
    </div>
  );
}

function Group() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(50%+1px)] top-[calc(50%+1.5px)]">
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-['Instrument_Serif',sans-serif] leading-[0] left-[calc(50%-0.5px)] not-italic text-[#5d5e36] text-[40px] text-center top-[calc(50%+67.5px)] tracking-[-1px] w-[683px] whitespace-pre-wrap">
        <p className="leading-[normal] mb-0">At Studio Inside Eye, every space starts with you.</p>
        <p className="leading-[normal]">{`We design around how you live,              what you need, what you value.`}</p>
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Instrument_Serif',sans-serif] leading-[normal] left-[calc(50%+2.5px)] not-italic text-[#5d5e36] text-[40px] text-center top-[calc(50%-220.5px)] tracking-[-1px] w-[683px]">
        Designing timeless residential interiors for modern
        <br aria-hidden />
        California, across San Jose and the Bay Area.
      </p>
      <Frame4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[33px] left-[calc(37.5%+34.5px)] rounded-[8px] top-[calc(50%+195px)] w-[71px]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgFrame2106258466} />
    </div>
  );
}

function FeatureWhySie() {
  return (
    <div className="absolute bg-[#faf0d7] h-[1267px] left-0 overflow-clip top-[770px] w-full" data-name="Feature why SIE">
      <Group />
      <Frame5 />
      <div className="-translate-x-1/2 absolute flex h-[274px] items-center justify-center left-[calc(50%-1px)] top-[20px] w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[274px]">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 274 0.5">
                <line id="Line 45" stroke="var(--stroke-0, #C98F00)" strokeWidth="0.5" x2="274" y1="0.25" y2="0.25" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute flex h-[133px] items-center justify-center left-[calc(50%-1px)] top-[547px] w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[133px]">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 133 0.5">
                <line id="Line 49" stroke="var(--stroke-0, #C98F00)" strokeWidth="0.5" x2="133" y1="0.25" y2="0.25" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute flex h-[287px] items-center justify-center left-1/2 top-[915px] w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[287px]">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 287 0.5">
                <line id="Line 46" stroke="var(--stroke-0, #C98F00)" strokeWidth="0.5" x2="287" y1="0.25" y2="0.25" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-0 items-center justify-center left-[calc(87.5%-7px)] top-[calc(50%-0.5px)] w-[248px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[248px]">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 248 0.5">
                <line id="Line 47" stroke="var(--stroke-0, #C98F00)" strokeWidth="0.5" x2="248" y1="0.25" y2="0.25" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-0 items-center justify-center left-[calc(12.5%-5px)] top-[calc(50%-0.5px)] w-[248px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[248px]">
            <div className="absolute inset-[-0.5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 248 0.5">
                <line id="Line 47" stroke="var(--stroke-0, #C98F00)" strokeWidth="0.5" x2="248" y1="0.25" y2="0.25" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[50px] left-[calc(41.67%+71px)] top-[328px] w-[104px]" data-name="Component 20">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgComponent21} />
      </div>
    </div>
  );
}

function Frame2({ heroPortraitImg }: { heroPortraitImg: string }) {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[calc(33.33%+49px)] top-[233px] w-[382px]">
      <div className="h-[268px] relative shrink-0 w-[210px]" data-name="image 55">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={heroPortraitImg} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC HERO SECTION  (changes every CYCLE_MS)
// ─────────────────────────────────────────────────────────────────────────────

/** The framed portrait inside the hero panel */
function Frame1({ heroPortraitImg }: { heroPortraitImg: string }) {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-center justify-center left-[calc(50%-0.5px)] top-[238px] w-[255px]">
      <div className="h-[262.368px] pointer-events-none relative shrink-0 w-[205px]" data-name="image 55">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={heroPortraitImg} />
        <div aria-hidden className="absolute border-[#d5c9a8] border-[5.4px] border-solid inset-[-5.4px]" />
      </div>
    </div>
  );
}

interface HeroPanelProps {
  bgColor: string;
  patternImg?: string;
  texturImg: string;
  heroPortraitImg: string;
  projectName: string;
  description: string;
  /** 0–1, controls fade transition */
  opacity: number;
}

/** The full-bleed colored hero panel — everything inside it changes per project */
function HeroPanel({
  bgColor,
  patternImg,
  texturImg,
  heroPortraitImg,
  projectName,
  description,
  opacity,
}: HeroPanelProps) {
  return (
    <div
      className="absolute h-[780px] left-0 overflow-clip top-0 w-full"
      style={{
        opacity,
        clipPath: opacity < 1
          ? 'inset(0 100% 0 0)'
          : 'inset(0 0% 0 0)',
        transition: `
          opacity 200ms ease,
          clip-path 900ms cubic-bezier(0.76,0,0.24,1)
        `,
        willChange: 'opacity, clip-path',
      }}
      data-name="hero-panel"
    >
      {/* Solid colour fill */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundColor: bgColor }} />
        <img
          alt=""
          className="absolute max-w-none object-cover opacity-3 size-full"
          src={texturImg}
        />
      </div>

      {/* Pattern / gradient overlay */}
      {patternImg ? (
        <div
          className="absolute bg-size-[auto_auto,1490px_1053.4765625px] bg-top-left h-[1024px] top-[-634px] w-full"
          style={{
            backgroundImage: `linear-gradient(90deg, ${bgColor}66 0%, ${bgColor}66 100%), url("${patternImg}")`,
          }}
          data-name="pattern-overlay"
        />
      ) : null}

      {/* Framed portrait */}
      <Frame1 heroPortraitImg={heroPortraitImg} />

      {/* Project name */}
      <p className="[word-break:break-word] absolute bottom-[144px] font-['Cormorant_Garamond',serif] font-light leading-[normal] left-[33px] not-italic text-[#b3ae85] text-[100px] translate-y-full uppercase whitespace-nowrap">
        {projectName}
      </p>

      {/* Description */}
      <p className="[word-break:break-word] absolute bottom-[108px] font-['Inter',sans-serif] font-normal leading-[normal] left-[calc(74%+26px)] not-italic text-[#fffcdf] text-[14px] translate-y-full w-[335px]">
        {description}
      </p> 

      {/* Logo */}
      <div className="absolute h-[42px] left-[24px] top-[30px] w-[84px]" data-name="Primary Logos">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPrimaryLogos} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component (was Group2 wrapper — now holds the cycling hero)
// ─────────────────────────────────────────────────────────────────────────────

function CyclingHero() {
  const [currentIdx, setCurrentIdx]   = useState(0);
  const [nextIdx, setNextIdx]         = useState<number | null>(null);
  const [nextOpacity, setNextOpacity] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Start the auto-cycle
    timerRef.current = setTimeout(function cycle() {
      const next = (currentIdx + 1) % HOME_PROJECTS.length;

      // 1. Mount next panel at opacity 0
      setNextIdx(next);
      setNextOpacity(0);

      // 2. Next frame: fade next panel in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setNextOpacity(1);
        });
      });

      // 3. After fade completes, promote next → current and clean up
      setTimeout(() => {
        setCurrentIdx(next);
        setNextIdx(null);
        setNextOpacity(0);
        // Schedule the next cycle
        timerRef.current = setTimeout(cycle, CYCLE_MS);
      }, FADE_MS + 50);
    }, CYCLE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIdx]);

  const current = HOME_PROJECTS[currentIdx];
  const next    = nextIdx !== null ? HOME_PROJECTS[nextIdx] : null;

  return (
    <div className="absolute h-[780px] left-0 top-0 w-full" style={{ zIndex: 0 }}>
      {/* Current project — always fully visible underneath */}
      <HeroPanel
        bgColor={current.bgColor}
        patternImg={current.patternImg}
        texturImg={current.textureImg}
        heroPortraitImg={current.heroImg}
        projectName={current.projectName}
        description={current.description}
        opacity={1}
      />

      {/* Next project — fades in on top */}
      {next && (
        <HeroPanel
          bgColor={next.bgColor}
          patternImg={next.patternImg}
          texturImg={next.textureImg}
          heroPortraitImg={next.heroImg}
          projectName={next.projectName}
          description={next.description}
          opacity={nextOpacity}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MIDDLE SECTION  (Component2 — project image + Component1 overlay)
// ─────────────────────────────────────────────────────────────────────────────

function Component1({ project }: { project: HomeProject }) {
  return (
    <div
      className="absolute h-[780px] left-0 overflow-clip top-0 w-full"
      data-name="28"
      style={{ backgroundColor: project.bgColor }}
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundColor: project.bgColor }} />
        <img alt="" className="absolute max-w-none object-cover opacity-3 size-full" src={project.textureImg} />
      </div>
      {project.patternImg && (
        <div className="absolute h-[486px] left-[-47px] top-[-96px] w-[1534px]" data-name="Pattern6 4">
          <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[239.47%] left-[-5.09%] max-w-none top-[-139.47%] w-[107.26%]" src={project.patternImg} />
          </div>
        </div>
      )}
      <p className="[word-break:break-word] absolute bottom-[140px] font-['Canela_Web:Light',sans-serif] leading-[normal] left-[24px] not-italic text-[112px] text-[rgba(253,235,206,0.49)] translate-y-full uppercase whitespace-nowrap">
        {project.projectName}
      </p>
      <div className="absolute h-[42px] left-[24px] top-[30px] w-[84px]" data-name="Primary Logos" />
      <p className="[word-break:break-word] absolute bottom-[98px] font-['Hanken_Grotesk',sans-serif] leading-[normal] left-[calc(75%+25px)] not-italic text-[#fbe1d7] text-[12px] translate-y-full w-[305px]">
        {project.description}
      </p>
      <div className="absolute h-[52px] left-[11px] top-[20px] w-[104px]" data-name="Component 20">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgComponent22} />
      </div>
      <div className="absolute h-[268px] left-[calc(41.67%+3px)] pointer-events-none top-[233px] w-[210px]" data-name="image 55">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={project.heroImg} />
        <div aria-hidden className="absolute border-5 border-[#fff6d9] border-solid inset-[-5px]" />
      </div>
      <div className="absolute h-[780px] left-[11px] top-0 w-full">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[rgba(124,80,76,0.1)] inset-0" />
          <img alt="" className="absolute max-w-none object-cover opacity-5 size-full" src={imgRectangle30} />
        </div>
      </div>
      {/* Cycling hero overlaid inside this panel */}
      <CyclingHero />
    </div>
  );
}

function Group1({ project }: { project: HomeProject }) {
  return (
    <div className="absolute contents left-0 top-0">
      <p className="[word-break:break-word] absolute bottom-[94px] font-['Neue_Haas_Grotesk_Display_Pro:45_Light',sans-serif] leading-[normal] left-[calc(75%+85px)] not-italic text-[14px] text-white tracking-[1px] translate-y-full w-[245px]">subtle, layered, and deeply calming, every corner is designed to be felt as much as it is seen.</p>
      <Frame2 heroPortraitImg={project.heroImg} />
      <Component1 project={project} />
    </div>
  );
}

function Component2({ project }: { project: HomeProject }) {
  return (
    <div
      className="absolute h-[780px] left-0 overflow-clip top-[2037px] w-full"
      data-name="1171"
      style={{ backgroundColor: project.bgColor }}
    >
      <div className="absolute h-[42px] left-[24px] top-[30px] w-[84px]" data-name="Primary Logos">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPrimaryLogos} />
      </div>
      <Group1 project={project} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES SECTION  (static except the big photo)
// ─────────────────────────────────────────────────────────────────────────────

function Frame16() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[20px] items-start not-italic relative shrink-0">
      <p className="capitalize font-['Instrument_Serif',sans-serif] leading-none relative shrink-0 text-[#5d5e36] text-[76px] w-[476px]">Full-Service Residential interior design</p>
      <p className="font-['Hanken_Grotesk',sans-serif] leading-[1.3] relative shrink-0 text-[#5c5d36] text-[22px] tracking-[0.5px] w-[476px]">Thoughtfully designed residential spaces from initial concept to final installation</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch drop-shadow-[0px_114px_16px_rgba(0,0,0,0),0px_73px_14.5px_rgba(0,0,0,0.01),0px_41px_12.5px_rgba(0,0,0,0.05),0px_18px_9px_rgba(0,0,0,0.09),0px_5px_5px_rgba(0,0,0,0.1)] flex items-center justify-center px-[28px] py-[14px] relative rounded-[4px] shrink-0">
      <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[4px]">
        <div className="absolute bg-[#703000] inset-0 rounded-[4px]" />
        <img alt="" className="absolute max-w-none object-cover opacity-76 rounded-[4px] size-full" src={imgFrame2106258506} />
      </div>
      <div aria-hidden className="absolute border border-[#391900] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.6px] whitespace-nowrap">VIEW ALL PROJECTS</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[36px] items-start justify-center left-[63px] top-[246px]">
      <Frame16 />
      <Frame10 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[101px] top-[174px] w-[129px]">
      <p className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] leading-none min-w-full not-italic relative shrink-0 text-[#5d5e36] text-[14px] tracking-[2.8px] uppercase w-[min-content]">Our Services</p>
      <div className="h-0 relative shrink-0 w-[82px]">
        <div className="absolute inset-[-0.6px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 82 0.6">
            <line id="Line 5" stroke="var(--stroke-0, #5E5E5E)" strokeWidth="0.6" x2="82" y1="0.3" y2="0.3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start justify-center leading-[normal] not-italic relative shrink-0 text-[#5c5d36]">
      <p className="font-['Instrument_Serif',sans-serif] relative shrink-0 text-[32px] whitespace-pre">{`Renovation, remodel \n& New construction        `}</p>
      <p className="font-['Hanken_Grotesk',sans-serif] relative shrink-0 text-[18px] w-[356px]">Complete home transformations brought to life through thoughtful design, material curation, and seamless execution.</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute content-stretch flex gap-[48px] items-start justify-center left-[calc(50%+47px)] top-[223px]">
      <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-none not-italic relative shrink-0 text-[#5c5d36] text-[102px] whitespace-nowrap">01</p>
      <div className="flex h-[117px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[117px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 117 1">
                <line id="Line 7" stroke="var(--stroke-0, #656565)" x2="117" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame11 />
      <div className="absolute left-[117px] size-[9px] top-[34px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
          <circle cx="4.5" cy="4.5" fill="var(--fill-0, #703000)" id="Ellipse 1" r="4.5" />
        </svg>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start justify-center leading-[normal] not-italic relative shrink-0 text-[#5c5d36]">
      <p className="font-['Instrument_Serif',sans-serif] relative shrink-0 text-[32px] whitespace-nowrap">{`Furnishing & Styling`}</p>
      <p className="font-['Hanken_Grotesk',sans-serif] relative shrink-0 text-[18px] w-[312px]">Thoughtfully designed interiors with carefully curated furniture, lighting, accessories.</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute content-stretch flex gap-[48px] items-start justify-center left-[calc(50%+40px)] top-[465px]">
      <p className="[word-break:break-word] font-['Instrument_Serif',sans-serif] leading-none not-italic relative shrink-0 text-[#5c5d36] text-[102px] whitespace-nowrap">02</p>
      <div className="flex h-[117px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[117px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 117 1">
                <line id="Line 7" stroke="var(--stroke-0, #656565)" x2="117" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame12 />
      <div className="absolute left-[132px] size-[9px] top-[14px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
          <circle cx="4.5" cy="4.5" fill="var(--fill-0, #703000)" id="Ellipse 1" r="4.5" />
        </svg>
      </div>
    </div>
  );
}

function ArrowNarrowDownSvgrepoCom() {
  return (
    <div className="relative size-[38px]" data-name="arrow-narrow-down-svgrepo-com 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
        <g id="arrow-narrow-down-svgrepo-com 1">
          <path d={svgPaths.pf347200} id="Vector" stroke="var(--stroke-0, #703000)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute left-[calc(91.67%-3px)] rounded-[50px] size-[63px] top-[263px]">
      <div aria-hidden className="absolute bg-[rgba(255,255,255,0.04)] inset-0 pointer-events-none rounded-[50px]" />
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center left-[calc(50%+0.5px)] size-[38px] top-[calc(50%+0.5px)]">
          <div className="-rotate-90 flex-none"><ArrowNarrowDownSvgrepoCom /></div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]" />
      <div aria-hidden className="absolute border border-[#a69d83] border-solid inset-0 pointer-events-none rounded-[50px]" />
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute left-[calc(91.67%-3px)] rounded-[50px] size-[63px] top-[475px]">
      <div aria-hidden className="absolute bg-[rgba(255,255,255,0.04)] inset-0 pointer-events-none rounded-[50px]" />
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center left-[calc(50%+0.5px)] size-[38px] top-[calc(50%+0.5px)]">
          <div className="-rotate-90 flex-none"><ArrowNarrowDownSvgrepoCom /></div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_4px_0px_rgba(0,0,0,0.25)]" />
      <div aria-hidden className="absolute border border-[#a69d83] border-solid inset-0 pointer-events-none rounded-[50px]" />
    </div>
  );
}

function ServicesSection() {
  return (
    <div className="absolute h-[832px] left-0 overflow-clip top-[2817px] w-full" data-name="Services section">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgServicesSection} />
        <div className="absolute bg-[rgba(218,208,173,0.95)] inset-0" />
      </div>
      <Frame13 />
      <Frame23 />
      <div className="absolute left-[calc(58.33%+93px)] size-[21px] top-[98px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
          <path d={svgPaths.pe8fa800} fill="var(--fill-0, #703000)" id="Star 2" />
        </svg>
      </div>
      <div className="absolute left-[63px] size-[16px] top-[174px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <path d={svgPaths.p24533600} fill="var(--fill-0, #703000)" id="Star 5" />
        </svg>
      </div>
      <div className="absolute left-[calc(66.67%+85px)] size-[21px] top-[409px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
          <path d={svgPaths.pe8fa800} fill="var(--fill-0, #703000)" id="Star 2" />
        </svg>
      </div>
      <div className="absolute left-[calc(58.33%+90px)] size-[21px] top-[683px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 21">
          <path d={svgPaths.pe8fa800} fill="var(--fill-0, #703000)" id="Star 2" />
        </svg>
      </div>
      <div className="absolute flex h-[585px] items-center justify-center left-[calc(41.67%+10px)] top-[110px] w-[314px]">
        <div className="-rotate-90 -scale-y-100 flex-none">
          <div className="h-[314px] relative w-[585px]">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 585.6 314.3">
              <path d={svgPaths.pa545880} id="Ellipse 3" stroke="var(--stroke-0, #656565)" strokeWidth="0.6" />
            </svg>
          </div>
        </div>
      </div>
      <Frame14 />
      <div className="absolute left-[calc(41.67%+5px)] size-[10px] top-[390px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <circle cx="5" cy="5" fill="var(--fill-0, #703000)" id="Ellipse 2" r="5" />
        </svg>
      </div>
      <Frame15 />
      <Frame18 />
      <Frame19 />
      <div className="absolute flex h-0 items-center justify-center left-[calc(50%+47px)] top-[421px] w-[269px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[269px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 269 1">
                <line id="Line 3" stroke="var(--stroke-0, black)" strokeOpacity="0.22" x2="269" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-0 items-center justify-center left-[calc(75%+2px)] top-[421px] w-[293px]">
        <div className="flex-none rotate-180">
          <div className="h-0 relative w-[293px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 293 1">
                <line id="Line 6" stroke="var(--stroke-0, black)" strokeOpacity="0.22" x2="293" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER / CONTACT  (bg color cycles with project)
// ─────────────────────────────────────────────────────────────────────────────

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-[231px]">
      <p className="leading-none relative shrink-0 text-[36px] w-full">Contact</p>
      <p className="leading-[1.4] relative shrink-0 text-[20px] w-full">(831) 234-2532<br aria-hidden />3265 Whipple Rd<br aria-hidden />Union City, California(CA), 94587</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center leading-none relative shrink-0 w-[181px]">
      <p className="relative shrink-0 text-[32px] w-full">Menu</p>
      <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 text-[20px] w-full">
        {["Home","Moodboard","Philosophy","Services","Projects"].map(t => <p key={t} className="relative shrink-0 w-full">{t}</p>)}
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center leading-none relative shrink-0 w-[181px]">
      <p className="relative shrink-0 text-[32px] w-full">Projects</p>
      <div className="content-stretch flex flex-col gap-[11px] items-center justify-center relative shrink-0 text-[20px] w-full">
        {["SIENNA","Villa","Luxhill","Remeos"].map(t => <p key={t} className="relative shrink-0 w-full">{t}</p>)}
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center leading-none relative shrink-0 w-[181px]">
      <p className="relative shrink-0 text-[32px] w-full">Socials</p>
      <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 text-[20px] w-full">
        {["Linkedin","Instagram","Yelp"].map(t => <p key={t} className="relative shrink-0 w-full">{t}</p>)}
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex font-['Hanken_Grotesk',sans-serif] gap-[82px] items-start left-[calc(16.67%+1px)] not-italic text-[#d5c9a8] top-[394px]">
      <Frame20 /><Frame21 /><Frame24 /><Frame26 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="bg-[#d5c9a8] content-stretch flex items-center justify-center px-[28px] py-[16px] relative rounded-[4px] shrink-0">
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#442b00] text-[20px] tracking-[-0.6px] whitespace-nowrap">{` Start your project`}</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-center justify-center left-[calc(50%+2.5px)] top-[74px]">
      <div className="h-[102px] relative shrink-0 w-[203px]" data-name="Primary Logos">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPrimaryLogos1} />
      </div>
      <p className="[word-break:break-word] font-['P22GrosvenorW00-Regular',serif] leading-[1.12] not-italic relative shrink-0 text-[#d5c9a8] text-[60px] whitespace-nowrap">Build your dream home</p>
      <Frame36 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex font-['Hanken_Grotesk',sans-serif] items-center justify-between leading-[normal] left-[34px] not-italic text-[12px] text-[rgba(238,221,160,0.7)] top-[810px] tracking-[0.5px] w-[1372px] whitespace-nowrap">
      <p className="relative shrink-0">©️2025 Studio Inside Eye. All rights reserved</p>
      <div className="content-stretch flex gap-[51px] items-center relative shrink-0">
        {["Privacy policy","Terms of service","Cookies Settings"].map(t => <p key={t} className="relative shrink-0">{t}</p>)}
      </div>
    </div>
  );
}

function ContactPage({ bgColor }: { bgColor: string }) {
  return (
    <div className="absolute h-[774px] left-0 top-[-57px] w-full" data-name="Contact Page">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {/* Dynamic bg color matching active project */}
        <div className="absolute inset-0" style={{ backgroundColor: bgColor, transition: `background-color ${FADE_MS}ms ease-in-out` }} />
        <img alt="" className="absolute max-w-none object-cover opacity-8 size-full" src={imgContactPage} />
      </div>
      {/* Footer nav columns */}
      <div className="[word-break:break-word] absolute content-stretch flex font-['Hanken_Grotesk',sans-serif] gap-[82px] items-start left-[calc(8.33%+102px)] not-italic text-[#d5c9a8] top-[472px]">
        <Frame20 /><Frame21 /><Frame24 /><Frame26 />
      </div>
      <div className="absolute h-0 left-0 top-px w-full">
        <div className="absolute inset-[-0.8px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 0.8">
            <line id="Line 90" stroke="var(--stroke-0, #DACDAC)" strokeWidth="0.8" x2="1440" y1="0.4" y2="0.4" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute left-[calc(50%+0.5px)] size-[23px] top-[-11px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <path d={svgPaths.p25b23d00} fill="var(--fill-0, #DAD0AD)" id="Star 7" />
        </svg>
      </div>
    </div>
  );
}

function Frame37({ bgColor }: { bgColor: string }) {
  return (
    <div className="bg-[#d5c9a8] content-stretch flex items-center justify-center px-[28px] py-[16px] relative rounded-[4px] shrink-0">
      <p
        className="[word-break:break-word] font-['Inter',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[20px] tracking-[-0.6px] whitespace-nowrap"
        style={{ color: bgColor, transition: `color ${FADE_MS}ms ease-in-out` }}
      >{` Start your project`}</p>
    </div>
  );
}

function Frame41({ bgColor }: { bgColor: string }) {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-center justify-center left-[calc(50%+3px)] top-[97px]">
      <div className="h-[102px] relative shrink-0 w-[203px]" data-name="Primary Logos">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPrimaryLogos2} />
      </div>
      <p className="[word-break:break-word] font-['P22GrosvenorW00-Regular',serif] leading-[1.12] not-italic relative shrink-0 text-[#d5c9a8] text-[60px] whitespace-nowrap">Build your dream home</p>
      <Frame37 bgColor={bgColor} />
    </div>
  );
}

function FeatureWhySie1({ project }: { project: HomeProject }) {
  return (
    <div
      className="absolute h-[620px] left-0 overflow-clip top-[4477px] w-full"
      data-name="Feature why SIE"
      style={{ backgroundColor: "#504d39" }}
    >
      <div className="absolute h-[660px] left-0 top-0 w-full">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[rgba(124,80,76,0.1)] inset-0" />
          <img alt="" className="absolute max-w-none object-cover opacity-5 size-full" src={imgRectangle30} />
        </div>
      </div>
      <Frame22 />
      <Frame38 />
      <Frame40 />
      <ContactPage bgColor={project.bgColor} />
      <Frame41 bgColor={project.bgColor} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO IMAGE SECTION  (Component3 — shows the big landscape photo)
// ─────────────────────────────────────────────────────────────────────────────

function ServicesSection1({ heroPortraitImg }: { heroPortraitImg: string }) {
  return (
    <div className="absolute h-[877px] left-0 overflow-clip top-0 w-full" data-name="Services section">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgServicesSection} />
        <div className="absolute bg-[rgba(218,208,173,0.95)] inset-0" />
      </div>
      <div className="absolute h-[751px] left-[33px] top-[63px] right-[33px]" data-name="hero-photo">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute h-[130.42%] left-[-0.02%] max-w-none top-0 w-[100.03%]"
            src={heroPortraitImg}
            style={{ transition: `opacity ${FADE_MS}ms ease-in-out` }}
          />
        </div>
      </div>
    </div>
  );
}

function Component3({ project }: { project: HomeProject }) {
  return (
    <div className="absolute bg-[#dad0ad] h-[868px] left-0 overflow-clip top-[3609px] w-full" data-name="1172">
      <ServicesSection1 heroPortraitImg={project.heroImgLandscape ?? project.heroImg} />
    </div>
  );
}



// ─────────────────────────────────────────────────────────────────────────────
// ROOT HOME COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  // Single source of truth for the active project index
  const [activeIdx, setActiveIdx] = useState(0);

  // Keep in sync with CyclingHero — listen to same CYCLE_MS
  // (CyclingHero manages its own internal state; this drives the
  //  outer sections that CyclingHero doesn't control)
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HOME_PROJECTS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const project = HOME_PROJECTS[activeIdx];

  return (
    <div className="relative size-full" data-name="HOME 1">
      <EntireWebsite />
      <FeatureWhySie />
      <Component2 project={project} />
      <ServicesSection />
      <FeatureWhySie1 project={project} />
      <Component3 project={project} />
    </div>
  );
}