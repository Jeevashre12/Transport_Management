import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeptRequests.css';

export default function DeptRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([
    { id: 1, studentId: 'STU001', name: 'Raj Kumar', route: 'Route #1', status: 'pending', date: '2024-02-01' },
    { id: 2, studentId: 'STU002', name: 'Priya Singh', route: 'Route #2', status: 'approved', date: '2024-02-02' },
    { id: 3, studentId: 'STU003', name: 'Amit Patel', route: 'Route #3', status: 'pending', date: '2024-02-02' },
    { id: 4, studentId: 'STU004', name: 'Sneha Das', route: 'Route #4', status: 'rejected', date: '2024-02-01' },
    { id: 5, studentId: 'STU005', name: 'Vikram Singh', route: 'Route #5', status: 'pending', date: '2024-02-03' },
  ]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [actionReason, setActionReason] = useState('');

  const handleApprove = (id) => {
    if (!actionReason.trim()) {
      alert('Please provide an approval reason');
      return;
    }
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'approved' } : req
    ));
    setSelectedRequest(null);
    setActionReason('');
  };

  const handleReject = (id) => {
    if (!actionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
    setSelectedRequest(null);
    setActionReason('');
  };

  const filteredRequests = filterStatus === 'all'
    ? requests
    : requests.filter(r => r.status === filterStatus);

  return (
    <div className="dept-requests-container">
      <header className="dept-header">
        <h1>Student Transport Requests</h1>
        <button onClick={() => navigate('/dept/dashboard')} className="btn-back">← Back</button>
      </header>

      <div className="requests-content">
        {/* Statistics */}
        <div className="request-stats">
          <div className="stat-item">
            <span className="stat-label">Total Requests</span>
            <span className="stat-count">{requests.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Pending</span>
            <span className="stat-count">{requests.filter(r => r.status === 'pending').length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Approved</span>
            <span className="stat-count">{requests.filter(r => r.status === 'approved').length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Rejected</span>
            <span className="stat-count">{requests.filter(r => r.status === 'rejected').length}</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Requests Table */}
        <div className="requests-table-wrapper">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Route</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(req => (
                <tr key={req.id}>
                  <td>{req.studentId}</td>
                  <td>{req.name}</td>
                  <td>{req.route}</td>
                  <td>{req.date}</td>
                  <td>
                    <span className={`status-badge status-${req.status}`}>
                      {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-view"
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

        {/* Modal for request details */}
        {selectedRequest && (
          <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedRequest(null)}>×</button>
              <h2>Request Details</h2>
              <div className="modal-body">
                <div className="detail-row">
                  <span className="detail-label">Student ID:</span>
                  <span className="detail-value">{selectedRequest.studentId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{selectedRequest.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Route:</span>
                  <span className="detail-value">{selectedRequest.route}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge status-${selectedRequest.status}`}>
                    {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{selectedRequest.date}</span>
                </div>

                {selectedRequest.status === 'pending' && (
                  <>
                    <textarea
                      placeholder="Enter reason for approval/rejection"
                      value={actionReason}
                      onChange={e => setActionReason(e.target.value)}
                      className="reason-textarea"
                    />
                    <div className="modal-actions">
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
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
