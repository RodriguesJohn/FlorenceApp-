import { AnimatePresence, motion } from 'motion/react'
import { useChartMotion } from './chartMotion.js'
import './chart-tooltip.css'

/**
 * The hover readout.
 *
 * Values lead and labels follow — the legend's hierarchy inverted, because by
 * the time a reader is hovering they already know the series and want the
 * number. Series are keyed with a short stroke rather than a filled box: at
 * this density a box is data-weight ink doing a label's job.
 *
 * Labels arrive from user data, so they are rendered as React children (text
 * nodes), never assembled into markup.
 */
export function ChartTooltip({ title, rows, x, y, containerWidth, align = 'auto' }) {
  const motionConfig = useChartMotion()

  const flip =
    align === 'left' ? true : align === 'right' ? false : x > containerWidth * 0.6

  return (
    <AnimatePresence mode="popLayout">
      {rows?.length ? (
        <motion.div
          key="chart-tooltip"
          className="chart-tooltip"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{
            opacity: 1,
            scale: 1,
            left: x,
            top: y,
            x: flip
              ? 'calc(-100% - var(--space-inline-sm))'
              : 'var(--space-inline-sm)',
            y: '-50%',
          }}
          exit={{ opacity: 0, scale: 0.98, transition: motionConfig.hide }}
          transition={{
            opacity: motionConfig.reveal,
            scale: motionConfig.reveal,
            left: motionConfig.follow,
            top: motionConfig.follow,
            x: motionConfig.follow,
          }}
        >
          {title ? <p className="chart-tooltip__title">{title}</p> : null}
          <ul className="chart-tooltip__rows">
            {rows.map((row, index) => (
              <li key={row.label ?? index} className="chart-tooltip__row">
                <span
                  className="chart-tooltip__key"
                  style={{ background: row.color }}
                  aria-hidden="true"
                />
                <span className="chart-tooltip__value">{row.value}</span>
                {row.label ? (
                  <span className="chart-tooltip__label">{row.label}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

/** Vertical hairline that snaps to the nearest data position. */
export function Crosshair({ x, top, bottom }) {
  const motionConfig = useChartMotion()

  return (
    <motion.line
      className="chart-crosshair"
      y1={top}
      y2={bottom}
      initial={false}
      animate={{ x1: x, x2: x }}
      transition={motionConfig.follow}
      aria-hidden="true"
    />
  )
}
