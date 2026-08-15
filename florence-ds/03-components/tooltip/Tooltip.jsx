import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import './tooltip.css'

const SIDES = {
  top: 'tooltip__bubble--top',
  bottom: 'tooltip__bubble--bottom',
  left: 'tooltip__bubble--left',
  right: 'tooltip__bubble--right',
}

export function Tooltip({
  content,
  side = 'top',
  delay = 150,
  open: controlledOpen,
  disabled = false,
  children,
  className = '',
}) {
  const tooltipId = useId()
  const timerRef = useRef(null)

  const isControlled = controlledOpen !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const open = !disabled && (isControlled ? controlledOpen : uncontrolledOpen)

  function clearTimer() {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function show(immediate = false) {
    if (disabled || isControlled) return
    clearTimer()
    if (immediate || delay <= 0) {
      setUncontrolledOpen(true)
      return
    }
    timerRef.current = window.setTimeout(() => {
      setUncontrolledOpen(true)
    }, delay)
  }

  function hide() {
    if (isControlled) return
    clearTimer()
    setUncontrolledOpen(false)
  }

  useEffect(() => clearTimer, [])

  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') hide()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const trigger = isValidElement(children)
    ? cloneElement(children, {
        'aria-describedby': open ? tooltipId : undefined,
      })
    : children

  const bubbleClasses = [
    'tooltip__bubble',
    SIDES[side] ?? SIDES.top,
    open ? 'tooltip__bubble--open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      className={['tooltip', className].filter(Boolean).join(' ')}
      onPointerEnter={() => show()}
      onPointerLeave={hide}
      onFocus={() => show(true)}
      onBlur={hide}
    >
      {trigger}
      <span id={tooltipId} role="tooltip" className={bubbleClasses}>
        {content}
        <span className="tooltip__arrow" aria-hidden="true" />
      </span>
    </span>
  )
}
