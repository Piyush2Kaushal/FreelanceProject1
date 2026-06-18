import { useRef, useState, useEffect, useCallback } from "react";

// ─── Particle type ───────────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  drift: number;
  speed: number;
  life: number;
  maxLife: number;
  twinkle: number;     // phase for subtle shimmer
  twinkleSpeed: number;
}

// ─── Canvas beam renderer ─────────────────────────────────────────────────────
function BeamCanvas({
  width,
  height,
  active,
  intensity,
  dpr,
}: {
  width: number;
  height: number;
  active: boolean;
  intensity: number; // 0→1
  dpr: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const counterRef = useRef(0);
  const timeRef = useRef(0);

  const spawnParticle = useCallback((beamHeight: number, halfAngleAtBottom: number) => {
    const id = counterRef.current++;
    const y = Math.random() * beamHeight * 0.92 + beamHeight * 0.04;
    const coneHalf = (y / beamHeight) * halfAngleAtBottom;
    const x = (Math.random() * 2 - 1) * coneHalf * 0.88;
    particlesRef.current.push({
      id,
      x,
      y,
      size: Math.random() * 1.7 + 0.3,
      opacity: Math.random() * 0.65 + 0.1,
      drift: (Math.random() - 0.5) * 0.16,
      speed: Math.random() * 0.22 + 0.05,
      life: 0,
      maxLife: Math.random() * 220 + 120,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.05 + 0.015,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Hi-DPI: scale backing store, keep logical coords in CSS px
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = width / 2;
    const halfAngleAtBottom = width * 0.42;

    const draw = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, width, height);
      if (intensity <= 0.01) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      // Subtle living flicker — tiny, organic brightness variation
      const flicker =
        1 +
        Math.sin(timeRef.current * 0.08) * 0.012 +
        Math.sin(timeRef.current * 0.21 + 1.3) * 0.008;
      const I = intensity * flicker;

      ctx.save();

      // ════ HOTSPOT at the source — bright bloom where light is born ════
      // Use 'screen' / 'lighter' compositing for additive light realism
      ctx.globalCompositeOperation = "lighter";

      const hotspot = ctx.createRadialGradient(cx, 0, 0, cx, 0, width * 0.34);
      hotspot.addColorStop(0,    `rgba(255,246,214,${0.55 * I})`);
      hotspot.addColorStop(0.35, `rgba(255,232,170,${0.26 * I})`);
      hotspot.addColorStop(1,    `rgba(255,210,130,0)`);
      ctx.fillStyle = hotspot;
      ctx.beginPath();
      ctx.arc(cx, 0, width * 0.34, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // ════ VOLUMETRIC CONE — clipped, additive layered gradients ════
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx + halfAngleAtBottom, height);
      ctx.lineTo(cx - halfAngleAtBottom, height);
      ctx.closePath();
      ctx.clip();

      // Primary warm body — long falloff
      const grad = ctx.createRadialGradient(cx, 0, 0, cx, 0, height * 1.1);
      grad.addColorStop(0,    `rgba(255,236,180,${0.46 * I})`);
      grad.addColorStop(0.15, `rgba(255,216,135,${0.30 * I})`);
      grad.addColorStop(0.40, `rgba(255,196,100,${0.155 * I})`);
      grad.addColorStop(0.68, `rgba(250,176,78,${0.066 * I})`);
      grad.addColorStop(0.88, `rgba(244,158,62,${0.022 * I})`);
      grad.addColorStop(1,    `rgba(240,148,55,0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Bright central spine — a tighter, hotter core down the axis
      const spine = ctx.createRadialGradient(cx, 0, 0, cx, height * 0.22, height * 0.62);
      spine.addColorStop(0,   `rgba(255,248,222,${0.30 * I})`);
      spine.addColorStop(0.45,`rgba(255,226,160,${0.10 * I})`);
      spine.addColorStop(1,   `rgba(255,206,130,0)`);
      // narrow the spine horizontally
      ctx.save();
      ctx.translate(cx, 0);
      ctx.scale(0.5, 1);
      ctx.translate(-cx, 0);
      ctx.fillStyle = spine;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      ctx.restore();

      // ════ SOFT EDGE FEATHERING — penumbra on cone sides ════
      // Slightly wider cone, faint, to blur the hard clip boundary
      const edgeFade = Math.min(width * 0.16, 34);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx + halfAngleAtBottom + edgeFade, height);
      ctx.lineTo(cx - halfAngleAtBottom - edgeFade, height);
      ctx.closePath();
      ctx.clip();

      const penumbra = ctx.createRadialGradient(cx, 0, 0, cx, 0, height * 1.05);
      penumbra.addColorStop(0,   `rgba(255,224,160,${0.10 * I})`);
      penumbra.addColorStop(0.5, `rgba(255,204,128,${0.04 * I})`);
      penumbra.addColorStop(1,   `rgba(255,190,110,0)`);
      ctx.fillStyle = penumbra;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // ════ FLOATING DUST / MOTES ════
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      if (intensity > 0.45 && Math.random() < 0.28 * intensity) {
        spawnParticle(height, halfAngleAtBottom);
      }

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);
      for (const p of particlesRef.current) {
        p.life++;
        p.y += p.speed;
        p.x += p.drift * 0.5;
        p.twinkle += p.twinkleSpeed;

        const t = p.life / p.maxLife;
        const envelope = t < 0.18 ? t / 0.18 : t > 0.78 ? (1 - t) / 0.22 : 1;
        const shimmer = 0.7 + Math.sin(p.twinkle) * 0.3;

        const coneHalf = (p.y / height) * halfAngleAtBottom;
        if (Math.abs(p.x) > coneHalf * 0.94) continue;

        // brightness of a mote depends on depth — closer to source = brighter
        const depthBoost = 1 - (p.y / height) * 0.5;

        const screenX = cx + p.x;
        const screenY = p.y;
        const r = p.size * 2.6;

        ctx.globalAlpha =
          p.opacity * envelope * intensity * shimmer * depthBoost * 0.85;
        const pg = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, r);
        pg.addColorStop(0,   "rgba(255,244,206,1)");
        pg.addColorStop(0.4, "rgba(255,224,158,0.5)");
        pg.addColorStop(1,   "rgba(255,206,120,0)");
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(screenX, screenY, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [width, height, intensity, spawnParticle, dpr]);

  useEffect(() => {
    if (!active) {
      // fade particles out naturally by letting them age fast instead of hard clear
      for (const p of particlesRef.current) {
        if (p.maxLife - p.life > 40) p.maxLife = p.life + 40;
      }
    }
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "block",
        mixBlendMode: "screen", // blends beam into scene like real light
      }}
    />
  );
}

// ─── Animated intensity hook ──────────────────────────────────────────────────
function useIntensity(active: boolean): number {
  const [intensity, setIntensity] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const target = active ? 1 : 0;
    // warm-up slower (incandescent glow ramp), fade-out a touch quicker
    const speed = active ? 0.02 : 0.032;

    const animate = () => {
      setIntensity((prev) => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.004) return target;
        const step = diff * speed * (1 + Math.abs(diff) * 0.9);
        return prev + step;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  return intensity;
}

// ─── Public wrapper ───────────────────────────────────────────────────────────
/**
 * Drop this absolutely over the lamp image container.
 * `beamOriginPercent` = how far DOWN (0–100) inside the container the lamp's
 * light-emitting point sits.
 * `beamLengthMultiplier` = how many times the natural beam length to extend.
 */
export function LampLightOverlay({
  active,
  containerWidth,
  containerHeight,
  beamOriginPercent = 88,
  beamLengthMultiplier = 3.5,
}: {
  active: boolean;
  containerWidth: number;
  containerHeight: number;
  beamOriginPercent?: number;
  beamLengthMultiplier?: number;
}) {
  const intensity = useIntensity(active);
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  if (containerWidth === 0 || containerHeight === 0) return null;

  const originY = (beamOriginPercent / 100) * containerHeight;
  const naturalHeight = containerHeight - originY + 8;
  const beamHeight = naturalHeight * beamLengthMultiplier;
  const beamWidth = containerWidth * 1.1;

  return (
    <div
      style={{
        position: "absolute",
        top: originY,
        left: "50%",
        transform: "translateX(-50%)",
        width: beamWidth,
        height: beamHeight,
        pointerEvents: "none",
        zIndex: 15,
        overflow: "visible",
        filter: "blur(0.4px)", // micro-softening kills any banding, reads as glow
      }}
    >
      <BeamCanvas
        width={beamWidth}
        height={beamHeight}
        active={active}
        intensity={intensity}
        dpr={dpr}
      />
    </div>
  );
}

// ─── Hook: hover/tap state ────────────────────────────────────────────────────
export function useLampActive(): {
  active: boolean;
  handlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
  };
} {
  const [active, setActive] = useState(false);
  return {
    active,
    handlers: {
      onMouseEnter: () => setActive(true),
      onMouseLeave: () => setActive(false),
      onTouchStart: () => setActive(true),
      onTouchEnd: () => setActive(false),
    },
  };
}