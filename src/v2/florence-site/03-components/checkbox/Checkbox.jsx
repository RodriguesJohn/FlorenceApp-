import { createContext, useContext, useEffect, useId, useRef, useState } from 'react'
import { Check, Minus } from 'lucide-react'
import './checkbox.css'

const SIZES = {
  sm: 'checkbox--sm',
  md: 'checkbox--md',
  lg: 'checkbox--lg',
}

const GROUP_SIZES = {
  sm: 'checkbox-group--sm',
  md: 'checkbox-group--md',
  lg: 'checkbox-group--lg',
}

const CheckboxGroupContext = createContext(null)

export function CheckboxGroup({
  label,
  disabled = false,
  error,
  hint,
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const generatedId = useId()
  const messageId = `${generatedId}-message`
  const hasError = Boolean(error)
  const message = hasError ? error : hint

  const classes = [
    'checkbox-group',
    GROUP_SIZES[size] ?? GROUP_SIZES.md,
    hasError ? 'checkbox-group--error' : '',
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
      {label ? (
        <legend className="checkbox-group__legend">{label}</legend>
      ) : null}
      <div className="checkbox-group__options">
        <CheckboxGroupContext.Provider
          value={{ disabled, size, hasError }}
        >
          {children}
        </CheckboxGroupContext.Provider>
      </div>
      {message ? (
        <p
          id={messageId}
          className={`checkbox-group__message${hasError ? ' checkbox-group__message--error' : ''}`}
        >
          {message}
        </p>
      ) : null}
    </fieldset>
  )
}

export function Checkbox({
  label,
  checked,
  defaultChecked = false,
  indeterminate = false,
  onCheckedChange,
  disabled = false,
  error,
  hint,
  size = 'md',
  id,
  className = '',
  ...props
}) {
  const group = useContext(CheckboxGroupContext)
  const generatedId = useId()
  const controlId = id ?? generatedId
  const messageId = `${controlId}-message`
  const inputRef = useRef(null)

  const isControlled = checked !== undefined
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked)
  const isOn = isControlled ? checked : uncontrolledChecked

  const resolvedSize = group?.size ?? size
  const isDisabled = disabled || Boolean(group?.disabled)
  const hasError = Boolean(error) || Boolean(group?.hasError)
  const message = group ? null : hasError ? error : hint

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate && !isOn
    }
  }, [indeterminate, isOn])

  function handleChange(event) {
    if (isDisabled) return
    const next = event.target.checked
    if (!isControlled) setUncontrolledChecked(next)
    onCheckedChange?.(next)
  }

  const classes = [
    'checkbox',
    SIZES[resolvedSize] ?? SIZES.md,
    hasError ? 'checkbox--error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <label
        className="checkbox__row"
        data-checked={isOn ? '' : undefined}
        data-indeterminate={indeterminate && !isOn ? '' : undefined}
        data-disabled={isDisabled ? '' : undefined}
        htmlFor={controlId}
      >
        <input
          ref={inputRef}
          id={controlId}
          className="checkbox__input"
          type="checkbox"
          checked={isOn}
          disabled={isDisabled}
          aria-checked={indeterminate && !isOn ? 'mixed' : isOn}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          onChange={handleChange}
          {...props}
        />
        <span className="checkbox__control" aria-hidden="true">
          <Check className="checkbox__icon checkbox__check" />
          <Minus className="checkbox__icon checkbox__dash" />
        </span>
        {label ? <span className="checkbox__label">{label}</span> : null}
      </label>
      {message ? (
        <p
          id={messageId}
          className={`checkbox__message${hasError ? ' checkbox__message--error' : ''}`}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
