import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { useSelection } from "../../app/context/SelectionContext";

import imgImage2 from "../../assets/24105613f5e3ace9c1e90e196c6c96d49fe1bb05.png";
import imgImage24 from "../../assets/3518a7f92431de5dbab98ccfd4d5e39239b555f0.png";
import imgImage26 from "../../assets/ecbcb18116488299dd6fe702ece61e4a2566f4fc.png";
import imgImage27 from "../../assets/7244749a076e598e9efe221712c15ad19b763081.png";
import imgImage29 from "../../assets/0c6abfcbeaf31e67a46075117d8200149cb36cf4.png";
import imgImage30 from "../../assets/22d465e475d321cbe6910a24e2a2b90cd914e608.png";
import imgImage36 from "../../assets/c37db4459cf89aa602d24af4442a4287e514224e.png";
import imgImage37 from "../../assets/1e97a161b5ff5bbfb58c23bf52d72fdfd17418e5.png";
import imgImage38 from "../../assets/206d337464e0f7406b0f1b9670f6623191e801fe.png";
import imgImage40 from "../../assets/87a5549b7ba9e4332abcdb934e8826ebd5735feb.png";
import imgImage41 from "../../assets/051c45652caa1671f474e1cb4003f21c1089ce93.png";
import imgImage42 from "../../assets/85e4ae52317a275bf2b084bce52dc9a4f49aa6c8.png";
import imgImage43 from "../../assets/7304b74771a7b7a9cf8038df484ed9f255d3e65a.png";
import imgImage44 from "../../assets/9123537afb8f13dfce31fc5e9065b0e4506a1a8f.png";
import imgImage45 from "../../assets/446b4823c7d43d1f3cc14d8dd6bb50cf8e627248.png";
import imgImage46 from "../../assets/4ebb7bddc973ce5b9272d6f2e92e71f624f1f3e5.png";
import img14 from "../../assets/5e7b2cb2ed1103f45de90c50bbc4e48f5020ebde.png";
import imgImage169 from "../../assets/c1385cecd1feb9eea78bdd76ac8779e86985fc71.png";
import imgImage171 from "../../assets/0e22e65ccdad8cd3108688fcf4d7d442bcda2c42.png";
import imgImage175 from "../../assets/4eb9769902805a1ea62ad96b3bc4f827b4aaa651.png";
import imgImage182 from "../../assets/572dbe626303b4dc231b7ed9598a7ff410221ac8.png";
import imgImage181 from "../../assets/b346545d66acf8454ca2d714cfd0ce7a845f80bd.png";
import imgImage161 from "../../assets/712c45694826efc0fb8bde4f565a099b0354e90f.png";
import imgImage190 from "../../assets/04c63a8d0b8d326952426bc1876a936f5218d6fd.png";
import imgImage25 from "../../assets/2a65409384c571664e78264b36fe89c5a4acd8be.png";
import imgImage250 from "../../assets/e54fc404adc1bc078bcc2d37857c47a7ed40ebb5.png";
import imgPrimaryLogos from "../../assets/abca832675d93471023a757571b4ecb5a568e002.png";

// ─── Layout components ────────────────────────────────────────────────────────
import Navbar from "../../app/components/layout/Navbar";
import Logo from "../../app/components/layout/Logo";
import FooterNavWithCTA from "../../app/components/layout/FooterNavWithCTA";
import DragHint from "../../app/components/layout/DragHint";
import ZoomControls from "../../app/components/layout/ZoomControls";

const CANVAS_W = 3200;
const CANVAS_H = 2150;
const CANVAS_PAD = 120;

const SHADOW_REST  = "drop-shadow(0px 6px 18px rgba(60,35,10,0.13)) drop-shadow(0px 2px 5px rgba(60,35,10,0.09))";
const SHADOW_HOVER = "drop-shadow(0px 18px 40px rgba(50,28,8,0.22)) drop-shadow(0px 6px 12px rgba(50,28,8,0.14))";
const SHADOW_DRAG  = "drop-shadow(0px 28px 52px rgba(40,22,6,0.30)) drop-shadow(0px 8px 18px rgba(40,22,6,0.18))";

function getPointer(e: MouseEvent | TouchEvent): { x: number; y: number } {
  if ("touches" in e) {
    const t = e.touches[0] ?? e.changedTouches[0];
    return { x: t.clientX, y: t.clientY };
  }
  return { x: e.clientX, y: e.clientY };
}

