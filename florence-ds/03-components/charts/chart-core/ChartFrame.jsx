import { useId, useState } from 'react'
import { motion } from 'motion/react'
import { Table2, BarChart3 } from 'lucide-react'
import { formatValue } from './scales.js'
import { useChartMotion } from './chartMotion.js'
import './chart-frame.css'

/**
 * The container every chart mounts in: title, legend, the table-view twin, and
 * the empty / loading states.
 *
 * Height is never fixed on the frame — the plot has its own height and the
 * axis band, legend, and caption add to it, so a card can't end up with a
 * nested scrollbar that hides the x-axis.
 */

/** Legend swatch mirrors the mark: a rect for fills, a stroke for lines, a
 *  disc for arcs. */
function LegendKey({ color, shape }) {
  if (shape === 'line') {
    return (
      <svg className="chart-legend__key" viewBox="0 0 16 8" aria-hidden="true">
        <line
          x1="1"
          y1="4"
          x2="15"
          y2="4"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  return (
    <span
      className={`chart-legend__swatch${shape === 'dot' ? ' chart-legend__swatch--dot' : ''}`}
      style={{ background: color }}
      aria-hidden="true"
    />
  )
}

export function ChartLegend({
  series,
  shape = 'rect',
  orientation = 'horizontal',
  activeIndex,
  onToggle,
  onHighlight,
  className = '',
}) {
  const chartMotion = useChartMotion()

  if (!series || series.length < 2) return null

  return (
    <ul
      className={`chart-legend chart-legend--${orientation} ${className}`.trim()}
    >
      {series.map((entry, index) => {
        const dimmed = activeIndex != null && activeIndex !== index
        const interactive =
          typeof onToggle === 'function' || typeof onHighlight === 'function'
        const Tag = interactive ? motion.button : motion.span

        return (
          <li key={entry.label ?? index}>
            <Tag
              className="chart-legend__item"
              type={interactive ? 'button' : undefined}
              initial={false}
              animate={{ opacity: dimmed ? chartMotion.dimmedOpacity : 1 }}
              transition={chartMotion.dim}
              onClick={
                typeof onToggle === 'function'
                  ? () => onToggle(index)
                  : undefined
              }
              onPointerEnter={
                typeof onHighlight === 'function'
                  ? () => onHighlight(index)
                  : undefined
              }
              onPointerLeave={
                typeof onHighlight === 'function'
                  ? () => onHighlight(null)
                  : undefined
              }
              aria-pressed={
                typeof onToggle === 'function' ? activeIndex === index : undefined
              }
            >
              <LegendKey color={entry.color} shape={shape} />
              <span className="chart-legend__label">{entry.label}</span>
              {entry.meta ? (
                <span className="chart-legend__meta">{entry.meta}</span>
              ) : null}
            </Tag>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * The accessibility twin. Every chart can render its numbers as a table, so no
 * value is reachable only by hovering.
 */
export function ChartTable({ categories, series, categoryLabel = 'Category', formatter = formatValue }) {
  return (
    <div className="chart-table__scroll">
      <table className="chart-table">
        <thead>
          <tr>
            <th scope="col">{categoryLabel}</th>
            {series.map((entry, index) => (
              <th key={entry.label ?? index} scope="col">
                {entry.label || 'Value'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, row) => (
            <tr key={category ?? row}>
              <th scope="row">{category}</th>
              {series.map((entry, index) => (
                <td key={entry.label ?? index}>{formatter(entry.data[row])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ChartFrame({
  title,
  description,
  legend,
  children,
  table,
  actions,
  footnote,
  isEmpty = false,
  emptyLabel = 'No data for this range',
  isLoading = false,
  className = '',
}) {
  const [view, setView] = useState('chart')
  const titleId = useId()
  const descriptionId = useId()
  const panelId = useId()

  const showTable = view === 'table' && table

  return (
    <figure
      className={`chart-frame ${className}`.trim()}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
    >
      {title || actions || table ? (
        <figcaption className="chart-frame__header">
          <div className="chart-frame__heading">
            {title ? (
              <h3 id={titleId} className="chart-frame__title">
                {title}
              </h3>
            ) : null}
            {description ? (
              <p id={descriptionId} className="chart-frame__description">
                {description}
              </p>
            ) : null}
          </div>

          <div className="chart-frame__actions">
            {actions}
            {table ? (
              <button
                type="button"
                className="chart-frame__toggle"
                onClick={() => setView(showTable ? 'chart' : 'table')}
                aria-expanded={showTable}
                aria-controls={panelId}
              >
                {showTable ? (
                  <BarChart3 aria-hidden="true" />
                ) : (
                  <Table2 aria-hidden="true" />
                )}
                <span>{showTable ? 'Chart' : 'Table'}</span>
              </button>
            ) : null}
          </div>
        </figcaption>
      ) : null}

      {legend}

      <div
        id={panelId}
        className={`chart-frame__body${isLoading ? ' chart-frame__body--loading' : ''}`}
      >
        {isEmpty ? (
          <p className="chart-frame__empty">{emptyLabel}</p>
        ) : showTable ? (
          table
        ) : (
          children
        )}
      </div>

      {footnote ? <p className="chart-frame__footnote">{footnote}</p> : null}
    </figure>
  )
}
