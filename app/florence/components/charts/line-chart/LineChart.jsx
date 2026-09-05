import { useCallback, useId, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  ChartFrame,
  ChartLegend,
  ChartTable,
} from '../chart-core/ChartFrame.jsx'
import { ChartTooltip, Crosshair } from '../chart-core/ChartTooltip.jsx'
import { ChartMarkGradients } from '../chart-core/ChartMarkGradients.jsx'
import { useChartMotion } from '../chart-core/chartMotion.js'
import {
  areaPath,
  bandScale,
  formatCompact,
  formatValue,
  linearScale,
  linePath,
  markGradientFill,
  nearestIndex,
  niceTicks,
  normalizeSeries,
  seriesColor,
  seriesExtent,
  seriesPalette,
  smoothAreaPath,
  smoothLinePath,
} from '../chart-core/scales.js'
import { useChartSize } from '../chart-core/useChartSize.js'
import './line-chart.css'

/**
 * Change over time - progress, trends, and trajectories.
 *
 * Smooth cubic curves between samples for a fluid read; tooltip values still
 * come from the real points, never from the interpolated path. Single-series
 * accepts a flat `data` array; multi-series uses `labels` + `series`.
 */

const MARGINS = {
  top: 12,
  right: 12,
  bottom: 28,
  left: 44,
}

const BAND_PADDING = 0.08

function formatAxisTick(value) {
  const abs = Math.abs(value)
  if (abs >= 10000) return formatCompact(value)
  return formatValue(value, { maximumFractionDigits: abs < 10 ? 1 : 0 })
}

function normalizeLineInput({ data, labels, series }) {
  if (Array.isArray(data) && data.length) {
    const palette = seriesPalette(0, data.find((entry) => entry.color)?.color)
    return {
      labels: data.map((entry, index) => entry.label ?? `Point ${index + 1}`),
      series: [
        {
          label: '',
          data: data.map((entry) =>
            Number.isFinite(entry.value) ? entry.value : 0,
          ),
          ...palette,
        },
      ],
    }
  }

  const normalized = normalizeSeries(series).map((entry, index) => ({
    ...entry,
    ...seriesPalette(index, entry.color),
    data: entry.data.map((value) => (Number.isFinite(value) ? value : 0)),
  }))

  return {
    labels: labels ?? [],
    series: normalized,
  }
}

function buildLines({
  labels,
  series,
  plotLeft,
  plotTop,
  plotRight,
  plotBottom,
  yScale,
  curve = 'smooth',
}) {
  const outer = bandScale(labels.length, [plotLeft, plotRight], {
    padding: BAND_PADDING,
  })
  const xPositions = labels.map((_, index) => outer.center(index))
  const lineFn = curve === 'smooth' ? smoothLinePath : linePath
  const areaFn = curve === 'smooth' ? smoothAreaPath : areaPath

  const built = series.map((entry, seriesIndex) => {
    const palette = seriesPalette(seriesIndex, entry.color)
    const color = palette.color
    const points = entry.data.map((value, index) => ({
      index,
      x: xPositions[index],
      y: yScale(value),
      value,
      label: labels[index],
    }))

    return {
      label: entry.label,
      color,
      from: palette.from,
      to: palette.to,
      markKey: `series-${seriesIndex}`,
      points,
      path: lineFn(points),
      area: areaFn(points, plotBottom),
    }
  })

  return { lines: built, xPositions, outer }
}

