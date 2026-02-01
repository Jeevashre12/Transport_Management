import React from 'react'
import '../styles/Home.css'
import { FaUsers } from 'react-icons/fa'
import homeImage from '../assets/home.webp'
import homeLogo from '../assets/klogo.png'

export default function Home() {
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
            <li><a href="#support" className="nav-link">Support</a></li>
            <li><a href="#support" className="nav-link">Routes</a></li>
            <li><a href="#support" className="nav-link">Support</a></li>
          </ul>

          <a href="/login" className="nav-button">Login / Sign Up</a>
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

            <button className="cta-button">
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