// ─── Custom Cursor (Palmer-style) ─────────────────────────────────────────────
function CustomCursor() {
  const rafRef = useRef<number>(0);

  const stateRef = useRef({
    mx: -200, my: -200,
    cx: -200, cy: -200,
    tx: -200, ty: -200,
    outerScale: 1,    targetOuterScale: 1,
    innerScale: 1,    targetInnerScale: 1,
    grabOp: 0,        targetGrabOp: 0,
    grabbingOp: 0,    targetGrabbingOp: 0,
    labelOp: 0,       targetLabelOp: 0,
    outerR: 8,       targetOuterR: 5,
    ringOp: 0.85,     targetRingOp: 0.85,
    isGrabbing: false,
    isOverDraggable: false,
  });

  const mainRef      = useRef<SVGGElement>(null);
  const trailRef     = useRef<SVGCircleElement>(null);
  const outerRingRef = useRef<SVGCircleElement>(null);
  const innerFillRef = useRef<SVGCircleElement>(null);
  const grabRef      = useRef<SVGGElement>(null);
  const grabbingRef  = useRef<SVGGElement>(null);
  const labelRef     = useRef<SVGGElement>(null);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const s = stateRef.current;

    const onMove = (e: MouseEvent) => {
      s.mx = e.clientX;
      s.my = e.clientY;
      const el = document.elementFromPoint(s.mx, s.my) as HTMLElement | null;
      s.isOverDraggable = !!el?.closest("[data-object='true']");
    };

    const onDown = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (el?.closest("[data-object='true']")) s.isGrabbing = true;
    };

    const onUp = () => { s.isGrabbing = false; };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const tick = () => {
      // Trailing dot — very slow (spring lag)
      s.cx = lerp(s.cx, s.mx, 0.095);
      s.cy = lerp(s.cy, s.my, 0.095);
      // Main cursor — faster follow
      s.tx = lerp(s.tx, s.mx, 0.26);
      s.ty = lerp(s.ty, s.my, 0.26);

      if (s.isGrabbing) {
        s.targetOuterScale  = 0.72;
        s.targetInnerScale  = 0.28;
        s.targetGrabOp      = 0;
        s.targetGrabbingOp  = 1;
        s.targetLabelOp     = 0;
        s.targetOuterR      = 8;
        s.targetRingOp      = 0.32;
      } else if (s.isOverDraggable) {
        s.targetOuterScale  = 1.45;
        s.targetInnerScale  = 0;
        s.targetGrabOp      = 1;
        s.targetGrabbingOp  = 0;
        s.targetLabelOp     = 1;
        s.targetOuterR      = 11;
        s.targetRingOp      = 0.95;
      } else {
        s.targetOuterScale  = 1;
        s.targetInnerScale  = 1;
        s.targetGrabOp      = 0;
        s.targetGrabbingOp  = 0;
        s.targetLabelOp     = 0;
        s.targetOuterR      = 8;
        s.targetRingOp      = 0.85;
      }

      s.outerScale  = lerp(s.outerScale,  s.targetOuterScale,  0.08);
      s.innerScale  = lerp(s.innerScale,  s.targetInnerScale,  0.08);
      s.grabOp      = lerp(s.grabOp,      s.targetGrabOp,      0.10);
      s.grabbingOp  = lerp(s.grabbingOp,  s.targetGrabbingOp,  0.10);
      s.labelOp     = lerp(s.labelOp,     s.targetLabelOp,     0.10);
      s.outerR      = lerp(s.outerR,      s.targetOuterR,      0.10);
      s.ringOp      = lerp(s.ringOp,      s.targetRingOp,      0.10);

      if (trailRef.current) {
        trailRef.current.setAttribute("cx", String(Math.round(s.cx)));
        trailRef.current.setAttribute("cy", String(Math.round(s.cy)));
      }
      if (mainRef.current) {
        mainRef.current.setAttribute(
          "transform",
          `translate(${s.tx.toFixed(1)},${s.ty.toFixed(1)})`
        );
      }
      if (outerRingRef.current) {
        outerRingRef.current.setAttribute("r", s.outerR.toFixed(1));
        outerRingRef.current.setAttribute("opacity", s.ringOp.toFixed(2));
        outerRingRef.current.setAttribute(
          "transform",
          `scale(${s.outerScale.toFixed(3)})`
        );
      }
      if (innerFillRef.current) {
        innerFillRef.current.setAttribute(
          "transform",
          `scale(${s.innerScale.toFixed(3)})`
        );
        innerFillRef.current.setAttribute("opacity", s.innerScale.toFixed(2));
      }
      if (grabRef.current)     grabRef.current.setAttribute("opacity",     s.grabOp.toFixed(2));
      if (grabbingRef.current) grabbingRef.current.setAttribute("opacity", s.grabbingOp.toFixed(2));
      if (labelRef.current)    labelRef.current.setAttribute("opacity",    s.labelOp.toFixed(2));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg
      className="custom-cursor-svg"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        overflow: "visible",
        width: 1,
        height: 1,
      }}
    >
      {/* Trailing dot — slow spring follow */}
      <circle
        ref={trailRef}
        cx={-200}
        cy={-200}
        r={1.4}
        fill="#703000"
        opacity={0.28}
      />

      {/* Main cursor group — faster follow */}
      <g ref={mainRef} style={{ transformOrigin: "center center" }}>

        {/* Outer ring */}
        <circle
          ref={outerRingRef}
          r={12}
          fill="none"
          stroke="#703000"
          strokeWidth={1.5}
          style={{ transformOrigin: "center center" }}
        />

        {/* Inner dot */}
        <circle
          ref={innerFillRef}
          r={1.8}
          fill="#703000"
          style={{ transformOrigin: "center center" }}
        />

        {/* Open grab hand — shown on draggable hover */}
        <g ref={grabRef} opacity={0} style={{ transformOrigin: "center center" }}>
          <line x1={-5}   y1={-4} x2={-5}   y2={5} stroke="#703000" strokeWidth={1.5} strokeLinecap="round" />
          <line x1={-1.5} y1={-6} x2={-1.5} y2={5} stroke="#703000" strokeWidth={1.5} strokeLinecap="round" />
          <line x1={2}    y1={-5} x2={2}    y2={5} stroke="#703000" strokeWidth={1.5} strokeLinecap="round" />
          <line x1={5.5}  y1={-3} x2={5.5}  y2={5} stroke="#703000" strokeWidth={1.5} strokeLinecap="round" />
          <path
            d="M-5,5 Q-5,9 -2,9 L5.5,9 Q8,9 8,6 L8,2"
            fill="none"
            stroke="#703000"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </g>

        {/* Closed grabbing fist — shown on mousedown */}
        <g ref={grabbingRef} opacity={0} style={{ transformOrigin: "center center" }}>
          <path
            d="M-4,0 L-4,6 Q-4,9 -1,9 L3,9 Q6,9 7,6 L7,1 Q7,-2 4,-2 L2,-2 L2,-4 Q2,-6 0,-6 L-1,-6 Q-3,-6 -3,-4 L-3,-1"
            fill="none"
            stroke="#703000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* DRAG pill label */}
        <g ref={labelRef} opacity={0}>
          <rect x={-24} y={22} width={48} height={15} rx={7.5} fill="#703000" />
          <text
            x={0}
            y={33}
            textAnchor="middle"
            fontSize={7}
            fill="white"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight={700}
            letterSpacing={1.2}
          >
            DRAG
          </text>
        </g>
      </g>
    </svg>
  );
}

