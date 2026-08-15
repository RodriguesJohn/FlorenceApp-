import { useId } from 'react'
import {
  CircleAlert,
  Lightbulb,
  Sparkles,
  TriangleAlert,
} from 'lucide-react'
import { Button } from '../button/Button.jsx'
import './insight-card.css'

/**
 * Dedicated surface for an AI recommendation or analytical insight.
 *
 * One idea per card — title states the finding, body explains why it matters,
 * and optional actions let the reader act without leaving the dashboard.
 */

const SIZES = {
  sm: 'insight-card--sm',
  md: 'insight-card--md',
  lg: 'insight-card--lg',
}

const TONES = {
  opportunity: 'insight-card--opportunity',
  warning: 'insight-card--warning',
  danger: 'insight-card--danger',
  info: 'insight-card--info',
  neutral: 'insight-card--neutral',
}

function ToneIcon({ tone }) {
  if (tone === 'warning') {
    return <TriangleAlert aria-hidden="true" />
  }

  if (tone === 'danger') {
    return <CircleAlert aria-hidden="true" />
  }

  if (tone === 'info') {
    return <Lightbulb aria-hidden="true" />
  }

  return <Sparkles aria-hidden="true" />
}

export function InsightCard({
  title,
  description,
  eyebrow = 'Insight',
  tone = 'opportunity',
  size = 'md',
  confidence,
  source,
  primaryAction,
  secondaryAction,
  onDismiss,
  className = '',
}) {
  const titleId = useId()
  const descriptionId = useId()
  const hasActions = primaryAction || secondaryAction || onDismiss

  const classes = [
    'insight-card',
    SIZES[size] ?? SIZES.md,
    TONES[tone] ?? TONES.opportunity,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article
      className={classes}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
    >
      <header className="insight-card__header">
        <span className="insight-card__eyebrow">
          <span className="insight-card__icon">
            <ToneIcon tone={tone} />
          </span>
          <span className="insight-card__eyebrow-text">{eyebrow}</span>
        </span>
        {confidence ? (
          <span className="insight-card__confidence">{confidence}</span>
        ) : null}
      </header>

      <div className="insight-card__body">
        <h3 id={titleId} className="insight-card__title">
          {title}
        </h3>
        {description ? (
          <p id={descriptionId} className="insight-card__description">
            {description}
          </p>
        ) : null}
        {source ? <p className="insight-card__source">{source}</p> : null}
      </div>

      {hasActions ? (
        <footer className="insight-card__footer">
          <div className="insight-card__actions">
            {primaryAction ? (
              <Button
                size={size === 'lg' ? 'md' : 'sm'}
                variant="primary"
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            ) : null}
            {secondaryAction ? (
              <Button
                size={size === 'lg' ? 'md' : 'sm'}
                variant="secondary"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            ) : null}
          </div>
          {onDismiss ? (
            <button
              type="button"
              className="insight-card__dismiss"
              onClick={onDismiss}
            >
              Dismiss
            </button>
          ) : null}
        </footer>
      ) : null}
    </article>
  )
}
