# Shimmer Text

An animated text treatment for short, indeterminate processing states. The
shimmer uses semantic color, typography, opacity, and motion tokens, and becomes
static when the user prefers reduced motion.

```jsx
import { ShimmerText } from './ShimmerText.jsx'

<ShimmerText size="md" speed={1.25}>
  Generating response…
</ShimmerText>
```

Numeric `speed` values are continuous multipliers clamped from `0.5` to `2`.
The named values `slow`, `normal`, and `fast` remain available.
