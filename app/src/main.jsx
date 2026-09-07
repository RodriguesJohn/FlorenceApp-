import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'
import '../florence/florence.css'
import './index.css'
import { AppPlatformProvider } from './state/platform.jsx'
import { ThemeProvider } from './state/theme.jsx'
import {
  APP_BASE,
  appHref,
  clerkAllowedRedirectOrigins,
  clerkConfigured,
  clerkPublishableKey,
  routerPathFromHref,
  websiteHome,
} from './lib/clerk.js'
import App from './App.jsx'

function ClerkRoot({ children }) {
  const navigate = useNavigate()

  if (!clerkConfigured) {
    return children
  }

  function go(to, options) {
    if (/^https?:\/\//.test(to)) {
      if (options?.replace) window.location.replace(to)
      else window.location.assign(to)
      return
    }
    navigate(routerPathFromHref(to), options)
  }

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      routerPush={go}
      routerReplace={(to) => go(to, { replace: true })}
      afterSignOutUrl={websiteHome()}
      signInUrl={appHref('/start?signin=1')}
      signUpUrl={appHref('/start?signup=1')}
      signInFallbackRedirectUrl={appHref('/')}
      signUpFallbackRedirectUrl={appHref('/')}
      signInForceRedirectUrl={appHref('/')}
      signUpForceRedirectUrl={appHref('/')}
      allowedRedirectOrigins={clerkAllowedRedirectOrigins}
    >
      {children}
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={APP_BASE}>
      <ClerkRoot>
        <ThemeProvider>
          <AppPlatformProvider>
            <App />
          </AppPlatformProvider>
        </ThemeProvider>
      </ClerkRoot>
    </BrowserRouter>
  </StrictMode>,
)
