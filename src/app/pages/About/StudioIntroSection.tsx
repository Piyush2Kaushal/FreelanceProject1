import imgTexture from "../../../assets/f0cedf09760f97dc4e595fe82650e46b83a6e013.jpg";
import imgMonogram from "figma:asset/1e097404f088f36f9dff5f7f9dd3a94d8d74cdfa.webp";

export function StudioIntroSection() {
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
      <div className="hidden lg:block relative" style={{ height: "688px" }}>
        {/* Monogram — left side */}
        <div
          className="absolute"
          style={{ left: "calc(8.33% + 7px)", top: "119px", width: "331px", height: "450px" }}
        >
          <img decoding="async"
            src={imgMonogram}
            alt="Studio Inside Eye monogram"
            className="w-full h-full object-cover"
            style={{ opacity: 0.9 }}
          />
        </div>

        {/* Studio description — right aligned */}
        <div
          data-anim="reveal"
          data-anim-variant="text"
          data-anim-blur="6"
          data-anim-delay="0.12"
          className="absolute"
          style={{
            right: "33px",
            top: "227px",
            width: "678px",
            textAlign: "right",
          }}
        >
          <p style={{ lineHeight: 0 }}>
            <span
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "36px",
                fontWeight: 500,
                color: "#efdcbc",
                lineHeight: 1.5,
                display: "inline",
              }}
            >
              Studio Inside Eye{" "}
            </span>
            <span
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "34px",
                fontWeight: 400,
                color: "#efdcbc",
                lineHeight: 1.5,
                display: "inline",
              }}
            >
              is a boutique residential interior design studio creating space that feel rooted, intentional and deeply personal
            </span>
          </p>
        </div>
      </div>

      {/* ── TABLET LAYOUT (md–lg) ── */}
      <div className="hidden md:block lg:hidden relative py-16">
        <div className="flex flex-col items-center gap-10 px-8">
          <div className="w-[220px] h-[300px]">
            <img decoding="async"
              src={imgMonogram}
              alt="Studio Inside Eye monogram"
              className="w-full h-full object-cover"
              style={{ opacity: 0.9 }}
            />
          </div>
          <p data-anim="reveal" data-anim-variant="text" data-anim-blur="6" data-anim-delay="0.1" className="text-right" style={{ maxWidth: "600px" }}>
            <span
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "28px",
                fontWeight: 500,
                color: "#efdcbc",
                lineHeight: 1.5,
              }}
            >
              Studio Inside Eye{" "}
            </span>
            <span
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "26px",
                fontWeight: 400,
                color: "#efdcbc",
                lineHeight: 1.5,
              }}
            >
              is a boutique residential interior design studio creating space that feel rooted, intentional and deeply personal
            </span>
          </p>
        </div>
      </div>

      {/* ── MOBILE LAYOUT (< md) ── */}
      <div className="block md:hidden relative">
        <div className="flex flex-col items-center pt-12 pb-10 px-6 gap-8">
          <div style={{ width: "160px", height: "218px" }}>
            <img decoding="async"
              src={imgMonogram}
              alt="Studio Inside Eye monogram"
              className="w-full h-full object-cover"
              style={{ opacity: 0.9 }}
            />
          </div>
          <p data-anim="reveal" data-anim-variant="text" data-anim-blur="6" data-anim-delay="0.1" className="text-center" style={{ maxWidth: "340px" }}>
            <span
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "20px",
                fontWeight: 500,
                color: "#efdcbc",
                lineHeight: 1.6,
              }}
            >
              Studio Inside Eye{" "}
            </span>
            <span
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "18px",
                fontWeight: 400,
                color: "#efdcbc",
                lineHeight: 1.6,
              }}
            >
              is a boutique residential interior design studio creating space that feel rooted, intentional and deeply personal
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}