import { ArrowUpRight, Check } from 'lucide-react'
import { WorkshopCountdown } from '../../WorkshopCountdown.jsx'
import {
  MASTERCLASS_ARIA,
  MASTERCLASS_DATE_LABEL,
  MASTERCLASS_URL,
} from '../../workshop-timing.js'
import './pricing.css'

const MASTERCLASS_FEATURES = [
  'What an AI-ready design system actually is',
  'Live look at Florence',
  '45 minutes, no pitch for a subscription',
]

const STUDIO_FEATURES = [
  'Custom design system for your product',
  'Embedded with your team',
  'Audits, implementation, and foundations',
  '15-minute discovery call',
]

const BOOKING_URL = 'https://cal.com/john-rodrigues-rqt2lg/15min'

function FeatureList({ items }) {
  return (
    <ul className="pricing-card__features">
      {items.map((item) => (
        <li key={item}>
          <Check className="pricing-card__check" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function Pricing({ demoUrl = '/florence/system' }) {
  return (
    <section
      id="pricing"
      className="pricing"
      aria-labelledby="pricing-heading"
    >
      <div className="pricing__layout">
        <header className="pricing__intro">
          <h2 id="pricing-heading" className="pricing__title">
            Next
          </h2>
          <p className="pricing__lede">
            Florence is a showcase. Join the free masterclass, or book a call
            if you need a custom system for your team.
          </p>
        </header>

        <article className="pricing-card pricing-card--featured">
            <span className="pricing-card__glow" aria-hidden="true" />
            <span className="pricing-card__sheen" aria-hidden="true" />

            <div className="pricing-card__inner">
              <header className="pricing-card__header">
                <div className="pricing-card__tier-row">
                  <p className="pricing-card__tier">Masterclass</p>
                  <span className="pricing-card__badge">Free</span>
                </div>
                <p className="pricing-card__price">
                  <span className="pricing-card__amount pricing-card__amount--text">
                    {MASTERCLASS_DATE_LABEL}
                  </span>
                </p>
                <WorkshopCountdown className="is-florence-pricing" label="Starts in" />
              </header>

              <hr className="pricing-card__rule" />

              <FeatureList items={MASTERCLASS_FEATURES} />

              <a
                className="btn btn--primary btn--lg pricing-card__cta pricing-card__cta--featured"
                href={MASTERCLASS_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={MASTERCLASS_ARIA}
              >
                Join the free masterclass
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </article>

        <article className="pricing-card">
            <span className="pricing-card__sheen" aria-hidden="true" />

            <div className="pricing-card__inner">
              <header className="pricing-card__header">
                <div className="pricing-card__tier-row">
                  <p className="pricing-card__tier">Studio</p>
                  <span className="pricing-card__badge">Custom</span>
                </div>
                <p className="pricing-card__price">
                  <span className="pricing-card__amount pricing-card__amount--text">Project</span>
                </p>
              </header>

              <hr className="pricing-card__rule" />

              <FeatureList items={STUDIO_FEATURES} />

              <a
                className="btn btn--secondary btn--lg pricing-card__cta pricing-card__cta--ghost"
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
              >
                Book a discovery call
              </a>
              <a className="pricing-card__demo" href={demoUrl}>
                Or browse the Florence showcase
              </a>
            </div>
          </article>
      </div>
    </section>
  )
}
