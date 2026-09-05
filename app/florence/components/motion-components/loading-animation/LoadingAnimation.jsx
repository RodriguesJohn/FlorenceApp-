import './loading-animation.css'

const SIZES = {
  sm: 'loading-animation--sm',
  md: 'loading-animation--md',
  lg: 'loading-animation--lg',
}

const VARIANTS = {
  grid: 'loading-animation--grid',
  pulse: 'loading-animation--pulse',
  circular: 'loading-animation--circular',
}

const DOTS = Array.from({ length: 9 })

export function LoadingAnimation({
  label = 'Loading',
  size = 'md',
  variant = 'grid',
  className = '',
  ...props
}) {
  const classes = [
    'loading-animation',
    SIZES[size] ?? SIZES.md,
    VARIANTS[variant] ?? VARIANTS.grid,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      className={classes}
      role="status"
      aria-label={label}
      aria-live="polite"
      {...props}
    >
      {DOTS.map((_, index) => (
        <span
          className="loading-animation__dot"
          style={{
            '--loading-index': index,
            '--loading-phase': index / (DOTS.length - 1),
          }}
          aria-hidden="true"
          key={index}
        />
      ))}
    </span>
  )
}
