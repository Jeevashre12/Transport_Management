import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaClock, FaEnvelope, FaPhoneAlt, FaRoute } from 'react-icons/fa'
import homeLogo from '../../assets/klogo.png'
import '../../styles/Home.css'
import './Support.css'

export default function Support() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Bus Route Assistance',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const supportEmail = 'transport.support@kongu.edu'
  const supportPhone = '+91 98427 20087'
  const officeHours = 'Mon–Sat, 8:00 AM – 6:00 PM'

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

  const supportOptions = useMemo(
    () => [
      {
        title: 'Bus Route Assistance',
        description: 'Route availability, stop locations, and route changes for your area.',
        icon: <FaRoute />,
        actionLabel: 'Request Route Help',
        category: 'Bus Route Assistance',
      },
      {
        title: 'Schedule & Timing Support',
        description: 'Help with timings, delays, missed pickups, and schedule updates.',
        icon: <FaClock />,
        actionLabel: 'Report Timing Issue',
        category: 'Schedule & Timing Support',
      },
      {
        title: 'Emergency Contact',
        description: 'For urgent safety or service disruptions, contact the transport office immediately.',
        icon: <FaPhoneAlt />,
        actionLabel: 'Call Now',
        category: 'Emergency Contact',
        emergency: true,
      },
    ],
    []
  )

  const getInitial = () => (userName ? userName.charAt(0).toUpperCase() : 'U')

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
    if (role && role.includes('student')) navigate('/student/dashboard')
  }

  const scrollToFormWithCategory = (category) => {
    setSubmitted(false)
    setFormData((prev) => ({ ...prev, category }))
    requestAnimationFrame(() => {
      const el = document.getElementById('help-request')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData((prev) => ({ ...prev, message: '' }))
  }

  return (
    <div className="support-page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => navigate('/')} role="button" tabIndex={0}>
            <div className="logo-circle">
              <img src={homeLogo} alt="BusSync Logo" className="logo-image" />
            </div>
            <span className="logo-main">
              <span className="logo-white">BUS</span>
              <span className="logo-yellow">SYNC</span>
            </span>
          </div>

          <ul className="nav-menu">
            <li>
              <a
                href="/"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/')
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/support"
                className="nav-link nav-link-active"
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
            <button className="nav-button" onClick={() => navigate('/login')}>
              Login / Sign Up
            </button>
          )}
        </div>
      </nav>

      <section className="support-hero">
        <div className="support-container">
          <div className="support-hero-card">
            <div className="support-hero-text">
              <h1 className="support-title">Transport Support Center</h1>
              <p className="support-subtitle">Help for routes, schedules, and transport issues.</p>
              <div className="support-hero-actions">
                <button className="support-primary-btn" onClick={() => scrollToFormWithCategory('Bus Route Assistance')}>
                  Submit a Help Request
                </button>
                <button className="support-secondary-btn" onClick={() => navigate('/')}>
                  Back to Home
                </button>
              </div>
            </div>

            <div className="support-hero-meta">
              <div className="support-meta-item">
                <FaEnvelope />
                <div>
                  <p className="support-meta-label">Email</p>
                  <a className="support-meta-value" href={`mailto:${supportEmail}`}>
                    {supportEmail}
                  </a>
                </div>
              </div>
              <div className="support-meta-item">
                <FaPhoneAlt />
                <div>
                  <p className="support-meta-label">Phone</p>
                  <a className="support-meta-value" href={`tel:${supportPhone.replace(/[^+\d]/g, '')}`}>
                    {supportPhone}
                  </a>
                </div>
              </div>
              <div className="support-meta-item">
                <FaClock />
                <div>
                  <p className="support-meta-label">Office Hours</p>
                  <p className="support-meta-value">{officeHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="support-section">
        <div className="support-container">
          <div className="support-section-header">
            <h2>Support Options</h2>
            <p>Choose the category that best matches your need. We’ll route it to the right team.</p>
          </div>

          <div className="support-grid">
            {supportOptions.map((opt) => (
              <div key={opt.title} className={`support-card ${opt.emergency ? 'support-card-emergency' : ''}`}>
                <div className="support-card-top">
                  <div className="support-icon">{opt.icon}</div>
                  <h3>{opt.title}</h3>
                </div>
                <p className="support-card-desc">{opt.description}</p>

                {opt.emergency ? (
                  <div className="support-card-actions">
                    <a className="support-danger-btn" href={`tel:${supportPhone.replace(/[^+\d]/g, '')}`}>
                      {opt.actionLabel}
                    </a>
                    <button className="support-secondary-btn" onClick={() => scrollToFormWithCategory(opt.category)}>
                      Send Details
                    </button>
                  </div>
                ) : (
                  <div className="support-card-actions">
                    <button className="support-primary-btn" onClick={() => scrollToFormWithCategory(opt.category)}>
                      {opt.actionLabel}
                    </button>
                    <a className="support-link" href={`mailto:${supportEmail}?subject=${encodeURIComponent(opt.title)}`}>
                      Email Support
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="support-section">
        <div className="support-container">
          <div className="support-two-col">
            <div className="support-panel">
              <h2>Contact Support</h2>
              <p className="support-panel-text">
                Reach out anytime during office hours. For urgent issues, use the emergency contact option.
              </p>

              <div className="support-contact-list">
                <div className="support-contact-row">
                  <FaEnvelope />
                  <div>
                    <p className="support-contact-label">Support Email</p>
                    <a className="support-contact-value" href={`mailto:${supportEmail}`}>
                      {supportEmail}
                    </a>
                  </div>
                </div>
                <div className="support-contact-row">
                  <FaPhoneAlt />
                  <div>
                    <p className="support-contact-label">Transport Office Phone (Mr. Sakthivel – Transport Maintenance)</p>
                    <a className="support-contact-value" href={`tel:${supportPhone.replace(/[^+\d]/g, '')}`}>
                      {supportPhone}
                    </a>
                  </div>
                </div>
                <div className="support-contact-row">
                  <FaClock />
                  <div>
                    <p className="support-contact-label">Working Hours</p>
                    <p className="support-contact-value">{officeHours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="support-panel" id="help-request">
              <h2>Help Request Form</h2>
              <p className="support-panel-text">Send details and we’ll get back to you as soon as possible.</p>

              {submitted && (
                <div className="support-success">
                  Your request has been submitted (demo). For immediate help, call the transport office.
                </div>
              )}

              <form className="support-form" onSubmit={onSubmit}>
                <div className="support-form-row">
                  <div className="support-field">
                    <label htmlFor="support-name">Name</label>
                    <input
                      id="support-name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="support-field">
                    <label htmlFor="support-email">Email</label>
                    <input
                      id="support-email"
                      type="email"
                      placeholder="name@kongu.edu"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="support-field">
                  <label htmlFor="support-category">Bus Route / Issue Category</label>
                  <select
                    id="support-category"
                    value={formData.category}
                    onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))}
                  >
                    <option>Bus Route Assistance</option>
                    <option>Schedule & Timing Support</option>
                    <option>Emergency Contact</option>
                  </select>
                </div>

                <div className="support-field">
                  <label htmlFor="support-message">Message</label>
                  <textarea
                    id="support-message"
                    rows={5}
                    placeholder="Describe your issue (route number, stop name, time, and any other helpful details)."
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    required
                  />
                </div>

                <div className="support-form-actions">
                  <button className="support-primary-btn" type="submit">
                    Submit Request
                  </button>
                  <button className="support-secondary-btn" type="button" onClick={() => navigate('/')}>
                    Back to Home
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="support-footer">
        <div className="support-container">
          <p className="support-footer-text">© {new Date().getFullYear()} BusSync — Campus Transport Management</p>
        </div>
      </footer>
    </div>
  )
}

