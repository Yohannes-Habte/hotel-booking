import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { HelmetProvider } from 'react-helmet-async';
import BgProvider from './context/background/BgProvider';
import AdminProvider from './context/admin/AdminProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AdminProvider>
      <BgProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BgProvider>
    </AdminProvider>
  </React.StrictMode>,
)
