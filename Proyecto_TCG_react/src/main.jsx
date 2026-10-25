import React from 'react'
import ReactDOM from 'react-dom/client'
import Inicio from './App.jsx' // o './App' según prefieras nombrar tu archivo
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Inicio />
  </React.StrictMode>,
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
