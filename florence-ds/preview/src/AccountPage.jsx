import { Button } from '../../03-components/button/Button.jsx'
import { useFlorenceAuth } from './FlorenceAuth.jsx'
import './account-page.css'

export function AccountPage() {
  const { user, isPro, signOut, setCheckoutOpen, openAccount } = useFlorenceAuth()
  const meta = user?.user_metadata ?? {}
  const email = user?.email || '—'
  const username =
    meta.username || (email.includes('@') ? email.split('@')[0] : '—')
  const name = meta.full_name || meta.name || username

  return (
    <div className="content-block">
      <header className="hero">
        <h1>Settings</h1>
        <p className="lede">Your profile and Florence subscription.</p>
      </header>

      <div className="layout-container-sm account-page">
        <section className="account-page__card" aria-labelledby="account-profile-heading">
          <h2 id="account-profile-heading" className="account-page__heading">
            Profile
          </h2>
          <dl className="account-page__details">
            <div>
              <dt>Name</dt>
              <dd>{name}</dd>
            </div>
            <div>
              <dt>Username</dt>
              <dd>{username}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{email}</dd>
            </div>
            <div>
              <dt>Florence plan</dt>
              <dd>{isPro ? 'Pro' : 'Free'}</dd>
            </div>
          </dl>
        </section>

        <section className="account-page__card" aria-labelledby="account-billing-heading">
          <h2 id="account-billing-heading" className="account-page__heading">
            Subscription
          </h2>
          <p className="account-page__copy">
            {isPro
              ? 'Update payment or cancel your Pro plan in your account portal.'
              : 'Upgrade to Pro to unlock premium components and prompts.'}
          </p>
          {isPro ? (
            <Button variant="danger" size="md" onClick={() => openAccount?.()}>
              Manage subscription
            </Button>
          ) : (
            <Button variant="primary" size="md" onClick={() => setCheckoutOpen(true)}>
              Upgrade to Pro
            </Button>
          )}
        </section>

        <Button variant="secondary" size="md" onClick={() => signOut()}>
          Log out
        </Button>
      </div>
    </div>
  )
}
