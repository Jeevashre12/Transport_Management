import React, { useState } from 'react'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      localStorage.setItem('userName', data.name)
      
      // role-based redirect
      const role = (data.role || '').toString().toLowerCase()
      if (role.includes('student')) {
        window.location.href = '/student/dashboard'
      }
      else if (role.includes('placement') || role.includes('department')) {
        window.location.href = '/dept_coordinator/dashboard'
      }
      else if (role.includes('admin') || role.includes('officer')) {
        window.location.href = '/admin/dashboard'
      }
      else {
        window.location.href = '/'
      }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>BusSync</h1>
          <p className="login-subtitle">Welcome Back</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Enter your password"
              required 
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <a href="/signup" className="signup-link">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  )
}
