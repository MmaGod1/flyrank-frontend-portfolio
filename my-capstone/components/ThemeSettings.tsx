"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SWATCHES, useTheme, type Swatch } from "@/contexts/ThemeContext";

export function ThemeSettings() {
  const { swatch, mode, setSwatch, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
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
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Theme settings"
          className="absolute bottom-full right-0 mb-3 w-64 rounded-2xl border border-border bg-card p-4 shadow-lg"
        >
          <p className="font-display mb-2 text-xs uppercase tracking-wide text-foreground/60">
            Paper stock
          </p>
          <div className="grid grid-cols-4 gap-2">
            {SWATCHES.map((s) => (
              <SwatchButton
                key={s.id}
                swatch={s}
                active={swatch === s.id}
                onSelect={() => setSwatch(s.id)}
              />
            ))}
          </div>

          <div className="my-3 h-px bg-border" />

          <p className="font-display mb-2 text-xs uppercase tracking-wide text-foreground/60">
            Display mode
          </p>
          <button
            type="button"
            role="switch"
            aria-checked={mode === "dark"}
            aria-label={`Switch to ${mode === "light" ? "night" : "day"} mode`}
            onClick={toggleMode}
            className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-left"
          >
            <span className="font-display text-sm text-foreground">
              {mode === "light" ? "Day" : "Night"}
            </span>
            <span
              className="relative h-6 w-11 rounded-full transition-colors"
              style={{
                backgroundColor:
                  mode === "dark" ? "var(--accent)" : "var(--border)",
              }}
            >
              <span
                className="absolute top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-card text-[10px] transition-transform"
                style={{
                  transform:
                    mode === "dark"
                      ? "translateX(1.25rem)"
                      : "translateX(0.15rem)",
                }}
              >
                {mode === "light" ? "☀" : "☾"}
              </span>
            </span>
          </button>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-label="Open theme settings"
        onClick={() => setOpen((v) => !v)}
        className="flex h-13 w-13 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        style={{ height: "3.25rem", width: "3.25rem" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function SwatchButton({
  swatch,
  active,
  onSelect,
}: {
  swatch: { id: Swatch; label: string; chip: string };
  active: boolean;
  onSelect: () => void;
}) {
  const chipStyle: CSSProperties = { backgroundColor: swatch.chip };

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`Use ${swatch.label} background`}
      onClick={onSelect}
      className={`flex flex-col items-center gap-1 rounded-lg border p-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        active ? "border-accent" : "border-transparent hover:border-border"
      }`}
    >
      <span className="relative">
        <span
          className="block h-7 w-7 rounded-md ring-1 ring-black/10"
          style={chipStyle}
        />
        {active && (
          <span
            aria-hidden="true"
            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px]"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-ink)",
            }}
          >
            ✓
          </span>
        )}
      </span>
      <span className="text-[11px] leading-none text-foreground">
        {swatch.label}
      </span>
    </button>
  );
}