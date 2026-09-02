import { UserButton } from '@clerk/react'
import { Button } from '../../03-components/button/Button.jsx'
import { clerkAppearance, clerkConfigured, clerkProfileAppearance } from './clerkConfig.js'
import { useFlorenceAuth } from './FlorenceAuth.jsx'

export function TopbarAccount() {
  const { user, isPro, setLoginOpen, setCheckoutOpen } = useFlorenceAuth()

  if (!clerkConfigured) {
    return (
      <>
        <Button
          variant="tertiary"
          size="md"
          className="topbar__btn topbar__btn--quiet"
          disabled
          title="Add VITE_CLERK_PUBLISHABLE_KEY to .env.local"
        >
          Log in
        </Button>
        <Button
          variant="primary"
          size="md"
          className="topbar__btn topbar__btn--upgrade"
          disabled
          title="Add VITE_CLERK_PUBLISHABLE_KEY to .env.local"
        >
          Upgrade to Pro
        </Button>
      </>
    )
  }

  return (
    <>
      {!user ? (
        <Button
          variant="tertiary"
          size="md"
          className="topbar__btn topbar__btn--quiet"
          onClick={() => setLoginOpen(true)}
        >
          Log in
        </Button>
      ) : null}
      {!isPro ? (
        <Button
          variant="primary"
          size="md"
          className="topbar__btn topbar__btn--upgrade"
          onClick={() => setCheckoutOpen(true)}
        >
          Upgrade to Pro
        </Button>
      ) : null}
      {user ? (
        <UserButton
          appearance={clerkAppearance}
          userProfileProps={{ appearance: clerkProfileAppearance }}
          afterSignOutUrl={window.location.origin}
        />
      ) : null}
    </>
  )
}
