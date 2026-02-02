import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeptCoordinatorDashboard.css';

export default function DeptCoordinatorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Students', value: '156', icon: '👥' },
    { label: 'Pending Requests', value: '12', icon: '📋' },
    { label: 'Active Routes', value: '8', icon: '🚌' },
    { label: 'Issues Reported', value: '5', icon: '⚠️' },
  ];

  return (
    <div className="dept-coordinator-container">
      <header className="dept-header">
        <h1>Department Coordinator Dashboard</h1>
        <button onClick={() => navigate('/')} className="btn-logout">Logout</button>
      </header>

      <div className="dept-content">
        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
              onClick={() => navigate('/dept/requests')}
            >
              Student Requests
            </button>
            <button 
              className={`tab ${activeTab === 'issues' ? 'active' : ''}`}
              onClick={() => navigate('/dept/issues')}
            >
              Issue Reports
            </button>
            <button 
              className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => navigate('/dept/notifications')}
            >
              Notifications
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => navigate('/dept/requests')}>
              ✓ View Requests
            </button>
            <button className="action-btn" onClick={() => navigate('/dept/issues')}>
              ⚠️ View Issues
            </button>
            <button className="action-btn" onClick={() => navigate('/dept/notifications')}>
              🔔 Notifications
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-time">2 hours ago</span>
              <span className="activity-text">New request from Student ID: STU001</span>
              <span className="activity-status pending">Pending</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">5 hours ago</span>
              <span className="activity-text">Issue reported on Route #5</span>
              <span className="activity-status">Open</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">1 day ago</span>
              <span className="activity-text">Route #3 marked as completed</span>
              <span className="activity-status completed">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
