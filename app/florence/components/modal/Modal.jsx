import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ModalCard } from '../modal-card/ModalCard.jsx'
import './modal.css'

export function Modal({
  open = false,
  onOpenChange,
  title,
  description,
  size = 'md',
  contained = false,
  dismissible = true,
  children,
  footer,
  className = '',
}) {
  const dialogRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    previouslyFocused.current = document.activeElement

    const previousOverflow = document.body.style.overflow
    if (!contained) {
      document.body.style.overflow = 'hidden'
    }

    const frame = requestAnimationFrame(() => {
      const dialog = dialogRef.current
      if (!(dialog instanceof HTMLElement)) return
      const firstFocusable = dialog.querySelector(
        '.modal-card__body input:not([disabled]), .modal-card__body textarea:not([disabled]), .modal-card__body select:not([disabled])',
      )
      if (firstFocusable instanceof HTMLElement) {
        firstFocusable.focus()
        return
      }
      dialog.focus()
    })

    function handleKeyDown(event) {
      if (!dismissible || event.key !== 'Escape') return
      event.preventDefault()
      onOpenChange?.(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      if (!contained) {
        document.body.style.overflow = previousOverflow
      }
      document.removeEventListener('keydown', handleKeyDown)
      if (
        previouslyFocused.current instanceof HTMLElement &&
        document.contains(previouslyFocused.current)
      ) {
        previouslyFocused.current.focus()
      }
    }
  }, [dismissible, open, onOpenChange, contained])

  if (!open) return null

  const tree = (
    <div
      className={['modal-root', contained ? 'modal-root--contained' : '']
        .filter(Boolean)
        .join(' ')}
    >
      {!contained ? (
        dismissible ? (
          <button
            type="button"
            className="modal__scrim"
            aria-label="Close dialog"
            onClick={() => onOpenChange?.(false)}
          />
        ) : (
          <div className="modal__scrim modal__scrim--locked" aria-hidden="true" />
        )
      ) : null}
      <ModalCard
        ref={dialogRef}
        role="dialog"
        aria-modal={!contained}
        tabIndex={-1}
        animated
        contained={contained}
        size={size}
        title={title}
        description={description}
        onClose={dismissible ? () => onOpenChange?.(false) : undefined}
        footer={footer}
        className={className}
      >
        {children}
      </ModalCard>
    </div>
  )

  if (contained) return tree
  if (typeof document === 'undefined') return null
  return createPortal(tree, document.body)
}
