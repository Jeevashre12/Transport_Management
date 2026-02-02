import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportIssue.css';
import homeLogo from '../../assets/klogo.png';

function ReportIssue() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    issueType: '',
    description: ''
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
    
    // Get student info from localStorage
    const studentInfo = JSON.parse(localStorage.getItem('studentInfo') || '{}');
    
    // Create issue object
    const issue = {
      id: Date.now(),
      studentName: studentInfo.name || 'Unknown',
      rollNumber: studentInfo.rollNumber || 'N/A',
      department: studentInfo.department || 'N/A',
      issueType: formData.issueType,
      description: formData.description,
      status: 'Pending',
      submittedDate: new Date().toLocaleDateString(),
      submittedTime: new Date().toLocaleTimeString()
    };
    
    // Save to localStorage
    const existingIssues = JSON.parse(localStorage.getItem('reportedIssues') || '[]');
    existingIssues.push(issue);
    localStorage.setItem('reportedIssues', JSON.stringify(existingIssues));
    
    console.log('Issue reported:', issue);
    alert('Issue reported successfully! We will look into it.');
    navigate('/student/dashboard');
  };

  return (
    <div className="report-issue-page">
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
          <h1>Report an Issue</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="page-content">
        <div className="form-card">
          <h2>Report a Bus Issue</h2>
          <p className="form-description">Help us improve by reporting any issues you encounter</p>
          
          <form onSubmit={handleSubmit} className="issue-form">
            <div className="form-group">
              <label htmlFor="issueType">Issue Type</label>
              <select
                id="issueType"
                name="issueType"
                value={formData.issueType}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select an issue type</option>
                <option value="Bus Delay">Bus Delay</option>
                <option value="Overcrowding">Overcrowding</option>
                <option value="Bus Condition">Bus Condition</option>
                <option value="Driver Behavior">Driver Behavior</option>
                <option value="Route Issue">Route Issue</option>
                <option value="Safety Concern">Safety Concern</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Please describe the issue in detail..."
                rows="6"
                required
                className="form-textarea"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => navigate('/student/dashboard')}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Submit Issue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportIssue;
