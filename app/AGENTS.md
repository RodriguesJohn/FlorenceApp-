# AGENTS

This app uses the Florence design system in `florence/`. Follow `florence/AGENTS.md` for every UI change.

## Components
- Before using a component, read its contract: `<id>.json` in the same folder as the JSX.
- Honor `whenToUse` / `whenNotToUse`. Do not invent a sibling control.
- `flowrix add <id>` copies that folder. `deps` in the JSON are installed automatically; `related` is retrieval-only.
- The CLI catalog is those JSON files. Do not maintain a parallel list.

## Colors
- Use semantic tokens only from `florence/foundations/colors/semantics.css`
- Roles: text, bg, border, interactive, focus, disabled, status
- Themes: light (`:root`) and dark (`[data-theme="dark"]`)
- Never use hex or primitive ramps in components

## Typography
- Use semantic text styles only from `florence/foundations/typography/semantics.css`
- Roles: display, metric, heading, body, label, caption, overline, code
- Prefer soft medium weights and sentence-case meta; avoid tiny uppercase overlines for UI chrome
- Use `metric` (+ tabular nums) for balances and KPI heroes
- Never set font-size/weight/leading from primitive ramps in components

## Spacing
- Use semantic spacing only from `florence/foundations/spacing/semantics.css`
- Roles: inset, stack, inline, gap, section
- Never use raw `space-*` primitives or hard-coded rem/px in components

## Grid
- Use semantic layout tokens/utilities only from `florence/foundations/grid/semantics.css`
- Strict: no one-off product grids, no hard-coded rem/px max-widths (`54rem`, `72rem`, etc.)
- Product shells:
  `.layout-app` → `.layout-canvas` → `.layout-workspace` → `.layout-content`
- Then only region patterns: `.layout-header`, `.layout-metrics`, `.layout-split*`, `.layout-grid` + `.layout-col-*`, `.layout-auto`
- Marketing/docs: `.layout-page` / `.layout-container-sm|md|lg|xl`
- Region gaps use `--layout-gutter-*`; page inset uses `--layout-margin-*`
- Breakpoints match the grid file: 40rem / 64rem / 80rem
- Roles: app, canvas, workspace, content, metrics, header, split, container, page, gutter, margin, columns, auto
- Use `.layout-col-1`-`.layout-col-12` inside `.layout-grid` only when a custom 12-track layout is required

## Radius
- Use semantic radius only from `florence/foundations/radius/semantics.css`
- Roles: control, surface, media, pill
- Never use raw `radius-*` primitives or hard-coded rem/px corners in components

## Border
- Use semantic border widths only from `florence/foundations/border/semantics.css`
- Roles: control, surface, highlight, divider, focus
- Pair with color border tokens from `florence/foundations/colors/semantics.css` for stroke color
- Glass / light-catching card stroke: `border: var(--border-highlight) solid var(--color-border-highlight)`
- Never use raw `border-*` width primitives or hard-coded px strokes in components

## Shadow
- Use semantic elevation only from `florence/foundations/shadow/semantics.css`
- Roles: raised, raised-depth, overlay, modal
- Prefer `--shadow-raised-depth` for cards that need soft lift + partial glass rim
- Never use raw `shadow-*` primitives or hard-coded box-shadow values in components

## Motion
- Use semantic motion only from `florence/foundations/motion/semantics.css`
- Roles: interaction, expand, overlay, modal, page
- Never use raw `motion-duration-*` / `motion-ease-*` primitives or hard-coded ms/bezier in components
- Prefer custom curves over built-in CSS easings; default UI motion uses ease-out (never ease-in for enter/feedback)
- Keep everyday UI motion under ~300ms; make exits faster than enters
- Animate `transform` and `opacity` only; honor `prefers-reduced-motion`
- Never enter from `scale(0)` - start around `scale(0.95)+` with opacity
- Preview demos use Motion (`motion/react`); product components should prefer semantic CSS tokens

## Opacity
- Use semantic opacity only from `florence/foundations/opacity/semantics.css`
- Roles: disabled, muted, hover, scrim, full
- Pair scrim opacity with `--color-overlay-scrim*` for modal/drawer backdrops
- Never use raw `opacity-*` primitives or hard-coded opacity values in components
