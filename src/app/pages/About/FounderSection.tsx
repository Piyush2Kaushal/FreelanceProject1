import imgTexture from "figma:asset/98c2e853219c22f9e2b45952fc7466e6f708bc8f.png";
import imgPortrait from "figma:asset/f604be7d60f73983b4334b88f403bc6da00f0566.png";

export function FounderSection() {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ backgroundColor: "#5d2834" }}
    >
      <img decoding="async"
        src={imgTexture}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.1 }}
      />

      {/* ── DESKTOP LAYOUT (lg+) ── */}
      <div className="hidden lg:block relative" style={{ height: "1028px" }}>
        {/* Portrait image — right half */}
        <div
          className="absolute"
          style={{
            right: "33px",
            top: "77px",
            width: "clamp(430px, 42.9vw, 618px)",
            height: "818px",
          }}
        >
          <img decoding="async"
            src={imgPortrait}
            alt="Studio Interior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Studio title — left */}
        <div
          className="absolute flex flex-col gap-1"
          style={{
            left: "clamp(33px, calc(8.33% + 89px), 209px)",
            top: "191px",
            width: "clamp(360px, 34vw, 451px)",
          }}
        >
          <p
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "clamp(44px, 4.16vw, 60px)",
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
              fontSize: "clamp(36px, 3.33vw, 48px)",
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
            left: "clamp(33px, calc(8.33% + 89px), 209px)",
            top: "648px",
            width: "clamp(360px, 35.5vw, 511px)",
            backgroundColor: "#CCBCA2",
            opacity: 0.6,
          }}
        />

        {/* Founder info */}
        <div
          className="absolute flex items-start justify-between"
          style={{
            left: "33px",
            top: "712px",
            width: "clamp(560px, 48.6vw, 700px)",
          }}
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
              fontSize: "clamp(18px, 1.52vw, 22px)",
              fontWeight: 400,
              color: "#dcd1b1",
              lineHeight: 1.5,
              width: "clamp(410px, 36vw, 519px)",
            }}
          >
            Founded by principal Designer{" "}
            <strong style={{ fontWeight: 700 }}>Haritha Prasad</strong>
            , the studio believes every home should reflect the people who live
            within it, thoughtfully designed around their lifestyle, values, and
            everyday living.
          </p>
        </div>
      </div>

      {/* ── TABLET LAYOUT (md–lg) ── */}
      <div className="hidden md:block lg:hidden relative py-14 px-8">
        {/* Portrait image */}
        <div className="w-full mb-10" style={{ height: "420px" }}>
          <img decoding="async"
            src={imgPortrait}
            alt="Studio Interior"
            className="w-full h-full object-cover rounded-[6px]"
          />
        </div>

        {/* Title block */}
        <div className="flex flex-col gap-1 mb-10">
          <p
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "42px",
              fontWeight: 500,
              color: "#dcd1b1",
              lineHeight: 1.3,
              letterSpacing: "-0.7px",
            }}
          >
            Studio Inside Eye
          </p>
          <p
            style={{
              fontFamily: "'P22GrosvenorW00-Regular', sans-serif",
              fontSize: "34px",
              fontWeight: 400,
              color: "#dcd1b1",
              lineHeight: 1.2,
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationThickness: "1px",
            }}
          >
            build your dream home
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ backgroundColor: "#CCBCA2", opacity: 0.6 }}
        />

        {/* Founder info */}
        <div className="flex flex-col gap-3">
          <p
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#ffefc0",
              letterSpacing: "0.5px",
            }}
          >
            F O U N D E R
          </p>
          <p
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              color: "#dcd1b1",
              lineHeight: 1.6,
            }}
          >
            Founded by principal Designer{" "}
            <strong style={{ fontWeight: 700 }}>Haritha Prasad</strong>
            , the studio believes every home should reflect the people who live
            within it, thoughtfully designed around their lifestyle, values, and
            everyday living.
          </p>
        </div>
      </div>

      {/* ── MOBILE LAYOUT (< md) ── */}
      <div className="block md:hidden relative">
        {/* Portrait image — full bleed, clipped */}
        <div className="w-full" style={{ height: "320px" }}>
          <img decoding="async"
            src={imgPortrait}
            alt="Studio Interior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="px-5 pt-8 pb-10">
          {/* Title */}
          <div className="flex flex-col gap-1 mb-8">
            <p
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "28px",
                fontWeight: 500,
                color: "#dcd1b1",
                lineHeight: 1.3,
                letterSpacing: "-0.5px",
              }}
            >
              Studio Inside Eye
            </p>
            <p
              style={{
                fontFamily: "'P22GrosvenorW00-Regular', sans-serif",
                fontSize: "22px",
                fontWeight: 400,
                color: "#dcd1b1",
                lineHeight: 1.2,
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                textDecorationThickness: "1px",
              }}
            >
              build your dream home
            </p>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-6"
            style={{ backgroundColor: "#CCBCA2", opacity: 0.6 }}
          />

          {/* Founder label + text */}
          <div className="flex flex-col gap-3">
            <p
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "#ffefc0",
                letterSpacing: "0.5px",
              }}
            >
              F O U N D E R
            </p>
            <p
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "#dcd1b1",
                lineHeight: 1.65,
              }}
            >
              Founded by principal Designer{" "}
              <strong style={{ fontWeight: 700 }}>Haritha Prasad</strong>
              , the studio believes every home should reflect the people who
              live within it, thoughtfully designed around their lifestyle,
              values, and everyday living.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}