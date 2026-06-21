import { useRef } from "react";
import { HeroSection } from "./HeroSection";
import { StudioIntroSection } from "./StudioIntroSection";
import { FounderSection } from "./FounderSection";
import { BasedInSection } from "./BasedInSection";
import { ProcessSection } from "./ProcessSection";
import { FooterSection } from "./FooterSection";
import { useReveal } from "../../hooks/useReveal";

export default function AboutPage() {
  // ── Premium motion layer (About page ONLY) ────────────────────────────────
  // Drives the studio's existing "quiet-luxury" reveal vocabulary (clip-path
  // wipes + expo.out / power3.out settles) over the About markup via data-anim
  // attributes. The engine lives in the shared useReveal hook already used by
  // the Project page, so behaviour is consistent and no other page is touched —
  // these section components are imported nowhere else. forceMotion keeps the
  // entrance + scroll reveals playing on devices with Reduce Motion enabled, so
  // the page never ends up half-animated; parallax adds a whisper of desktop
  // depth and is auto-disabled on touch / small screens inside the hook.
  const rootRef = useRef<HTMLDivElement>(null);
  useReveal(rootRef, { enableParallax: true, forceMotion: true });

  return (
    <div ref={rootRef} className="w-full overflow-x-hidden">
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