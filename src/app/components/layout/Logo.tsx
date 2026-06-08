import { memo } from "react";
import imgPrimaryLogos from "../../../assets/abca832675d93471023a757571b4ecb5a568e002.png";

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
