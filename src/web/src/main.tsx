import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './pages/App/index.tsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)