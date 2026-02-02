import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Home.css'
import homeImage from '../assets/home.webp'
import homeLogo from '../assets/klogo.png'
import { Link } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userRole, setUserRole] = useState('Student')
  const [showDropdown, setShowDropdown] = useState(false)
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    const checkUserProfile = () => {
      // Check if there's browser history
      setCanGoBack(window.history.length > 1)

      const token = localStorage.getItem('token')
      const name = localStorage.getItem('userName')
      const role = localStorage.getItem('role')
      const studentInfo = localStorage.getItem('studentInfo')
      
      if (token) {
        setIsLoggedIn(true)
        // Set role - default to Student if not specified
        console.log('Home - checking role:', role)
        if (role && (role.toLowerCase().includes('transport') || role.toLowerCase().includes('admin'))) {
          console.log('Setting userRole to Admin')
          setUserRole('Admin')
        } else {
          console.log('Setting userRole to Student')
          setUserRole('Student')
        }
        
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
    }

    // Initial check
    checkUserProfile()

    // Re-check when window gains focus (navigating back from dashboard)
    const handleFocus = () => {
      checkUserProfile()
    }

    // Check role and update whenever page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkUserProfile()
      }
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
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
    console.log('goToDashboard - role:', role)
    if (role && role.toLowerCase().includes('student')) {
      console.log('Navigating to student dashboard')
      navigate('/student/dashboard')
    } else if (role && (role.toLowerCase().includes('transport') || role.toLowerCase().includes('admin'))) {
      console.log('Navigating to transport dashboard')
      navigate('/admin/dashboard')
    } else {
      console.log('No matching role, navigating to home')
      navigate('/')
    }
  }

  const getInitial = () => {
    if (userRole === 'Admin') {
      return 'A'
    }
    return userName.charAt(0).toUpperCase()
  }

  const handleGoBack = () => {
    if (canGoBack) {
      window.history.back()
    }
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
  <li><Link to="/" className="nav-link">Home</Link></li>
  <li><Link to="/support" className="nav-link">Support</Link></li>
  <li><Link to="/student/route" className="nav-link">Routes</Link></li>
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
                      <p className="dropdown-role">{userRole}</p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={goToDashboard}>
                    Dashboard
                  </button>
                  <button className="dropdown-item logout-item" onClick={handleLogout}>
                    Logout
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
              Get Started 
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
