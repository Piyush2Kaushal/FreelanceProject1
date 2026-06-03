import React from "react";
import imgTexture from "figma:asset/98c2e853219c22f9e2b45952fc7466e6f708bc8f.png";

import imgCardBg01 from "figma:asset/imgCardBg01.jpg";
import imgCardBg02 from "figma:asset/imgCardBg02.jpg";
import imgCardBg03 from "figma:asset/imgCardBg03.jpg";
import imgCardBg04 from "figma:asset/imgCardBg04.jpg";
import imgCardBg05 from "figma:asset/imgCardBg05.jpg";
import imgCardBg06 from "figma:asset/imgCardBg06.jpg";

interface ProcessStep {
  number: string;
  title: React.ReactNode;
  description: string;
  numberColor: string;
  textColor: string;
  bgImage: string;
  overlayColor: string;
  bgColor: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "Every project begins with a conversation. We start with a complimentary Zoom consultation to understand your vision, lifestyle, needs, project goals, and overall scope. This helps us align on the right direction for your space and ensures we're the right fit to work together.",
    numberColor: "#dcd1b1",
    textColor: "#dcd1b1",
    bgImage: imgCardBg01,
    overlayColor: "#3F3004CC",
    bgColor: "#C4C4C4",
  },
  {
    number: "02",
    title: "Onboarding",
    description:
      "Once we move forward, we guide you through a seamless onboarding experience with detailed questionnaires, timelines, and a clear understanding of the design journey ahead.",
    numberColor: "#d7c195",
    textColor: "#ffe9bd",
    bgImage: imgCardBg05,
    overlayColor: "#703000",
    bgColor: "white",
  },
  {
    number: "03",
    title: "Design Phase",
    description:
      "This is where ideas begin to take shape. Through mood boards, material palettes, layouts, renderings, and thoughtful design presentations, we develop a space that feels rooted in your lifestyle and aesthetic. Once finalized, we prepare all technical drawings and documentation for execution.",
    numberColor: "#dcd1b1",
    textColor: "#dcd1b1",
    bgImage: imgCardBg06,
    overlayColor: "#521E1F",
    bgColor: "white",
  },
  {
    number: "04",
    title: "Project Management",
    description:
      "During construction, we remain actively involved through site visits, coordination, and collaboration with contractors and vendors to ensure the design is executed thoughtfully and accurately.",
    numberColor: "#dcd1b1",
    textColor: "#dcd1b1",
    bgImage: imgCardBg04,
    overlayColor: "#46521E",
    bgColor: "white",
  },
  {
    number: "05",
    title: (
      <>
        Sourcing &amp;
        <br />
        Procurement
      </>
    ),
    description:
      "We carefully source and procure selected materials, furnishings, lighting, and finishes — managing orders and deliveries to create a smooth and organized process.",
    numberColor: "#dcd1b1",
    textColor: "#dcd1b1",
    bgImage: imgCardBg03,
    overlayColor: "#1E4752",
    bgColor: "white",
  },
  {
    number: "06",
    title: <>Installation &amp; Styling</>,
    description:
      "The final layer brings the home together. Through furniture installation, styling, and finishing touches, the space transforms into a complete home that feels warm, intentional, and truly yours.",
    numberColor: "#dcd1b1",
    textColor: "#dcd1b1",
    bgImage: imgCardBg02,
    overlayColor: "#CAB76800",
    bgColor: "#2a2418",
  },
];

function ProcessCard({ step }: { step: ProcessStep }) {
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-[24px]"
      style={{
        width: "514px",
        height: "642px",
        backgroundColor: step.bgColor,
      }}
    >
      <img
        src={step.bgImage}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{
          opacity: 0.22,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: step.overlayColor,
          mixBlendMode: "multiply",
        }}
      />

      <div
        className="absolute h-px left-0 right-0"
        style={{
          top: "26px",
          backgroundColor: "#DCD1B1",
          opacity: step.number === "01" ? 0.5 : 0.3,
        }}
      />

      <div
        className="absolute h-px left-0 right-0"
        style={{
          top: "618px",
          backgroundColor: "#DCD1B1",
          opacity: step.number === "01" ? 0.5 : 0.3,
        }}
      />

      <div
        className="absolute w-px top-0 bottom-0"
        style={{
          left: step.number === "01" ? "26px" : "21px",
          backgroundColor: "#DCD1B1",
          opacity: step.number === "01" ? 0.5 : 0.3,
        }}
      />

      <div
        className="absolute w-px top-0 bottom-0"
        style={{
          left: "490px",
          backgroundColor: "#DCD1B1",
          opacity: step.number === "01" ? 0.5 : 0.3,
        }}
      />

      <p
        className="absolute"
        style={{
          left: "35px",
          top: "38px",
          fontFamily: "'Hanken Grotesk', sans-serif",
          fontSize: "76px",
          fontWeight: 400,
          color: step.numberColor,
          lineHeight: 1,
        }}
      >
        {step.number}
      </p>

      <div
        className="absolute"
        style={{
          left: "35px",
          top: "130px",
          fontFamily: "'Instrument Serif', serif",
          fontSize: "56px",
          fontWeight: 400,
          color: step.textColor,
          lineHeight: 1,
          width: "450px",
        }}
      >
        {step.title}
      </div>

      <p
        className="absolute"
        style={{
          left: "35px",
          bottom: "55px",
          fontFamily: "'Hanken Grotesk', sans-serif",
          fontSize: "22px",
          fontWeight: 400,
          color: step.textColor,
          lineHeight: 1.29,
          width: "415px",
        }}
      >
        {step.description}
      </p>
    </div>
  );
}

export function ProcessSection() {
  return (
    <div className="relative overflow-hidden w-full" style={{ height: "914px" }}>
      <div className="absolute inset-0" style={{ backgroundColor: "#5d2834" }} />

      <img
        src={imgTexture}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.1 }}
      />

      <div
        className="absolute flex items-center justify-between"
        style={{
          left: "33px",
          top: "71px",
          width: "calc(100% - 66px)",
        }}
      >
        <p
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "64px",
            fontWeight: 400,
            color: "#dcd1b1",
            lineHeight: 1.49,
            whiteSpace: "nowrap",
          }}
        >
          Our Process
        </p>

        <p
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: "22px",
            fontWeight: 400,
            color: "#dcd1b1",
            lineHeight: 1.2,
            width: "519px",
            textAlign: "right",
          }}
        >
          A structured approach that balances{" "}
          <strong style={{ fontWeight: 700 }}>
            creativity, clarity, and execution.
          </strong>
        </p>
      </div>

      <div
        className="absolute left-0 right-0 overflow-x-auto"
        style={{
          top: "272px",
          paddingLeft: "33px",
          paddingRight: "33px",
          paddingBottom: "0",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`.process-scroll::-webkit-scrollbar { display: none; }`}</style>

        <div
          className="process-scroll flex gap-7 items-center"
          style={{ width: "max-content" }}
        >
          {steps.map((step) => (
            <ProcessCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
}