import { useId } from 'react'
import './input.css'

const SIZES = {
  sm: 'field--sm',
  md: 'field--md',
  lg: 'field--lg',
}

export function Input({
  label,
  hint,
  error,
  size = 'md',
  id,
  disabled = false,
  className = '',
  ...props
}) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const hasError = Boolean(error)
  const message = hasError ? error : hint
  const classes = [
    'field',
    SIZES[size] ?? SIZES.md,
    hasError ? 'field--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {label ? (
        <label className="field__label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className="field__control"
        disabled={disabled}
        aria-invalid={hasError || undefined}
        aria-describedby={message ? messageId : undefined}
        {...props}
      />
      {message ? (
        <p
          id={messageId}
          className={`field__message${hasError ? ' field__message--error' : ''}`}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
