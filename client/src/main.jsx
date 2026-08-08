import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { InfoProvider } from './context/InfoContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <InfoProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </InfoProvider>
    </StrictMode>,
)
