"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  useTheme,
  SWATCHES,
  type Swatch,
} from "@/contexts/ThemeContext";
import styles from "./ThemeSettings.module.css";

export function ThemeSettings() {
  const { swatch, mode, setSwatch, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;

      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.wrap}>
      {open && (
        <div
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-label="Theme settings"
        >
          <p className={styles.eyebrow}>Paper stock</p>

          <div className={styles.chips}>
            {SWATCHES.map((s, i) => (
              <SwatchChip
                key={s.id}
                swatch={s}
                active={swatch === s.id}
                index={i}
                onSelect={() => setSwatch(s.id)}
              />
            ))}
          </div>

          <div className={styles.divider} />

          <p className={styles.eyebrow}>Light</p>

          <button
            type="button"
            className={styles.modeToggle}
            onClick={toggleMode}
            role="switch"
            aria-checked={mode === "dark"}
            aria-label={`Switch to ${
              mode === "light" ? "night" : "day"
            } mode`}
          >
            <span className={styles.modeTrack} data-mode={mode}>
              <span className={styles.modeKnob}>
                {mode === "light" ? "☀" : "☾"}
              </span>
            </span>

            <span className={styles.modeLabel}>
              {mode === "light" ? "Day" : "Night"}
            </span>
          </button>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Open theme settings"
      >
        <span className={styles.triggerSwatch} aria-hidden="true" />

        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 2c-5.5 0-10 4.03-10 9 0 3.31 2.69 5 5 5h1.5a1.5 1.5 0 0 1 1.5 1.5c0 .5-.2.9-.2 1.5 0 1.1 1.2 2 2.7 2 5.5 0 9.5-4.5 9.5-9.5C22 6.03 17.5 2 12 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />

          <circle cx="7.5" cy="10.5" r="1.3" fill="currentColor" />
          <circle cx="12" cy="7.2" r="1.3" fill="currentColor" />
          <circle cx="16.3" cy="10.3" r="1.3" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}

function SwatchChip({
  swatch,
  active,
  index,
  onSelect,
}: {
  swatch: {
    id: Swatch;
    label: string;
    chip: string;
  };
  active: boolean;
  index: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={styles.chip}
      data-active={active}
      style={
        {
          "--chip-color": swatch.chip,
          "--chip-rotate": `${
            (index % 2 === 0 ? -1 : 1) * (2 + index)
          }deg`,
        } as CSSProperties
      }
      onClick={onSelect}
      aria-pressed={active}
    >
      <span className={styles.chipSwatch} />

      <span className={styles.chipLabel}>
        {swatch.label}
      </span>

      {active && (
        <span className={styles.chipCheck} aria-hidden="true">
          ✓
        </span>
      )}
    </button>
  );
}