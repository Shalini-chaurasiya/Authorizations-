import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import './index.css'

// Import your components
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import RefreshHandler from "./RefreshHandler.jsx";
// Make sure path is correct

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Component to protect private routes
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />
  }

  return (
    <div className="App">
      {/* Handles refresh and auto-login */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* Protect /home route */}
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  )
}

export default App
