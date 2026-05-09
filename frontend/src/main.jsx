import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { AuthProvider } from './context/AuthContext.jsx'
import getCSRFToken from './api/Csrf.js'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "";
axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider> 
  </BrowserRouter>
)
