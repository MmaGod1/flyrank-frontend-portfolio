const THEME_SCRIPT = `
(function () {
  try {
    var STORAGE_KEY = "portfolio-theme";
    var raw = localStorage.getItem(STORAGE_KEY);
    var stored = raw ? JSON.parse(raw) : null;

    var validSwatches = ["cream", "kraft", "clay", "walnut"];
    var swatch =
      stored && validSwatches.indexOf(stored.swatch) !== -1
        ? stored.swatch
        : "cream";

    var mode;
    if (stored && (stored.mode === "light" || stored.mode === "dark")) {
      mode = stored.mode;
    } else {
      mode = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    var root = document.documentElement;
    root.setAttribute("data-swatch", swatch);
    root.setAttribute("data-mode", mode);
  } catch (e) {
    document.documentElement.setAttribute("data-swatch", "cream");
    document.documentElement.setAttribute("data-mode", "light");
  }
})();
`;

/**
 * Sets data-swatch / data-mode on <html> before React hydrates, so the
 * first paint already matches the persisted theme (no flash). Renders a
 * plain <script> — must be placed in <head>, before children.
 */
export function ThemeScript() {
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
