import { useId, useState } from 'react'
import './switch.css'

const SIZES = {
  sm: 'switch--sm',
  md: 'switch--md',
  lg: 'switch--lg',
}

export function Switch({
  label,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = 'md',
  id,
  className = '',
  ...props
}) {
  const generatedId = useId()
  const controlId = id ?? generatedId
  const isControlled = checked !== undefined
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked)
  const isOn = isControlled ? checked : uncontrolledChecked
  const [jelly, setJelly] = useState(false)
  const [prevOn, setPrevOn] = useState(isOn)

  if (isOn !== prevOn) {
    setPrevOn(isOn)
    setJelly(true)
  }

  function toggle() {
    if (disabled) return
    const next = !isOn
    if (!isControlled) setUncontrolledChecked(next)
    onCheckedChange?.(next)
  }

  const classes = ['switch', SIZES[size] ?? SIZES.md, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {label ? (
        <label className="switch__label" htmlFor={controlId}>
          {label}
        </label>
      ) : null}
      <button
        id={controlId}
        type="button"
        className="switch__control"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        data-jelly={jelly ? '' : undefined}
        onClick={toggle}
        {...props}
      >
        <span className="switch__thumb" aria-hidden="true" />
      </button>
    </div>
  )
}
