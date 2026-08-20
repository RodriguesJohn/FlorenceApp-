import { useId } from 'react'
import './sidebar.css'

function classes(...names) {
  return names.filter(Boolean).join(' ')
}

export function Sidebar({
  children,
  className = '',
  'aria-label': ariaLabel = 'Sidebar',
  ...props
}) {
  return (
    <aside
      className={classes('ds-sidebar', className)}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({ children, className = '', ...props }) {
  return (
    <div className={classes('ds-sidebar__header', className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarNav({
  children,
  className = '',
  'aria-label': ariaLabel = 'Primary navigation',
  ...props
}) {
  return (
    <nav
      className={classes('ds-sidebar__nav', className)}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </nav>
  )
}

export function SidebarSection({
  children,
  label,
  className = '',
  ...props
}) {
  const generatedId = useId()
  const labelId = label ? generatedId : undefined

  return (
    <section
      className={classes('ds-sidebar__section', className)}
      aria-labelledby={labelId}
      {...props}
    >
      {label ? (
        <h2 id={labelId} className="ds-sidebar__section-label">
          {label}
        </h2>
      ) : null}
      <div className="ds-sidebar__items">{children}</div>
    </section>
  )
}

export function SidebarItem({
  children,
  icon,
  disclosure,
  badge,
  active = false,
  disabled = false,
  href,
  className = '',
  onClick,
  ...props
}) {
  const itemClassName = classes(
    'ds-sidebar__item',
    active && 'ds-sidebar__item--active',
    disabled && 'ds-sidebar__item--disabled',
    className,
  )

  const content = (
    <>
      {icon ? (
        <span className="ds-sidebar__item-icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="ds-sidebar__item-label">{children}</span>
      {badge != null ? (
        <span className="ds-sidebar__item-badge">{badge}</span>
      ) : null}
      {disclosure ? (
        <span className="ds-sidebar__item-disclosure" aria-hidden="true">
          {disclosure}
        </span>
      ) : null}
    </>
  )

  if (href) {
    return (
      <a
        className={itemClassName}
        href={disabled ? undefined : href}
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? undefined : onClick}
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={itemClassName}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  )
}

export function SidebarSubmenu({ children, className = '', ...props }) {
  return (
    <div className={classes('ds-sidebar__submenu', className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarFooter({ children, className = '', ...props }) {
  return (
    <div className={classes('ds-sidebar__footer', className)} {...props}>
      {children}
    </div>
  )
}
