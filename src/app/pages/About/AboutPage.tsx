import { HeroSection } from "./HeroSection";
import { StudioIntroSection } from "./StudioIntroSection";
import { FounderSection } from "./FounderSection";
import { BasedInSection } from "./BasedInSection";
import { ProcessSection } from "./ProcessSection";
import { FooterSection } from "./FooterSection";

export default function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* JournalHeader is rendered inside HeroSection (absolute-positioned within it) */}
      <HeroSection />
      <StudioIntroSection />
      <FounderSection />
      <BasedInSection />
      <ProcessSection />
      <FooterSection />
    </div>
  );
}