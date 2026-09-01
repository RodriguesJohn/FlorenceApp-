export const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? ''

export const clerkConfigured = Boolean(clerkPublishableKey)

/** Plan slug from Clerk Dashboard → Billing → Plans (e.g. "pro"). */
export const clerkProPlanSlug =
  import.meta.env.VITE_CLERK_PRO_PLAN_SLUG?.trim() || 'pro'

/** Comma-separated founder/dev emails that skip Pro checkout (preview dev only). */
export const clerkProBypassEmails = (
  import.meta.env.VITE_PRO_BYPASS_EMAILS?.trim() || ''
)
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

export function emailHasProBypass(email) {
  if (!email) return false
  return clerkProBypassEmails.includes(email.trim().toLowerCase())
}

/** Plan ID from Clerk Dashboard → Billing → Plans (starts with cplan_). */
export const clerkProPlanId =
  import.meta.env.VITE_CLERK_PRO_PLAN_ID?.trim() || ''

const clerkVariables = {
  colorPrimary: 'var(--color-interactive-primary)',
  colorText: 'var(--color-text-primary)',
  colorTextSecondary: 'var(--color-text-secondary)',
  colorBackground: 'var(--color-bg-surface)',
  colorInputBackground: 'var(--color-bg-surface)',
  colorInputText: 'var(--color-text-primary)',
  borderRadius: 'var(--radius-control)',
}

const clerkModalBackdrop = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--space-inset-lg)',
  backdropFilter: 'blur(12px) saturate(1.15)',
  WebkitBackdropFilter: 'blur(12px) saturate(1.15)',
  backgroundColor:
    'color-mix(in srgb, var(--color-overlay-scrim) calc(100% * var(--opacity-scrim-soft)), transparent)',
}

const clerkModalContentBase = {
  margin: 0,
  maxHeight: 'min(90dvh, 100%)',
  overflow: 'auto',
  boxShadow: 'var(--shadow-modal)',
}

/** Default Clerk appearance — no fixed width (profile/billing need room). */
export const clerkAppearance = {
  variables: clerkVariables,
  elements: {
    modalBackdrop: clerkModalBackdrop,
    modalContent: clerkModalContentBase,
  },
}

/** Compact overlays for sign-in / sign-up. */
export const clerkAuthAppearance = {
  variables: clerkVariables,
  elements: {
    modalBackdrop: clerkModalBackdrop,
    modalContent: {
      ...clerkModalContentBase,
      width: 'min(100%, 25rem)',
    },
  },
}

/** Wide overlay for account + billing (sidebar layout). */
export const clerkProfileAppearance = {
  variables: clerkVariables,
  elements: {
    modalBackdrop: clerkModalBackdrop,
    modalContent: {
      ...clerkModalContentBase,
      width: 'min(100%, 56rem)',
      maxWidth: '100%',
    },
  },
}

/** Shared appearance for Clerk sign-in / sign-up overlays. */
export const clerkOverlayOptions = { appearance: clerkAuthAppearance }

/** Shared appearance for Clerk account / billing overlays. */
export const clerkProfileOverlayOptions = { appearance: clerkProfileAppearance }
