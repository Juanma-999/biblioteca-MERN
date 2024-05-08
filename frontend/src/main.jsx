import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/app.css'
import UserProvider from './context/UserContext.jsx'
import DogProvider from './context/DogContext.jsx'
import WalksProvider from './context/WalksContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalksProvider>
      <DogProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </DogProvider>
    </WalksProvider>
  </React.StrictMode>,
)
