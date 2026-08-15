import './timeline.css'

const STATUSES = ['now', 'next', 'later']

function headingTag(level) {
  if (level === 2) return 'h2'
  if (level === 4) return 'h4'
  return 'h3'
}

export function Timeline({
  items = [],
  label,
  headingLevel = 3,
  className = '',
}) {
  if (!items.length) return null

  const TitleTag = headingTag(headingLevel)

  return (
    <ol
      className={['timeline', className].filter(Boolean).join(' ')}
      aria-label={label}
    >
      {items.map((item, index) => {
        const status = STATUSES.includes(item.status) ? item.status : 'next'

        return (
          <li
            key={item.id ?? item.title ?? index}
            className={`timeline__step timeline__step--${status}`}
          >
            <span className="timeline__rail" aria-hidden="true">
              <span className="timeline__dot" />
              {index < items.length - 1 ? (
                <span className="timeline__line" />
              ) : null}
            </span>
            <div className="timeline__copy">
              {item.phase ? (
                <p className="timeline__phase">{item.phase}</p>
              ) : null}
              {item.title ? (
                <TitleTag className="timeline__title">{item.title}</TitleTag>
              ) : null}
              {item.body ? (
                <p className="timeline__body">{item.body}</p>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
