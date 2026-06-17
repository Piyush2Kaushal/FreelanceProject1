import imgTexture from "../../../assets/f0cedf09760f97dc4e595fe82650e46b83a6e013.jpg";
import imgSquareImg from "figma:asset/9d066eac159d036baf2d86c100e62ea385f7c4ae.webp";
import imgDecorativeText from "figma:asset/8013616ee28e40584d49b034f7c5b678fa877049.webp";

export function BasedInSection() {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ backgroundColor: "#5d2834" }}
    >
     {/* Texture layer 1 - multiply 0.6 */}
<div
  aria-hidden
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imgTexture}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    mixBlendMode: "multiply",
    opacity: 0.6,
    pointerEvents: "none",
  }}
/>
{/* Texture layer 2 - multiply 0.6 */}
<div
  aria-hidden
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imgTexture}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    mixBlendMode: "multiply",
    opacity: 0.7,
    pointerEvents: "none",
  }}
/>

      {/* ── DESKTOP LAYOUT (lg+) ── */}
      <div className="hidden lg:block relative" style={{ height: "897px" }}>
        {/* Square image — left */}
        <div
          className="absolute"
          style={{ left: "33px", top: "250px", width: "448px", height: "448px" }}
        >
          <img decoding="async"
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
          <img decoding="async"
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

      {/* ── TABLET LAYOUT (md–lg) ── */}
      <div className="hidden md:block lg:hidden relative py-14 px-8">
        {/* Two column: image left, text right */}
        <div className="flex gap-8 items-end">
          <div className="flex-shrink-0" style={{ width: "320px", height: "320px" }}>
            <img loading="lazy" decoding="async" src={imgSquareImg} alt="Interior project" className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col gap-4 items-end flex-1">
            <p
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                color: "#dcd1b1",
                letterSpacing: "0.5px",
                whiteSpace: "pre",
              }}
            >
              B A S E D   I N
            </p>
            <p
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "18px",
                fontWeight: 400,
                color: "#dcd1b1",
                lineHeight: 1.6,
                textAlign: "right",
              }}
            >
              Based in{" "}
              <strong style={{ fontWeight: 700 }}>San Jose</strong>
              , we work across full-service interior design, remodels, renovations, and new construction homes, guiding each project with clarity, warmth, and attention to detail.
            </p>
            <div className="h-px w-full" style={{ backgroundColor: "#CCBCA2", opacity: 0.6 }} />
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT (< md) ── */}
      <div className="block md:hidden relative">
        {/* Square image — full width */}
        <div className="mx-5 mt-10 mb-8" style={{ aspectRatio: "1/1" }}>
          <img loading="lazy" decoding="async" src={imgSquareImg} alt="Interior project" className="w-full h-full object-cover" />
        </div>

        {/* Based In text */}
        <div className="px-5 pb-10 flex flex-col gap-4 items-end">
          <p
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              color: "#dcd1b1",
              letterSpacing: "0.5px",
            }}
          >
            B A S E D   I N
          </p>
          <p
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              color: "#dcd1b1",
              lineHeight: 1.65,
              textAlign: "right",
            }}
          >
            Based in{" "}
            <strong style={{ fontWeight: 700 }}>San Jose</strong>
            , we work across full-service interior design, remodels, renovations, and new construction homes, guiding each project with clarity, warmth, and attention to detail.
          </p>
          <div className="h-px w-full" style={{ backgroundColor: "#CCBCA2", opacity: 0.6 }} />
        </div>
      </div>
    </div>
  );
}