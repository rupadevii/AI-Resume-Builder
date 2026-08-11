import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { InfoProvider } from './context/InfoContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import {store} from './redux/store.js'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <InfoProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </InfoProvider>
        </Provider>
    </StrictMode>,
)
