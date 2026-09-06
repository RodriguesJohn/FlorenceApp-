import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth, useClerk } from '@clerk/react'
import { Button } from '../../florence/components/button/Button.jsx'
import {
  clerkConfigured,
  clerkOverlayOptions,
  isClerkHandshakePending,
  websiteHome,
} from '../lib/clerk.js'

function AuthGateCopy() {
  return (
    <>
      <p className="page-header__eyebrow">Florence AI</p>
      <h1 className="page-header__title">Log in to continue</h1>
      <p className="page-header__meta">
        Keep your MCP command and this workspace. Come back to it any time.
      </p>
    </>
  )
}

function ClerkAuthGate() {
  const { isLoaded } = useAuth()
  const clerk = useClerk()
  const [searchParams] = useSearchParams()
  const opened = useRef(false)
  const wantsSignup = searchParams.get('signup') === '1'

  function openSignIn() {
    clerk.openSignIn({
      ...clerkOverlayOptions,
      forceRedirectUrl: '/start',
      fallbackRedirectUrl: '/start',
    })
  }

  function openSignUp() {
    clerk.openSignUp({
      ...clerkOverlayOptions,
      forceRedirectUrl: '/start',
      fallbackRedirectUrl: '/start',
    })
  }

  useEffect(() => {
    if (!isLoaded || opened.current || isClerkHandshakePending()) return
    opened.current = true
    const options = {
      ...clerkOverlayOptions,
      forceRedirectUrl: '/start',
      fallbackRedirectUrl: '/start',
    }
    if (wantsSignup) clerk.openSignUp(options)
    else clerk.openSignIn(options)
  }, [clerk, isLoaded, wantsSignup])

  return (
    <div className="auth-screen">
      <div className="auth-screen__panel layout-container-sm">
        <p className="page-header__eyebrow">Florence AI</p>
        <h1 className="page-header__title">
          {wantsSignup ? 'Create your account' : 'Log in'}
        </h1>
        <p className="page-header__meta">
          Then you land in the workspace. Log out returns you to the homepage.
        </p>
        <div className="layout-header__actions">
          <Button variant="primary" onClick={openSignIn}>
            Log in
          </Button>
          <Button variant="secondary" onClick={openSignUp}>
            Create account
          </Button>
        </div>
        <p className="page-header__meta">
          <a href={websiteHome()}>Back to Florence AI</a>
        </p>
      </div>
    </div>
  )
}

export function AuthGate() {
  if (!clerkConfigured) {
    return (
      <div className="auth-screen">
        <div className="auth-screen__panel layout-container-sm">
          <AuthGateCopy />
          <div className="surface-card" role="status">
            <p className="surface-card__body">
              Clerk is not connected yet. Add{' '}
              <code>VITE_CLERK_PUBLISHABLE_KEY</code> to{' '}
              <code>app/.env.local</code>, then restart the app.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <ClerkAuthGate />
}
