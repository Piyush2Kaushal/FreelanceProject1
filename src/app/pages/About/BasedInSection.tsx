import imgTexture from "figma:asset/98c2e853219c22f9e2b45952fc7466e6f708bc8f.png";
import imgSquareImg from "figma:asset/9d066eac159d036baf2d86c100e62ea385f7c4ae.png";
import imgDecorativeText from "figma:asset/8013616ee28e40584d49b034f7c5b678fa877049.png";

export function BasedInSection() {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height: "897px" }}
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

      {/* Square image — left */}
      <div
        className="absolute"
        style={{ left: "33px", top: "250px", width: "448px", height: "448px" }}
      >
        <img
          src={imgSquareImg}
          alt="Interior project"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative heading image — center top */}
      <div
        className="absolute"
        style={{ left: "calc(16.67% + 40px)", top: "183px", width: "428px", height: "107px" }}
      >
        <img
          src={imgDecorativeText}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* "Based In" content — right side */}
      <div
        className="absolute flex flex-col gap-4 items-end"
        style={{ right: "33px", top: "524px" }}
      >
        <p
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: "14.4px",
            fontWeight: 500,
            color: "#dcd1b1",
            lineHeight: 1,
            letterSpacing: "0.5px",
            whiteSpace: "pre",
          }}
        >
          B A S E D   I N
        </p>

        <p
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: "22px",
            fontWeight: 400,
            color: "#dcd1b1",
            lineHeight: 1.49,
            width: "519px",
            textAlign: "right",
          }}
        >
          Based in{" "}
          <strong style={{ fontWeight: 700 }}>San Jose</strong>
          , we work across full-service interior design, remodels, renovations, and new construction homes, guiding each project with clarity, warmth, and attention to detail.
        </p>

        {/* Divider */}
        <div
          className="h-px"
          style={{ width: "511px", backgroundColor: "#CCBCA2", opacity: 0.6 }}
        />
      </div>
    </div>
  );
}
