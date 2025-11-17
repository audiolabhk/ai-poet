import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Mistral from './Mistral.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/ai-poet" element={<App />} />
        <Route path="/mistral" element={<Mistral />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