export function LineChart({
  data,
  labels: labelsProp,
  series: seriesProp,
  title,
  description,
  variant = 'area',
  curve = 'smooth',
  height = 240,
  showGrid = true,
  showTable = true,
  includeZero = false,
  valueFormatter = formatValue,
  isLoading = false,
  emptyLabel = 'No data for this range',
  className = '',
}) {
  const [activeIndex, setActiveIndex] = useState(null)
  const [activeSeriesIndex, setActiveSeriesIndex] = useState(null)
  const titleId = useId()
  const gradientId = useId()
  const chartMotion = useChartMotion()
  const { ref, width } = useChartSize(height)

  const { labels, series } = useMemo(
    () =>
      normalizeLineInput({
        data,
        labels: labelsProp,
        series: seriesProp,
      }),
    [data, labelsProp, seriesProp],
  )

  const hasValues = series.some((entry) =>
    entry.data.some((value) => Number.isFinite(value)),
  )
  const isEmpty = !labels.length || !series.length || !hasValues
  const isArea = variant === 'area'

  const layout = useMemo(() => {
    if (isEmpty || width <= 0) {
      return { lines: [], ticks: [], xPositions: [], plot: null }
    }

    const plotLeft = MARGINS.left
    const plotRight = width - MARGINS.right
    const plotTop = MARGINS.top
    const plotBottom = height - MARGINS.bottom

    const [rawMin, rawMax] = seriesExtent(series, { includeZero })
    const { ticks, min, max } = niceTicks(rawMin, rawMax, 5)
    const yScale = linearScale([min, max], [plotBottom, plotTop])

    const { lines, xPositions, outer } = buildLines({
      labels,
      series,
      plotLeft,
      plotTop,
      plotRight,
      plotBottom,
      yScale,
      curve,
    })

    const categoryLabels = labels.map((label, index) => ({
      label,
      x: outer.center(index),
      y: plotBottom + 18,
    }))

    const tickMarks = ticks.map((tick) => ({
      value: tick,
      label: formatAxisTick(tick),
      x: plotLeft - 8,
      y: yScale(tick),
      gridX1: plotLeft,
      gridX2: plotRight,
      gridY1: yScale(tick),
      gridY2: yScale(tick),
    }))

    return {
      lines,
      ticks: tickMarks,
      categoryLabels,
      xPositions,
      plot: { plotLeft, plotTop, plotRight, plotBottom },
      yScale,
    }
  }, [labels, series, width, height, isEmpty, includeZero, curve])

  const resolveIndex = useCallback(
    (clientX, target) => {
      if (!layout.xPositions.length || !target) return null
      const rect = target.getBoundingClientRect()
      const x = clientX - rect.left
      const index = nearestIndex(layout.xPositions, x)
      return index >= 0 ? index : null
    },
    [layout.xPositions],
  )

  const handlePlotPointerMove = useCallback(
    (event) => {
      const index = resolveIndex(event.clientX, event.currentTarget)
      setActiveIndex(index)
    },
    [resolveIndex],
  )

  const legendSeries = series
    .filter((entry) => entry.label)
    .map((entry, index) => ({
      label: entry.label,
      color: entry.color ?? seriesColor(index),
    }))

  const table = showTable ? (
    <ChartTable
      categoryLabel="Period"
      categories={labels}
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
        className="line-chart__legend"
        series={legendSeries}
        shape="line"
        activeIndex={activeSeriesIndex}
        onHighlight={(index) => setActiveSeriesIndex(index)}
      />
    ) : null

  const tooltipRows =
    activeIndex != null
      ? layout.lines
          .filter(
            (_, index) =>
              activeSeriesIndex == null || activeSeriesIndex === index,
          )
          .map((line) => {
            const point = line.points[activeIndex]
            return {
              label: line.label || undefined,
              value: valueFormatter(point?.value),
              color: line.color,
            }
          })
      : []

  return (
    <ChartFrame
      title={title}
      description={description}
      legend={legend}
      isEmpty={isEmpty}
      emptyLabel={emptyLabel}
      isLoading={isLoading}
      table={table}
      className={`line-chart line-chart--${variant} ${className}`.trim()}
    >
      <div
        ref={ref}
        className="line-chart__plot chart-plot"
        style={{ '--line-chart-height': `${height}px` }}
      >
        {width > 0 ? (
          <svg
            className="chart-plot__svg line-chart__svg"
            width={width}
            height={height}
            role="img"
            aria-labelledby={title ? titleId : undefined}
          >
            {title ? <title id={titleId}>{title}</title> : null}

            <ChartMarkGradients
              id={gradientId}
              orientation="area"
              marks={layout.lines.map((line) => ({
                key: line.markKey,
                color: line.color,
                from: line.from,
                to: line.to,
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
              <>
                <line
                  className="chart-axis-line"
                  x1={layout.plot.plotLeft}
                  x2={layout.plot.plotRight}
                  y1={layout.plot.plotBottom}
                  y2={layout.plot.plotBottom}
                />
                <line
                  className="chart-axis-line"
                  x1={layout.plot.plotLeft}
                  x2={layout.plot.plotLeft}
                  y1={layout.plot.plotTop}
                  y2={layout.plot.plotBottom}
                />
              </>
            ) : null}

            {layout.ticks.map((tick) => (
              <text
                key={`tick-${tick.value}`}
                className="chart-axis-label"
                x={tick.x}
                y={tick.y}
                textAnchor="end"
                dominantBaseline="middle"
              >
                {tick.label}
              </text>
            ))}

            {layout.categoryLabels.map((entry) => (
              <text
                key={entry.label}
                className="chart-axis-label line-chart__category-label"
                x={entry.x}
                y={entry.y}
                textAnchor="middle"
                dominantBaseline="hanging"
              >
                {entry.label}
              </text>
            ))}

            {isArea ? (
              <g className="line-chart__areas">
                {layout.lines.map((line, index) => {
                  const dimmed =
                    activeSeriesIndex != null && activeSeriesIndex !== index
                  return (
                    <motion.path
                      key={`area-${line.label ?? index}`}
                      className="line-chart__area"
                      d={line.area}
                      fill={markGradientFill(gradientId, line.markKey)}
                      initial={false}
                      animate={{
                        opacity: dimmed ? chartMotion.dimmedOpacity : 1,
                      }}
                      transition={chartMotion.dim}
                    />
                  )
                })}
              </g>
            ) : null}

            <g className="line-chart__lines">
              {layout.lines.map((line, index) => {
                const dimmed =
                  activeSeriesIndex != null && activeSeriesIndex !== index
                return (
                  <motion.path
                    key={`line-${line.label ?? index}`}
                    className="line-chart__line"
                    d={line.path}
                    stroke={line.color}
                    initial={false}
                    animate={{
                      opacity: dimmed ? chartMotion.dimmedOpacity : 1,
                    }}
                    transition={chartMotion.dim}
                  />
                )
              })}
            </g>

            {activeIndex != null && layout.plot ? (
              <>
                <Crosshair
                  x={layout.xPositions[activeIndex]}
                  top={layout.plot.plotTop}
                  bottom={layout.plot.plotBottom}
                />
                {layout.lines
                  .filter(
                    (_, index) =>
                      activeSeriesIndex == null || activeSeriesIndex === index,
                  )
                  .map((line, index) => {
                    const point = line.points[activeIndex]
                    if (!point) return null
                    return (
                      <motion.circle
                        key={`dot-${line.label ?? index}`}
                        className="line-chart__dot"
                        fill={line.color}
                        initial={false}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          cx: point.x,
                          cy: point.y,
                        }}
                        transition={{
                          opacity: chartMotion.reveal,
                          cx: chartMotion.follow,
                          cy: chartMotion.follow,
                        }}
                        r={5}
                      />
                    )
                  })}
              </>
            ) : null}

            <g className="line-chart__hits">
              {layout.plot
                ? layout.xPositions.map((x, index) => (
                    <rect
                      key={`hit-${labels[index] ?? index}`}
                      className="chart-hit-area"
                      x={
                        index === 0
                          ? layout.plot.plotLeft
                          : (layout.xPositions[index - 1] + x) / 2
                      }
                      y={layout.plot.plotTop}
                      width={
                        index === 0
                          ? (layout.xPositions[1] + x) / 2 - layout.plot.plotLeft
                          : index === layout.xPositions.length - 1
                            ? layout.plot.plotRight -
                              (layout.xPositions[index - 1] + x) / 2
                            : (layout.xPositions[index + 1] -
                                layout.xPositions[index - 1]) /
                              2
                      }
                      height={layout.plot.plotBottom - layout.plot.plotTop}
                      tabIndex={0}
                      role="button"
                      aria-label={`${labels[index]}: ${series
                        .map(
                          (entry) =>
                            `${entry.label ? `${entry.label} ` : ''}${valueFormatter(entry.data[index])}`,
                        )
                        .join(', ')}`}
                      onFocus={() => setActiveIndex(index)}
                      onBlur={() => setActiveIndex(null)}
                    />
                  ))
                : null}
            </g>

            {layout.plot ? (
              <rect
                className="line-chart__overlay"
                x={layout.plot.plotLeft}
                y={layout.plot.plotTop}
                width={layout.plot.plotRight - layout.plot.plotLeft}
                height={layout.plot.plotBottom - layout.plot.plotTop}
                onPointerMove={handlePlotPointerMove}
                onPointerLeave={() => setActiveIndex(null)}
              />
            ) : null}
          </svg>
        ) : null}

        <ChartTooltip
          x={
            activeIndex != null
              ? layout.xPositions[activeIndex]
              : 0
          }
          y={layout.plot?.plotTop ?? 0}
          containerWidth={width}
          title={activeIndex != null ? labels[activeIndex] : undefined}
          rows={tooltipRows}
        />
      </div>
    </ChartFrame>
  )
}
