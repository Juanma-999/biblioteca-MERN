import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/app.css'
import UserProvider from './context/UserContext.jsx'
import DogProvider from './context/DogContext.jsx'
import WalksProvider from './context/WalksContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalksProvider>
      <DogProvider>
        <UserProvider>
          <App />
          <ToastContainer />
        </UserProvider>
      </DogProvider>
    </WalksProvider>
  </React.StrictMode>,
)
