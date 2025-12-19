import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleSuccess, handleError } from '../utils'
import 'react-toastify/dist/ReactToastify.css'

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('')
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser')
    if (user) {
      setLoggedInUser(user)
      fetchProducts()
    } else {
      navigate('/login') // Redirect if no user is logged in
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess('User Logged out')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products"
      const token = localStorage.getItem('token')
      const response = await fetch(url, {
        headers: {
          Authorization: token // JWT token for protected route
        }
      })
      if (!response.ok) throw new Error('Failed to fetch products')
      const result = await response.json()
      setProducts(result)
    } catch (err) {
      handleError(err.message || 'Something went wrong while fetching products')
    }
  }

  return (
    <div className='container'>
      <h1>Welcome, {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>Products</h2>
      <ul>
        {products.map((p, index) => (
          <li key={index}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  )
}

export default Home
