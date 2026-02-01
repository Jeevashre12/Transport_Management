import "./StudentDashboard.css";
import { useState } from "react";

function StudentDashboard() {
  const [studentInfo] = useState({
    name: "Jane Doe",
    rollNumber: "29-01",
    department: "Computer Science"
  });

  const [busInfo, setBusInfo] = useState(null);
  const [formData, setFormData] = useState({
    busNumber: "",
    routeName: "",
    pickupTime: "",
    dropTime: ""
  });

  const [notifications] = useState([
    { id: 1, type: "delay", message: "Bus delayed by 10 minutes" },
    { id: 2, type: "approved", message: "Route change request approved" },
    { id: 3, type: "info", message: "1 hour ago" },
    { id: 4, type: "update", message: "New safety guidelines released" },
    { id: 5, type: "info", message: "2 hours ago" }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.busNumber && formData.routeName && formData.pickupTime && formData.dropTime) {
      setBusInfo({
        busNumber: formData.busNumber,
        routeName: formData.routeName,
        pickupTime: formData.pickupTime,
        dropTime: formData.dropTime,
        status: "On Time"
      });
    }
  };

  const handleEditDetails = () => {
    setBusInfo(null);
    setFormData({
      busNumber: "",
      routeName: "",
      pickupTime: "",
      dropTime: ""
    });
  };

  return (
    <div className="student-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">BUSSYNC</div>
          <h1>Student Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="student-info-header">
            <p>Student Name: <span>{studentInfo.name}</span></p>
            <p>Roll Number: <span>{studentInfo.rollNumber}</span></p>
            <p>Department: <span>{studentInfo.department}</span></p>
          </div>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {!busInfo ? (
          // Form Section - Show when no bus details added
          <div className="form-section">
            <div className="form-container">
              <h2>Add Your Bus Route Details</h2>
              <p className="form-subtitle">Please fill in your bus route information to get started</p>
              <form onSubmit={handleSubmit} className="bus-details-form">
                <div className="form-group">
                  <label htmlFor="busNumber">Bus Number</label>
                  <input
                    type="text"
                    id="busNumber"
                    name="busNumber"
                    placeholder="e.g., KA 01 AB 1234"
                    value={formData.busNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="routeName">Route Name</label>
                  <input
                    type="text"
                    id="routeName"
                    name="routeName"
                    placeholder="e.g., Route A - Main Campus to Hostel"
                    value={formData.routeName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pickupTime">Pickup Time</label>
                  <input
                    type="time"
                    id="pickupTime"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dropTime">Drop Time</label>
                  <input
                    type="time"
                    id="dropTime"
                    name="dropTime"
                    value={formData.dropTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">Submit Details</button>
              </form>
            </div>
          </div>
        ) : (
          // Dashboard View - Show after form submission
          <>
            {/* Left Section - Assigned Bus & Route */}
            <div className="left-section">
              <div className="bus-route-card">
                <h2>Assigned Bus & Route</h2>
                <div className="bus-details">
                  <div className="detail-item">
                    <span className="label">Bus Number:</span>
                    <span className="value">{busInfo.busNumber}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Route Name:</span>
                    <span className="value">{busInfo.routeName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Pickup Time:</span>
                    <span className="value">{busInfo.pickupTime}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Drop Time:</span>
                    <span className="value">{busInfo.dropTime}</span>
                  </div>
                  <div className="detail-item status-item">
                    <span className="label">Today's Bus Status:</span>
                    <button className="status-badge on-time">{busInfo.status}</button>
                  </div>
                </div>
                <button onClick={handleEditDetails} className="edit-details-btn">Edit Details</button>
              </div>
            </div>

            {/* Right Section - Actions & Notifications */}
            <div className="right-section">
              {/* Quick Action Buttons */}
              <div className="quick-actions">
                <h3>Quick Action Buttons</h3>
                <div className="action-buttons">
                  <button className="action-btn request-btn">Request Route Change</button>
                  <button className="action-btn report-btn">Report an Issue</button>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="recent-notifications">
                <h3>Recent Notifications</h3>
                <div className="notifications-list">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="notification-item">
                      <span className={`notif-icon notif-${notif.type}`}>⚠</span>
                      <span className="notif-text">{notif.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
