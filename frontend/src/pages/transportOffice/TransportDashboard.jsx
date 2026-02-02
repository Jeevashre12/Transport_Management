import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./TransportDashboard.css";
import ApprovalSystem from "./ApprovalSystem";
import homeLogo from '../../assets/klogo.png';

const TransportDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [busChangeRequests, setBusChangeRequests] = useState([]);
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [reportedIssues, setReportedIssues] = useState([]);
  const [showIssuesModal, setShowIssuesModal] = useState(false);

  useEffect(() => {
    // Set admin name for transport dashboard
    setUserName('Admin');

    // Load bus change requests from localStorage on component mount
    const requests = JSON.parse(localStorage.getItem('busChangeRequests') || '[]');
    console.log('Initial load - requests from localStorage:', requests);
    setBusChangeRequests(requests);

    // Load reported issues from localStorage
    const issues = JSON.parse(localStorage.getItem('reportedIssues') || '[]');
    console.log('Initial load - issues from localStorage:', issues);
    setReportedIssues(issues);

    // Refresh requests when window gains focus
    const handleFocus = () => {
      console.log('Window focused - refreshing requests');
      const updatedRequests = JSON.parse(localStorage.getItem('busChangeRequests') || '[]');
      setBusChangeRequests(updatedRequests);
      
      const updatedIssues = JSON.parse(localStorage.getItem('reportedIssues') || '[]');
      setReportedIssues(updatedIssues);
    };

    window.addEventListener('focus', handleFocus);

    // Cleanup
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleViewBusChangeRequests = () => {
    console.log('Bus Change Requests button clicked');
    const requests = JSON.parse(localStorage.getItem('busChangeRequests') || '[]');
    console.log('Loaded requests from localStorage:', requests);
    console.log('Number of requests:', requests.length);
    setBusChangeRequests(requests);
    setShowRequestsModal(true);
  };

  const handleApproveRequest = (requestId) => {
    const updatedRequests = busChangeRequests.map(req =>
      req.id === requestId ? { ...req, status: 'Approved' } : req
    );
    setBusChangeRequests(updatedRequests);
    localStorage.setItem('busChangeRequests', JSON.stringify(updatedRequests));
  };

  const handleRejectRequest = (requestId) => {
    const updatedRequests = busChangeRequests.map(req =>
      req.id === requestId ? { ...req, status: 'Rejected' } : req
    );
    setBusChangeRequests(updatedRequests);
    localStorage.setItem('busChangeRequests', JSON.stringify(updatedRequests));
  };

  const handleViewReportedIssues = () => {
    console.log('Manage Issues button clicked');
    const issues = JSON.parse(localStorage.getItem('reportedIssues') || '[]');
    console.log('Loaded issues from localStorage:', issues);
    setReportedIssues(issues);
    setShowIssuesModal(true);
  };

  const handleResolveIssue = (issueId) => {
    const updatedIssues = reportedIssues.map(issue =>
      issue.id === issueId ? { ...issue, status: 'Resolved' } : issue
    );
    setReportedIssues(updatedIssues);
    localStorage.setItem('reportedIssues', JSON.stringify(updatedIssues));
  };

  return (
    <div className="transport-dashboard">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate('/')}>
        ←
      </button>

      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <div className="logo-circle">
            <img src={homeLogo} alt="Logo" className="logo-img" />
          </div>
          <div className="header-text">
            <h1>Transport Office Dashboard</h1>
            <p>Smart Campus Transport Management System</p>
          </div>
        </div>
        <div className="admin-profile">
          <div className="admin-info">
            <span className="admin-name">{userName}</span>
            <span className="admin-role">Transport Admin</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === "approvals" ? "active" : ""}`}
          onClick={() => setActiveTab("approvals")}
        >
          Approvals
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          {/* Summary Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Buses Today</h3>
              <p>48</p>
            </div>

            <div className="stat-card">
              <h3>Active Routes</h3>
              <p>22</p>
            </div>

            <div className="stat-card">
              <h3>Students Using Transport</h3>
              <p>1850</p>
            </div>

            <div className="stat-card">
              <h3>Pending Requests</h3>
              <p>{busChangeRequests.filter(r => r.status === 'Pending').length || 0}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="dashboard-content">

            {/* Quick Actions */}
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <button>Manage Routes</button>
              <button onClick={handleViewBusChangeRequests}>Bus Change Requests</button>
              <button>Extra Class Requests</button>
              <button onClick={handleViewReportedIssues}>Manage Issues</button>
            </div>

            {/* Alerts Panel */}
            <div className="alerts-panel">
              <h2>Alerts & Updates</h2>
              <ul>
                <li>Route 12 has low student count</li>
                <li>Bus 5 delayed by 15 minutes</li>
                <li>Extra class request pending approval</li>
              </ul>
            </div>

          </div>
        </>
      )}

      {/* Approvals Tab */}
      {activeTab === "approvals" && (
        <ApprovalSystem />
      )}

      {/* Bus Change Requests Modal */}
      {showRequestsModal && (
        <div className="modal-overlay" onClick={() => setShowRequestsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Bus Change Requests ({busChangeRequests.length})</h2>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button 
                  className="refresh-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    const requests = JSON.parse(localStorage.getItem('busChangeRequests') || '[]');
                    console.log('Manual refresh - loaded requests:', requests);
                    setBusChangeRequests(requests);
                  }}
                  title="Refresh Requests"
                  style={{ 
                    background: '#FFB300', 
                    border: 'none', 
                    color: '#000', 
                    padding: '8px 16px', 
                    borderRadius: '6px', 
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  Refresh
                </button>
                <button className="close-btn" onClick={() => setShowRequestsModal(false)}>×</button>
              </div>
            </div>
            
            <div className="modal-body">{busChangeRequests.length === 0 ? (
                <p className="no-requests">No bus change requests yet</p>
              ) : (
                <div className="requests-list">
                  {busChangeRequests.map((request) => (
                    <div key={request.id} className="request-card">
                      <div className="request-header">
                        <div className="request-title">
                          <h3>{request.studentName}</h3>
                          <p className="request-roll">{request.rollNumber} - {request.department}</p>
                        </div>
                        <span className={`status-badge status-${request.status.toLowerCase()}`}>
                          {request.status}
                        </span>
                      </div>
                      
                      <div className="request-details">
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
                          <span className="detail-value detail-reason">{request.reason}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Submitted:</span>
                          <span className="detail-value">{request.submittedDate} at {request.submittedTime}</span>
                        </div>
                      </div>
                      
                      {request.status === 'Pending' && (
                        <div className="request-actions">
                          <button className="approve-btn" onClick={() => handleApproveRequest(request.id)}>
                            Approve
                          </button>
                          <button className="reject-btn" onClick={() => handleRejectRequest(request.id)}>
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reported Issues Modal */}
      {showIssuesModal && (
        <div className="modal-overlay" onClick={() => setShowIssuesModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Reported Issues ({reportedIssues.length})</h2>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button 
                  className="refresh-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    const issues = JSON.parse(localStorage.getItem('reportedIssues') || '[]');
                    console.log('Manual refresh - loaded issues:', issues);
                    setReportedIssues(issues);
                  }}
                  title="Refresh Issues"
                  style={{ 
                    background: '#FFB300', 
                    border: 'none', 
                    color: '#000', 
                    padding: '8px 16px', 
                    borderRadius: '6px', 
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  Refresh
                </button>
                <button className="close-btn" onClick={() => setShowIssuesModal(false)}>×</button>
              </div>
            </div>
            
            <div className="modal-body">
              {reportedIssues.length === 0 ? (
                <p className="no-requests">No issues reported yet</p>
              ) : (
                <div className="requests-list">
                  {reportedIssues.map((issue) => (
                    <div key={issue.id} className="request-card issue-card">
                      <div className="request-header">
                        <div className="request-title">
                          <h3>{issue.studentName}</h3>
                          <p className="request-roll">{issue.rollNumber} - {issue.department}</p>
                        </div>
                        <span className={`status-badge status-${issue.status.toLowerCase()}`}>
                          {issue.status}
                        </span>
                      </div>
                      
                      <div className="request-details">
                        <div className="detail-row">
                          <span className="detail-label">Issue Type:</span>
                          <span className="detail-value issue-type">{issue.issueType}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Description:</span>
                          <span className="detail-value detail-reason">{issue.description}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Submitted:</span>
                          <span className="detail-value">{issue.submittedDate} at {issue.submittedTime}</span>
                        </div>
                      </div>
                      
                      {issue.status === 'Pending' && (
                        <div className="request-actions">
                          <button className="approve-btn" onClick={() => handleResolveIssue(issue.id)}>
                            Mark as Resolved
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default TransportDashboard;
