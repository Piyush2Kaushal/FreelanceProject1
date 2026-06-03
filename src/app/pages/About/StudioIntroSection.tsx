import imgTexture from "figma:asset/98c2e853219c22f9e2b45952fc7466e6f708bc8f.png";
import imgMonogram from "figma:asset/1e097404f088f36f9dff5f7f9dd3a94d8d74cdfa.png";

export function StudioIntroSection() {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ height: "688px" }}
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

      {/* Monogram — left side */}
      <div
        className="absolute"
        style={{ left: "calc(8.33% + 7px)", top: "119px", width: "331px", height: "450px" }}
      >
        <img
          src={imgMonogram}
          alt="Studio Inside Eye monogram"
          className="w-full h-full object-cover"
          style={{ opacity: 0.9 }}
        />
      </div>

      {/* Studio description — right aligned */}
      <div
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
  );
}
