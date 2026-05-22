import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
const API = import.meta.env.VITE_API_URL

import "./styles/index.css"
import "./styles/global.css"
import AuthContext from './hook/useAuth.jsx'

console.log(API)
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <App />
    </AuthContext>
  </BrowserRouter>
)
