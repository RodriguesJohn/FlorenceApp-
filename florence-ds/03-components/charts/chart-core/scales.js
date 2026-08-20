/**
 * Scale, tick, and path helpers shared by every Flowrix chart.
 *
 * Deliberately dependency-free: the library ships only lucide-react, and a
 * charting dependency would be the largest thing in it. These are the ~150
 * lines of d3-scale/d3-shape that the core four actually need.
 */

/** Categorical series colors. Fixed order, never cycled - a 9th series folds
 *  into "Other" rather than reusing a hue (see charts/README.md). */
export const DATA_SLOTS = 8

export function seriesColor(index) {
  if (index < 0 || index >= DATA_SLOTS) return 'var(--color-chart-other)'
  return `var(--color-data-${index + 1})`
}

/** Solid + gradient stop pair for a data slot. Custom colors stay flat. */
export function seriesPalette(index, color) {
  if (color) {
    return { color, from: color, to: color }
  }
  if (index < 0 || index >= DATA_SLOTS) {
    return {
      color: 'var(--color-chart-other)',
      from: 'var(--color-chart-other-from)',
      to: 'var(--color-chart-other-to)',
    }
  }
  const slot = index + 1
  return {
    color: `var(--color-data-${slot})`,
    from: `var(--color-data-${slot}-from)`,
    to: `var(--color-data-${slot}-to)`,
  }
}

/** SVG fill url for a mark gradient defined by ChartMarkGradients. */
export function markGradientFill(id, key) {
  return `url(#${id}-mark-${key})`
}

/** Linear scale from a data domain to a pixel range. */
export function linearScale([d0, d1], [r0, r1]) {
  const span = d1 - d0
  if (span === 0) {
    const mid = (r0 + r1) / 2
    return () => mid
  }
  return (value) => r0 + ((value - d0) / span) * (r1 - r0)
}

/** Evenly spaced band positions for categorical axes. */
export function bandScale(count, [r0, r1], { padding = 0.2 } = {}) {
  const width = r1 - r0
  const step = count > 0 ? width / count : 0
  const bandWidth = step * (1 - padding)
  return {
    step,
    bandWidth,
    center: (i) => r0 + step * i + step / 2,
    start: (i) => r0 + step * i + (step - bandWidth) / 2,
  }
}

/**
 * "Nice" axis ticks - rounds the domain out to clean 1/2/5×10ⁿ steps so the
 * axis reads 0 / 1,000 / 2,000 rather than 0 / 1,137 / 2,274.
 */
export function niceTicks(min, max, count = 5) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return { ticks: [0], min: 0, max: 1 }
  if (min === max) {
    const pad = Math.abs(min) || 1
    min -= pad
    max += pad
  }

  const rawStep = (max - min) / Math.max(1, count)
  const magnitude = 10 ** Math.floor(Math.log10(rawStep))
  const residual = rawStep / magnitude
  const step = (residual >= 5 ? 10 : residual >= 2 ? 5 : residual >= 1 ? 2 : 1) * magnitude

  const niceMin = Math.floor(min / step) * step
  const niceMax = Math.ceil(max / step) * step

  const ticks = []
  // Accumulate with a multiplier rather than += to avoid float drift.
  for (let i = 0; niceMin + i * step <= niceMax + step / 1e6; i++) {
    ticks.push(round(niceMin + i * step))
  }
  return { ticks, min: niceMin, max: niceMax }
}

/** Trim binary-float noise (0.30000000000000004 → 0.3). */
function round(n) {
  return Math.abs(n) < 1e-10 ? 0 : +n.toPrecision(12)
}

/** Axis ticks and table cells - comma-grouped, never compacted. */
export function formatValue(value, { maximumFractionDigits = 2 } = {}) {
  if (value == null || Number.isNaN(value)) return '-'
  return new Intl.NumberFormat(undefined, { maximumFractionDigits }).format(value)
}

