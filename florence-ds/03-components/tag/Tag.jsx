import { X } from 'lucide-react'
import './tag.css'

const TONES = {
  neutral: 'tag--neutral',
  brand: 'tag--brand',
  success: 'tag--success',
  warning: 'tag--warning',
  danger: 'tag--danger',
  info: 'tag--info',
}

const SIZES = {
  sm: 'tag--sm',
  md: 'tag--md',
  lg: 'tag--lg',
}

export function Tag({
  children,
  tone = 'neutral',
  size = 'md',
  onRemove,
  removeLabel,
  disabled = false,
  className = '',
  ...props
}) {
  const classes = [
    'tag',
    TONES[tone] ?? TONES.neutral,
    SIZES[size] ?? SIZES.md,
    disabled ? 'tag--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...props}>
      <span className="tag__label">{children}</span>
      {onRemove ? (
        <button
          type="button"
          className="tag__remove"
          aria-label={removeLabel ?? `Remove ${String(children)}`}
          disabled={disabled}
          onClick={onRemove}
        >
          <X aria-hidden="true" />
        </button>
      ) : null}
    </span>
  )
}
