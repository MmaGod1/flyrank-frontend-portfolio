// Renders a small inline <script> that runs before hydration and sets
// data-swatch / data-mode on <html> from localStorage (or system preference
// for mode). This prevents a flash of the default theme on page load.
export function ThemeScript() {
  const code = `
    (function () {
      try {
        var stored = JSON.parse(localStorage.getItem("portfolio-theme"));
        var swatch = (stored && stored.swatch) || "cream";
        var mode = (stored && stored.mode) ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        var root = document.documentElement;
        root.setAttribute("data-swatch", swatch);
        root.setAttribute("data-mode", mode);
      } catch (e) {
        document.documentElement.setAttribute("data-swatch", "cream");
        document.documentElement.setAttribute("data-mode", "light");
      }
    })();
  `;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
