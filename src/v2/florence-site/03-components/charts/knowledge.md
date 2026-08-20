# Florence Charts - Knowledge

Curated SaaS charts for Florence. Not a BI suite. A small set of honest marks that
share one frame, one color system, and one interaction model - so products look
finished without buying an expensive chart license.

## Why Florence charts exist

| Problem in the market | What Florence does |
| --- | --- |
| Enterprise chart kits look generic and “Excel-adjacent” out of the box | Ship marks already tuned for SaaS density, dark/light, and Florence tokens |
| Polished libraries still need days of restyling to match a design system | Charts consume semantic roles only (`--color-data-*`, chart furniture, type, space) |
| Commercial chart licenses are expensive for teams that need five chart types | Own the core four; no third-party chart license for the default set |
| Open-source chart libs optimise for flexibility, not restraint | Enforce form limits (e.g. pie caps at six slices) so the wrong chart is hard to misuse |
| Accessibility is bolted on (hover-only values) | Every chart has a table twin; values are never hover-only |
| Each product invents its own tooltip, legend, and empty state | Shared `ChartFrame` - title, legend, empty/loading, table toggle |

## Scope (what we ship)

Keep the set narrow. SaaS dashboards almost never need more than this:

1. **KPI / stat** - a single number (already covered by KPI card)
2. **Pie / donut** - rough part-to-whole share
3. **Bar / column** - compare magnitudes
4. **Line** - change over time
5. **Area** (optional) - volume over time when fill helps

Refuse: candlesticks, heatmaps, sankeys, geo, sparklines-as-a-separate-product, and anything that needs a specialist to read.

## Pie / donut - problems identified

| Problem | Symptom | Florence rule |
| --- | --- | --- |
| Cramped card chrome | Ring or legend kissing the card edge | Consistent `inset-lg` padding on `ChartFrame`; plot/legend keep side breathing room |
| Legend above the ring | Horizontal wrap, uneven 3-over-2 rows, wasted height | Default `layout="split"` - ring left, vertical legend right |
| Thin stroked arcs + gaps | Looks like a progress track, not a share chart | Filled continuous donut band (~34% radius); no gutters between segments |
| Compact centre total | `9.9K` when the figure is small | Full digits under 10k; compact above |
| Too many slices | Adjacent angles become indistinguishable | Cap at six segments; fold the tail into **Other** |
| Close values in a pie | Eye cannot rank similar angles | Document as the wrong form; point to bar |
| Outside % labels + leaders | Looks dated; collides on small cards | Shares live in the legend; tooltip on hover/focus |
| Hover-only truth | Keyboard / SR users miss values | Table view on the frame; hit targets are keyboard-focusable |
| Exploding slices on hover | Geometry lies while the reader is judging share | Dim siblings instead; never explode |

## Product posture

- **Curated, not complete.** Five good charts beat fifty mediocre ones.
- **Tokens first.** No hex in components; data slots never cycle past eight.
- **Honest defaults.** Sorting, gaps, empty states, and form limits are built in.
- **Sell the taste.** Teams buy Florence so dashboards look intentional on day one.

## Open questions

- Bar next, then line - confirm order when the pie set feels solid in the playground.
- Whether area is in v1 or waits until line has density + multi-series rules.
- How agents retrieve chart recipes (CLI / docs) alongside components.
