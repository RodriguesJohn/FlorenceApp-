import { useId } from 'react'
import './textarea.css'

const SIZES = {
  sm: 'textarea-field--sm',
  md: 'textarea-field--md',
  lg: 'textarea-field--lg',
}

export function Textarea({
  label,
  hint,
  error,
  size = 'md',
  id,
  disabled = false,
  rows,
  className = '',
  ...props
}) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const messageId = `${textareaId}-message`
  const hasError = Boolean(error)
  const message = hasError ? error : hint
  const classes = [
    'textarea-field',
    SIZES[size] ?? SIZES.md,
    hasError ? 'textarea-field--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {label ? (
        <label className="textarea-field__label" htmlFor={textareaId}>
          {label}
        </label>
      ) : null}
      <textarea
        id={textareaId}
        className="textarea-field__control"
        disabled={disabled}
        rows={rows}
        aria-invalid={hasError || undefined}
        aria-describedby={message ? messageId : undefined}
        {...props}
      />
      {message ? (
        <p
          id={messageId}
          className={`textarea-field__message${hasError ? ' textarea-field__message--error' : ''}`}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
