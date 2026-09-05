import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import './select.css'

const SIZES = {
  sm: 'select-field--sm',
  md: 'select-field--md',
  lg: 'select-field--lg',
}

export function Select({
  label,
  hint,
  error,
  size = 'md',
  id,
  disabled = false,
  options = [],
  placeholder = 'Select an option',
  value,
  defaultValue = '',
  onValueChange,
  className = '',
}) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const listboxId = `${selectId}-listbox`
  const messageId = `${selectId}-message`
  const rootRef = useRef(null)
  const listRef = useRef(null)

  const isControlled = value !== undefined
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const selectedValue = isControlled ? value : uncontrolledValue

  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const hasError = Boolean(error)
  const message = hasError ? error : hint
  const enabledOptions = options.filter((option) => !option.disabled)
  const selectedOption = options.find((option) => option.value === selectedValue)
  const displayLabel = selectedOption?.label ?? placeholder
  const hasValue = Boolean(selectedOption)

  const classes = [
    'select-field',
    SIZES[size] ?? SIZES.md,
    hasError ? 'select-field--error' : '',
    open ? 'select-field--open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  useEffect(() => {
    if (!open) return undefined

    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const selectedIndex = enabledOptions.findIndex(
      (option) => option.value === selectedValue,
    )
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
  }, [open, selectedValue, options])

  useEffect(() => {
    if (!open || activeIndex < 0) return
    const option = listRef.current?.querySelector(
      `[data-index="${activeIndex}"]`,
    )
    option?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open])

  function commit(next) {
    if (!isControlled) setUncontrolledValue(next)
    onValueChange?.(next)
    setOpen(false)
  }

  function moveActive(delta) {
    if (enabledOptions.length === 0) return
    setActiveIndex((current) => {
      const start = current < 0 ? (delta > 0 ? -1 : 0) : current
      const next =
        (start + delta + enabledOptions.length) % enabledOptions.length
      return next
    })
  }

  function handleTriggerKeyDown(event) {
    if (disabled) return

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!open) setOpen(true)
        else moveActive(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        if (!open) setOpen(true)
        else moveActive(-1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (!open) {
          setOpen(true)
        } else if (activeIndex >= 0 && enabledOptions[activeIndex]) {
          commit(enabledOptions[activeIndex].value)
        }
        break
      case 'Home':
        if (open) {
          event.preventDefault()
          setActiveIndex(0)
        }
        break
      case 'End':
        if (open) {
          event.preventDefault()
          setActiveIndex(enabledOptions.length - 1)
        }
        break
      case 'Escape':
        if (open) {
          event.preventDefault()
          setOpen(false)
        }
        break
      default:
        break
    }
  }

  return (
    <div className={classes} ref={rootRef}>
      {label ? (
        <label className="select-field__label" id={`${selectId}-label`}>
          {label}
        </label>
      ) : null}

      <div className="select-field__shell">
        <button
          id={selectId}
          type="button"
          className="select-field__control"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-labelledby={label ? `${selectId}-label` : undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          onClick={() => {
            if (!disabled) setOpen((current) => !current)
          }}
          onKeyDown={handleTriggerKeyDown}
        >
          <span
            className={`select-field__value${hasValue ? '' : ' select-field__value--placeholder'}`}
          >
            {displayLabel}
          </span>
          <span className="select-field__chevron" aria-hidden="true">
            <ChevronDown />
          </span>
        </button>

        {open ? (
          <ul
            ref={listRef}
            id={listboxId}
            className="select-field__menu"
            role="listbox"
            aria-labelledby={label ? `${selectId}-label` : undefined}
            tabIndex={-1}
          >
            {options.map((option) => {
              const enabledIndex = enabledOptions.findIndex(
                (item) => item.value === option.value,
              )
              const isSelected = option.value === selectedValue
              const isActive =
                !option.disabled && enabledIndex === activeIndex

              return (
                <li
                  key={option.value}
                  id={`${selectId}-option-${option.value}`}
                  className={[
                    'select-field__option',
                    isSelected ? 'is-selected' : '',
                    isActive ? 'is-active' : '',
                    option.disabled ? 'is-disabled' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled || undefined}
                  data-index={option.disabled ? undefined : enabledIndex}
                  onMouseEnter={() => {
                    if (!option.disabled) setActiveIndex(enabledIndex)
                  }}
                  onClick={() => {
                    if (!option.disabled) commit(option.value)
                  }}
                >
                  <span className="select-field__option-label">
                    {option.label}
                  </span>
                  {isSelected ? (
                    <span className="select-field__option-check" aria-hidden="true">
                      <Check />
                    </span>
                  ) : null}
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>

      {message ? (
        <p
          id={messageId}
          className={`select-field__message${hasError ? ' select-field__message--error' : ''}`}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
