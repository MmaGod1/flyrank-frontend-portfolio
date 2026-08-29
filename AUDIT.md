# Accessibility & Performance Audit — FE-10

**Project:** flyrank-frontend-portfolio (my-capstone)
**Pages audited:** `/` (home), `/about`
**Tools used:** Chrome DevTools Lighthouse (mobile preset), WAVE (WebAIM), manual keyboard-only pass

---

## Baseline (before fixes)

| Page | Lighthouse Performance | Lighthouse Accessibility | Best Practices | SEO | WAVE Errors | WAVE Contrast Errors |
|------|------------------------|---------------------------|-----------------|-----|-------------|------------------------|
| `/`      | 95 | 96 | 100 | 63 | 0 | 2 |
| `/about` | —  | —  | —   | —  | 0 | 0 |

`/about` returned a WAVE AIM Score of 10/10 with zero errors and zero contrast errors on first pass — no fixes were needed on this page throughout the audit.

---

## Issues found

1. **2 WAVE contrast errors on `/` (3.85:1 ratio)** — the primary button style (`bg-accent` + `text-accent-ink`, `#c1652f` on `#fff8ee`) fell below the WCAG AA 4.5:1 threshold for normal-weight text. Affected both instances of the primary button: "Get my CV" (hero) and "Get in touch" (pre-form state in the contact section).
2. **Undersized tap targets on desktop nav links** — `NavBar.tsx` links used `px-1 py-1` (4px padding), flagged by Lighthouse's mobile SEO audit for tap target sizing.
3. **Non-crawlable placeholder links** — `ProjectCard.tsx` rendered `href="#"` as a real `<a>`/`<Link>` element for all three placeholder projects (no real project links exist yet), which Lighthouse's SEO audit flags as dead/non-descriptive links.
4. **SEO score artificially suppressed by Vercel Deployment Protection on preview branches.** A Lighthouse run against a Vercel *preview* deployment URL returns an `x-robots-tag: noindex` response header, which Vercel injects automatically on preview/protected deployments specifically to prevent preview URLs from being indexed by search engines. Lighthouse correctly flags this as "Page is blocked from indexing," which alone can crater the SEO score (observed: 60) independent of any code-level SEO quality. **This is expected platform behavior on preview branches, not a site defect**, and does not reflect how the production domain will score once merged and deployed to production, where no `noindex` header is present.

---

## Fixes applied

1. **Contrast fix** — introduced a separate `--accent-strong` token (`#8a5a34`, later refined to a cardboard/kraft tone at the project owner's request) used only for solid-fill buttons, computed at ~5.9:1 against `--accent-ink`. The original `--accent` token (used for links, hover states, and focus rings on both light and dark theme variants) was left untouched to avoid breaking contrast elsewhere. Changed: `app/globals.css` (new token, 3 locations), `components/Button.tsx`, `components/ContactSection.tsx`.
2. **Tap target fix** — increased nav link padding from `px-1 py-1` to `px-3 py-2` in `components/NavBar.tsx`.
3. **Dead link fix** — `ProjectCard.tsx` now only renders the "View project" link when `project.href` is a real URL (not the placeholder `"#"`); otherwise shows plain "Link coming soon" text with no `<a>` element.

---

## Keyboard-only pass

- **Primary flow (nav → reveal contact form → fill → submit):** Tab reaches all nav links, the mobile hamburger button (with visible focus ring, `aria-expanded`/`aria-controls`/`aria-label`), the "Get in touch" toggle button, and all three form fields plus Send — all reachable and operable via Tab/Shift+Tab/Enter without a mouse.
- **Contact form success/error message** uses `role="status" aria-live="polite"`, so it is announced without requiring focus to move.
- Result: **Primary flow is completable by keyboard alone.**

---

## After fixes

| Page | Lighthouse Performance | Lighthouse Accessibility | Best Practices | SEO | WAVE Errors | WAVE Contrast Errors |
|------|------------------------|---------------------------|-----------------|-----|-------------|------------------------|
| `/` (production build, deployed URL) | 99 | 100 | 100 | 60* | 0 (pending re-verification against new colors) | 0 (pending re-verification against new colors) |
| `/about` | — | — | — | — | 0 | 0 |

\* SEO measured against a **preview deployment URL**, which carries a Vercel-injected `noindex` header (see Issues Found, item 4). This is not a code defect — the same build deployed to the production domain is expected to score meaningfully higher, since the `noindex` directive will not be present there.

Note: an earlier localhost/dev-mode Lighthouse run showed Performance dropping to 78 with a Total Blocking Time of 890ms. This was determined to be **dev-server noise, not a real regression** — `npm run dev` skips production minification/bundling, and Lighthouse itself flagged stored IndexedDB data as a possible confound on that run. The production-build number (99) is the one that reflects actual deployed performance.

---

## Known limitations / still needs human verification

- Final WAVE re-check (0 errors / 0 contrast errors) on `/` has not yet been re-run against the new cardboard accent colors — needs to be re-confirmed after this deploy.
- SEO score has only been measured on a preview branch; **needs to be re-run once merged to the production domain** to get the true, reportable SEO number.
- `HeroIllustration.tsx` and `ExperienceEntry.tsx` were not reviewed for image optimization (`next/image` usage, alt text, explicit dimensions) — not yet audited.
- No automated audit was run against the flyrank-personal-agent streaming chat interface (separate project) — if that's in scope for this assignment, it needs its own Lighthouse/WAVE/keyboard pass, including verifying the chat's `aria-live` streaming announcements and keyboard-reachable Stop button specifically.
- Screenshots referenced in the scores tables above should be attached directly in this file per the deliverable format (before: initial 95/96/100/63 run; after: 99/100/100/60-on-preview run).
