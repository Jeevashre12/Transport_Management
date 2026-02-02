import React from "react";
import "./TransportDashboard.css";

const TransportDashboard = () => {
  return (
    <div className="transport-dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <h1>Transport Office Dashboard</h1>
        <p>Smart Campus Transport Management System</p>
      </div>

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
          <p>7</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <button>Manage Routes</button>
          <button>Bus Change Requests</button>
          <button>Extra Class Requests</button>
          <button>Send Notification</button>
        </div>

        {/* Alerts Panel */}
        <div className="alerts-panel">
          <h2>Alerts & Updates</h2>
          <ul>
            <li>⚠️ Route 12 has low student count</li>
            <li>⏰ Bus 5 delayed by 15 minutes</li>
            <li>📌 Extra class request pending approval</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default TransportDashboard;
