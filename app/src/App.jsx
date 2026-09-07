import { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import { useAuth, useClerk, useUser } from '@clerk/react'
import { AppShell } from './layout/AppShell.jsx'
import { StartHere } from './pages/StartHere.jsx'
import { AuthGate } from './pages/Login.jsx'
import { BrandSystem } from './pages/BrandSystem.jsx'
import { Assets } from './pages/Assets.jsx'
import { FoundationTokens } from './pages/FoundationTokens.jsx'
import { ComponentsPage } from './pages/ComponentsPage.jsx'
import { ComponentStudio } from './pages/ComponentStudio.jsx'
import { AnimationLibrary } from './pages/AnimationLibrary.jsx'
import { Connectors } from './pages/Connectors.jsx'
import { Skills } from './pages/Skills.jsx'
import { Libraries } from './pages/Libraries.jsx'
import { Constraints } from './pages/Constraints.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Internal } from './pages/Internal.jsx'
import { Evals } from './pages/Evals.jsx'
import { Settings } from './pages/Settings.jsx'
import { Generator } from './pages/Generator.jsx'
import {
  appHref,
  clerkConfigured,
  clerkUserEmails,
  isClerkAdmin,
  isClerkHandshakePending,
  websiteHome,
} from './lib/clerk.js'
import { usePlatform } from './state/platform.jsx'
import './App.css'

function HomeRedirect() {
  const { isPaid } = usePlatform()
  return <Navigate to={isPaid ? '/brand' : '/start'} replace />
}

function AppRoutes() {
  const { isLoaded, isSignedIn } = useAuth()
  const { isLoaded: userLoaded, user } = useUser()
  const clerk = useClerk()
  const [params] = useSearchParams()
  const rejecting = useRef(false)
  const denied = params.get('denied') === '1'
  const wantsAuth =
    params.get('signup') === '1' || params.get('signin') === '1' || denied
  const allowed = isClerkAdmin(user)
  const emailsReady = clerkUserEmails(user).length > 0
  const accountReady =
    isLoaded && userLoaded && !isClerkHandshakePending()
  const unauthorized = accountReady && isSignedIn && emailsReady && !allowed
  const sendHome =
    accountReady && !isSignedIn && !wantsAuth && !unauthorized

  useEffect(() => {
    if (!unauthorized || rejecting.current) return
    rejecting.current = true
    clerk.signOut({ redirectUrl: appHref('/start?signin=1&denied=1') })
  }, [unauthorized, clerk])

  useEffect(() => {
    if (sendHome) {
      window.location.replace(websiteHome())
    }
  }, [sendHome])

  if (!accountReady || unauthorized || (isSignedIn && !emailsReady)) {
    return (
      <div className="auth-screen">
        <p className="page-header__meta">Loading account</p>
      </div>
    )
  }

  if (!isSignedIn && wantsAuth) {
    return <AuthGate />
  }

  if (sendHome) {
    return (
      <div className="auth-screen">
        <p className="page-header__meta">Loading account</p>
      </div>
    )
  }

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/start" element={<StartHere />} />
        <Route path="/brand" element={<BrandSystem />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/creatives" element={<Navigate to="/assets" replace />} />
        <Route path="/tokens" element={<FoundationTokens />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/studio" element={<ComponentStudio />} />
        <Route path="/animation" element={<AnimationLibrary />} />
        <Route path="/connectors" element={<Connectors />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/libraries" element={<Libraries />} />
        <Route path="/guardrails" element={<Constraints />} />
        <Route path="/constraints" element={<Navigate to="/guardrails" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/internal" element={<Internal />} />
        <Route path="/evals" element={<Evals />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/sign-in/*" element={<HomeRedirect />} />
        <Route path="/sign-up/*" element={<HomeRedirect />} />
        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </AppShell>
  )
}

function SendHome() {
  useEffect(() => {
    window.location.replace(websiteHome())
  }, [])

  return (
    <div className="auth-screen">
      <p className="page-header__meta">Loading account</p>
    </div>
  )
}

export default function App() {
  if (!clerkConfigured) {
    if (import.meta.env.PROD) {
      return <SendHome />
    }
    return <AuthGate />
  }

  return <AppRoutes />
}
