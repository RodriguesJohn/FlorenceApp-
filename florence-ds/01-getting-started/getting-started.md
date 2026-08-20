# Getting started

Florence is a token-first design system:

**primitives → semantics → components**

---

## Option A - one-liner

In your app folder:

```bash
npx github:RodriguesJohn/ADS-Flowrix setup --install
```

That drops a `florence/` folder (tokens, AGENTS.md, starter components) and installs `lucide-react` + `motion`.

Import:

```js
import './florence/florence.css'
import { Button } from './florence/components/button/Button.jsx'
```

> Private repo: you must be logged into GitHub (`gh auth login` / npm with access).

---

## Option B - Preview docs locally

```bash
cd preview
npm install
npm run dev
```

Open [http://localhost:4721](http://localhost:4721)

---

## Option C - CLI without linking

From the Florence repo root:

```bash
npm run flowrix -- init ./path/to/app
npm run flowrix -- add button
npm run flowrix -- list colors
npm run flowrix -- validate
```

---

## Rules

1. Import foundation CSS via `florence/florence.css`.
2. Style UI with **semantic tokens only**, e.g. `var(--color-text-primary)`.
3. Do not use hex or primitive ramps in components - see `AGENTS.md`.
4. Read `<component>/<id>.json` before composing - that file is the retrieval contract (`whenToUse`, props, deps).

Point AI coding tools at `florence/AGENTS.md` so generated UI stays on-system.
