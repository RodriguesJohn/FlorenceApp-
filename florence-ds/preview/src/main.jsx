import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.jsx'
import { FlorenceAuthProvider } from './FlorenceAuth.jsx'
import {
  clerkAppearance,
  clerkConfigured,
  clerkPublishableKey,
} from './clerkConfig.js'

const root = (
  <StrictMode>
    {clerkConfigured ? (
      <ClerkProvider publishableKey={clerkPublishableKey} appearance={clerkAppearance}>
        <FlorenceAuthProvider>
          <App />
        </FlorenceAuthProvider>
      </ClerkProvider>
    ) : (
      <FlorenceAuthProvider>
        <App />
      </FlorenceAuthProvider>
    )}
  </StrictMode>
)

createRoot(document.getElementById('root')).render(root)
