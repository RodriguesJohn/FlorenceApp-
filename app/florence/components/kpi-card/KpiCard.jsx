import { useId } from 'react'
import { ChevronDown, ChevronUp, Minus } from 'lucide-react'
import './kpi-card.css'

const SIZES = {
  sm: 'kpi-card--sm',
  md: 'kpi-card--md',
  lg: 'kpi-card--lg',
}

const TRENDS = {
  up: 'kpi-card--trend-up',
  down: 'kpi-card--trend-down',
  flat: 'kpi-card--trend-flat',
  neutral: 'kpi-card--trend-neutral',
}

function TrendIcon({ trend }) {
  if (trend === 'up') {
    return <ChevronUp aria-hidden="true" />
  }

  if (trend === 'down') {
    return <ChevronDown aria-hidden="true" />
  }

  return <Minus aria-hidden="true" />
}

export function KpiCard({
  label,
  value,
  delta,
  trend = 'neutral',
  hint,
  size = 'md',
  onClick,
  className = '',
}) {
  const labelId = useId()
  const valueId = useId()
  const interactive = typeof onClick === 'function'
  const Tag = interactive ? 'button' : 'article'

  const classes = [
    'kpi-card',
    SIZES[size] ?? SIZES.md,
    TRENDS[trend] ?? TRENDS.neutral,
    interactive ? 'kpi-card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      className={classes}
      type={interactive ? 'button' : undefined}
      onClick={onClick}
      aria-labelledby={label && value ? `${labelId} ${valueId}` : valueId}
    >
      <header className="kpi-card__header">
        {label ? (
          <p id={labelId} className="kpi-card__label">
            {label}
          </p>
        ) : null}
      </header>

      <p id={valueId} className="kpi-card__value">
        {value}
      </p>

      {delta || hint ? (
        <footer className="kpi-card__footer">
          {delta ? (
            <span className="kpi-card__delta">
              <span className="kpi-card__delta-icon">
                <TrendIcon trend={trend} />
              </span>
              <span className="kpi-card__delta-text">{delta}</span>
            </span>
          ) : null}
          {hint ? <span className="kpi-card__hint">{hint}</span> : null}
        </footer>
      ) : null}
    </Tag>
  )
}
