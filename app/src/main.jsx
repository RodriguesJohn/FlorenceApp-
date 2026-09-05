import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '../florence/florence.css'
import './index.css'
import { PlatformProvider } from './state/platform.jsx'
import { ThemeProvider } from './state/theme.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PlatformProvider>
          <App />
        </PlatformProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
