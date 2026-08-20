import { useId, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  ChartFrame,
  ChartLegend,
  ChartTable,
} from '../chart-core/ChartFrame.jsx'
import { ChartTooltip } from '../chart-core/ChartTooltip.jsx'
import { ChartMarkGradients } from '../chart-core/ChartMarkGradients.jsx'
import { useChartMotion } from '../chart-core/chartMotion.js'
import {
  formatValue,
  formatCompact,
  markGradientFill,
  seriesPalette,
} from '../chart-core/scales.js'
import './pie-chart.css'

/**
 * Part-to-whole, at a glance.
 *
 * This form is deliberately narrow. A pie answers "roughly what share?" for a
 * handful of segments; it is the wrong tool for comparing close values (the
 * eye cannot rank similar angles) and for more than about six slices. The
 * component enforces both limits rather than leaving them to the caller:
 * segments past `maxSegments` fold into a single "Other" slice in the
 * de-emphasis gray, and every value stays readable in the table view.
 *
 * If you are reaching for this to compare magnitudes, a bar chart is the
 * honest answer. If you have one ratio against a limit, that is a meter, and
 * if you have a single number, that is a stat tile.
 */

const TAU = Math.PI * 2

/** Polar → cartesian, starting at 12 o'clock and running clockwise. */
function pointOnCircle(cx, cy, radius, angle) {
  return {
    x: cx + radius * Math.sin(angle),
    y: cy - radius * Math.cos(angle),
  }
}

/** Filled wedge for the solid pie variant. */
function wedgePath({ cx, cy, radius, startAngle, endAngle }) {
  const sweep = endAngle - startAngle
  if (sweep <= 0) return ''

  if (sweep >= TAU - 1e-6) {
    const top = pointOnCircle(cx, cy, radius, 0)
    const bottom = pointOnCircle(cx, cy, radius, Math.PI)
    return [
      `M${top.x},${top.y}`,
      `A${radius},${radius} 0 1 1 ${bottom.x},${bottom.y}`,
      `A${radius},${radius} 0 1 1 ${top.x},${top.y}`,
      'Z',
    ].join(' ')
  }

  const largeArc = sweep > Math.PI ? 1 : 0
  const start = pointOnCircle(cx, cy, radius, startAngle)
  const end = pointOnCircle(cx, cy, radius, endAngle)
  return [
    `M${cx},${cy}`,
    `L${start.x},${start.y}`,
    `A${radius},${radius} 0 ${largeArc} 1 ${end.x},${end.y}`,
    'Z',
  ].join(' ')
}

/** Ring segment for donut hit targets - keeps the centre quiet. */
function ringPath({ cx, cy, innerRadius, outerRadius, startAngle, endAngle }) {
  const sweep = endAngle - startAngle
  if (sweep <= 0) return ''

  if (sweep >= TAU - 1e-6) {
    const outerTop = pointOnCircle(cx, cy, outerRadius, 0)
    const outerBottom = pointOnCircle(cx, cy, outerRadius, Math.PI)
    const innerTop = pointOnCircle(cx, cy, innerRadius, 0)
    const innerBottom = pointOnCircle(cx, cy, innerRadius, Math.PI)
    return [
      `M${outerTop.x},${outerTop.y}`,
      `A${outerRadius},${outerRadius} 0 1 1 ${outerBottom.x},${outerBottom.y}`,
      `A${outerRadius},${outerRadius} 0 1 1 ${outerTop.x},${outerTop.y}`,
      'Z',
      `M${innerTop.x},${innerTop.y}`,
      `A${innerRadius},${innerRadius} 0 1 0 ${innerBottom.x},${innerBottom.y}`,
      `A${innerRadius},${innerRadius} 0 1 0 ${innerTop.x},${innerTop.y}`,
      'Z',
    ].join(' ')
  }

  const largeArc = sweep > Math.PI ? 1 : 0
  const outerStart = pointOnCircle(cx, cy, outerRadius, startAngle)
  const outerEnd = pointOnCircle(cx, cy, outerRadius, endAngle)
  const innerStart = pointOnCircle(cx, cy, innerRadius, endAngle)
  const innerEnd = pointOnCircle(cx, cy, innerRadius, startAngle)
  return [
    `M${outerStart.x},${outerStart.y}`,
    `A${outerRadius},${outerRadius} 0 ${largeArc} 1 ${outerEnd.x},${outerEnd.y}`,
    `L${innerStart.x},${innerStart.y}`,
    `A${innerRadius},${innerRadius} 0 ${largeArc} 0 ${innerEnd.x},${innerEnd.y}`,
    'Z',
  ].join(' ')
}

/**
 * Fold the tail into "Other" and sort largest-first.
 *
 * Sorting is what makes a pie readable at a glance - adjacent similar angles
 * are the form's weakness, and descending order at least makes the ranking
 * legible. "Other" always sorts last regardless of its size.
 */
