import './shimmer-text.css'

const SIZES = {
  sm: 'shimmer-text--sm',
  md: 'shimmer-text--md',
  lg: 'shimmer-text--lg',
}

const NAMED_SPEED_FACTORS = {
  slow: 6,
  normal: 4,
  fast: 3,
}

function getDurationFactor(speed) {
  if (typeof speed === 'number' && Number.isFinite(speed)) {
    const multiplier = Math.min(2, Math.max(0.5, speed))
    return 4 / multiplier
  }

  return NAMED_SPEED_FACTORS[speed] ?? NAMED_SPEED_FACTORS.normal
}

export function ShimmerText({
  children = 'Working…',
  size = 'md',
  speed = 'normal',
  className = '',
  style,
  ...props
}) {
  const text = String(children)
  const characters = Array.from(text)
  const phaseSpan = Math.max(characters.length - 1, 1)
  const classes = ['shimmer-text', SIZES[size] ?? SIZES.md, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      className={classes}
      style={{ '--shimmer-duration-factor': getDurationFactor(speed), ...style }}
      aria-label={text}
      {...props}
    >
      <span className="shimmer-text__content" aria-hidden="true">
        {characters.map((character, index) => (
          <span
            className="shimmer-text__character"
            style={{ '--shimmer-phase': 1 - index / phaseSpan }}
            key={`${character}-${index}`}
          >
            {character}
          </span>
        ))}
      </span>
    </span>
  )
}
