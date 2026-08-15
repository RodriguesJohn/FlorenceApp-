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
      dialogRef.current?.focus()
    })

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onOpenChange?.(false)
      }
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
  }, [open, onOpenChange, contained])

  if (!open) return null

  const tree = (
    <div
      className={['modal-root', contained ? 'modal-root--contained' : '']
        .filter(Boolean)
        .join(' ')}
    >
      {!contained ? (
        <button
          type="button"
          className="modal__scrim"
          aria-label="Close dialog"
          onClick={() => onOpenChange?.(false)}
        />
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
        onClose={() => onOpenChange?.(false)}
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
