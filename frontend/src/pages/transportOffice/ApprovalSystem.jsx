import React, { useState, useEffect } from "react";
import "./ApprovalSystem.css";

const ApprovalSystem = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Load bus change requests from localStorage and merge with existing requests
    const loadRequests = () => {
      const busChangeRequests = JSON.parse(localStorage.getItem('busChangeRequests') || '[]');
      console.log('Loading bus change requests into ApprovalSystem:', busChangeRequests);
      
      // Convert bus change requests to approval system format
      const formattedBusRequests = busChangeRequests.map(req => ({
        id: req.id,
        requestType: 'Bus Change',
        studentName: req.studentName,
        department: req.department,
        details: `Change from ${req.currentRoute} to ${req.requestedRoute}`,
        reason: req.reason,
        status: req.status || 'Pending',
        date: req.submittedDate,
        approvalReason: req.approvalReason || ''
      }));
      
      // Set the requests from localStorage
      setRequests(formattedBusRequests);
    };

    loadRequests();

    // Refresh when window gains focus
    const handleFocus = () => {
      loadRequests();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionReason, setActionReason] = useState("");
  const [filterStatus, setFilterStatus] = useState("Approved");

  const handleApprove = (id) => {
    if (!actionReason.trim()) {
      alert("Please provide an approval reason");
      return;
    }
    setRequests(
      requests.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "Approved",
              approvalReason: actionReason,
            }
          : req
      )
    );
    
    // Also update in localStorage if it's a bus change request
    const busChangeRequests = JSON.parse(localStorage.getItem('busChangeRequests') || '[]');
    const updatedBusRequests = busChangeRequests.map(req =>
      req.id === id ? { ...req, status: 'Approved', approvalReason: actionReason } : req
    );
    localStorage.setItem('busChangeRequests', JSON.stringify(updatedBusRequests));
    
    setSelectedRequest(null);
    setActionReason("");
  };

  const handleReject = (id) => {
    if (!actionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }
    setRequests(
      requests.map((req) =>
        req.id === id
          ? {
              ...req,
              status: "Rejected",
              approvalReason: actionReason,
            }
          : req
      )
    );
    
    // Also update in localStorage if it's a bus change request
    const busChangeRequests = JSON.parse(localStorage.getItem('busChangeRequests') || '[]');
    const updatedBusRequests = busChangeRequests.map(req =>
      req.id === id ? { ...req, status: 'Rejected', approvalReason: actionReason } : req
    );
    localStorage.setItem('busChangeRequests', JSON.stringify(updatedBusRequests));
    
    setSelectedRequest(null);
    setActionReason("");
  };

  const filteredRequests =
    filterStatus === "All"
      ? requests
      : requests.filter((req) => req.status === filterStatus);

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "Pending").length,
    approved: requests.filter((r) => r.status === "Approved").length,
    rejected: requests.filter((r) => r.status === "Rejected").length,
  };

  return (
    <div className="approval-system">
      <h2>Request Approval System</h2>

      {/* Stats */}
      <div className="approval-stats">
        <div className="stat-item">
          <span className="stat-label">Total Requests</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-item pending">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{stats.pending}</span>
        </div>
        <div className="stat-item approved">
          <span className="stat-label">Approved</span>
          <span className="stat-value">{stats.approved}</span>
        </div>
        <div className="stat-item rejected">
          <span className="stat-label">Rejected</span>
          <span className="stat-value">{stats.rejected}</span>
        </div>
      </div>

      {/* Filter */}
      <div className="filter-section">
        <label>Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Requests Table */}
      <div className="requests-container">
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request Type</th>
              <th>Student Name</th>
              <th>Department</th>
              <th>Details</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id} className={`status-${req.status.toLowerCase()}`}>
                <td>{req.requestType}</td>
                <td>{req.studentName}</td>
                <td>{req.department}</td>
                <td>{req.details}</td>
                <td>{req.date}</td>
                <td>
                  <span className={`status-badge status-${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => setSelectedRequest(req)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedRequest(null)}
            >
              ✕
            </button>

            <h3>Request Details</h3>

            <div className="detail-section">
              <div className="detail-row">
                <span className="label">Request Type:</span>
                <span className="value">{selectedRequest.requestType}</span>
              </div>
              <div className="detail-row">
                <span className="label">Student Name:</span>
                <span className="value">{selectedRequest.studentName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Department:</span>
                <span className="value">{selectedRequest.department}</span>
              </div>
              <div className="detail-row">
                <span className="label">Details:</span>
                <span className="value">{selectedRequest.details}</span>
              </div>
              <div className="detail-row">
                <span className="label">Reason:</span>
                <span className="value">{selectedRequest.reason}</span>
              </div>
              <div className="detail-row">
                <span className="label">Date:</span>
                <span className="value">{selectedRequest.date}</span>
              </div>
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className={`status-badge status-${selectedRequest.status.toLowerCase()}`}>
                  {selectedRequest.status}
                </span>
              </div>

              {selectedRequest.approvalReason && (
                <div className="detail-row">
                  <span className="label">Decision Reason:</span>
                  <span className="value">{selectedRequest.approvalReason}</span>
                </div>
              )}
            </div>

            {selectedRequest.status === "Pending" && (
              <div className="action-section">
                <textarea
                  placeholder="Enter approval/rejection reason..."
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  className="reason-input"
                />
                <div className="button-group">
                  <button
                    className="btn-approve"
                    onClick={() => handleApprove(selectedRequest.id)}
                  >
                    ✓ Approve
                  </button>
                  <button
                    className="btn-reject"
                    onClick={() => handleReject(selectedRequest.id)}
                  >
                    ✗ Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalSystem;