function prepareSegments(data, { maxSegments, sort, otherLabel }) {
  const clean = data
    .map((entry, index) => ({
      label: entry.label ?? `Segment ${index + 1}`,
      value: Number.isFinite(entry.value) ? Math.max(0, entry.value) : 0,
      color: entry.color,
      sourceIndex: index,
    }))
    .filter((entry) => entry.value > 0)

  const ordered = sort ? [...clean].sort((a, b) => b.value - a.value) : clean

  if (ordered.length <= maxSegments) {
    return ordered.map((entry, i) => ({
      ...entry,
      ...seriesPalette(i, entry.color),
    }))
  }

  // Keep maxSegments - 1 real slices so "Other" is the last of maxSegments.
  const kept = ordered.slice(0, maxSegments - 1).map((entry, i) => ({
    ...entry,
    ...seriesPalette(i, entry.color),
  }))
  const tail = ordered.slice(maxSegments - 1)
  const otherValue = tail.reduce((sum, entry) => sum + entry.value, 0)

  return [
    ...kept,
    {
      label: otherLabel,
      value: otherValue,
      ...seriesPalette(-1),
      isOther: true,
      folded: tail.map((entry) => entry.label),
    },
  ]
}

export function PieChart({
  data = [],
  title,
  description,
  variant = 'donut',
  layout = 'split',
  size = 240,
  maxSegments = 6,
  sort = true,
  otherLabel = 'Other',
  centerLabel = 'Total',
  showCenterTotal = true,
  valueFormatter = formatValue,
  showTable = true,
  isLoading = false,
  emptyLabel = 'No data for this range',
  className = '',
}) {
  const [active, setActive] = useState(null)
  const titleId = useId()
  const gradientId = useId()
  const chartMotion = useChartMotion()

  const segments = useMemo(
    () => prepareSegments(data, { maxSegments, sort, otherLabel }),
    [data, maxSegments, sort, otherLabel],
  )

  const total = useMemo(
    () => segments.reduce((sum, entry) => sum + entry.value, 0),
    [segments],
  )

  const isEmpty = !segments.length || total <= 0
  const isDonut = variant === 'donut'

  const geometry = useMemo(() => {
    if (isEmpty) return { segments: [], ring: null }

    const cx = size / 2
    const cy = size / 2
    const pad = 4
    const outerRadius = size / 2 - pad
    // Thick continuous band - the SaaS donut read, not a thin stroked track.
    const thickness = isDonut ? Math.max(28, outerRadius * 0.34) : 0
    const innerRadius = isDonut ? Math.max(0, outerRadius - thickness) : 0
    const midRadius = isDonut ? (outerRadius + innerRadius) / 2 : outerRadius * 0.55

    // Reference style: abutting segments, no gutters.
    const gapPx = 0
    const gapAngle = 0

    let cursor = 0
    const built = segments.map((segment) => {
      const share = segment.value / total
      const sweep = share * TAU
      const start = cursor
      const end = cursor + sweep
      cursor = end

      const inset = gapPx > 0 ? Math.min(gapAngle / 2, sweep / 3) : 0
      const startAngle = start + inset
      const endAngle = end - inset
      const midAngle = (start + end) / 2

      return {
        ...segment,
        share,
        startAngle,
        endAngle,
        midAngle,
        path: isDonut
          ? ringPath({
              cx,
              cy,
              innerRadius,
              outerRadius,
              startAngle,
              endAngle,
            })
          : wedgePath({
              cx,
              cy,
              radius: outerRadius,
              startAngle,
              endAngle,
            }),
        hitPath: isDonut
          ? ringPath({
              cx,
              cy,
              innerRadius,
              outerRadius,
              startAngle: start,
              endAngle: end,
            })
          : wedgePath({
              cx,
              cy,
              radius: outerRadius,
              startAngle: start,
              endAngle: end,
            }),
        anchorPoint: pointOnCircle(cx, cy, midRadius, midAngle),
      }
    })

    return {
      segments: built,
      ring: isDonut
        ? { cx, cy, midRadius, thickness, innerRadius, outerRadius }
        : { cx, cy, outerRadius },
    }
  }, [segments, total, size, isDonut, isEmpty])

  const activeSegment =
    active != null
      ? geometry.segments.find((segment) => segment.label === active)
      : null

  const legendSeries = segments.map((segment) => ({
    label: segment.label,
    color: segment.color,
    meta: total > 0 ? `${Math.round((segment.value / total) * 100)}%` : undefined,
  }))

  const table = showTable ? (
    <ChartTable
      categoryLabel="Segment"
      categories={segments.map((segment) => segment.label)}
      series={[
        { label: 'Value', data: segments.map((segment) => segment.value) },
        {
          label: 'Share',
          data: segments.map((segment) =>
            total > 0 ? (segment.value / total) * 100 : 0,
          ),
        },
      ]}
      formatter={(value) => valueFormatter(value)}
    />
  ) : null

  const legend = (
    <ChartLegend
      className="pie-chart__legend"
      series={legendSeries}
      shape="dot"
      orientation={layout === 'split' ? 'vertical' : 'horizontal'}
      activeIndex={
        active != null
          ? segments.findIndex((segment) => segment.label === active)
          : null
      }
      onHighlight={(index) =>
        setActive(index == null ? null : segments[index]?.label ?? null)
      }
    />
  )

  return (
    <ChartFrame
      title={title}
      description={description}
      isEmpty={isEmpty}
      emptyLabel={emptyLabel}
      isLoading={isLoading}
      table={table}
      className={`pie-chart pie-chart--${layout} ${className}`.trim()}
      legend={layout === 'stack' ? legend : null}
    >
      <div
        className="pie-chart__layout"
        style={{ '--pie-size': `${size}px` }}
      >
        <div className="pie-chart__plot chart-plot">
          <svg
            className="chart-plot__svg pie-chart__svg"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            role="img"
            aria-labelledby={title ? titleId : undefined}
          >
            {title ? <title id={titleId}>{title}</title> : null}

            <ChartMarkGradients
              id={gradientId}
              orientation="vertical"
              marks={geometry.segments.map((segment, index) => ({
                key: String(index),
                color: segment.color,
                from: segment.from,
                to: segment.to,
              }))}
            />

            <defs>
              <filter
                id={`${gradientId}-segment-glow`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
                filterUnits="objectBoundingBox"
              >
                <feGaussianBlur stdDeviation="2.2" />
              </filter>
            </defs>

            <g className="pie-chart__segments">
              {[...geometry.segments]
                .map((segment, index) => ({ segment, index }))
                .sort((a, b) => {
                  if (!active) return 0
                  if (a.segment.label === active) return 1
                  if (b.segment.label === active) return -1
                  return 0
                })
                .map(({ segment, index }) => {
                  const isActive = active === segment.label
                  const isDimmed = active && active !== segment.label

                  return (
                    <motion.g
                      key={segment.label}
                      style={{
                        transformOrigin: `${size / 2}px ${size / 2}px`,
                        transformBox: 'view-box',
                      }}
                      initial={false}
                      animate={{
                        scale: isActive ? chartMotion.pieHoverScale : 1,
                        opacity: isDimmed ? chartMotion.dimmedOpacity : 1,
                        filter: isDimmed ? 'blur(1.5px)' : 'blur(0px)',
                      }}
                      transition={{
                        scale: chartMotion.hoverScale,
                        opacity: chartMotion.dim,
                        filter: chartMotion.dim,
                      }}
                    >
                      <motion.path
                        className="pie-chart__segment-glow"
                        d={segment.path}
                        fill={markGradientFill(gradientId, String(index))}
                        filter={`url(#${gradientId}-segment-glow)`}
                        initial={false}
                        animate={{ opacity: isActive ? 0.38 : 0 }}
                        transition={chartMotion.hoverGlow}
                        pointerEvents="none"
                      />
                      <path
                        className="pie-chart__segment"
                        d={segment.path}
                        fill={markGradientFill(gradientId, String(index))}
                      />
                    </motion.g>
                  )
                })}
            </g>

            {isDonut && showCenterTotal ? (
              <g
                className="pie-chart__center"
                transform={`translate(${size / 2} ${size / 2})`}
              >
                <text
                  className="pie-chart__center-value"
                  textAnchor="middle"
                  dominantBaseline="alphabetic"
                  y={centerLabel ? '-0.2em' : '0.35em'}
                >
                  {total < 10000
                    ? formatValue(total, { maximumFractionDigits: 0 })
                    : formatCompact(total)}
                </text>
                {centerLabel ? (
                  <text
                    className="pie-chart__center-label"
                    textAnchor="middle"
                    dominantBaseline="hanging"
                    y="0.45em"
                  >
                    {centerLabel}
                  </text>
                ) : null}
              </g>
            ) : null}

            <g>
              {geometry.segments.map((segment) => (
                <path
                  key={segment.label}
                  className="chart-hit-area"
                  d={segment.hitPath}
                  tabIndex={0}
                  role="button"
                  aria-label={`${segment.label}: ${valueFormatter(segment.value)}, ${Math.round(
                    segment.share * 100,
                  )} percent`}
                  onPointerEnter={() => setActive(segment.label)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(segment.label)}
                  onBlur={() => setActive(null)}
                />
              ))}
            </g>
          </svg>

          <ChartTooltip
            x={activeSegment?.anchorPoint.x ?? 0}
            y={activeSegment?.anchorPoint.y ?? 0}
            containerWidth={size}
            title={activeSegment?.label}
            rows={
              activeSegment
                ? [
                    {
                      label: `${Math.round(activeSegment.share * 100)}% of ${formatCompact(total)}`,
                      value: valueFormatter(activeSegment.value),
                      color: activeSegment.color,
                    },
                  ]
                : []
            }
          />
        </div>

        {layout === 'split' ? legend : null}
      </div>
    </ChartFrame>
  )
}
