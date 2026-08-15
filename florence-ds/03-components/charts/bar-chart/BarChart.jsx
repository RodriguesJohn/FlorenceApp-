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
  bandScale,
  barPath,
  formatCompact,
  formatValue,
  linearScale,
  markGradientFill,
  niceTicks,
  normalizeSeries,
  seriesColor,
  seriesExtent,
  seriesPalette,
} from '../chart-core/scales.js'
import { useChartSize } from '../chart-core/useChartSize.js'
import './bar-chart.css'

/**
 * Compare magnitudes across categories.
 *
 * The honest form when the reader needs to rank values — close numbers read
 * instantly as bar length, which is why the pie chart page points here for
 * that job. Single-series accepts a flat `data` array; multi-series uses
 * `categories` + `series` and renders grouped columns with a shared legend.
 */

const MARGINS = {
  top: 8,
  right: 8,
  bottom: 28,
  left: 44,
}

/** Space between category bands — higher padding keeps columns slim in wide cards. */
const BAND_PADDING = 0.48

/** Bars stop growing past this width and stay centred in their band. */
const DEFAULT_MAX_BAR_WIDTH = 32

function formatAxisTick(value) {
  const abs = Math.abs(value)
  if (abs >= 10000) return formatCompact(value)
  return formatValue(value, { maximumFractionDigits: abs < 10 ? 1 : 0 })
}

function normalizeBarInput({ data, categories, series }) {
  if (Array.isArray(data) && data.length) {
    return {
      categories: data.map((entry, index) => entry.label ?? `Category ${index + 1}`),
      series: [
        {
          label: '',
          data: data.map((entry) =>
            Number.isFinite(entry.value) ? Math.max(0, entry.value) : 0,
          ),
          itemPalettes: data.map((entry, index) =>
            seriesPalette(index, entry.color),
          ),
        },
      ],
    }
  }

  const normalized = normalizeSeries(series).map((entry, index) => ({
    ...entry,
    ...seriesPalette(index, entry.color),
    data: entry.data.map((value) =>
      Number.isFinite(value) ? value : 0,
    ),
  }))

  return {
    categories: categories ?? [],
    series: normalized,
  }
}

function buildBars({
  categories,
  series,
  plotLeft,
  plotTop,
  plotRight,
  plotBottom,
  valueScale,
  orientation,
  bandPadding = BAND_PADDING,
  maxBarWidth = DEFAULT_MAX_BAR_WIDTH,
}) {
  const categoryCount = categories.length
  const seriesCount = series.length
  if (!categoryCount || !seriesCount) return { bars: [], outer: null }

  const isVertical = orientation === 'vertical'
  const categoryRange = isVertical
    ? [plotLeft, plotRight]
    : [plotBottom, plotTop]

  const outer = bandScale(categoryCount, categoryRange, { padding: bandPadding })
  const bars = []

  for (let categoryIndex = 0; categoryIndex < categoryCount; categoryIndex++) {
    const groupStart = outer.start(categoryIndex)
    const groupWidth = outer.bandWidth
    const innerStep = groupWidth / seriesCount
    const innerGap = innerStep * 0.14

    for (let seriesIndex = 0; seriesIndex < seriesCount; seriesIndex++) {
      const entry = series[seriesIndex]
      const value = entry.data[categoryIndex] ?? 0
      const palette =
        entry.itemPalettes?.[categoryIndex] ??
        seriesPalette(seriesIndex, entry.color)
      const color = palette.color
      const from = palette.from
      const to = palette.to
      const markKey = `${categoryIndex}-${seriesIndex}`

      if (isVertical) {
        const slotStart = groupStart + innerStep * seriesIndex + innerGap / 2
        const rawWidth = Math.max(0, innerStep - innerGap)
        const width = Math.min(rawWidth, maxBarWidth)
        const x = slotStart + (rawWidth - width) / 2
        const baseline = valueScale(0)
        const tip = valueScale(value)
        const y = Math.min(baseline, tip)
        const height = Math.abs(baseline - tip)

        bars.push({
          categoryIndex,
          seriesIndex,
          markKey,
          label: categories[categoryIndex],
          seriesLabel: entry.label,
          value,
          color,
          from,
          to,
          path: barPath({ x, y, width, height, orientation: 'up' }),
          centerX: x + width / 2,
          tooltipY: y,
          hitX: x,
          hitY: y,
          hitWidth: width,
          hitHeight: height,
        })
      } else {
        const slotStart = groupStart + innerStep * seriesIndex + innerGap / 2
        const rawHeight = Math.max(0, innerStep - innerGap)
        const barHeight = Math.min(rawHeight, maxBarWidth)
        const y = slotStart + (rawHeight - barHeight) / 2
        const baseline = valueScale(0)
        const tip = valueScale(value)
        const x = Math.min(baseline, tip)
        const width = Math.abs(baseline - tip)

        bars.push({
          categoryIndex,
          seriesIndex,
          markKey,
          label: categories[categoryIndex],
          seriesLabel: entry.label,
          value,
          color,
          from,
          to,
          path: barPath({ x, y, width, height: barHeight, orientation: 'right' }),
          centerX: x + width,
          tooltipY: y + barHeight / 2,
          hitX: x,
          hitY: y,
          hitWidth: width,
          hitHeight: barHeight,
        })
      }
    }
  }

  return { bars, outer }
}

