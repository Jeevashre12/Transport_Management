import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeptIssueReports.css';

export default function DeptIssueReports() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([
    { id: 1, studentId: 'STU001', title: 'Bus delayed by 30 minutes', route: 'Route #1', severity: 'high', status: 'open', date: '2024-02-02' },
    { id: 2, studentId: 'STU002', title: 'Driver behavior complaint', route: 'Route #2', severity: 'medium', status: 'in-progress', date: '2024-02-02' },
    { id: 3, studentId: 'STU003', title: 'Bus condition issue', route: 'Route #3', severity: 'low', status: 'open', date: '2024-02-01' },
    { id: 4, studentId: 'STU004', title: 'Missing stop on route', route: 'Route #5', severity: 'high', status: 'resolved', date: '2024-01-31' },
  ]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [resolutionNotes, setResolutionNotes] = useState('');

  const handleResolve = (id) => {
    if (!resolutionNotes.trim()) {
      alert('Please provide resolution notes');
      return;
    }
    setIssues(issues.map(issue =>
      issue.id === id ? { ...issue, status: 'resolved' } : issue
    ));
    setSelectedIssue(null);
    setResolutionNotes('');
  };

  const filteredIssues = filterStatus === 'all'
    ? issues
    : issues.filter(i => i.status === filterStatus);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#9aa6b2';
    }
  };

  return (
    <div className="dept-issues-container">
      <header className="dept-header">
        <h1>Issue Reports</h1>
        <button onClick={() => navigate('/dept/dashboard')} className="btn-back">← Back</button>
      </header>

      <div className="issues-content">
        {/* Statistics */}
        <div className="issue-stats">
          <div className="stat-item open">
            <span className="stat-label">Open</span>
            <span className="stat-count">{issues.filter(i => i.status === 'open').length}</span>
          </div>
          <div className="stat-item in-progress">
            <span className="stat-label">In Progress</span>
            <span className="stat-count">{issues.filter(i => i.status === 'in-progress').length}</span>
          </div>
          <div className="stat-item resolved">
            <span className="stat-label">Resolved</span>
            <span className="stat-count">{issues.filter(i => i.status === 'resolved').length}</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {['all', 'open', 'in-progress', 'resolved'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Issues List */}
        <div className="issues-list">
          {filteredIssues.map(issue => (
            <div key={issue.id} className="issue-card">
              <div className="issue-header">
                <h3>{issue.title}</h3>
                <div className="issue-badges">
                  <span 
                    className="severity-badge"
                    style={{ borderColor: getSeverityColor(issue.severity) }}
                  >
                    {issue.severity.toUpperCase()}
                  </span>
                  <span className={`status-badge status-${issue.status}`}>
                    {issue.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                </div>
              </div>
              <div className="issue-body">
                <p><strong>Student ID:</strong> {issue.studentId}</p>
                <p><strong>Route:</strong> {issue.route}</p>
                <p><strong>Date:</strong> {issue.date}</p>
              </div>
              <button 
                className="btn-details"
                onClick={() => setSelectedIssue(issue)}
              >
                View Details →
              </button>
            </div>
          ))}
        </div>

        {/* Modal for issue details */}
        {selectedIssue && (
          <div className="modal-overlay" onClick={() => setSelectedIssue(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedIssue(null)}>×</button>
              <h2>Issue Details</h2>
              <div className="modal-body">
                <div className="detail-section">
                  <h3>{selectedIssue.title}</h3>
                  <div className="detail-row">
                    <span className="detail-label">Student ID:</span>
                    <span className="detail-value">{selectedIssue.studentId}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Route:</span>
                    <span className="detail-value">{selectedIssue.route}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Severity:</span>
                    <span 
                      className="severity-badge"
                      style={{ borderColor: getSeverityColor(selectedIssue.severity) }}
                    >
                      {selectedIssue.severity.toUpperCase()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge status-${selectedIssue.status}`}>
                      {selectedIssue.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Date Reported:</span>
                    <span className="detail-value">{selectedIssue.date}</span>
                  </div>
                </div>

                {selectedIssue.status !== 'resolved' && (
                  <>
                    <textarea
                      placeholder="Enter resolution notes..."
                      value={resolutionNotes}
                      onChange={e => setResolutionNotes(e.target.value)}
                      className="resolution-textarea"
                    />
                    <button
                      className="btn-resolve"
                      onClick={() => handleResolve(selectedIssue.id)}
                    >
                      ✓ Mark as Resolved
                    </button>
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
