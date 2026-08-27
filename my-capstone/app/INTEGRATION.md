# Wiring it into your project

## 1\. Copy files in

```
contexts/ThemeContext.tsx        → contexts/ThemeContext.tsx
components/ThemeScript.tsx       → components/ThemeScript.tsx
components/ThemeSettings.tsx     → components/ThemeSettings.tsx
components/ThemeSettings.module.css → components/ThemeSettings.module.css
```

If your import alias `@/` isn't set up, adjust the imports in
`ThemeSettings.tsx` to relative paths (e.g. `../contexts/ThemeContext`).

## 2\. Add the CSS variables

Paste the contents of `styles/theme-variables.css` into your
`app/globals.css` (anywhere after your Tailwind/base imports, if any).

## 3\. Map Fredoka / Baloo 2 to the CSS variables the component expects

`ThemeSettings.module.css` reads `--font-display` and `--font-body`. Wherever
you set up `next/font` (usually `app/layout.tsx`), expose the generated font
variables under those names — e.g.:

```tsx
import { Fredoka, Baloo\\\\\\\_2 } from "next/font/google";

const fredoka = Fredoka({ subsets: \\\\\\\["latin"], variable: "--font-display" });
const baloo = Baloo\\\\\\\_2({ subsets: \\\\\\\["latin"], variable: "--font-body" });
```

Then add `${fredoka.variable} ${baloo.variable}` to the `<body>` className.
(If you already have this set up with different variable names, just reuse
your existing ones in `ThemeSettings.module.css` instead of adding new ones.)

## 4\. Update app/layout.tsx

```tsx
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeScript } from "@/components/ThemeScript";
import { ThemeSettings } from "@/components/ThemeSettings";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${fredoka.variable} ${baloo.variable}`}>
        <ThemeProvider>
          {children}
          <ThemeSettings />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Two details that matter:

* **`suppressHydrationWarning` on `<html>`** — required because `ThemeScript`
sets `data-swatch` / `data-mode` before React hydrates, so the server and
client markup for that one element legitimately differ for a moment.
Nothing else needs it.
* **`<ThemeScript />` goes in `<head>`, before your content renders** — this
is what prevents a flash of the wrong background on load.

## 5\. Use the theme in your own components (optional)

Anywhere you want to react to the theme in JS (not just CSS), pull it from
the hook:

```tsx
import { useTheme } from "@/contexts/ThemeContext";

const { swatch, mode, toggleMode } = useTheme();
```

Everything else — your existing components, cards, sections — should already
read `var(--bg)`, `var(--text)` etc. if you use them for backgrounds/text;
otherwise swap hardcoded cream/brown hex values for the variables so they
respond to the theme too.

## What this gives you

* 4 curated "paper stock" background options (Cream, Kraft, Clay, Walnut)
matching your identity kit, each with a Day and Night rendering
* A floating settings button (bottom-right) that opens a small panel styled
like a fanned stack of paint chips
* Persistence via `localStorage`, with no flash-of-wrong-theme on reload
* Respects `prefers-reduced-motion` and is fully keyboard operable
(Tab to the button, Enter/Space to open, Escape to close)

