"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
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

export const STORAGE_KEY = "portfolio-theme";
const DEFAULT_SWATCH: Swatch = "cream";
const DEFAULT_MODE: Mode = "light";

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

function isSwatch(v: unknown): v is Swatch {
  return v === "cream" || v === "kraft" || v === "clay" || v === "walnut";
}

function isMode(v: unknown): v is Mode {
  return v === "light" || v === "dark";
}

/** Reads whatever ThemeScript already wrote to <html> so there's no mismatch. */
function readInitialState(): ThemeState {
  if (typeof document === "undefined") {
    return { swatch: DEFAULT_SWATCH, mode: DEFAULT_MODE };
  }
  const root = document.documentElement;
  const swatch = root.getAttribute("data-swatch");
  const mode = root.getAttribute("data-mode");
  return {
    swatch: isSwatch(swatch) ? swatch : DEFAULT_SWATCH,
    mode: isMode(mode) ? mode : DEFAULT_MODE,
  };
}

function applyToDocument(state: ThemeState) {
  const root = document.documentElement;
  root.setAttribute("data-swatch", state.swatch);
  root.setAttribute("data-mode", state.mode);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ThemeState>(readInitialState);
  const [mounted, setMounted] = useState(false);

  // Runs once on mount to pick up ThemeScript's result (in case this
  // provider ever renders before that script has run, e.g. fast refresh).
  useEffect(() => {
    setState(readInitialState());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyToDocument(state);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage can be unavailable (private browsing, quota) — theme still
      // works for the session, it just won't persist.
    }
  }, [state, mounted]);

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
    <ThemeContext.Provider
      value={{ ...state, setSwatch, setMode, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}