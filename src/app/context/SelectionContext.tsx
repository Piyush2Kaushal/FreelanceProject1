import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useCallback(
    (route: string) => {
      setIsNavigating(true);
      setTimeout(() => {
        nav(route);
      }, 400); // matches the CSS transition duration
    },
    [nav]
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