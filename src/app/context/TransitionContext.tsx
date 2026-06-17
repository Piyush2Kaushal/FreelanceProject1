// ─────────────────────────────────────────────────────────────────────────────
// TransitionContext
// ─────────────────────────────────────────────────────────────────────────────
// Powers the "shared element" page transition (mersi-architecture style):
// when a project card on the Home page is clicked, the framed portrait image
// smoothly morphs from its position on the Home page into the hero portrait on
// the Project page.
//
// HOW IT WORKS (high level):
//   1. Home card onClick measures the framed image box (getBoundingClientRect)
//      and calls startTransition({ src, rect, ... }).
//   2. A short delay later we navigate() to the project route.
//   3. <SharedElementLayer /> (mounted once at the App root) draws a fixed-
//      position clone of the image at the source rect, then — once the Project
//      page's hero portrait (marked with [data-shared-target]) has mounted —
//      GSAP-tweens the clone from the source rect to the target rect.
//   4. On completion it reveals the real hero and removes the clone.
//
// `active` stays true for the whole flight so the real target can stay hidden
// (opacity 0) underneath the clone, avoiding any double-image flash.
// ─────────────────────────────────────────────────────────────────────────────
import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface SharedRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface TransitionPayload {
  /** Image source that flies between pages */
  src: string;
  /** Source rect (framed box) on the Home page, in viewport coords */
  rect: SharedRect;
  /** Cream border colour of the source frame (morphs toward the target frame) */
  borderColor: string;
  /** Source border width in px */
  borderWidth: number;
  /** Monotonic id so the layer can guard against re-running a finished morph */
  id: number;
}

interface TransitionContextValue {
  pending: TransitionPayload | null;
  /** true while a shared-element morph is in flight */
  active: boolean;
  startTransition: (p: Omit<TransitionPayload, "id">) => void;
  endTransition: () => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error("useTransition must be used inside <TransitionProvider>");
  return ctx;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<TransitionPayload | null>(null);
  const [active, setActive] = useState(false);
  const idRef = useRef(0);

  const startTransition = useCallback(
    (p: Omit<TransitionPayload, "id">) => {
      idRef.current += 1;
      setPending({ ...p, id: idRef.current });
      setActive(true);
    },
    []
  );

  const endTransition = useCallback(() => {
    setPending(null);
    setActive(false);
  }, []);

  return (
    <TransitionContext.Provider
      value={{ pending, active, startTransition, endTransition }}
    >
      {children}
    </TransitionContext.Provider>
  );
}
