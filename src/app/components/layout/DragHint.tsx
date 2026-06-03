import { RefObject } from "react";

interface DragHintProps {
  hintRef: RefObject<HTMLDivElement | null>;
}

/**
 * DragHint — a centred bottom hint that fades in after canvas load and
 * fades out on first interaction.
 * On mobile: lifted above the bottom bar via .drag-hint-fixed media query.
 */
export default function DragHint({ hintRef }: DragHintProps) {
  return (
    <div
      ref={hintRef}
      className="drag-hint-fixed fixed bottom-24 left-1/2 -translate-x-1/2 z-[99] pointer-events-none flex items-center gap-2 opacity-0"
      style={{ userSelect: "none" }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="9" stroke="#703000" strokeWidth="1.5" />
        <path
          d="M6 10h8M13 7l3 3-3 3"
          stroke="#703000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[13px] font-medium tracking-[-0.02em] text-[#553500]">
        Drag to explore
      </span>
    </div>
  );
}
