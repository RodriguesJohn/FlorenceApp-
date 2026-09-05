export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="layout-header page-header">
      <div>
        {eyebrow ? <p className="page-header__eyebrow">{eyebrow}</p> : null}
        <h1 className="page-header__title">{title}</h1>
        {description ? <p className="page-header__meta">{description}</p> : null}
      </div>
      {actions ? <div className="layout-header__actions">{actions}</div> : null}
    </header>
  )
}
