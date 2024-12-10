import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactGpt } from './ReactGpt'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactGpt />
  </StrictMode>,
)
