import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export type ColorKey = "beige" | "red" | null;
export type StyleKey = "Scandinavian" | "Transitional" | "Mid century" | null;

interface SelectionState {
  color: ColorKey;
  style: StyleKey;
  triggerX: number;
  triggerY: number;
}

interface SelectionContextValue {
  selection: SelectionState;
  setColor: (color: ColorKey, x: number, y: number) => void;
  setStyle: (style: StyleKey, x: number, y: number) => void;
  navigate: (route: string) => void;
  resetSelection: () => void;
  markNavigated: () => void;
  isNavigating: boolean;
  hasNavigated: boolean;
}

// ─── Route map for all 6 combinations ────────────────────────────────────────
export const COMBINATION_ROUTES: Record<string, string> = {
  "red|Scandinavian":  "/detail/red/scandinavian",
  "red|Transitional":  "/detail/red/transitional",
  "red|Mid century":   "/detail/red/midcentury",
  "beige|Scandinavian":"/detail/beige/scandinavian",
  "beige|Transitional":"/detail/beige/transitional",
  "beige|Mid century": "/detail/beige/midcentury",
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be inside SelectionProvider");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function SelectionProvider({ children }: { children: ReactNode }) {
  const nav = useNavigate();
  const location = useLocation();

  const [selection, setSelection] = useState<SelectionState>({
    color: null,
    style: null,
    triggerX: 0,
    triggerY: 0,
  });

  const [isNavigating, setIsNavigating] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  const resetSelection = useCallback(() => {
    setSelection({ color: null, style: null, triggerX: 0, triggerY: 0 });
    setHasNavigated(false);
  }, []);

  // CHANGED: navigation is no longer triggered automatically on selection.
  // It is now only triggered explicitly via the navigate() function below,
  // which is called by the Continue button.
  //
  // Two cases:
  //  1. First "Generate" from the selection page ("/") → full scene change,
  //     so we keep the 400ms delay + cream cover (PageTransitionOverlay)
  //     to mask the swap from the selection UI to the detail layout.
  //  2. "Regenerate" while already inside a /detail/* route → the detail
  //     route is a single persistent component (MoodboardDetailPage), so
  //     swapping the URL params doesn't unmount anything. We push the route
  //     immediately with no cover — MoodboardDetailPage crossfades the
  //     image itself while navbar/footer/logo stay exactly where they are.
  //
  // hasNavigated is set to true right here, on click — not just on mount —
  // because MoodboardDetailPage no longer remounts on regenerate, so a
  // mount-only flag would never fire again after the first visit. Setting
  // it on click keeps the original behaviour: Continue hides the instant
  // you click it, and only reappears once you change color/style again
  // (setColor/setStyle reset hasNavigated to false).
  const navigate = useCallback(
    (route: string) => {
      setHasNavigated(true);
      const isRegenerate = location.pathname.startsWith("/detail/");
      if (isRegenerate) {
        nav(route);
        return;
      }
      setIsNavigating(true);
      setTimeout(() => {
        nav(route);
      }, 400); // matches the CSS transition duration
    },
    [nav, location.pathname]
  );

  // Called by MoodboardDetailPage on mount — hides Continue on page 2
  // without touching page 1 at all
  const markNavigated = useCallback(() => {
    setHasNavigated(true);
  }, []);

  // setColor and setStyle now only update state — no auto-navigation
  // Also reset hasNavigated so Continue reappears if user changes selection
  const setColor = useCallback(
    (color: ColorKey, x: number, y: number) => {
      setHasNavigated(false);
      setSelection((prev) => ({ ...prev, color, triggerX: x, triggerY: y }));
    },
    []
  );

  const setStyle = useCallback(
    (style: StyleKey, x: number, y: number) => {
      setHasNavigated(false);
      setSelection((prev) => ({ ...prev, style, triggerX: x, triggerY: y }));
    },
    []
  );

  return (
    <SelectionContext.Provider value={{ selection, setColor, setStyle, navigate, resetSelection, markNavigated, isNavigating, hasNavigated }}>
      {children}
    </SelectionContext.Provider>
  );
}