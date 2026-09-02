import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { PricingTable, useAuth, useClerk, useUser } from '@clerk/react'
import { Button } from '../../../../03-components/button/Button.jsx'
import { Modal } from '../../../../03-components/modal/Modal.jsx'
import {
  clerkAppearance,
  clerkConfigured,
  clerkOverlayOptions,
  clerkProfileOverlayOptions,
  clerkProPlanSlug,
  emailHasProBypass,
} from './clerkConfig.js'

const FlorenceAuthContext = createContext(null)

const UPGRADE_INTENT_KEY = 'florence-upgrade-intent'
const PENDING_SUBSCRIPTION_KEY = 'florence-pending-subscription'
const SUBSCRIBE_SNOOZE_KEY = 'florence-subscribe-snoozed'
const UPGRADE_QUERY_PARAM = 'upgrade'
export const FLORENCE_VISIT_HOME_EVENT = 'florence:visit-home'

function readUpgradeIntent() {
  try {
    return (
      sessionStorage.getItem(UPGRADE_INTENT_KEY) === '1' ||
      localStorage.getItem(UPGRADE_INTENT_KEY) === '1'
    )
  } catch {
    return false
  }
}

function writeUpgradeIntent(on) {
  try {
    if (on) {
      sessionStorage.setItem(UPGRADE_INTENT_KEY, '1')
      localStorage.setItem(UPGRADE_INTENT_KEY, '1')
    } else {
      sessionStorage.removeItem(UPGRADE_INTENT_KEY)
      localStorage.removeItem(UPGRADE_INTENT_KEY)
    }
  } catch {
    /* ignore */
  }
}

function hasUpgradeQueryParam() {
  try {
    return (
      new URLSearchParams(window.location.search).get(UPGRADE_QUERY_PARAM) ===
      'pro'
    )
  } catch {
    return false
  }
}

function clearUpgradeQueryParam() {
  try {
    const url = new URL(window.location.href)
    if (!url.searchParams.has(UPGRADE_QUERY_PARAM)) return
    url.searchParams.delete(UPGRADE_QUERY_PARAM)
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
  } catch {
    /* ignore */
  }
}

function buildUpgradeReturnUrl() {
  const url = new URL(window.location.href)
  url.searchParams.set(UPGRADE_QUERY_PARAM, 'pro')
  return url.toString()
}

function clearUpgradeState() {
  writeUpgradeIntent(false)
  clearUpgradeQueryParam()
  clearPendingSubscription()
  clearSubscribeSnooze()
}

function readPendingSubscriptionUserId() {
  try {
    return localStorage.getItem(PENDING_SUBSCRIPTION_KEY) || ''
  } catch {
    return ''
  }
}

function markPendingSubscription(userId) {
  if (!userId) return
  try {
    localStorage.setItem(PENDING_SUBSCRIPTION_KEY, userId)
    writeUpgradeIntent(true)
  } catch {
    /* ignore */
  }
}

function hasPendingSubscription(userId) {
  if (!userId) return false
  return readPendingSubscriptionUserId() === userId
}

function clearPendingSubscription() {
  try {
    localStorage.removeItem(PENDING_SUBSCRIPTION_KEY)
  } catch {
    /* ignore */
  }
}

function snoozeSubscribeModal() {
  try {
    sessionStorage.setItem(SUBSCRIBE_SNOOZE_KEY, '1')
  } catch {
    /* ignore */
  }
}

function isSubscribeModalSnoozed() {
  try {
    return sessionStorage.getItem(SUBSCRIBE_SNOOZE_KEY) === '1'
  } catch {
    return false
  }
}

function clearSubscribeSnooze() {
  try {
    sessionStorage.removeItem(SUBSCRIBE_SNOOZE_KEY)
  } catch {
    /* ignore */
  }
}

function shouldPromptSubscribe(userId) {
  if (!userId) return false
  return (
    wantsUpgradeCheckout() ||
    hasPendingSubscription(userId)
  )
}

function wantsUpgradeCheckout() {
  return readUpgradeIntent() || hasUpgradeQueryParam()
}

function isClerkOverlayOpen() {
  return Boolean(
    document.querySelector('.cl-modalBackdrop, .cl-drawerRoot, .cl-signIn-root'),
  )
}

function waitForClerkOverlayToClose(onReady) {
  let attempts = 0
  let cancelled = false

  function tick() {
    if (cancelled) return
    if (!isClerkOverlayOpen() || attempts > 80) {
      onReady()
      return
    }
    attempts += 1
    window.setTimeout(tick, 100)
  }

  window.setTimeout(tick, 200)
  return () => {
    cancelled = true
  }
}

export function useFlorenceAuth() {
  const value = useContext(FlorenceAuthContext)
  if (!value) {
    throw new Error('useFlorenceAuth must be used inside FlorenceAuthProvider')
  }
  return value
}

function mapClerkUser(clerkUser) {
  if (!clerkUser) return null
  const email = clerkUser.primaryEmailAddress?.emailAddress ?? ''
  return {
    id: clerkUser.id,
    email,
    user_metadata: {
      full_name: clerkUser.fullName ?? '',
      username:
        clerkUser.username ??
        clerkUser.firstName ??
        (email.includes('@') ? email.split('@')[0] : ''),
    },
  }
}

