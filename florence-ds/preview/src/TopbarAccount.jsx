import {
  MASTERCLASS_ARIA,
  MASTERCLASS_DATE_LABEL,
  MASTERCLASS_URL,
} from '../../../src/v2/workshop-timing.js'
import { WorkshopCountdown } from '../../../src/v2/WorkshopCountdown.jsx'

export function TopbarAccount() {
  return (
    <a
      className="topbar__masterclass"
      href={MASTERCLASS_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={MASTERCLASS_ARIA}
    >
      <span className="topbar__masterclass-date">{MASTERCLASS_DATE_LABEL}</span>
      <WorkshopCountdown className="is-florence-topbar" label="Starts in" />
      <span className="btn btn--primary btn--md topbar__btn topbar__btn--upgrade">
        <span className="btn__label">Join the free masterclass</span>
      </span>
    </a>
  )
}