export function BarChart({
  data,
  categories: categoriesProp,
  series: seriesProp,
  title,
  description,
  orientation = 'vertical',
  height = 240,
  maxBarWidth = DEFAULT_MAX_BAR_WIDTH,
  showGrid = true,
  showTable = true,
  valueFormatter = formatValue,
  isLoading = false,
  emptyLabel = 'No data for this range',
  className = '',
}) {
  const [active, setActive] = useState(null)
  const titleId = useId()
  const gradientId = useId()
  const chartMotion = useChartMotion()
  const { ref, width } = useChartSize(height)

  const { categories, series } = useMemo(
    () =>
      normalizeBarInput({
        data,
        categories: categoriesProp,
        series: seriesProp,
      }),
    [data, categoriesProp, seriesProp],
  )

  const hasValues = series.some((entry) =>
    entry.data.some((value) => Number.isFinite(value) && value !== 0),
  )
  const isEmpty = !categories.length || !series.length || !hasValues
  const isVertical = orientation === 'vertical'

  const layout = useMemo(() => {
    if (isEmpty || width <= 0) {
      return { bars: [], ticks: [], plot: null, baseline: 0 }
    }

    const plotLeft = MARGINS.left
    const plotRight = width - MARGINS.right
    const plotTop = MARGINS.top
    const plotBottom = height - MARGINS.bottom

    const [rawMin, rawMax] = seriesExtent(series, { includeZero: true })
    const { ticks, min, max } = niceTicks(rawMin, rawMax, 5)

    const valueScale = linearScale(
      [min, max],
      isVertical ? [plotBottom, plotTop] : [plotLeft, plotRight],
    )

    const { bars, outer } = buildBars({
      categories,
      series,
      plotLeft,
      plotTop,
      plotRight,
      plotBottom,
      valueScale,
      orientation,
      maxBarWidth,
    })

    const baseline = valueScale(0)

    const categoryLabels = outer
      ? categories.map((label, index) => ({
      label,
      x: isVertical ? outer.center(index) : plotLeft - 8,
      y: isVertical ? plotBottom + 18 : outer.center(index),
      anchor: isVertical ? 'middle' : 'end',
      baseline: isVertical ? 'hanging' : 'middle',
        }))
      : []

    const tickMarks = ticks.map((tick) => ({
      value: tick,
      label: formatAxisTick(tick),
      x: isVertical ? plotLeft - 8 : valueScale(tick),
      y: isVertical ? valueScale(tick) : plotBottom + 18,
      gridX1: isVertical ? plotLeft : valueScale(tick),
      gridX2: isVertical ? plotRight : valueScale(tick),
      gridY1: isVertical ? valueScale(tick) : plotTop,
      gridY2: isVertical ? valueScale(tick) : plotBottom,
      anchor: isVertical ? 'end' : 'middle',
      baseline: isVertical ? 'middle' : 'hanging',
    }))

    return {
      bars,
      ticks: tickMarks,
      categoryLabels,
      plot: { plotLeft, plotTop, plotRight, plotBottom },
      baseline,
    }
  }, [categories, series, width, height, isEmpty, isVertical, orientation, maxBarWidth])

  const activeBar =
    active != null
      ? layout.bars.find(
          (bar) =>
            bar.categoryIndex === active.categoryIndex &&
            bar.seriesIndex === active.seriesIndex,
        )
      : null

  const legendSeries = series
    .filter((entry) => entry.label)
    .map((entry, index) => ({
      label: entry.label,
      color: entry.color ?? seriesColor(index),
    }))

  const table = showTable ? (
    <ChartTable
      categoryLabel="Category"
      categories={categories}
      series={series.map((entry) => ({
        label: entry.label || 'Value',
        data: entry.data,
      }))}
      formatter={(value) => valueFormatter(value)}
    />
  ) : null

  const legend =
    legendSeries.length >= 2 ? (
      <ChartLegend
        className="bar-chart__legend"
        series={legendSeries}
        shape="rect"
        activeIndex={
          active != null && series.length > 1 ? active.seriesIndex : null
        }
        onHighlight={(index) =>
          setActive(index == null ? null : { seriesIndex: index })
        }
      />
    ) : null

  return (
    <ChartFrame
      title={title}
      description={description}
      legend={legend}
      isEmpty={isEmpty}
      emptyLabel={emptyLabel}
      isLoading={isLoading}
      table={table}
      className={`bar-chart bar-chart--${orientation} ${className}`.trim()}
    >
      <div
        ref={ref}
        className="bar-chart__plot chart-plot"
        style={{ '--bar-chart-height': `${height}px` }}
      >
        {width > 0 ? (
          <svg
            className="chart-plot__svg bar-chart__svg"
            width={width}
            height={height}
            role="img"
            aria-labelledby={title ? titleId : undefined}
          >
            {title ? <title id={titleId}>{title}</title> : null}

            <ChartMarkGradients
              id={gradientId}
              orientation={orientation}
              marks={layout.bars.map((bar) => ({
                key: bar.markKey,
                color: bar.color,
                from: bar.from,
                to: bar.to,
              }))}
            />

            {showGrid
              ? layout.ticks.map((tick) => (
                  <line
                    key={tick.value}
                    className="chart-grid-line"
                    x1={tick.gridX1}
                    x2={tick.gridX2}
                    y1={tick.gridY1}
                    y2={tick.gridY2}
                  />
                ))
              : null}

            {layout.plot ? (
              isVertical ? (
                <>
                  <line
                    className="chart-axis-line"
                    x1={layout.plot.plotLeft}
                    x2={layout.plot.plotRight}
                    y1={layout.baseline}
                    y2={layout.baseline}
                  />
                  <line
                    className="chart-axis-line"
                    x1={layout.plot.plotLeft}
                    x2={layout.plot.plotLeft}
                    y1={layout.plot.plotTop}
                    y2={layout.plot.plotBottom}
                  />
                </>
              ) : (
                <>
                  <line
                    className="chart-axis-line"
                    x1={layout.baseline}
                    x2={layout.baseline}
                    y1={layout.plot.plotTop}
                    y2={layout.plot.plotBottom}
                  />
                  <line
                    className="chart-axis-line"
                    x1={layout.plot.plotLeft}
                    x2={layout.plot.plotRight}
                    y1={layout.plot.plotBottom}
                    y2={layout.plot.plotBottom}
                  />
                </>
              )
            ) : null}

            {layout.ticks.map((tick) => (
              <text
                key={`tick-${tick.value}`}
                className="chart-axis-label"
                x={tick.x}
                y={tick.y}
                textAnchor={tick.anchor}
                dominantBaseline={tick.baseline}
              >
                {tick.label}
              </text>
            ))}

            {layout.categoryLabels?.map((entry) => (
              <text
                key={entry.label}
                className="chart-axis-label bar-chart__category-label"
                x={entry.x}
                y={entry.y}
                textAnchor={entry.anchor}
                dominantBaseline={entry.baseline}
              >
                {entry.label}
              </text>
            ))}

            <g className="bar-chart__bars">
              {layout.bars.map((bar) => {
                const isDimmed =
                  active &&
                  ((active.categoryIndex != null &&
                    active.categoryIndex !== bar.categoryIndex) ||
                    (active.seriesIndex != null &&
                      active.seriesIndex !== bar.seriesIndex))

                return (
                  <motion.path
                    key={`${bar.categoryIndex}-${bar.seriesIndex}`}
                    className="bar-chart__bar"
                    d={bar.path}
                    fill={markGradientFill(gradientId, bar.markKey)}
                    initial={false}
                    animate={{
                      opacity: isDimmed ? chartMotion.dimmedOpacity : 1,
                    }}
                    transition={chartMotion.dim}
                  />
                )
              })}
            </g>

            <g className="bar-chart__hits">
              {layout.bars.map((bar) => (
                <rect
                  key={`hit-${bar.categoryIndex}-${bar.seriesIndex}`}
                  className="chart-hit-area"
                  x={bar.hitX}
                  y={bar.hitY}
                  width={bar.hitWidth}
                  height={bar.hitHeight}
                  tabIndex={0}
                  role="button"
                  aria-label={`${bar.label}${
                    bar.seriesLabel ? `, ${bar.seriesLabel}` : ''
                  }: ${valueFormatter(bar.value)}`}
                  onPointerEnter={() =>
                    setActive({
                      categoryIndex: bar.categoryIndex,
                      seriesIndex: bar.seriesIndex,
                    })
                  }
                  onPointerLeave={() => setActive(null)}
                  onFocus={() =>
                    setActive({
                      categoryIndex: bar.categoryIndex,
                      seriesIndex: bar.seriesIndex,
                    })
                  }
                  onBlur={() => setActive(null)}
                />
              ))}
            </g>
          </svg>
        ) : null}

        <ChartTooltip
          x={activeBar?.centerX ?? 0}
          y={activeBar?.tooltipY ?? 0}
          containerWidth={width}
          title={activeBar?.label}
          rows={
            activeBar
              ? [
                  {
                    label: activeBar.seriesLabel || undefined,
                    value: valueFormatter(activeBar.value),
                    color: activeBar.color,
                  },
                ]
              : []
          }
        />
      </div>
    </ChartFrame>
  )
}
