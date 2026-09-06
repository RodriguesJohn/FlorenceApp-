import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'
import '../florence/florence.css'
import './index.css'
import { AppPlatformProvider } from './state/platform.jsx'
import { ThemeProvider } from './state/theme.jsx'
import {
  clerkAllowedRedirectOrigins,
  clerkConfigured,
  clerkPublishableKey,
  websiteHome,
} from './lib/clerk.js'
import App from './App.jsx'

function ClerkRoot({ children }) {
  const navigate = useNavigate()

  if (!clerkConfigured) {
    return children
  }

  function go(to) {
    if (/^https?:\/\//.test(to)) {
      window.location.assign(to)
      return
    }
    navigate(to)
  }

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      routerPush={go}
      routerReplace={(to) => {
        if (/^https?:\/\//.test(to)) {
          window.location.replace(to)
          return
        }
        navigate(to, { replace: true })
      }}
      afterSignOutUrl={websiteHome()}
      signInUrl={websiteHome()}
      signUpUrl={websiteHome()}
      signInFallbackRedirectUrl="/start"
      signUpFallbackRedirectUrl="/start"
      signInForceRedirectUrl="/start"
      signUpForceRedirectUrl="/start"
      allowedRedirectOrigins={clerkAllowedRedirectOrigins}
    >
      {children}
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
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
