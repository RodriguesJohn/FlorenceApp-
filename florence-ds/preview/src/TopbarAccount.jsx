import { Show, UserButton } from '@clerk/react'
import { Button } from '../../03-components/button/Button.jsx'
import { clerkAppearance, clerkConfigured, clerkProfileAppearance } from './clerkConfig.js'
import { useFlorenceAuth } from './FlorenceAuth.jsx'

export function TopbarAccount() {
  const { setLoginOpen, setCheckoutOpen } = useFlorenceAuth()

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
      <Show when="signed-out">
        <Button
          variant="tertiary"
          size="md"
          className="topbar__btn topbar__btn--quiet"
          onClick={() => setLoginOpen(true)}
        >
          Log in
        </Button>
        <Button
          variant="primary"
          size="md"
          className="topbar__btn topbar__btn--upgrade"
          onClick={() => setCheckoutOpen(true)}
        >
          Upgrade to Pro
        </Button>
      </Show>
      <Show when="signed-in">
        <UserButton
          appearance={clerkAppearance}
          userProfileProps={{ appearance: clerkProfileAppearance }}
          afterSignOutUrl={window.location.origin}
        />
      </Show>
    </>
  )
}
