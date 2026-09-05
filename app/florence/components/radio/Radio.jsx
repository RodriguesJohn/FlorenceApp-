import { createContext, useContext, useId, useState } from 'react'
import './radio.css'

const SIZES = {
  sm: 'radio-group--sm',
  md: 'radio-group--md',
  lg: 'radio-group--lg',
}

const RadioGroupContext = createContext(null)

export function RadioGroup({
  label,
  name,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  error,
  hint,
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const generatedName = useId()
  const generatedId = useId()
  const groupName = name ?? generatedName
  const messageId = `${generatedId}-message`
  const isControlled = value !== undefined
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const selected = isControlled ? value : uncontrolledValue
  const hasError = Boolean(error)
  const message = hasError ? error : hint

  function select(next) {
    if (disabled) return
    if (!isControlled) setUncontrolledValue(next)
    onValueChange?.(next)
  }

  const classes = [
    'radio-group',
    SIZES[size] ?? SIZES.md,
    hasError ? 'radio-group--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <fieldset
      className={classes}
      disabled={disabled}
      aria-invalid={hasError || undefined}
      aria-describedby={message ? messageId : undefined}
      {...props}
    >
      {label ? <legend className="radio-group__legend">{label}</legend> : null}
      <div className="radio-group__options">
        <RadioGroupContext.Provider
          value={{
            name: groupName,
            value: selected,
            disabled,
            size,
            hasError,
            onValueChange: select,
          }}
        >
          {children}
        </RadioGroupContext.Provider>
      </div>
      {message ? (
        <p
          id={messageId}
          className={`radio-group__message${hasError ? ' radio-group__message--error' : ''}`}
        >
          {message}
        </p>
      ) : null}
    </fieldset>
  )
}

export function Radio({
  value,
  label,
  disabled = false,
  id,
  className = '',
  ...props
}) {
  const ctx = useContext(RadioGroupContext)
  const generatedId = useId()
  const controlId = id ?? generatedId

  if (!ctx) {
    throw new Error('Radio must be used inside RadioGroup')
  }

  const isDisabled = disabled || ctx.disabled
  const isChecked = ctx.value === value

  const classes = ['radio', className].filter(Boolean).join(' ')

  return (
    <label
      className={classes}
      data-checked={isChecked ? '' : undefined}
      data-disabled={isDisabled ? '' : undefined}
      htmlFor={controlId}
    >
      <input
        id={controlId}
        className="radio__input"
        type="radio"
        name={ctx.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        aria-invalid={ctx.hasError || undefined}
        onChange={() => ctx.onValueChange(value)}
        {...props}
      />
      <span className="radio__control" aria-hidden="true">
        <span className="radio__dot" />
      </span>
      {label ? <span className="radio__label">{label}</span> : null}
    </label>
  )
}
