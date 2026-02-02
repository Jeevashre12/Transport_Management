import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import homeImage from '../assets/home.webp'
import homeLogo from '../assets/klogo.png'

export default function Home() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('userName')
    const studentInfo = localStorage.getItem('studentInfo')
    
    if (token) {
      setIsLoggedIn(true)
      if (studentInfo) {
        try {
          const info = JSON.parse(studentInfo)
          setUserName(info.name || name || 'User')
        } catch (e) {
          setUserName(name || 'User')
        }
      } else {
        setUserName(name || 'User')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userName')
    setIsLoggedIn(false)
    setShowDropdown(false)
    navigate('/')
  }

  const goToDashboard = () => {
    const role = localStorage.getItem('role')
    if (role && role.includes('student')) {
      navigate('/student/dashboard')
    }
  }

  const getInitial = () => {
    return userName.charAt(0).toUpperCase()
  }

  return (
    <div className="home">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-circle">
              <img
                src={homeLogo}
                alt="BusSync Logo"
                className="logo-image"
              />
            </div>

            <span className="logo-main">
              <span className="logo-white">BUS</span>
              <span className="logo-yellow">SYNC</span>
            </span>
          </div>

          <ul className="nav-menu">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li>
              <a
                href="/support"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/support')
                }}
              >
                Support
              </a>
            </li>
            <li><a href="#support" className="nav-link">Routes</a></li>
            <li>
              <a
                href="/support"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/support')
                }}
              >
                Support
              </a>
            </li>
          </ul>

          {isLoggedIn ? (
            <div className="user-profile">
              <div 
                className="profile-circle" 
                onClick={() => setShowDropdown(!showDropdown)}
                title={userName}
              >
                {getInitial()}
              </div>
              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-initial">{getInitial()}</div>
                    <div className="dropdown-info">
                      <p className="dropdown-name">{userName}</p>
                      <p className="dropdown-role">Student</p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={goToDashboard}>
                    <span></span> Dashboard
                  </button>
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    <span></span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="nav-button" onClick={() => navigate('/login')}>Login / Sign Up</button>
          )}
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-inner">

          {/* LEFT SIDE TEXT */}
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-white">Smart Campus</span>{' '}
              <span className="title-yellow">Transport</span><br />
              <span className="title-yellow">Connected.</span>
            </h1>

            <p className="hero-subtitle">
              Real-time updates, effortless coordination,<br />
              and a smoother commute for everyone.
            </p>

            <button className="cta-button" onClick={() => navigate('/signup')}>
              Get Started — It's Free!
            </button>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="hero-illustration">
            <img
              src={homeImage}
              alt="Smart Campus Transport"
              className="hero-image"
            />
          </div>

        </div>
      </section>

    
    </div>
  )
}