function UpgradeCheckoutModal({ open, onVisitHome }) {
  const { isSignedIn } = useAuth()

  return (
    <Modal
      open={open}
      dismissible={false}
      title="Subscribe to Pro"
      description="Your account is ready. Subscribe to unlock premium components, prompts, and code snippets."
      size="md"
      className="upgrade-modal"
      footer={
        <Button type="button" variant="tertiary" onClick={onVisitHome}>
          Visit home
        </Button>
      }
    >
      {isSignedIn ? (
        <PricingTable
          for="user"
          newSubscriptionRedirectUrl={`${window.location.origin}/florence/system`}
          checkoutProps={{ appearance: clerkAppearance }}
        />
      ) : null}
    </Modal>
  )
}

function ClerkSetupNotice() {
  return (
    <div className="clerk-setup-notice" role="status">
      <p>
        Add <code>VITE_CLERK_PUBLISHABLE_KEY</code> to <code>.env.local</code>,
        enable Billing in Clerk Dashboard, and create a user plan with slug{' '}
        <code>pro</code>.
      </p>
    </div>
  )
}

const unconfiguredAuth = {
  configured: false,
  session: null,
  user: null,
  isPro: false,
  loginOpen: false,
  upgradeIntent: false,
  setLoginOpen() {},
  setCheckoutOpen() {},
  continueUpgradeCheckout() {},
  signInLocalTest() {},
  async signOut() {},
  openAccount() {},
}

function FlorenceAuthProviderInner({ children }) {
  const { isLoaded, isSignedIn, has, signOut } = useAuth()
  const { user: clerkUser } = useUser()
  const clerk = useClerk()
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)

  const user = useMemo(() => mapClerkUser(clerkUser), [clerkUser])
  const hasClerkPro = isLoaded && isSignedIn && has({ plan: clerkProPlanSlug })
  const isPro =
    hasClerkPro || (isLoaded && isSignedIn && emailHasProBypass(user?.email))

  const promptUpgradeCheckout = useCallback(() => {
    if (isPro) {
      clearUpgradeState()
      setCheckoutModalOpen(false)
      return
    }
    setCheckoutModalOpen(true)
  }, [isPro])

  const visitHomeFromUpgrade = useCallback(() => {
    snoozeSubscribeModal()
    setCheckoutModalOpen(false)
    window.dispatchEvent(new CustomEvent(FLORENCE_VISIT_HOME_EVENT))
  }, [])

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !clerkUser?.id || isPro) return
    if (emailHasProBypass(user?.email)) return
    if (!shouldPromptSubscribe(clerkUser.id)) return

    markPendingSubscription(clerkUser.id)
  }, [clerkUser?.id, isLoaded, isPro, isSignedIn, user?.email])

  useEffect(() => {
    if (!isLoaded || !isSignedIn || isPro) return
    if (emailHasProBypass(user?.email)) return
    if (!shouldPromptSubscribe(clerkUser?.id)) return
    if (isSubscribeModalSnoozed()) return

    return waitForClerkOverlayToClose(() => {
      setCheckoutModalOpen(true)
    })
  }, [clerkUser?.id, isLoaded, isPro, isSignedIn, promptUpgradeCheckout, user?.email])

  useEffect(() => {
    if (isPro) {
      setCheckoutModalOpen(false)
      clearUpgradeState()
    }
  }, [isPro])

  const value = useMemo(
    () => ({
      configured: true,
      session: isSignedIn && user ? { user } : null,
      user,
      isPro,
      loginOpen: false,
      upgradeIntent: shouldPromptSubscribe(clerkUser?.id),
      setLoginOpen(open) {
        if (!open) return
        clearSubscribeSnooze()
        writeUpgradeIntent(true)
        clerk.openSignIn({
          ...clerkOverlayOptions,
          signInForceRedirectUrl: buildUpgradeReturnUrl(),
          signUpForceRedirectUrl: buildUpgradeReturnUrl(),
        })
      },
      setCheckoutOpen(open) {
        if (!open) return
        if (isPro) return
        clearSubscribeSnooze()
        writeUpgradeIntent(true)
        if (isSignedIn && clerkUser?.id) {
          markPendingSubscription(clerkUser.id)
          promptUpgradeCheckout()
          return
        }
        clerk.openSignUp({
          ...clerkOverlayOptions,
          signUpForceRedirectUrl: buildUpgradeReturnUrl(),
          signInForceRedirectUrl: buildUpgradeReturnUrl(),
        })
      },
      continueUpgradeCheckout() {
        clearSubscribeSnooze()
        writeUpgradeIntent(true)
        if (clerkUser?.id) markPendingSubscription(clerkUser.id)
        promptUpgradeCheckout()
      },
      signInLocalTest() {},
      async signOut() {
        clearUpgradeState()
        setCheckoutModalOpen(false)
        await signOut()
      },
      openAccount() {
        clerk.openUserProfile(clerkProfileOverlayOptions)
      },
    }),
    [clerk, clerkUser?.id, isPro, isSignedIn, promptUpgradeCheckout, user],
  )

  return (
    <FlorenceAuthContext.Provider value={value}>
      {children}
      <UpgradeCheckoutModal
        open={checkoutModalOpen && isSignedIn && !isPro}
        onVisitHome={visitHomeFromUpgrade}
      />
    </FlorenceAuthContext.Provider>
  )
}

export function FlorenceAuthProvider({ children }) {
  if (!clerkConfigured) {
    return (
      <FlorenceAuthContext.Provider value={unconfiguredAuth}>
        {children}
        <ClerkSetupNotice />
      </FlorenceAuthContext.Provider>
    )
  }

  return <FlorenceAuthProviderInner>{children}</FlorenceAuthProviderInner>
}

export function ManageBillingButton({
  className = '',
  variant = 'tertiary',
  size = 'md',
  children = 'Manage',
}) {
  const { openAccount } = useFlorenceAuth()

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => openAccount?.()}
    >
      {children}
    </Button>
  )
}
