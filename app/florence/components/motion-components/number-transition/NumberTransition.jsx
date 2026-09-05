import { useLayoutEffect, useState } from 'react'
import './number-transition.css'

const SIZES = {
  sm: 'number-transition--sm',
  md: 'number-transition--md',
  lg: 'number-transition--lg',
}

function visibleCharacter(character) {
  return character === ' ' ? '\u00a0' : character
}

export function NumberTransition({
  value,
  format,
  size = 'md',
  label,
  className = '',
  ...props
}) {
  const formattedValue = String(format ? format(value) : value)
  const numericValue = Number(value)
  const [frame, setFrame] = useState(() => ({
    previous: formattedValue,
    current: formattedValue,
    currentValue: numericValue,
    direction: 'up',
    id: 0,
  }))

  useLayoutEffect(() => {
    setFrame((current) => {
      if (current.current === formattedValue) return current

      return {
        previous: current.current,
        current: formattedValue,
        currentValue: numericValue,
        direction:
          Number.isFinite(numericValue) &&
          Number.isFinite(current.currentValue) &&
          numericValue < current.currentValue
            ? 'down'
            : 'up',
        id: current.id + 1,
      }
    })
  }, [formattedValue, numericValue])

  const length = Math.max(frame.previous.length, frame.current.length)
  const previousCharacters = frame.previous.padStart(length, ' ').split('')
  const currentCharacters = frame.current.padStart(length, ' ').split('')
  const classes = [
    'number-transition',
    SIZES[size] ?? SIZES.md,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      className={classes}
      aria-label={label ?? formattedValue}
      aria-live="polite"
      {...props}
    >
      <span className="number-transition__content" aria-hidden="true">
        {currentCharacters.map((character, index) => {
          const previousCharacter = previousCharacters[index]
          const changed = previousCharacter !== character

          return (
            <span
              className={`number-transition__cell${changed ? ' is-changing' : ''}`}
              data-direction={frame.direction}
              key={`${frame.id}-${index}`}
            >
              {changed ? (
                <span className="number-transition__old">
                  {visibleCharacter(previousCharacter)}
                </span>
              ) : null}
              <span className="number-transition__new">
                {visibleCharacter(character)}
              </span>
            </span>
          )
        })}
      </span>
    </span>
  )
}