// ─── Canvas Frame ─────────────────────────────────────────────────────────────
function Frame() {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ backgroundColor: "rgb(245, 245, 220)" }}
      data-name="Frame"
    >
      <div data-object="true" className="absolute flex h-[238.014px] items-center justify-center left-[20px] top-[121px] w-[271.09px]">
        <div className="flex-none rotate-[-12.05deg]">
          <div className="h-[193px] relative w-[236px]" data-name="image 2">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[204.51%] left-0 max-w-none top-[-24.31%] w-[111.65%]" src={imgImage2} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[320.471px] items-center justify-center left-[1420px] top-[450px] w-[309.964px]">
        <div className="flex-none rotate-[36.28deg]">
          <div className="h-[250px] relative w-[201px]" data-name="image 24">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[160%] left-[-18.57%] max-w-none top-[-25.2%] w-[132.67%]" src={imgImage24} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[187.857px] items-center justify-center left-[1550px] top-[320px] w-[218.041px]">
        <div className="flex-none rotate-[17.36deg]">
          <div className="h-[139px] relative w-[185px]" data-name="image 26">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[389.85%] left-[-94.31%] max-w-none top-[-127.66%] w-[194.31%]" src={imgImage26} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[319.983px] items-center justify-center left-[330px] top-[983px] w-[338.999px]">
        <div className="flex-none rotate-[-18.69deg]">
          <div className="h-[244.751px] relative w-[275.086px]" data-name="image 27">
            <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage27} />
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[224.757px] items-center justify-center left-[20px] top-[641px] w-[214.836px]">
        <div className="flex-none rotate-[-24.06deg]">
          <div className="h-[176.222px] relative w-[156.593px]" data-name="image 29">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[149.37%] left-[-24.5%] max-w-none top-[-34.94%] w-[252.14%]" src={imgImage29} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[162.795px] items-center justify-center left-[1480px] top-[850px] w-[182.721px]">
        <div className="flex-none rotate-[23.23deg]">
          <div className="h-[112.544px] relative w-[150.534px]" data-name="image 47">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[389.85%] left-[-46.92%] max-w-none top-[-211.05%] w-[194.31%]" src={imgImage26} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute h-[280px] left-[1300px] top-[650px] w-[208px]" data-name="image 30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[176.96%] left-[-28.79%] max-w-none top-0 w-[158.51%]" src={imgImage30} />
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[158.895px] items-center justify-center left-[920px] top-[900px] w-[148.735px]">
        <div className="flex-none rotate-[11.45deg]">
          <div className="h-[137px] relative w-[124px]" data-name="image 31">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[139.15%] left-[-19.06%] max-w-none top-[-26.89%] w-[231.07%]" src={imgImage29} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute h-[138px] left-[1810px] top-[780px] w-[128px]" data-name="image 32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[139.15%] left-[-113.99%] max-w-none top-[-26.89%] w-[225.19%]" src={imgImage29} />
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[181.757px] items-center justify-center left-[1103px] top-[867px] w-[223.701px]">
        <div className="flex-none rotate-[13.02deg]">
          <div className="h-[141px] relative w-[197px]" data-name="image 36">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[135.01%] left-[-25.57%] max-w-none top-[-14.65%] w-[145.08%]" src={imgImage36} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute h-[190px] left-[758px] top-[879px] w-[90px]" data-name="image 37">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage37} />
      </div>
      <div data-object="true" className="absolute h-[161px] left-[170px] top-[20px] w-[107px]" data-name="image 38">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage38} />
      </div>
      <div data-object="true" className="absolute flex h-[268.844px] items-center justify-center left-[1277px] top-[1222px] w-[197.714px]">
        <div className="flex-none rotate-[11.86deg]">
          <div className="h-[243px] relative w-[151px]" data-name="image 40">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[129.84%] left-[-17.26%] max-w-none top-[-18.93%] w-[139.13%]" src={imgImage40} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute h-[275px] left-[442px] top-[244px] w-[197px]" data-name="image 41">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[180.28%] left-[-34.86%] max-w-none top-[-22.89%] w-[167.59%]" src={imgImage41} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[191px] left-[615px] top-[641px] w-[178px]" data-name="image 42">
        <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage42} />
      </div>
      <div data-object="true" className="absolute flex h-[268.856px] items-center justify-center left-[982px] top-[20px] w-[330.507px]">
        <div className="flex-none rotate-[-17.69deg]">
          <div className="h-[191px] relative w-[286px]" data-name="image 43">
            <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage43} />
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute h-[260px] left-[680px] top-[180px] w-[257px]" data-name="image 44">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[148.12%] left-0 max-w-none top-[-48.12%] w-full" src={imgImage44} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[253px] left-[224px] top-[832px] w-[147px]" data-name="image 45">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[117.88%] left-[-12.25%] max-w-none top-0 w-[134.91%]" src={imgImage45} />
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[231.315px] items-center justify-center left-[1950px] top-[1800px] w-[344.725px]">
        <div className="flex-none rotate-[-5.09deg]">
          <div className="h-[203px] relative w-[328px]" data-name="image 46">
            <img loading="lazy" decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage46} />
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[230px] items-center justify-center left-[1050px] top-[580px] w-[220px]">
  <div className="flex-none rotate-[7.2deg]">
    <div className="h-[190px] relative w-[190px]" data-name="image 250">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img loading="lazy" decoding="async" alt="" className="absolute h-[110%] left-[-5%] max-w-none top-[-5%] w-[110%]" src={imgImage250} />
      </div>
    </div>
  </div>
