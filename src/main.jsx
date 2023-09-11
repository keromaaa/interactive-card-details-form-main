import React from 'react'
import ReactDOM from 'react-dom/client'
import CardProvider from '../context/cardContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CardProvider>
      <App />
    </CardProvider>
  </React.StrictMode>,
)