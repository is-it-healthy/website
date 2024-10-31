import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Init from './Init.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Init />
  </StrictMode>,
)