</div>
      <div data-object="true" className="absolute h-[166px] left-[2431px] top-[475px] w-[145px]" data-name="14">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[355.42%] left-[-17.24%] max-w-none top-[-13.25%] w-[314.48%]" src={img14} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[182px] left-[2712px] top-[311px] w-[154px]" data-name="15">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[324.18%] left-[-184.91%] max-w-none top-[-8.24%] w-[296.1%]" src={img14} />
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[284.799px] items-center justify-center left-[1480px] top-[80px] w-[454.692px]">
        <div className="flex-none rotate-[-17.6deg]">
          <div className="h-[164px] relative w-[425px]" data-name="16">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[359.76%] left-[-3.24%] max-w-none top-[-124.14%] w-[107.29%]" src={img14} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute h-[190px] left-[2920px] top-[268px] w-[165px]" data-name="17">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[500%] left-[-28.65%] max-w-none top-[-341.36%] w-[447.06%]" src={img14} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[144px] left-[2246px] top-[268px] w-[157px]" data-name="18">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[261.06%] left-[-84.69%] max-w-none top-[-160.98%] w-[184.62%]" src={img14} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[173px] left-[177.64px] top-[339.08px] w-[264px]" data-name="image 169">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[252.14%] left-[-12.92%] max-w-none top-[-16.67%] w-[128.09%]" src={imgImage169} />
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[180.412px] items-center justify-center left-[754.71px] top-[1341.46px] w-[228.902px]">
        <div className="flex-none rotate-[12.03deg]">
          <div className="h-[141px] relative w-[204px]" data-name="image 170">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[226.92%] left-[-8.18%] max-w-none top-[-108.92%] w-[120.95%]" src={imgImage169} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[252.433px] items-center justify-center left-[2043.4px] top-[641.28px] w-[404.202px]">
        <div className="flex-none rotate-[19.14deg]">
          <div className="h-[135px] relative w-[381px]" data-name="image 171">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[437.04%] left-[-5.51%] max-w-none top-[-107.41%] w-[119.69%]" src={imgImage171} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[210.75px] items-center justify-center left-[2045.36px] top-[1116.63px] w-[206.274px]">
        <div className="flex-none rotate-[24.41deg]">
          <div className="h-[162px] relative w-[153px]" data-name="image 172">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[365.49%] left-[-0.75%] max-w-none top-[-172.89%] w-[299.09%]" src={imgImage171} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute h-[218px] left-[1144px] top-[1599px] w-[142px]" data-name="image 175">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[270.64%] left-0 max-w-none top-0 w-[321.13%]" src={imgImage175} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[248px] left-[152px] top-[1398px] w-[178px]" data-name="image 176">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[237.9%] left-[-152%] max-w-none top-0 w-[256.18%]" src={imgImage175} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[283px] left-[1837px] top-[1303px] w-[154px]" data-name="image 177">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[208.48%] left-[-191.27%] max-w-none top-[-104.91%] w-[296.1%]" src={imgImage175} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[145px] left-[1225px] top-[206px] w-[135px]" data-name="image 178">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[333.33%] left-[-0.22%] max-w-none top-[-227.62%] w-[276.36%]" src={imgImage175} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[98px] left-[2461px] top-[1005px] w-[259px]" data-name="image 179">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[602.04%] left-[-4.76%] max-w-none top-[-290.93%] w-[176.06%]" src={imgImage175} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[192px] left-[558px] top-[1762px] w-[489px]" data-name="image 174">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[453.85%] left-[-16.25%] max-w-none top-[-339.39%] w-[137.76%]" src={imgImage171} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[162px] left-[2480px] top-[1813px] w-[156px]" data-name="image 173">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[364.2%] left-[-176.15%] max-w-none top-[-172.89%] w-[292.31%]" src={imgImage171} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[269px] left-[2691px] top-[641px] w-[327px]" data-name="image 182">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[207.43%] left-[-13.96%] max-w-none top-[-90.71%] w-[131.89%]" src={imgImage182} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[203px] left-[1565px] top-[1635px] w-[349px]" data-name="image 181">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[290.64%] left-[-30.66%] max-w-none top-[-190.82%] w-[130.66%]" src={imgImage181} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[203px] left-[2079px] top-[37px] w-[334px]" data-name="image 180">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[290.64%] left-0 max-w-none top-[-94.58%] w-[136.53%]" src={imgImage181} />
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[341.76px] items-center justify-center left-[2836.73px] top-[1164.62px] w-[375.546px]">
        <div className="flex-none rotate-[34.41deg]">
          <div className="h-[193px] relative w-[323px]" data-name="image 183">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[289.12%] left-[-1.43%] max-w-none top-[-17.89%] w-[133.52%]" src={imgImage182} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute h-[214px] left-[960px] top-[368px] w-[143px]" data-name="image 161">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[170.03%] left-0 max-w-none top-0 w-[195.71%]" src={imgImage161} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[106px] left-[1718px] top-[1148px] w-[157px]" data-name="image 184">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[556.6%] left-[-190.18%] max-w-none top-[-0.17%] w-[290.45%]" src={imgImage161} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[209px] left-[120px] top-[1745px] w-[157px]" data-name="image 186">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[282.3%] left-[-190.18%] max-w-none top-[-101.06%] w-[290.45%]" src={imgImage161} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[154px] left-[2653px] top-[1489px] w-[104px]" data-name="image 187">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[383.12%] left-[-338.69%] max-w-none top-[-283.32%] w-[438.46%]" src={imgImage161} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[262px] left-[2977px] top-[689px] w-[181px]" data-name="image 185">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[546.3%] left-[-190.18%] max-w-none top-[-97.09%] w-[290.45%]" src={imgImage161} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[187px] left-[2784px] top-[1687px] w-[363px]" data-name="image 190">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[311.96%] left-[1.36%] max-w-none top-0 w-[97.29%]" src={imgImage190} />
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[251.142px] items-center justify-center left-[3021px] top-[1022px] w-[138.581px]">
        <div className="flex-none rotate-[-15.36deg]">
          <div className="h-[177.367px] relative w-[102.397px]" data-name="image 196">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[470.49%] left-[-106.56%] max-w-none top-[-157.21%] w-[213.29%]" src={imgImage190} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute flex h-[194.128px] items-center justify-center left-[2539px] top-[104px] w-[227.146px]">
        <div className="flex-none rotate-[19.88deg]">
          <div className="h-[137px] relative w-[192px]" data-name="image 193">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img loading="lazy" decoding="async" alt="" className="absolute h-[521.82%] left-[-172.25%] max-w-none top-[-288.7%] w-[286.22%]" src={imgImage190} />
            </div>
          </div>
        </div>
      </div>
      <div data-object="true" className="absolute h-[156px] left-[2885px] top-[480px] w-[192px]" data-name="image 195">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[367.95%] left-[-15.41%] max-w-none top-[-256.83%] w-[231.06%]" src={imgImage190} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[153px] left-[1307px] top-[1838px] w-[261px]" data-name="image 191">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[470.49%] left-[-6.66%] max-w-none top-[-150.3%] w-[213.29%]" src={imgImage190} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[110px] left-[2920px] top-[1522px] w-[167px]" data-name="image 194">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[521.82%] left-[-152.69%] max-w-none top-[-402.96%] w-[265.65%]" src={imgImage190} />
        </div>
      </div>
      <div data-object="true" className="absolute h-[144px] left-[2252px] top-[1442px] w-[190px]" data-name="image 25">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img loading="lazy" decoding="async" alt="" className="absolute h-[111.11%] left-[-2.9%] max-w-none top-[-7.64%] w-[105.8%]" src={imgImage25} />
        </div>
      </div>
    </div>
  );
}


