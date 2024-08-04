import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import SearchProvider from './context/search/SearchProvider';
import UserProvider from './context/user/UserProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </UserProvider>
  </React.StrictMode>,
)
