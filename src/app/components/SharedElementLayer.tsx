// ─────────────────────────────────────────────────────────────────────────────
// SharedElementLayer
// ─────────────────────────────────────────────────────────────────────────────
// Mounted ONCE at the App root. Renders the flying image clone + a cream
// backdrop, and runs the GSAP morph from the Home card to the Project hero.
//
// Easing/timing are tuned to the "quiet luxury" feel of mersi-architecture:
//   • expo.inOut  → slow start, smooth glide, soft settle
//   • ~1.1s morph → matches the site's unhurried page transitions
//
// The backdrop briefly covers the route swap (the jarring part) and then fades
// out while the image is still travelling, so the destination reveals
// gracefully behind the moving image.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useTransition } from "../context/TransitionContext";

// ── Tunables — change these to taste ─────────────────────────────────────────
const MORPH_DURATION = 1.1; // seconds the image takes to fly + grow
const MORPH_EASE = "expo.inOut"; // quiet-luxury settle
const TARGET_BORDER_COLOR = "#dad0ad"; // cream frame on the Project hero
const TARGET_BORDER_WIDTH = 4; // px — Project hero frame border
const BACKDROP_COLOR = "#dad0ad"; // matches Project Intro background
const TARGET_SELECTOR = "[data-shared-target]";
const POLL_TIMEOUT_FRAMES = 240; // ~4s safety fallback if target never mounts

export default function SharedElementLayer() {
  const { pending, endTransition } = useTransition();
  const location = useLocation();

  const cloneRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const ranForId = useRef<number | null>(null);

  // Fade the backdrop in as soon as a transition starts (covers the old page
  // before navigation swaps it out).
  useEffect(() => {
    if (!pending || !backdropRef.current) return;
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.to(backdropRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [pending]);

  // Wait for the Project page hero to mount, then run the morph.
  useEffect(() => {
    if (!pending) return;
    if (ranForId.current === pending.id) return;

    let cancelled = false;
    let frames = 0;

    const cleanupAndEnd = (target?: HTMLElement | null) => {
      if (target) target.style.opacity = "1";
      if (backdropRef.current) {
        gsap.to(backdropRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }
      endTransition();
    };

    const tick = () => {
      if (cancelled) return;

      const target = document.querySelector<HTMLElement>(TARGET_SELECTOR);
      const clone = cloneRef.current;

      if (target && clone) {
        ranForId.current = pending.id;
        const dest = target.getBoundingClientRect();

        // Start the clone exactly on the source frame
        gsap.set(clone, {
          top: pending.rect.top,
          left: pending.rect.left,
          width: pending.rect.width,
          height: pending.rect.height,
          borderWidth: pending.borderWidth,
          borderColor: pending.borderColor,
          opacity: 1,
        });

        const tl = gsap.timeline({
          onComplete: () => {
            // Reveal the real hero, hide the clone — seamless hand-off
            target.style.opacity = "1";
            if (clone) gsap.set(clone, { opacity: 0 });
            endTransition();
          },
        });

        // The image flies + grows from the card into the hero
        tl.to(
          clone,
          {
            top: dest.top,
            left: dest.left,
            width: dest.width,
            height: dest.height,
            borderWidth: TARGET_BORDER_WIDTH,
            borderColor: TARGET_BORDER_COLOR,
            duration: MORPH_DURATION,
            ease: MORPH_EASE,
          },
          0
        );

        // Backdrop clears partway through so the destination reveals gracefully
        if (backdropRef.current) {
          tl.to(
            backdropRef.current,
            {
              opacity: 0,
              duration: MORPH_DURATION * 0.55,
              ease: "power2.inOut",
            },
            MORPH_DURATION * 0.18
          );
        }
        return;
      }

      frames += 1;
      if (frames > POLL_TIMEOUT_FRAMES) {
        // Safety: target never appeared — just reveal and bail cleanly
        cleanupAndEnd(target);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pending, location.pathname, endTransition]);

  if (!pending) return null;

  return (
    <>
      {/* Cream backdrop — covers the route swap, then fades out */}
      <div
        ref={backdropRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          backgroundColor: BACKDROP_COLOR,
          opacity: 0,
          pointerEvents: "none",
          willChange: "opacity",
        }}
      />

      {/* The flying image clone */}
      <div
        ref={cloneRef}
        aria-hidden
        style={{
          position: "fixed",
          top: pending.rect.top,
          left: pending.rect.left,
          width: pending.rect.width,
          height: pending.rect.height,
          zIndex: 9999,
          overflow: "hidden",
          boxSizing: "border-box",
          borderStyle: "solid",
          borderWidth: pending.borderWidth,
          borderColor: pending.borderColor,
          pointerEvents: "none",
          willChange: "top, left, width, height",
        }}
      >
        <img
          src={pending.src}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </>
  );
}
