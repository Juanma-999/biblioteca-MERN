import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/app.css'
import UserProvider from './context/UserContext.jsx'
import BookProvider from './context/BookContext.jsx'
import DogProvider from './context/DogContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <DogProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </DogProvider>
  </React.StrictMode>,
)