// ─── Main Component ───────────────────────────────────────────────────────────
export default function FinalMoodboard() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLDivElement>(null);
  const pinchHintRef = useRef<HTMLDivElement>(null);
  const introRef    = useRef<HTMLDivElement>(null);
  const { resetSelection } = useSelection();
  const [introVisible, setIntroVisible] = useState(true);

  // Issue 3 fix: clear any leftover selection when home page mounts
  useEffect(() => {
    resetSelection();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zoomState = useRef({
    scale: 1,
    min: 0.4,
    max: 1.6,
  });

  const panState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    panX: 0,
    panY: 0,
    velX: 0,
    velY: 0,
    lastX: 0,
    lastY: 0,
    rafId: 0,
    hasDragged: false,
  });

  const objState = useRef({
    active: false,
    el: null as HTMLElement | null,
    startMouseX: 0,
    startMouseY: 0,
    startLeft: 0,
    startTop: 0,
    floatTl: null as gsap.core.Timeline | null,
    stillTimer: 0,
    // ── Drag rotation ──────────────────────────────────────────────────────
    baseRotation: 0,   // image ki CSS rotation — drag ke baad yahan wapas aayegi
    lastDragX: 0,      // prev frame ka x — velocity nikaalte hain isse
    dragVelX: 0,       // smoothed horizontal velocity — rotation calculate karne ke liye
  });

  const floatTimelines = useRef<Map<HTMLElement, gsap.core.Timeline>>(new Map());
  const dragIds        = useRef<Map<HTMLElement, number>>(new Map());

  // ── 2-finger twist rotate state (mobile only) ─────────────────────────────
  const rotateState = useRef({
    active:        false,
    el:            null as HTMLElement | null,
    startAngle:    0,   // angle between 2 fingers at gesture start (degrees)
    startRotation: 0,   // element rotation at gesture start (degrees)
    floatTl:       null as gsap.core.Timeline | null,
  });

  // ── 2-finger pinch resize state (mobile only) ──────────────────────────────
  const pinchState = useRef({
    active:       false,
    el:           null as HTMLElement | null,
    startDist:    0,    // pixel distance between 2 fingers at gesture start
    startScale:   1,    // element scale at gesture start
    startAngle:   0,    // finger angle at gesture start (for simultaneous rotate)
    startRotation:0,    // element rotation at gesture start
    floatTl:      null as gsap.core.Timeline | null,
    currentScale: 1,    // live scale being applied
  });

  // ── Helper: get distance & angle between 2 touches ─────────────────────────
  const getTouchInfo = (t1: Touch, t2: Touch) => {
    const dx   = t2.clientX - t1.clientX;
    const dy   = t2.clientY - t1.clientY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return { dist, angle };
  };

  const getInitialPan = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: -(CANVAS_W / 2 - vw / 2),
      y: -(CANVAS_H / 2 - vh / 2),
    };
  }, []);

  const applyPan = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const vw      = window.innerWidth;
    const vh      = window.innerHeight;
    const scale   = zoomState.current.scale;
    const minX    = -(CANVAS_W * scale - vw);
    const maxX    = 0;
    const minY    = -(CANVAS_H * scale - vh);
    const maxY    = 0;
    const clampedX = Math.min(maxX, Math.max(minX, x));
    const clampedY = Math.min(maxY, Math.max(minY, y));
    gsap.set(canvas, { x: clampedX, y: clampedY });
    panState.current.panX = clampedX;
    panState.current.panY = clampedY;
  }, []);

  const applyZoom = useCallback((newScale: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const z     = zoomState.current;
    const clamp = Math.min(z.max, Math.max(z.min, newScale));
    z.scale     = clamp;
    const vw    = window.innerWidth;
    const vh    = window.innerHeight;
    const s     = panState.current;
    s.panX = -(CANVAS_W * clamp / 2 - vw / 2);
    s.panY = -(CANVAS_H * clamp / 2 - vh / 2);
    gsap.to(canvas, {
      scale: clamp,
      x: s.panX,
      y: s.panY,
      duration: 0.35,
      ease: "power3.out",
      transformOrigin: "0px 0px",
    });
  }, []);

  const startFloating = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const objects = canvas.querySelectorAll<HTMLElement>("[data-object='true']");
    objects.forEach((el) => {
      const dur    = 3 + Math.random() * 3;
      const cssLeft = parseFloat(window.getComputedStyle(el).left) || 0;
      const cssTop  = parseFloat(window.getComputedStyle(el).top)  || 0;
      const elW     = el.offsetWidth;
      const elH     = el.offsetHeight;
      const spaceRight  = Math.max(0, CANVAS_W - CANVAS_PAD - (cssLeft + elW));
      const spaceLeft   = Math.max(0, cssLeft - CANVAS_PAD);
      const spaceBottom = Math.max(0, CANVAS_H - CANVAS_PAD - (cssTop + elH));
      const spaceTop    = Math.max(0, cssTop - CANVAS_PAD);
      const maxDrift    = 25;
      const driftRight  = Math.min(maxDrift, spaceRight);
      const driftLeft   = Math.min(maxDrift, spaceLeft);
      const driftDown   = Math.min(maxDrift, spaceBottom);
      const driftUp     = Math.min(maxDrift, spaceTop);
      const dx = Math.random() * (driftRight + driftLeft) - driftLeft;
      const dy = Math.random() * (driftDown  + driftUp)  - driftUp;
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(el, { x: dx, y: dy, duration: dur, ease: "sine.inOut" });
      floatTimelines.current.set(el, tl);
    });
  }, []);

  // ── Hover: shadow + scale (no cursor styles — handled by CustomCursor) ──────
  const attachHover = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const objects = canvas.querySelectorAll<HTMLElement>("[data-object='true']");
    objects.forEach((el) => {
      el.style.filter     = SHADOW_REST;
      el.style.transition = "filter 0.45s cubic-bezier(0.16,1,0.3,1)";

      el.addEventListener("mouseenter", () => {
        if (objState.current.active && objState.current.el === el) return;
        gsap.to(el, { scale: 1.06, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        el.style.filter = SHADOW_HOVER;
      });

      el.addEventListener("mouseleave", () => {
        if (objState.current.active && objState.current.el === el) return;
        gsap.to(el, { scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        el.style.filter = SHADOW_REST;
      });
    });
  }, []);

  // ── Shared pointer-down ───────────────────────────────────────────────────
  const handlePointerDown = useCallback((x: number, y: number, target: HTMLElement) => {
    const state = objState.current;
    clearTimeout(state.stillTimer);
    dragIds.current.set(target, (dragIds.current.get(target) ?? 0) + 1);
    state.active      = true;
    state.el          = target;
    state.startMouseX = x;
    state.startMouseY = y;
    state.lastDragX   = x;
    state.dragVelX    = 0;
    const computed    = window.getComputedStyle(target);
    state.startLeft   = parseFloat(computed.left) || 0;
    state.startTop    = parseFloat(computed.top)  || 0;
    // CSS rotation read karo matrix se — drag ke baad yahan wapas aayegi
    const matrix = computed.transform;
    if (matrix && matrix !== "none") {
      const parts = matrix.match(/matrix\(([^)]+)\)/);
      if (parts) {
        const vals = parts[1].split(",").map(Number);
        state.baseRotation = Math.round(Math.atan2(vals[1], vals[0]) * (180 / Math.PI));
      }
    } else {
      state.baseRotation = 0;
    }
    const tl = floatTimelines.current.get(target);
    if (tl) { state.floatTl = tl; tl.pause(); }
    target.style.filter = SHADOW_DRAG;
    gsap.to(target, { scale: 1.08, duration: 0.2, ease: "power2.out" });
    gsap.set(target, { zIndex: 50 });
  }, []);

  // ── Shared pointer-move ───────────────────────────────────────────────────
  const handlePointerMove = useCallback((x: number, y: number) => {
    const state = objState.current;
    if (!state.active || !state.el) return;
    const dx  = x - state.startMouseX;
    const dy  = y - state.startMouseY;
    const el  = state.el;
    const elW = el.offsetWidth;
    const elH = el.offsetHeight;
    const minLeft = CANVAS_PAD;
    const maxLeft = CANVAS_W - elW - CANVAS_PAD;
    const minTop  = CANVAS_PAD;
    const maxTop  = CANVAS_H - elH - CANVAS_PAD;
    const newLeft = Math.min(maxLeft, Math.max(minLeft, state.startLeft + dx));
    const newTop  = Math.min(maxTop,  Math.max(minTop,  state.startTop  + dy));
    gsap.set(el, { left: newLeft, top: newTop });

    // ── Velocity-based drag rotation ───────────────────────────────────────
    const rawVel      = x - state.lastDragX;
    state.lastDragX   = x;
    state.dragVelX    = state.dragVelX * 0.72 + rawVel * 0.28;
    const tiltDeg     = Math.max(-5, Math.min(5, state.dragVelX * 0.38));
    const targetRot   = state.baseRotation + tiltDeg;
    gsap.to(el, { rotation: targetRot, duration: 0.18, ease: "none", overwrite: "auto" });
  }, []);

  // ── Shared pointer-up ─────────────────────────────────────────────────────
  const handlePointerUp = useCallback(() => {
    const state = objState.current;
    if (!state.active || !state.el) return;
    const el      = state.el;
    state.active  = false;
    state.el      = null;
    el.style.filter = SHADOW_REST;

    // Scale + rotation — original CSS tilt pe elastic bounce ke saath wapas
    gsap.to(el, {
      scale: 1,
      rotation: state.baseRotation,
      duration: 0.55,
      ease: "elastic.out(1, 0.6)",
    });
    state.dragVelX = 0;

    const myDragId = dragIds.current.get(el) ?? 0;
    state.stillTimer = window.setTimeout(() => {
      if ((dragIds.current.get(el) ?? 0) !== myDragId) return;
      const tl = floatTimelines.current.get(el);
      if (tl) { gsap.to({}, { duration: 0.8, onComplete: () => tl.resume() }); }
      gsap.set(el, { zIndex: "" });
    }, 3000 + Math.random() * 2000);
  }, []);

  // ── Mouse: object drag ────────────────────────────────────────────────────
  const onObjectMouseDown = useCallback((e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-object='true']");
    if (!target) return;
    e.stopPropagation();
    e.preventDefault();
    handlePointerDown(e.clientX, e.clientY, target);
  }, [handlePointerDown]);

  const onObjectMouseMove = useCallback((e: MouseEvent) => {
    handlePointerMove(e.clientX, e.clientY);
  }, [handlePointerMove]);

  const onObjectMouseUp = useCallback(() => {
    handlePointerUp();
  }, [handlePointerUp]);

  // ── Touch: object drag (1 finger) + rotate (2 finger twist) ─────────────
  const onObjectTouchStart = useCallback((e: TouchEvent) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-object='true']");
    if (!target) return;
    e.stopPropagation();
    e.preventDefault();

    // ── 2-finger pinch + twist: start combined gesture ──────────────────────
    if (e.touches.length === 2) {
      // If object was being dragged, cancel it cleanly first
      if (objState.current.active && objState.current.el === target) {
        handlePointerUp();
      }

      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const { dist, angle } = getTouchInfo(t1, t2);

      // Read current transform from computed style
      const computed = window.getComputedStyle(target);
      const matrix   = computed.transform;
      let currentRot = 0;
      let currentScale = 1;
      if (matrix && matrix !== "none") {
        const parts = matrix.match(/matrix\(([^)]+)\)/);
        if (parts) {
          const vals = parts[1].split(",").map(Number);
          currentRot   = Math.atan2(vals[1], vals[0]) * (180 / Math.PI);
          // scale = sqrt(a² + b²) from matrix(a,b,c,d,tx,ty)
          currentScale = Math.sqrt(vals[0] * vals[0] + vals[1] * vals[1]);
        }
      }

      // ── Init BOTH pinch and rotate state ───────────────────────────────────
      const ps         = pinchState.current;
      ps.active        = true;
      ps.el            = target;
      ps.startDist     = Math.max(dist, 10); // avoid division by zero
      ps.startScale    = currentScale > 0.05 ? currentScale : 1;
      ps.currentScale  = ps.startScale;
      ps.startAngle    = angle;
      ps.startRotation = currentRot;

      const rs         = rotateState.current;
      rs.active        = true;
      rs.el            = target;
      rs.startAngle    = angle;
      rs.startRotation = currentRot;

      // Pause float animation while gesturing
      const tl = floatTimelines.current.get(target);
      if (tl) {
        ps.floatTl = tl;
        rs.floatTl = tl;
        tl.pause();
      }

      target.style.filter = SHADOW_DRAG;
      gsap.to(target, { scale: currentScale * 1.04, duration: 0.18, ease: "power2.out" });
      gsap.set(target, { zIndex: 50 });
      return;
    }

    // ── 1-finger: normal drag ────────────────────────────────────────────────
    if (e.touches.length === 1) {
      const { x, y } = getPointer(e);
      handlePointerDown(x, y, target);
    }
  }, [handlePointerDown, handlePointerUp]);

  const onObjectTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();

    // ── 2-finger pinch + twist: apply scale AND rotation delta ──────────────
    const ps = pinchState.current;
    const rs = rotateState.current;
    if ((ps.active || rs.active) && e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const el = ps.el ?? rs.el;
      if (!el) return;

      const { dist: currentDist, angle: currentAngle } = getTouchInfo(t1, t2);

      // ── Scale from pinch ────────────────────────────────────────────────────
      const MIN_SCALE = 0.3;
      const MAX_SCALE = 3.0;
      let newScale = ps.startScale * (currentDist / ps.startDist);
      newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
      ps.currentScale = newScale;

      // ── Rotation from twist ─────────────────────────────────────────────────
      const rotDelta   = currentAngle - rs.startAngle;
      const newRotation = rs.startRotation + rotDelta;

      // ── Apply both transforms simultaneously — instant tracking ─────────────
      gsap.set(el, { scale: newScale, rotation: newRotation });
      return;
    }

    // ── 1-finger: normal drag ────────────────────────────────────────────────
    if (!objState.current.active) return;
    const { x, y } = getPointer(e);
    handlePointerMove(x, y);
  }, [handlePointerMove]);

  const onObjectTouchEnd = useCallback((e: TouchEvent) => {
    // ── 2-finger pinch + rotate: settle both scale and rotation ─────────────
    const ps = pinchState.current;
    const rs = rotateState.current;
    if ((ps.active || rs.active) && (ps.el || rs.el)) {
      const el = ps.el ?? rs.el!;

      // Read the transforms we landed on
      const computed = window.getComputedStyle(el);
      const matrix   = computed.transform;
      let landedRot  = rs.startRotation;
      let landedScale = ps.currentScale;
      if (matrix && matrix !== "none") {
        const parts = matrix.match(/matrix\(([^)]+)\)/);
        if (parts) {
          const vals = parts[1].split(",").map(Number);
          landedRot   = Math.atan2(vals[1], vals[0]) * (180 / Math.PI);
          landedScale = Math.sqrt(vals[0] * vals[0] + vals[1] * vals[1]);
        }
      }

      // Persist new base rotation for subsequent drag tilts
      objState.current.baseRotation = landedRot;

      // Subtle elastic settle — confirms the gesture landed
      gsap.to(el, {
        scale:    landedScale,
        rotation: landedRot,
        duration: 0.45,
        ease:     "elastic.out(1, 0.7)",
      });

      el.style.filter = SHADOW_REST;

      // Resume float after a short pause
      const tl = ps.floatTl ?? rs.floatTl;
      if (tl) {
        window.setTimeout(() => {
          tl.resume();
          gsap.set(el, { zIndex: "" });
        }, 2500);
      } else {
        window.setTimeout(() => gsap.set(el, { zIndex: "" }), 2500);
      }

      ps.active  = false;
      ps.el      = null;
      ps.floatTl = null;
      rs.active  = false;
      rs.el      = null;
      rs.floatTl = null;

      // If finger count drops to 1, don't accidentally start a pan
      e.preventDefault();
      return;
    }

    // ── 1-finger drag: normal end ────────────────────────────────────────────
    handlePointerUp();
  }, [handlePointerUp]);

  // ── Canvas pan — inertia ──────────────────────────────────────────────────
  const stopInertia = useCallback(() => {
    cancelAnimationFrame(panState.current.rafId);
  }, []);

  const runInertia = useCallback(() => {
    const s = panState.current;
    s.velX *= 0.92;
    s.velY *= 0.92;
    s.panX += s.velX;
    s.panY += s.velY;
    const vw    = window.innerWidth;
    const vh    = window.innerHeight;
    const scale = zoomState.current.scale;
    const minX  = -(CANVAS_W * scale - vw);
    const maxX  = 0;
    const minY  = -(CANVAS_H * scale - vh);
    const maxY  = 0;
    if (s.panX <= minX || s.panX >= maxX) s.velX = 0;
    if (s.panY <= minY || s.panY >= maxY) s.velY = 0;
    applyPan(s.panX, s.panY);
    if (Math.abs(s.velX) > 0.1 || Math.abs(s.velY) > 0.1) {
      s.rafId = requestAnimationFrame(runInertia);
    }
  }, [applyPan]);

  // ── Mouse: canvas pan ─────────────────────────────────────────────────────
  const onCanvasMouseDown = useCallback((e: MouseEvent) => {
    if (objState.current.active) return;
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-object='true']");
    if (target) return;
    stopInertia();
    const s   = panState.current;
    s.isDragging = true;
    s.startX  = e.clientX - s.panX;
    s.startY  = e.clientY - s.panY;
    s.lastX   = e.clientX;
    s.lastY   = e.clientY;
    s.velX    = 0;
    s.velY    = 0;
  }, [stopInertia]);

  const onCanvasMouseMove = useCallback((e: MouseEvent) => {
    const s = panState.current;
    if (!s.isDragging) return;
    s.velX  = e.clientX - s.lastX;
    s.velY  = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.panX  = e.clientX - s.startX;
    s.panY  = e.clientY - s.startY;
    applyPan(s.panX, s.panY);
    if (!s.hasDragged) {
      s.hasDragged = true;
      if (hintRef.current) gsap.to(hintRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" });
    }
  }, [applyPan]);

  const onCanvasMouseUp = useCallback(() => {
    const s = panState.current;
    if (!s.isDragging) return;
    s.isDragging = false;
    s.rafId = requestAnimationFrame(runInertia);
  }, [runInertia]);

  // ── Touch: canvas pan ─────────────────────────────────────────────────────
  const onCanvasTouchStart = useCallback((e: TouchEvent) => {
    if (objState.current.active) return;
    if (e.touches.length !== 1) return;
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-object='true']");
    if (target) return;
    stopInertia();
    const { x, y } = getPointer(e);
    const s = panState.current;
    s.isDragging = true;
    s.startX = x - s.panX;
    s.startY = y - s.panY;
    s.lastX  = x;
    s.lastY  = y;
    s.velX   = 0;
    s.velY   = 0;
  }, [stopInertia]);

  const onCanvasTouchMove = useCallback((e: TouchEvent) => {
    const s = panState.current;
    // Don't pan canvas if a pinch/rotate gesture is active on an object
    if (pinchState.current.active || rotateState.current.active) return;
    if (!s.isDragging) return;
    e.preventDefault();
    const { x, y } = getPointer(e);
    s.velX  = x - s.lastX;
    s.velY  = y - s.lastY;
    s.lastX = x;
    s.lastY = y;
    s.panX  = x - s.startX;
    s.panY  = y - s.startY;
    applyPan(s.panX, s.panY);
    if (!s.hasDragged) {
      s.hasDragged = true;
      if (hintRef.current) gsap.to(hintRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" });
    }
  }, [applyPan]);

  const onCanvasTouchEnd = useCallback(() => {
    const s = panState.current;
    if (!s.isDragging) return;
    s.isDragging = false;
    s.rafId = requestAnimationFrame(runInertia);
  }, [runInertia]);

  // ── Wheel pan ─────────────────────────────────────────────────────────────
  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    stopInertia();
    const s = panState.current;
    s.panX -= e.deltaX;
    s.panY -= e.deltaY;
    applyPan(s.panX, s.panY);
    if (!s.hasDragged) {
      s.hasDragged = true;
      if (hintRef.current) gsap.to(hintRef.current, { opacity: 0, duration: 0.4 });
    }
  }, [stopInertia, applyPan]);

  // ── Boot sequence ─────────────────────────────────────────────────────────
  useEffect(() => {
    const viewport = viewportRef.current;
    const canvas   = canvasRef.current;
    const hint     = hintRef.current;
    const intro    = introRef.current;
    if (!viewport || !canvas || !hint) return;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow            = "hidden";
    // Hide native cursor on pointer devices only — CustomCursor replaces it
    const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isTouchOnly) {
      document.documentElement.style.cursor  = "none";
      document.body.style.cursor             = "none";
    }
    if (viewport) viewport.style.touchAction = "none";

    const init       = getInitialPan();
    panState.current.panX = init.x;
    panState.current.panY = init.y;

    const isMobile = window.innerWidth < 768;
gsap.set(canvas, { x: init.x, y: init.y, scale: isMobile ? 0.32 : 0.45, transformOrigin: "50% 50%" });

    const objects = canvas.querySelectorAll<HTMLElement>("[data-object='true']");

    // ── Intro screen animate in — logo + text fade up ─────────────────────
    if (intro) {
      const logoEl = intro.querySelector<HTMLElement>(".intro-logo");
      const textEl = intro.querySelector<HTMLElement>(".intro-text");
      gsap.set([logoEl, textEl], { opacity: 0, y: 18 });
      gsap.to(logoEl, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 });
      gsap.to(textEl, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.4 });
    }

    // ── All objects invisible until intro leaves ───────────────────────────
    gsap.set(objects, { scale: 0, opacity: 0, transformOrigin: "center center" });

    // ── After 1.8s: fade out intro, then start canvas reveal ──────────────
    const introTimer = setTimeout(() => {
      if (intro) {
        gsap.to(intro, {
          opacity: 0,
          duration: 0.65,
          ease: "power2.inOut",
          onComplete: () => setIntroVisible(false),
        });
      }

      gsap.to(objects, {
        scale: 1,
        opacity: 1,
        duration: 0.28,
        ease: "back.out(1.7)",
        stagger: { each: 0.035, from: "center" },
        delay: 0.3,
        onComplete: () => {
          gsap.to(canvas, {
            scale: isMobile ? 0.72 : 1,
            duration: 2.2,
            ease: "power4.out",
            onComplete: () => {
              startFloating();
              gsap.to(hint, { opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" });
              gsap.to(hint, { opacity: 0, duration: 0.5, delay: 3.7, ease: "power2.in" });
              // Show pinch-to-resize hint on mobile only, after drag hint fades
              if (isMobile && pinchHintRef.current) {
                gsap.to(pinchHintRef.current, { opacity: 1, duration: 0.5, delay: 4.5, ease: "power2.out" });
                gsap.to(pinchHintRef.current, { opacity: 0, duration: 0.5, delay: 8.5, ease: "power2.in" });
              }
            },
          });
        },
      });
    }, 1800);

    attachHover();

    // Mouse events
    canvas.addEventListener("mousedown",   onObjectMouseDown, true);
    window.addEventListener("mousemove",   onObjectMouseMove);
    window.addEventListener("mouseup",     onObjectMouseUp);
    viewport.addEventListener("mousedown", onCanvasMouseDown);
    window.addEventListener("mousemove",   onCanvasMouseMove);
    window.addEventListener("mouseup",     onCanvasMouseUp);
    viewport.addEventListener("wheel",     onWheel, { passive: false });

    // Touch events
    canvas.addEventListener("touchstart",   onObjectTouchStart,  { passive: false, capture: true });
    window.addEventListener("touchmove",    onObjectTouchMove,   { passive: false });
    window.addEventListener("touchend",     onObjectTouchEnd);
    viewport.addEventListener("touchstart", onCanvasTouchStart,  { passive: false });
    window.addEventListener("touchmove",    onCanvasTouchMove,   { passive: false });
    window.addEventListener("touchend",     onCanvasTouchEnd);

    return () => {
      clearTimeout(introTimer);
      canvas.removeEventListener("mousedown",   onObjectMouseDown, true);
      window.removeEventListener("mousemove",   onObjectMouseMove);
      window.removeEventListener("mouseup",     onObjectMouseUp);
      viewport.removeEventListener("mousedown", onCanvasMouseDown);
      window.removeEventListener("mousemove",   onCanvasMouseMove);
      window.removeEventListener("mouseup",     onCanvasMouseUp);
      viewport.removeEventListener("wheel",     onWheel);

      canvas.removeEventListener("touchstart",   onObjectTouchStart, true);
      window.removeEventListener("touchmove",    onObjectTouchMove);
      window.removeEventListener("touchend",     onObjectTouchEnd);
      viewport.removeEventListener("touchstart", onCanvasTouchStart);
      window.removeEventListener("touchmove",    onCanvasTouchMove);
      window.removeEventListener("touchend",     onCanvasTouchEnd);

      cancelAnimationFrame(panState.current.rafId);
      document.documentElement.style.overflow = "";
      document.body.style.overflow             = "";
      document.documentElement.style.cursor   = "";
      document.body.style.cursor              = "";
      if (viewport) viewport.style.touchAction = "";
      floatTimelines.current.forEach((tl) => tl.kill());
    };
  }, [
    getInitialPan,
    startFloating,
    attachHover,
    applyZoom,
    onObjectMouseDown,
    onObjectMouseMove,
    onObjectMouseUp,
    onCanvasMouseDown,
    onCanvasMouseMove,
    onCanvasMouseUp,
    onWheel,
    onObjectTouchStart,
    onObjectTouchMove,
    onObjectTouchEnd,
    onCanvasTouchStart,
    onCanvasTouchMove,
    onCanvasTouchEnd,
  ]);

  return (
    <>
      {/* Palmer-style custom cursor — rendered above everything */}
      <CustomCursor />

      {/* ── Intro / Loader Screen ─────────────────────────────────────────── */}
      {introVisible && (
        <div
          ref={introRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            backgroundColor: "rgb(245, 245, 220)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            pointerEvents: "none",
          }}
        >
          <img decoding="async"
            className="intro-logo"
            src={imgPrimaryLogos}
            alt="Studio Inside Eye"
            style={{ width: 110, opacity: 0 }}
          />
          <p
            className="intro-text"
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.22em",
              color: "#553500",
              textTransform: "uppercase",
              opacity: 0,
            }}
          >
            Interior Moodboard
          </p>
        </div>
      )}

      <div
        ref={viewportRef}
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgb(245, 245, 220)",
          cursor: "none",
          boxShadow: "inset 0 0 80px rgba(0, 0, 0, 0.07)",
        }}
      >
        <div
          ref={canvasRef}
          style={{
            position: "absolute",
            width: `${CANVAS_W}px`,
            height: `${CANVAS_H}px`,
            willChange: "transform",
            background: "linear-gradient(90deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), rgb(245, 245, 220)",
            cursor: "none",
          }}
        >
          <Frame />
        </div>
      </div>
      <Logo />
      <Navbar />
      <FooterNavWithCTA />
      <DragHint hintRef={hintRef} />

      {/* ── Mobile pinch-to-resize hint — appears once on mobile ─────────── */}
      <div
        ref={pinchHintRef}
        style={{
          position: "fixed",
          bottom: "7rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 99,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          gap: 8,
          opacity: 0,
          background: "rgba(245,240,225,0.92)",
          border: "1px solid rgba(112,48,0,0.18)",
          borderRadius: 24,
          padding: "7px 16px",
          backdropFilter: "blur(8px)",
          userSelect: "none",
        }}
      >
        {/* Pinch SVG icon */}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="11" r="2.5" stroke="#703000" strokeWidth="1.4"/>
          <circle cx="15" cy="11" r="2.5" stroke="#703000" strokeWidth="1.4"/>
          <path d="M3 11h2M17 11h2" stroke="#703000" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M9.5 11h3" stroke="#703000" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M5.5 8l-2 3 2 3M16.5 8l2 3-2 3" stroke="#703000" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "#553500",
          whiteSpace: "nowrap",
        }}>
          Pinch furniture to resize
        </span>
      </div>

      <ZoomControls
        onZoomIn={() => applyZoom(zoomState.current.scale + 0.15)}
        onZoomOut={() => applyZoom(zoomState.current.scale - 0.15)}
      />
    </>
  );
}