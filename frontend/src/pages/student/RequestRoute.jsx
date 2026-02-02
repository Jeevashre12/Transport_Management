import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestRoute.css';
import homeLogo from '../../assets/klogo.png';

function RequestRoute() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentRoute: 'Erode – College',
    requestedRoute: '',
    reason: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Route change request submitted successfully!');
    navigate('/student/dashboard');
  };

  return (
    <div className="request-route-page">
      {/* Header */}
      <header className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/student/dashboard')} title="Back to Dashboard">
            ←
          </button>
          <div className="logo">
            <div className="logo-circle">
              <img
                src={homeLogo}
                alt="BusSync Logo"
                className="logo-image"
              />
            </div>
            <span className="logo-text">
              <span className="logo-white">BUS</span>
              <span className="logo-yellow">SYNC</span>
            </span>
          </div>
          <h1>Request Route Change</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="page-content">
        <div className="form-card">
          <h2>Request a Route Change</h2>
          <p className="form-description">Fill in the details below to request a change to your bus route</p>
          
          <form onSubmit={handleSubmit} className="route-form">
            <div className="form-group">
              <label htmlFor="currentRoute">Current Route</label>
              <input
                type="text"
                id="currentRoute"
                name="currentRoute"
                value={formData.currentRoute}
                disabled
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="requestedRoute">Requested Route</label>
              <select
                id="requestedRoute"
                name="requestedRoute"
                value={formData.requestedRoute}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select a route</option>
                <option value="Gobi – College">Gobi – College</option>
                <option value="Tiruppur – College">Tiruppur – College</option>
                <option value="Salem – College">Salem – College</option>
                <option value="Karur – College">Karur – College</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason for Change</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Please explain why you need to change your route..."
                rows="5"
                required
                className="form-textarea"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => navigate('/student/dashboard')}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestRoute;
