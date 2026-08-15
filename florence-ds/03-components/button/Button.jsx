import './button.css'

const VARIANTS = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  tertiary: 'btn--tertiary',
  danger: 'btn--danger',
}

const SIZES = {
  sm: 'btn--sm',
  md: 'btn--md',
  lg: 'btn--lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'btn',
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  )
}
