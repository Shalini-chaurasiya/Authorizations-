import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      if (setIsAuthenticated) setIsAuthenticated(true) // update auth state if passed

      if (
        location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/signup'
      ) {
        navigate('/home', { replace: true }) // redirect to home if logged in
      }
    }
  }, [location, navigate, setIsAuthenticated])

  return null
}

export default RefreshHandler
