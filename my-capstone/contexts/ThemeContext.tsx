"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Swatch = "cream" | "kraft" | "clay" | "walnut";
export type Mode = "light" | "dark";

export const SWATCHES: { id: Swatch; label: string; chip: string }[] = [
  { id: "cream", label: "Cream", chip: "#F4EEE0" },
  { id: "kraft", label: "Kraft", chip: "#D8C4A0" },
  { id: "clay", label: "Clay", chip: "#E9BBA2" },
  { id: "walnut", label: "Walnut", chip: "#8C6A4E" },
];

const STORAGE_KEY = "portfolio-theme";

interface ThemeState {
  swatch: Swatch;
  mode: Mode;
}

interface ThemeContextValue extends ThemeState {
  setSwatch: (s: Swatch) => void;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyTheme(state: ThemeState) {
  const root = document.documentElement;
  root.setAttribute("data-swatch", state.swatch);
  root.setAttribute("data-mode", state.mode);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initial values are read synchronously from the DOM attributes set by the
  // blocking inline script in layout.tsx, so there is no flash/mismatch.
  const [state, setState] = useState<ThemeState>(() => {
    if (typeof window === "undefined") {
      return { swatch: "cream", mode: "light" };
    }
    const root = document.documentElement;
    return {
      swatch: (root.getAttribute("data-swatch") as Swatch) || "cream",
      mode: (root.getAttribute("data-mode") as Mode) || "light",
    };
  });

  useEffect(() => {
    applyTheme(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // localStorage may be unavailable (private browsing) — theme still
      // works for the session, it just won't persist.
    }
  }, [state]);

  const setSwatch = useCallback((swatch: Swatch) => {
    setState((prev) => ({ ...prev, swatch }));
  }, []);

  const setMode = useCallback((mode: Mode) => {
    setState((prev) => ({ ...prev, mode }));
  }, []);

  const toggleMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      mode: prev.mode === "light" ? "dark" : "light",
    }));
  }, []);

  return (
    <ThemeContext.Provider value={{ ...state, setSwatch, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
