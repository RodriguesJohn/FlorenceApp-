import { useEffect, useId, useRef } from 'react'
import {
  Check,
  CircleAlert,
  Info,
  Minus,
  TriangleAlert,
  X,
} from 'lucide-react'
import './toast.css'

const STATUSES = {
  default: 'toast--default',
  success: 'toast--success',
  warning: 'toast--warning',
  danger: 'toast--danger',
  info: 'toast--info',
}

const SIZES = {
  sm: 'toast--sm',
  md: 'toast--md',
  lg: 'toast--lg',
}

function StatusIcon({ status }) {
  if (status === 'success') {
    return <Check aria-hidden="true" />
  }

  if (status === 'warning') {
    return <TriangleAlert aria-hidden="true" />
  }

  if (status === 'danger') {
    return <CircleAlert aria-hidden="true" />
  }

  if (status === 'info') {
    return <Info aria-hidden="true" />
  }

  return <Minus aria-hidden="true" />
}

export function Toast({
  open = true,
  onOpenChange,
  title,
  description,
  status = 'default',
  size = 'md',
  duration = null,
  onClose,
  action,
  className = '',
}) {
  const titleId = useId()
  const descriptionId = useId()
  const timerRef = useRef(null)

  function handleClose() {
    onClose?.()
    onOpenChange?.(false)
  }

  useEffect(() => {
    if (!open || duration == null || duration <= 0) return undefined

    timerRef.current = window.setTimeout(() => {
      onClose?.()
      onOpenChange?.(false)
    }, duration)

    return () => {
      if (timerRef.current != null) window.clearTimeout(timerRef.current)
    }
  }, [open, duration, onClose, onOpenChange])

  if (!open) return null

  const classes = [
    'toast',
    STATUSES[status] ?? STATUSES.default,
    SIZES[size] ?? SIZES.md,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
    >
      <span className="toast__icon">
        <StatusIcon status={status} />
      </span>

      <div className="toast__content">
        {title ? (
          <p id={titleId} className="toast__title">
            {title}
          </p>
        ) : null}
        {description ? (
          <p id={descriptionId} className="toast__description">
            {description}
          </p>
        ) : null}
        {action ? <div className="toast__action">{action}</div> : null}
      </div>

      {onClose || onOpenChange ? (
        <button
          type="button"
          className="toast__close"
          aria-label="Dismiss"
          onClick={handleClose}
        >
          <X aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}
