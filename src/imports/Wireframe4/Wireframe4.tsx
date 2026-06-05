import svgPaths from "./svg-jk19amgcq3";
import imgRectangle30 from "../../assets/23497d1b739628a6a7bb08b118680a57cca44246.png";

function Frame() {
  return (
    <div className="-translate-x-1/2 absolute bg-[#dcd1b1] content-stretch flex items-center justify-center left-1/2 px-[28px] py-[12px] rounded-[4px] top-[407px]">
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#5f3223] text-[24px] tracking-[-0.72px] whitespace-nowrap">Contact</p>
    </div>
  );
}

export default function Wireframe() {
  return (
    <div className="bg-[#5f3223] relative size-full" data-name="Wireframe - 4">
      <div className="absolute h-[578px] left-0 top-0 w-full">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[rgba(95,50,35,0.1)] inset-0" />
          <img alt="" className="absolute max-w-none object-cover opacity-4 size-full" src={imgRectangle30} />
        </div>
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['font-['Hanken_Grotesk',sans-serif] leading-[1.4] left-1/2 not-italic text-[#dcd1b1] text-[38px] text-center top-[170px] tracking-[0.84px] w-[1104px]">Planning a home design or renovation project in San Jose or the Bay Area? Studio Inside Eye can help you create a home that feels personal, polished, and deeply livable.</p>
      <div className="absolute h-0 left-[24px] top-[21px] w-[calc(100%-48px)]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1">
            <line id="Line 84" stroke="var(--stroke-0, #DCD1B1)" x2="1392" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[24px] top-[544px] w-[calc(100%-48px)]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1392 1">
            <line id="Line 84" stroke="var(--stroke-0, #DCD1B1)" x2="1392" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute left-[calc(50%-0.5px)] size-[23px] top-[87px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <path d={svgPaths.p25b23d00} fill="var(--fill-0, #DAD0AD)" id="Star 9" />
        </svg>
      </div>
      <Frame />
    </div>
  );
}