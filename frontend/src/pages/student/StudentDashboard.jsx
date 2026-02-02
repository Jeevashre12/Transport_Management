import "./StudentDashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homeLogo from "../../assets/klogo.png";

function StudentDashboard() {
  const navigate = useNavigate();
  
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    rollNumber: "",
    department: ""
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Check if user is an admin trying to access student dashboard
    if (role && (role.toLowerCase().includes('transport') || role.toLowerCase().includes('admin'))) {
      navigate('/transport/dashboard');
      return;
    }
    
    // Load student info from localStorage
    const savedStudentInfo = localStorage.getItem('studentInfo');
    if (savedStudentInfo) {
      try {
        setStudentInfo(JSON.parse(savedStudentInfo));
      } catch (error) {
        console.error('Error loading student info:', error);
      }
    }
    
    // Load bus details from localStorage
    const savedBusInfo = localStorage.getItem('busInfo');
    if (savedBusInfo) {
      try {
        setBusInfo(JSON.parse(savedBusInfo));
      } catch (error) {
        console.error('Error loading bus info:', error);
      }
    }
  }, [navigate]);

  const [busInfo, setBusInfo] = useState(null);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showRequestStatusModal, setShowRequestStatusModal] = useState(false);
  const [myRequests, setMyRequests] = useState([]);
  const [studentFormData, setStudentFormData] = useState({
    studentName: "",
    rollNumber: "",
    department: ""
  });
  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    department: "",
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

  const handleStudentInputChange = (e) => {
    const { name, value } = e.target;
    setStudentFormData({
      ...studentFormData,
      [name]: value
    });
  };

  const handleOpenStudentForm = () => {
    setStudentFormData({
      studentName: studentInfo.name || "",
      rollNumber: studentInfo.rollNumber || "",
      department: studentInfo.department || ""
    });
    setShowStudentForm(true);
  };

  const handleSaveStudentDetails = (e) => {
    e.preventDefault();
    if (studentFormData.studentName && studentFormData.rollNumber && studentFormData.department) {
      const studentDetails = {
        name: studentFormData.studentName,
        rollNumber: studentFormData.rollNumber,
        department: studentFormData.department
      };
      setStudentInfo(studentDetails);
      localStorage.setItem('studentInfo', JSON.stringify(studentDetails));
      setShowStudentForm(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.studentName && formData.rollNumber && formData.department && 
        formData.busNumber && formData.routeName && formData.pickupTime && formData.dropTime) {
      
      // Save student information
      const studentDetails = {
        name: formData.studentName,
        rollNumber: formData.rollNumber,
        department: formData.department
      };
      setStudentInfo(studentDetails);
      localStorage.setItem('studentInfo', JSON.stringify(studentDetails));
      
      // Save bus details
      const busDetails = {
        busNumber: formData.busNumber,
        routeName: formData.routeName,
        pickupTime: formData.pickupTime,
        dropTime: formData.dropTime,
        status: "On Time"
      };
      setBusInfo(busDetails);
      localStorage.setItem('busInfo', JSON.stringify(busDetails));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    // Keep busInfo in localStorage so it persists after logout
    navigate('/login');
  };

  const handleEditDetails = () => {
    setBusInfo(null);
    setFormData({
      studentName: "",
      rollNumber: "",
      department: "",
      busNumber: "",
      routeName: "",
      pickupTime: "",
      dropTime: ""
    });
  };

  const handleViewRequestStatus = () => {
    // Load all requests from localStorage and filter by current student
    const allRequests = JSON.parse(localStorage.getItem('busChangeRequests') || '[]');
    const studentRequests = allRequests.filter(req => 
      req.rollNumber === studentInfo.rollNumber
    );
    setMyRequests(studentRequests);
    setShowRequestStatusModal(true);
  };

  return (
    <div className="student-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="back-to-home-btn" onClick={() => navigate('/')} title="Back to Home">
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
          <h1>Student Dashboard</h1>
        </div>
        <div className="header-right">
          <div className="student-info-header">
            <p>Student Name: <span>{studentInfo.name || 'Not Set'}</span></p>
            <p>Roll Number: <span>{studentInfo.rollNumber || 'Not Set'}</span></p>
            <p>Department: <span>{studentInfo.department || 'Not Set'}</span></p>
          </div>
          <button className="request-status-btn" onClick={handleViewRequestStatus} title="View Request Status">
            🔔
          </button>
          <button className="edit-student-btn" onClick={handleOpenStudentForm}>
            {studentInfo.name ? 'Edit Details' : 'Add Details'}
          </button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {!busInfo ? (
          // Form Section - Show when no bus details added
          <div className="form-section">
            <div className="form-container">
              <h2>Add Your Details</h2>
              <p className="form-subtitle">Please fill in your personal and bus route information to get started</p>
              <form onSubmit={handleSubmit} className="bus-details-form">
                
                {/* Student Personal Details */}
                <div className="form-section-title">Personal Information</div>
                
                <div className="form-group">
                  <label htmlFor="studentName">Student Name</label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    placeholder="Enter your full name"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rollNumber">Roll Number</label>
                  <input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    placeholder="e.g., 29-01"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    placeholder="e.g., Computer Science"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Bus Route Details */}
                <div className="form-section-title">Bus Route Details</div>
                
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
                  <button className="action-btn request-btn" onClick={() => navigate('/student/request-route')}>Request Route Change</button>
                  <button className="action-btn report-btn" onClick={() => navigate('/student/report-issue')}>Report an Issue</button>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="recent-notifications">
                <h3>Recent Notifications</h3>
                <div className="notifications-list">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="notification-item">
                      <span className={`notif-icon notif-${notif.type}`}></span>
                      <span className="notif-text">{notif.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Student Details Modal */}
      {showStudentForm && (
        <div className="modal-overlay" onClick={() => setShowStudentForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{studentInfo.name ? 'Edit Student Details' : 'Add Student Details'}</h2>
              <button className="close-btn" onClick={() => setShowStudentForm(false)}>×</button>
            </div>
            <form onSubmit={handleSaveStudentDetails} className="student-form">
              <div className="form-group">
                <label htmlFor="modal-studentName">Student Name</label>
                <input
                  type="text"
                  id="modal-studentName"
                  name="studentName"
                  placeholder="Enter your full name"
                  value={studentFormData.studentName}
                  onChange={handleStudentInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-rollNumber">Roll Number</label>
                <input
                  type="text"
                  id="modal-rollNumber"
                  name="rollNumber"
                  placeholder="e.g., 29-01"
                  value={studentFormData.rollNumber}
                  onChange={handleStudentInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-department">Department</label>
                <input
                  type="text"
                  id="modal-department"
                  name="department"
                  placeholder="e.g., Computer Science"
                  value={studentFormData.department}
                  onChange={handleStudentInputChange}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowStudentForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Request Status Modal */}
      {showRequestStatusModal && (
        <div className="modal-overlay" onClick={() => setShowRequestStatusModal(false)}>
          <div className="modal-content request-status-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>My Request Status</h2>
              <button className="close-btn" onClick={() => setShowRequestStatusModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {myRequests.length === 0 ? (
                <p className="no-requests">You haven't made any route change requests yet</p>
              ) : (
                <div className="requests-list">
                  {myRequests.map((request) => (
                    <div key={request.id} className="request-status-card">
                      <div className="request-status-header">
                        <h3>Route Change Request</h3>
                        <span className={`status-badge status-${request.status.toLowerCase()}`}>
                          {request.status}
                        </span>
                      </div>
                      <div className="request-status-details">
                        <div className="detail-row">
                          <span className="detail-label">Current Route:</span>
                          <span className="detail-value">{request.currentRoute}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Requested Route:</span>
                          <span className="detail-value">{request.requestedRoute}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Reason:</span>
                          <span className="detail-value">{request.reason}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Submitted:</span>
                          <span className="detail-value">{request.submittedDate}</span>
                        </div>
                        {request.approvalReason && (
                          <div className="detail-row approval-reason">
                            <span className="detail-label">Admin Response:</span>
                            <span className="detail-value">{request.approvalReason}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}    </div>
  );
}

export default StudentDashboard;