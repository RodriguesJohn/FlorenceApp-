import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './layout/AppShell.jsx'
import { StartHere } from './pages/StartHere.jsx'
import { BrandSystem } from './pages/BrandSystem.jsx'
import { Assets } from './pages/Assets.jsx'
import { FoundationTokens } from './pages/FoundationTokens.jsx'
import { ComponentsPage } from './pages/ComponentsPage.jsx'
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
import './App.css'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/start" replace />} />
        <Route path="/start" element={<StartHere />} />
        <Route path="/brand" element={<BrandSystem />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/creatives" element={<Navigate to="/assets" replace />} />
        <Route path="/tokens" element={<FoundationTokens />} />
        <Route path="/components" element={<ComponentsPage />} />
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
      </Routes>
    </AppShell>
  )
}
