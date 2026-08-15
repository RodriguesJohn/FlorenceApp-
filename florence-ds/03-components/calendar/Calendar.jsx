import { useEffect, useId, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './calendar.css'

const SIZES = {
  sm: 'calendar--sm',
  md: 'calendar--md',
  lg: 'calendar--lg',
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function isSameDay(a, b) {
  return (
    a != null &&
    b != null &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function dateKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function compareDays(a, b) {
  return startOfDay(a).getTime() - startOfDay(b).getTime()
}

function addDays(date, amount) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)
}

function addMonths(date, amount) {
  const targetMonth = date.getMonth() + amount
  const targetYear = date.getFullYear() + Math.floor(targetMonth / 12)
  const normalizedMonth = ((targetMonth % 12) + 12) % 12
  const lastDay = new Date(targetYear, normalizedMonth + 1, 0).getDate()

  return new Date(targetYear, normalizedMonth, Math.min(date.getDate(), lastDay))
}

function buildWeeks(viewYear, viewMonth) {
  const firstDay = new Date(viewYear, viewMonth, 1)
  const gridStart = new Date(viewYear, viewMonth, 1 - firstDay.getDay())

  const weeks = []
  const cursor = new Date(gridStart)

  for (let week = 0; week < 6; week += 1) {
    const days = []
    for (let day = 0; day < 7; day += 1) {
      days.push(new Date(cursor))
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(days)
  }

  return weeks
}

function ChevronIcon({ direction }) {
  return direction === 'left' ? (
    <ChevronLeft aria-hidden="true" />
  ) : (
    <ChevronRight aria-hidden="true" />
  )
}

export function Calendar({
  value,
  defaultValue = null,
  onValueChange,
  size = 'md',
  disabled = false,
  minDate,
  maxDate,
  isDateDisabled,
  className = '',
}) {
  const headingId = useId()
  const dayRefs = useRef(new Map())
  const shouldRestoreFocus = useRef(false)

  const isControlled = value !== undefined
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ? startOfDay(defaultValue) : null,
  )
  const selected = isControlled
    ? value
      ? startOfDay(value)
      : null
    : uncontrolledValue

  const today = startOfDay(new Date())
  const initialView = selected ?? today
  const [viewYear, setViewYear] = useState(initialView.getFullYear())
  const [viewMonth, setViewMonth] = useState(initialView.getMonth())
  const [focusedDate, setFocusedDate] = useState(selected ?? today)

  const weeks = buildWeeks(viewYear, viewMonth)
  const normalizedMin = minDate ? startOfDay(minDate) : null
  const normalizedMax = maxDate ? startOfDay(maxDate) : null
  const previousMonthUnavailable =
    normalizedMin &&
    compareDays(new Date(viewYear, viewMonth, 0), normalizedMin) < 0
  const nextMonthUnavailable =
    normalizedMax &&
    compareDays(new Date(viewYear, viewMonth + 1, 1), normalizedMax) > 0

  function dateIsDisabled(day) {
    return (
      disabled ||
      (normalizedMin && compareDays(day, normalizedMin) < 0) ||
      (normalizedMax && compareDays(day, normalizedMax) > 0) ||
      Boolean(isDateDisabled?.(day))
    )
  }

  function showDate(day) {
    setFocusedDate(day)
    if (day.getFullYear() !== viewYear || day.getMonth() !== viewMonth) {
      shouldRestoreFocus.current = true
      setViewYear(day.getFullYear())
      setViewMonth(day.getMonth())
    }
  }

  function findAvailableDate(start, step, includeStart = true) {
    let candidate = includeStart ? start : addDays(start, step)

    for (let attempts = 0; attempts < 3660; attempts += 1) {
      if (!dateIsDisabled(candidate)) return candidate
      candidate = addDays(candidate, step)

      if (
        (normalizedMin && compareDays(candidate, normalizedMin) < 0) ||
        (normalizedMax && compareDays(candidate, normalizedMax) > 0)
      ) {
        return null
      }
    }

    return null
  }

  useEffect(() => {
    const activeDate =
      !dateIsDisabled(focusedDate)
        ? focusedDate
        : findAvailableDate(new Date(viewYear, viewMonth, 1), 1)

    if (!activeDate) return

    if (!isSameDay(activeDate, focusedDate)) {
      setFocusedDate(activeDate)
      return
    }

    if (shouldRestoreFocus.current) {
      dayRefs.current.get(dateKey(activeDate))?.focus()
      shouldRestoreFocus.current = false
    }
  }, [viewMonth, viewYear])

  useEffect(() => {
    if (!selected || dateIsDisabled(selected)) return
    setFocusedDate(selected)
    setViewYear(selected.getFullYear())
    setViewMonth(selected.getMonth())
  }, [value])

  function moveMonth(offset) {
    const next = new Date(viewYear, viewMonth + offset, 1)
    setViewYear(next.getFullYear())
    setViewMonth(next.getMonth())

    const preferred = addMonths(focusedDate, offset)
    const available =
      findAvailableDate(preferred, offset > 0 ? 1 : -1) ??
      findAvailableDate(preferred, offset > 0 ? -1 : 1)

    if (available) setFocusedDate(available)
  }

  function selectDay(day) {
    if (dateIsDisabled(day)) return
    if (!isControlled) setUncontrolledValue(day)
    onValueChange?.(day)
    showDate(day)
  }

  function moveFocus(target, step) {
    const available =
      findAvailableDate(target, step) ?? findAvailableDate(target, -step)
    if (available) {
      showDate(available)
      if (
        available.getFullYear() === viewYear &&
        available.getMonth() === viewMonth
      ) {
        dayRefs.current.get(dateKey(available))?.focus()
      }
    }
  }

  function handleDayKeyDown(event, day) {
    let target = null
    let step = 1

    switch (event.key) {
      case 'ArrowLeft':
        target = addDays(day, -1)
        step = -1
        break
      case 'ArrowRight':
        target = addDays(day, 1)
        break
      case 'ArrowUp':
        target = addDays(day, -7)
        step = -1
        break
      case 'ArrowDown':
        target = addDays(day, 7)
        break
      case 'Home':
        target = addDays(day, -day.getDay())
        break
      case 'End':
        target = addDays(day, 6 - day.getDay())
        step = -1
        break
      case 'PageUp':
        target = addMonths(day, event.shiftKey ? -12 : -1)
        step = -1
        break
      case 'PageDown':
        target = addMonths(day, event.shiftKey ? 12 : 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        selectDay(day)
        return
      default:
        return
    }

    event.preventDefault()
    moveFocus(target, step)
  }

  const classes = [
    'calendar',
    SIZES[size] ?? SIZES.md,
    disabled ? 'calendar--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} aria-labelledby={headingId}>
      <header className="calendar__header">
        <button
          type="button"
          className="calendar__nav"
          aria-label="Previous month"
          disabled={disabled || previousMonthUnavailable}
          onClick={() => moveMonth(-1)}
        >
          <ChevronIcon direction="left" />
        </button>
        <span id={headingId} className="calendar__heading" aria-live="polite">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          className="calendar__nav"
          aria-label="Next month"
          disabled={disabled || nextMonthUnavailable}
          onClick={() => moveMonth(1)}
        >
          <ChevronIcon direction="right" />
        </button>
      </header>

      <div className="calendar__weekdays" aria-hidden="true">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday} className="calendar__weekday">
            {weekday}
          </span>
        ))}
      </div>

      <div className="calendar__grid" role="grid" aria-labelledby={headingId}>
        {weeks.map((week) => (
          <div
            key={dateKey(week[0])}
            className="calendar__week"
            role="row"
          >
            {week.map((day) => {
            const outside = day.getMonth() !== viewMonth
            const isToday = isSameDay(day, today)
            const isSelected = isSameDay(day, selected)
            const unavailable = dateIsDisabled(day)
            const isFocused = isSameDay(day, focusedDate)

            const dayClasses = [
              'calendar__day',
              outside ? 'calendar__day--outside' : '',
              isToday ? 'calendar__day--today' : '',
              isSelected ? 'calendar__day--selected' : '',
              unavailable ? 'calendar__day--disabled' : '',
            ]
              .filter(Boolean)
              .join(' ')

              return (
                <span key={dateKey(day)} role="gridcell">
                  <button
                    ref={(node) => {
                      const key = dateKey(day)
                      if (node) dayRefs.current.set(key, node)
                      else dayRefs.current.delete(key)
                    }}
                    type="button"
                    className={dayClasses}
                    disabled={disabled}
                    aria-disabled={unavailable}
                    aria-pressed={isSelected}
                    aria-current={isToday ? 'date' : undefined}
                    aria-label={day.toDateString()}
                    tabIndex={!unavailable && isFocused ? 0 : -1}
                    onClick={() => selectDay(day)}
                    onFocus={() => {
                      if (!unavailable) setFocusedDate(day)
                    }}
                    onKeyDown={(event) => handleDayKeyDown(event, day)}
                  >
                    {day.getDate()}
                  </button>
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
