import { memo } from "react";
import imgPrimaryLogos from "../../../assets/b00689a4e710d92b1f3dbd433c68cba70f10fc2e.webp";

/**
 * Logo — fixed top-left brand mark.
 *
 * Reusable: drop into any page that needs the same logo placement.
 * On mobile: slightly smaller via .logo-fixed media query.
 */
const Logo = memo(function Logo() {
  return (
    <div
      className="logo-fixed fixed h-[49px] left-[15px] top-[36px] w-[98px] z-[100]"
      data-name="Primary Logos"
    >
      <img decoding="async"
        alt="Primary logo"
        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
        src={imgPrimaryLogos}
      />
    </div>
  );
});

export default Logo;
