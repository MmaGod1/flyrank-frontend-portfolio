# FE-03 Workflow: Vague Prompt vs Detailed Prompt

## Experiment Goal

This experiment compared two approaches to using Claude Code to implement the same theme-settings feature in my Next.js portfolio project. The first implementation used a deliberately vague prompt, while the second used a detailed prompt with explicit requirements, constraints, accessibility expectations, persistence behavior, and verification steps.

## Round 1 — Vague Prompt

The first implementation was created from a short, high-level request to add a theme settings feature that allowed the user to change the background colour and make it look good and work properly.

Claude produced a working theme settings interface with four paper-stock options and a light/dark mode. However, the implementation required significant manual intervention. The theme variables were not initially connected correctly to the visible page background, and the default Next.js background styles continued to control the appearance. I had to identify that the global CSS was controlling the background and update the CSS variables and page styles accordingly.

There was also a problem where the colour swatches worked in light mode but did not properly affect the dark-mode appearance. This required additional investigation and CSS changes.

The completed implementation was committed to the `fe-03-vague` branch.

## Round 2 — Detailed Prompt

For the second implementation, I provided Claude with a detailed specification covering the theme state, four colour swatches, light/dark modes, localStorage persistence, hydration behavior, CSS variables, accessibility, UI placement, project constraints, and verification requirements.

The result required substantially less manual correction. The detailed implementation explicitly defined separate theme values for each swatch in both light and dark modes. As a result, changing the paper-stock colour continued to affect the layout even while Night mode was active.

The implementation also included keyboard and Escape-key handling, outside-click behavior, ARIA attributes, persistent theme state, and a pre-hydration theme script.

The production build completed successfully with `npm run build`.

The completed implementation was committed to the `fe-03-detailed` branch.

## Comparison

The detailed prompt produced the stronger result. The vague prompt allowed Claude to make more assumptions about how the existing project should be integrated, which resulted in problems that had to be discovered and corrected manually. The detailed prompt reduced ambiguity by defining the expected architecture, behavior, styling system, accessibility requirements, and verification criteria before implementation.

This experiment showed that more specific prompts are more effective when working on an existing codebase because they reduce assumptions and make important implementation requirements explicit.