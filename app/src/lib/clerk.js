export const clerkPublishableKey =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim() ?? ''

export const clerkConfigured = Boolean(clerkPublishableKey)

const DEFAULT_ADMIN_EMAILS = [
  'john@humaaistudio.io',
  'john@humanaistudio.io',
]

export function adminEmails() {
  const extra = (import.meta.env.VITE_ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
  return [...new Set([...DEFAULT_ADMIN_EMAILS, ...extra])]
}

export function isAdminEmail(email) {
  if (!email) return false
  return adminEmails().includes(email.trim().toLowerCase())
}

export function clerkUserEmails(user) {
  if (!user) return []
  return [
    user.primaryEmailAddress?.emailAddress,
    ...(user.emailAddresses ?? []).map((item) => item.emailAddress),
  ].filter(Boolean)
}

export function isClerkAdmin(user) {
  return clerkUserEmails(user).some(isAdminEmail)
}

const clerkVariables = {
  colorPrimary: 'var(--color-interactive-primary)',
  colorText: 'var(--color-text-primary)',
  colorTextSecondary: 'var(--color-text-secondary)',
  colorBackground: 'var(--color-bg-surface)',
  colorInputBackground: 'var(--color-bg-page)',
  colorInputText: 'var(--color-text-primary)',
  borderRadius: 'var(--radius-control-md)',
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

const clerkModalContent = {
  margin: 0,
  maxHeight: '100dvh',
  overflow: 'auto',
  boxShadow: 'var(--shadow-modal)',
  width: 'min(100%, var(--layout-container-sm))',
}

export const clerkAuthAppearance = {
  variables: clerkVariables,
  elements: {
    modalBackdrop: clerkModalBackdrop,
    modalContent: clerkModalContent,
  },
}

export const clerkProfileAppearance = {
  variables: clerkVariables,
  elements: {
    modalBackdrop: clerkModalBackdrop,
    modalContent: {
      ...clerkModalContent,
      width: 'min(100%, var(--layout-container-md))',
    },
  },
}

export const clerkOverlayOptions = { appearance: clerkAuthAppearance }

export const clerkProfileOverlayOptions = { appearance: clerkProfileAppearance }

export const APP_BASE = (import.meta.env.BASE_URL || '/app/').replace(/\/$/, '') || '/app'

export function appHref(path = '/start') {
  const suffix = !path || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `${APP_BASE}${suffix}`
}

export function routerPathFromHref(to) {
  const dest = String(to || '')
  if (!dest || /^https?:\/\//.test(dest)) return dest
  if (dest === APP_BASE) return '/'
  if (dest.startsWith(`${APP_BASE}/`)) return dest.slice(APP_BASE.length) || '/'
  if (dest.startsWith(`${APP_BASE}?`)) return `/${dest.slice(APP_BASE.length)}`
  return dest
}

export const clerkAllowedRedirectOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:5175',
  'https://florenceai-drab.vercel.app',
  'https://www.florenceai.io',
  'https://florenceai.io',
  'https://www.humanaistudio.io',
]

export function websiteOrigin() {
  if (typeof window !== 'undefined') {
    const { origin, hostname, port, pathname } = window.location
    if (pathname === '/app' || pathname.startsWith('/app/')) return origin
    if (import.meta.env.DEV && (port === '5175' || port === '5173')) {
      const host = hostname === '127.0.0.1' ? '127.0.0.1' : 'localhost'
      return `http://${host}:5174`
    }
    return origin
  }
  return (
    import.meta.env.VITE_WEBSITE_URL?.replace(/\/?$/, '') ||
    'https://www.florenceai.io'
  )
}

export function websiteHome() {
  return `${websiteOrigin()}/`
}

export function isAuthIntent() {
  if (typeof window === 'undefined') return false
  const query = new URLSearchParams(window.location.search)
  return query.get('signup') === '1' || query.get('signin') === '1'
}

export function isClerkHandshakePending() {
  if (typeof window === 'undefined') return false
  const query = window.location.search
  const hash = window.location.hash
  return (
    query.includes('__clerk_handshake') ||
    query.includes('__clerk_handshake_nonce') ||
    query.includes('__clerk_db_jwt') ||
    query.includes('__clerk_ticket') ||
    query.includes('__clerk_created_session') ||
    hash.includes('__clerk_db_jwt')
  )
}

export function clerkDisplayName(user) {
  return (
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    'Account'
  )
}

export function clerkDisplayEmail(user) {
  return user?.primaryEmailAddress?.emailAddress ?? ''
}

export function clerkDisplayInitials(user) {
  const name = clerkDisplayName(user)
  if (name.includes('@')) {
    return name.slice(0, 2).toUpperCase()
  }
  const parts = name.split(/\s+/).filter(Boolean)
  const letters = (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
  return (letters || name.slice(0, 2)).toUpperCase()
}
