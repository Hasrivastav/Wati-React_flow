import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ReactFlowProvider } from 'reactflow'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </StrictMode>,
)
