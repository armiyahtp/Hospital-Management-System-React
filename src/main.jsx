import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SignProvider } from './context/SignContext.jsx'

createRoot(document.getElementById('root')).render(
  <SignProvider>
    <App />
  </SignProvider>
)
