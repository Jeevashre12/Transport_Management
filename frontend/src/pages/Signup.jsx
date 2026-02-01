import React, { useState } from 'react'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Signup failed')
      // After signup, redirect to login page
      window.location.href = '/login'
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Email</label>
          <br />
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Password</label>
          <br />
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Role</label>
          <br />
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="placement">Department / Placement Cell</option>
            <option value="admin">Transport Officer (Admin)</option>
          </select>
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  )
}
