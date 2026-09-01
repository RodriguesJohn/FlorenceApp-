import { Check } from 'lucide-react'
import './pricing.css'

const FREE_FEATURES = [
  'Free components',
  'Free prompts',
  'Free code snippets',
]

const PRO_FEATURES = [
  'Premium components',
  'Drop-in agent prompts',
  'Code actions ready to paste',
  'New components on every launch',
]

const STUDIO_FEATURES = [
  'Full Florence access',
  'Embedded support with your team',
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

function CheckoutNotice() {
  const params = new URLSearchParams(window.location.search)
  const status = params.get('checkout')
  if (status === 'success') {
    return (
      <p className="pricing__notice" role="status">
        Payment received. Pro is unlocking on your Florence account.
      </p>
    )
  }
  if (status === 'cancel') {
    return (
      <p className="pricing__notice" role="status">
        Checkout was canceled. No charge was made.
      </p>
    )
  }
  return null
}

export function Pricing({
  demoUrl = 'http://localhost:4721/',
  onUpgradeToPro,
}) {
  return (
    <section
      id="pricing"
      className="pricing"
      aria-labelledby="pricing-heading"
    >
      <div className="pricing__layout">
        <header className="pricing__intro">
          <h2 id="pricing-heading" className="pricing__title">
            Pricing
          </h2>
          <p className="pricing__lede">
            Start free. Pro unlocks premium drops for agent-first workflows.
            For full Florence access and embedded support, book a 15-minute
            discovery call.
          </p>
          <CheckoutNotice />
        </header>

        <article className="pricing-card">
            <span className="pricing-card__sheen" aria-hidden="true" />

            <div className="pricing-card__inner">
              <header className="pricing-card__header">
                <div className="pricing-card__tier-row">
                  <p className="pricing-card__tier">Free</p>
                </div>
                <p className="pricing-card__price">
                  <span className="pricing-card__amount">$0</span>
                  <span className="pricing-card__term">/ mo</span>
                </p>
              </header>

              <hr className="pricing-card__rule" />

              <FeatureList items={FREE_FEATURES} />

              <a
                className="btn btn--secondary btn--lg pricing-card__cta pricing-card__cta--ghost"
                href={demoUrl}
              >
                Start for free
              </a>
            </div>
          </article>

        <article className="pricing-card pricing-card--featured">
            <span className="pricing-card__glow" aria-hidden="true" />
            <span className="pricing-card__sheen" aria-hidden="true" />

            <div className="pricing-card__inner">
              <header className="pricing-card__header">
                <div className="pricing-card__tier-row">
                  <p className="pricing-card__tier">Pro</p>
                </div>
                <p className="pricing-card__price">
                  <span className="pricing-card__amount">$49</span>
                  <span className="pricing-card__term">/ mo</span>
                </p>
              </header>

              <hr className="pricing-card__rule" />

              <FeatureList items={PRO_FEATURES} />

              <button
                type="button"
                className="btn btn--primary btn--lg pricing-card__cta pricing-card__cta--featured"
                onClick={onUpgradeToPro}
              >
                Upgrade to Pro
              </button>
            </div>
          </article>

        <article className="pricing-card">
            <span className="pricing-card__sheen" aria-hidden="true" />

            <div className="pricing-card__inner">
              <header className="pricing-card__header">
                <div className="pricing-card__tier-row">
                  <p className="pricing-card__tier">Studio</p>
                  <span className="pricing-card__badge">Contact</span>
                </div>
                <p className="pricing-card__price">
                  <span className="pricing-card__amount pricing-card__amount--text">Custom</span>
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
            </div>
          </article>
      </div>
    </section>
  )
}
