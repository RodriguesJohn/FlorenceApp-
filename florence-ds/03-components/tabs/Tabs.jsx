import {
  createContext,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import './tabs.css'

const SIZES = {
  sm: 'tabs--sm',
  md: 'tabs--md',
  lg: 'tabs--lg',
}

const VARIANTS = {
  segmented: 'tabs--segmented',
  line: 'tabs--line',
}

const TabsContext = createContext(null)

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  size = 'md',
  variant = 'segmented',
  className = '',
  children,
  ...props
}) {
  const baseId = useId()
  const isControlled = value !== undefined
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const selected = isControlled ? value : uncontrolledValue
  const triggersRef = useRef([])

  function select(next) {
    if (!isControlled) setUncontrolledValue(next)
    onValueChange?.(next)
  }

  const classes = [
    'tabs',
    SIZES[size] ?? SIZES.md,
    VARIANTS[variant] ?? VARIANTS.segmented,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      <TabsContext.Provider
        value={{
          baseId,
          selected,
          size,
          variant,
          select,
          triggersRef,
        }}
      >
        {children}
      </TabsContext.Provider>
    </div>
  )
}

export function TabsList({ className = '', children, ...props }) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabsList must be used inside Tabs')

  const listRef = useRef(null)
  const [indicator, setIndicator] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    ready: false,
  })

  useLayoutEffect(() => {
    function updateIndicator() {
      const list = listRef.current
      if (!list) return

      const active = ctx.triggersRef.current.find(
        (node) => node && node.dataset.value === ctx.selected,
      )
      if (!active) {
        setIndicator((current) => ({ ...current, ready: false }))
        return
      }

      setIndicator({
        left: active.offsetLeft,
        top: active.offsetTop,
        width: active.offsetWidth,
        height: active.offsetHeight,
        ready: true,
      })
    }

    updateIndicator()

    const resizeObserver = new ResizeObserver(updateIndicator)
    if (listRef.current) resizeObserver.observe(listRef.current)
    ctx.triggersRef.current.forEach((node) => {
      if (node) resizeObserver.observe(node)
    })

    window.addEventListener('resize', updateIndicator)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateIndicator)
    }
  }, [ctx.selected, ctx.size, ctx.variant, children])

  function handleKeyDown(event) {
    const triggers = ctx.triggersRef.current.filter(Boolean)
    if (triggers.length === 0) return

    const currentIndex = triggers.findIndex(
      (node) => node === document.activeElement,
    )
    if (currentIndex < 0) return

    let nextIndex = currentIndex

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        nextIndex = (currentIndex + 1) % triggers.length
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        nextIndex = (currentIndex - 1 + triggers.length) % triggers.length
        break
      case 'Home':
        event.preventDefault()
        nextIndex = 0
        break
      case 'End':
        event.preventDefault()
        nextIndex = triggers.length - 1
        break
      default:
        return
    }

    const next = triggers[nextIndex]
    next?.focus()
    const value = next?.dataset.value
    if (value) ctx.select(value)
  }

  return (
    <div
      ref={listRef}
      className={['tabs__list', className].filter(Boolean).join(' ')}
      role="tablist"
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span
        className="tabs__indicator"
        data-ready={indicator.ready ? '' : undefined}
        aria-hidden="true"
        style={{
          transform: `translate3d(${indicator.left}px, ${ctx.variant === 'line' ? 0 : indicator.top}px, 0)`,
          width: `${indicator.width}px`,
          ...(ctx.variant === 'line'
            ? {}
            : { height: `${indicator.height}px` }),
        }}
      />
      {children}
    </div>
  )
}

export function TabsTrigger({
  value,
  disabled = false,
  className = '',
  children,
  ...props
}) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabsTrigger must be used inside Tabs')

  const isSelected = ctx.selected === value
  const triggerId = `${ctx.baseId}-trigger-${value}`
  const panelId = `${ctx.baseId}-panel-${value}`

  return (
    <button
      id={triggerId}
      type="button"
      role="tab"
      className={['tabs__trigger', className].filter(Boolean).join(' ')}
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      data-value={value}
      data-state={isSelected ? 'active' : 'inactive'}
      ref={(node) => {
        if (!node) {
          ctx.triggersRef.current = ctx.triggersRef.current.filter(Boolean)
          return
        }
        const existing = ctx.triggersRef.current.findIndex(
          (item) => item?.dataset.value === value,
        )
        if (existing >= 0) ctx.triggersRef.current[existing] = node
        else ctx.triggersRef.current.push(node)
      }}
      onClick={() => {
        if (!disabled) ctx.select(value)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, className = '', children, ...props }) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabsContent must be used inside Tabs')

  const isSelected = ctx.selected === value
  if (!isSelected) return null

  const triggerId = `${ctx.baseId}-trigger-${value}`
  const panelId = `${ctx.baseId}-panel-${value}`

  return (
    <div
      id={panelId}
      role="tabpanel"
      className={['tabs__content', className].filter(Boolean).join(' ')}
      aria-labelledby={triggerId}
      tabIndex={0}
      data-state="active"
      {...props}
    >
      {children}
    </div>
  )
}
