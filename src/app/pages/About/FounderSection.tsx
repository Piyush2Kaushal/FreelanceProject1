import imgTexture from "figma:asset/98c2e853219c22f9e2b45952fc7466e6f708bc8f.png";
import imgPortrait from "figma:asset/f604be7d60f73983b4334b88f403bc6da00f0566.png";

export function FounderSection() {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height: "1028px" }}
    >
      {/* Dark burgundy background */}
      <div className="absolute inset-0" style={{ backgroundColor: "#5d2834" }} />
      <img
        src={imgTexture}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.1 }}
      />

      {/* Portrait image — right half */}
      <div
        className="absolute"
        style={{ right: "33px", top: "77px", width: "618px", height: "818px" }}
      >
        <img
          src={imgPortrait}
          alt="Studio Interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Studio title — left */}
      <div
        className="absolute flex flex-col gap-1"
        style={{ left: "calc(8.33% + 89px)", top: "191px", width: "451px" }}
      >
        <p
          style={{
        fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: "60px",
            fontWeight: 500,
            color: "#dcd1b1",
            lineHeight: 1.5,
            letterSpacing: "-1px",
          }}
        >
          Studio Inside Eye
        </p>
        <p
          style={{
            fontFamily: "'P22GrosvenorW00-Regular', sans-serif",
            fontSize: "48px",
            fontWeight: 400,
            color: "#dcd1b1",
            lineHeight: 1.12,
            textDecoration: "underline",
            textUnderlineOffset: "4px",
textDecorationThickness: "1px",
          }}
        >
          build your dream home
        </p>
      </div>

      {/* Divider line */}
      <div
        className="absolute h-px"
        style={{
          left: "calc(8.33% + 89px)",
          top: "648px",
          width: "511px",
          backgroundColor: "#CCBCA2",
          opacity: 0.6,
        }}
      />

      {/* Founder info */}
      <div
        className="absolute flex items-start justify-between"
        style={{ left: "33px", top: "712px", width: "700px" }}
      >
        <p
          style={{
        fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: "14.4px",
            fontWeight: 500,
            color: "#ffefc0",
            lineHeight: 1,
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
          }}
        >
          F O U N D E R
        </p>
        <p
          style={{
        fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: "22px",
            fontWeight: 400,
            color: "#dcd1b1",
            lineHeight: 1.5,
            width: "519px",
          }}
        >
          Founded by principal Designer{" "}
          <strong style={{ fontWeight: 700 }}>Haritha Prasad</strong>
          , the studio believes every home should reflect the people who live within it, thoughtfully designed around their lifestyle, values, and everyday living.
        </p>
      </div>
    </div>
  );
}
