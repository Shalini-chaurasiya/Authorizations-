import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { handleError, handleSuccess } from '../utils'

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupInfo({ ...signupInfo, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = signupInfo

    if (!name || !email || !password) {
      return handleError('Name, email and password are required')
    }

    try {
      const url = "http://localhost:8080/auth/signup"
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      })
      const result = await response.json()

      if (result.success) {
        handleSuccess(result.message)
        setTimeout(() => navigate('/login'), 1000)
      } else if (result.error) {
        const details = result.error?.details?.[0]?.message || 'Signup failed'
        handleError(details)
      } else {
        handleError(result.message || 'Signup failed')
      }

      console.log(result)
    } catch (err) {
      handleError(err.message || 'Something went wrong')
    }
  }

  return (
    <div className='container'>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            type='text'
            name='name'
            autoFocus
            placeholder='Enter your name...'
            value={signupInfo.name}
          />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter your email...'
            value={signupInfo.email}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter your password...'
            value={signupInfo.password}
          />
        </div>

        <div>
          <button type='submit'>Signup</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </form>

      <ToastContainer />
    </div>
  )
}

export default Signup
