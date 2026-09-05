import { forwardRef, useId } from 'react'
import { X } from 'lucide-react'
import './modal-card.css'

const SIZES = {
  sm: 'modal-card--sm',
  md: 'modal-card--md',
  lg: 'modal-card--lg',
}

export const ModalCard = forwardRef(function ModalCard(
  {
    title,
    description,
    size = 'md',
    onClose,
    children,
    footer,
    animated = false,
    contained = false,
    className = '',
    role = 'group',
    'aria-modal': ariaModal,
    tabIndex,
    ...rest
  },
  ref,
) {
  const titleId = useId()
  const descriptionId = useId()

  const classes = [
    'modal-card',
    SIZES[size] ?? SIZES.md,
    animated ? 'modal-card--animated' : '',
    contained ? 'modal-card--contained' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={ref}
      className={classes}
      role={role}
      aria-modal={ariaModal}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      tabIndex={tabIndex}
      {...rest}
    >
      <header className="modal-card__header">
        <div className="modal-card__heading">
          {title ? (
            <h2 id={titleId} className="modal-card__title">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p id={descriptionId} className="modal-card__description">
              {description}
            </p>
          ) : null}
        </div>
        {onClose ? (
          <button
            type="button"
            className="modal-card__close"
            aria-label="Close"
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </button>
        ) : null}
      </header>

      {children ? <div className="modal-card__body">{children}</div> : null}

      {footer ? <footer className="modal-card__footer">{footer}</footer> : null}
    </div>
  )
})