/** Stat-tile and hero figures - compact (12.9K, 4.2M). */
export function formatCompact(value) {
  if (value == null || Number.isNaN(value)) return '-'
  return new Intl.NumberFormat(undefined, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

/** Straight-segment path through points. */
export function linePath(points) {
  if (!points.length) return ''
  return points
    .map(({ x, y }, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ')
}

/**
 * Smooth cubic path for time-series lines - horizontal tangents at each sample
 * so the curve reads fluid without overshooting the data envelope.
 */
export function smoothLinePath(points) {
  if (!points.length) return ''
  if (points.length === 1) {
    return `M${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`
  }
  if (points.length === 2) {
    return linePath(points)
  }

  let path = `M${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]
    const midX = (current.x + next.x) / 2
    path += ` C${midX.toFixed(2)},${current.y.toFixed(2)} ${midX.toFixed(2)},${next.y.toFixed(2)} ${next.x.toFixed(2)},${next.y.toFixed(2)}`
  }

  return path
}

/** Closed area path from a line down to a baseline. */
export function areaPath(points, baselineY) {
  if (!points.length) return ''
  const first = points[0]
  const last = points[points.length - 1]
  return [
    linePath(points),
    `L${last.x.toFixed(2)},${baselineY.toFixed(2)}`,
    `L${first.x.toFixed(2)},${baselineY.toFixed(2)}`,
    'Z',
  ].join(' ')
}

/** Smooth area fill that follows `smoothLinePath`. */
export function smoothAreaPath(points, baselineY) {
  if (!points.length) return ''
  const first = points[0]
  const last = points[points.length - 1]
  return [
    smoothLinePath(points),
    `L${last.x.toFixed(2)},${baselineY.toFixed(2)}`,
    `L${first.x.toFixed(2)},${baselineY.toFixed(2)}`,
    'Z',
  ].join(' ')
}

/**
 * Rounded on the data end, square at the baseline - the mark spec for bars and
 * columns. `orientation` is the direction the bar grows.
 */
export function barPath({ x, y, width, height, radius = 4, orientation = 'up' }) {
  if (height <= 0 || width <= 0) return ''
  const r = Math.min(radius, width / 2, height)

  switch (orientation) {
    case 'up':
      return `M${x},${y + height} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height} Z`
    case 'down':
      return `M${x},${y} L${x},${y + height - r} Q${x},${y + height} ${x + r},${y + height} L${x + width - r},${y + height} Q${x + width},${y + height} ${x + width},${y + height - r} L${x + width},${y} Z`
    case 'right':
      return `M${x},${y} L${x + width - r},${y} Q${x + width},${y} ${x + width},${y + r} L${x + width},${y + height - r} Q${x + width},${y + height} ${x + width - r},${y + height} L${x},${y + height} Z`
    case 'left':
      return `M${x + width},${y} L${x + r},${y} Q${x},${y} ${x},${y + r} L${x},${y + height - r} Q${x},${y + height} ${x + r},${y + height} L${x + width},${y + height} Z`
    default:
      return ''
  }
}

/** Index of the datum nearest a pointer x - powers the crosshair snap. */
export function nearestIndex(positions, pointerX) {
  if (!positions.length) return -1
  let best = 0
  let bestDistance = Infinity
  for (let i = 0; i < positions.length; i++) {
    const distance = Math.abs(positions[i] - pointerX)
    if (distance < bestDistance) {
      bestDistance = distance
      best = i
    }
  }
  return best
}

/** Shared series normaliser: accepts `[{label, data:[…]}]` or a bare `[…]`. */
export function normalizeSeries(series) {
  if (!Array.isArray(series) || series.length === 0) return []
  if (typeof series[0] === 'number' || series[0] == null) {
    return [{ label: '', data: series }]
  }
  return series.map((entry, i) => ({
    label: entry.label ?? `Series ${i + 1}`,
    data: Array.isArray(entry.data) ? entry.data : [],
    color: entry.color,
  }))
}

/** Min/max across every series, always including the zero baseline for bars. */
export function seriesExtent(series, { includeZero = false } = {}) {
  const values = series.flatMap((s) => s.data).filter((v) => Number.isFinite(v))
  if (!values.length) return [0, 1]
  let min = Math.min(...values)
  let max = Math.max(...values)
  if (includeZero) {
    min = Math.min(min, 0)
    max = Math.max(max, 0)
  }
  return [min, max]
}

/** Per-index totals for stacked forms. */
export function stackedExtent(series, length) {
  let max = 0
  let min = 0
  for (let i = 0; i < length; i++) {
    let positive = 0
    let negative = 0
    for (const s of series) {
      const v = s.data[i]
      if (!Number.isFinite(v)) continue
      if (v >= 0) positive += v
      else negative += v
    }
    max = Math.max(max, positive)
    min = Math.min(min, negative)
  }
  return [min, max]
}
