# Florence

This folder was scaffolded by the Florence CLI.

## Use in your app

Import tokens once (Vite / CRA / Next - anywhere CSS imports work):

```js
import './florence/florence.css'
```

Use semantic tokens only:

```css
.card {
  color: var(--color-text-primary);
  background: var(--color-bg-page);
  padding: var(--space-inset-lg);
  border-radius: var(--radius-surface-md);
}
```

## Components

```bash
flowrix add button
flowrix add data-table
flowrix add --list
```

Import:

```js
import { Button } from './florence/components/button/Button.jsx'
```

## Rules for humans + AI

See `AGENTS.md` in this folder. Point Cursor / coding agents at it. Before using a component, read `<id>.json` in that component folder.

## Peer dependencies

Many components use `lucide-react`. Charts / chat also need `motion`.

```bash
npm install lucide-react motion
```
