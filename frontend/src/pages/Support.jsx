import { useNavigate } from 'react-router-dom';
import './Support.css';

export default function Support() {
  const navigate = useNavigate();

  const modules = [
    {
      title: 'Student Module',
      icon: '👥',
      description: 'Access student transport services and track routes',
      routes: [
        { name: 'Dashboard', path: '/student/dashboard' },
        { name: 'View Routes', path: '/student/route' },
        { name: 'Request Route', path: '/student/request-route' },
        { name: 'Report Issue', path: '/student/report-issue' },
        { name: 'Notifications', path: '/student/notifications' },
      ]
    },
    {
      title: 'Transport Office',
      icon: '🚌',
      description: 'Manage buses, routes, and student approvals',
      routes: [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Approval System', path: '/admin/approvals' },
      ]
    },
    {
      title: 'Department Coordinator',
      icon: '📋',
      description: 'Coordinate student transport requests and issues',
      routes: [
        { name: 'Dashboard', path: '/dept/dashboard' },
        { name: 'Student Requests', path: '/dept/requests' },
        { name: 'Issue Reports', path: '/dept/issues' },
        { name: 'Notifications', path: '/dept/notifications' },
      ]
    },
  ];

  return (
    <div className="support-container">
      <header className="support-header">
        <h1>Transport Management System</h1>
        <p>Complete guide to all modules and features</p>
      </header>

      <div className="support-content">
        <div className="intro-section">
          <h2>Welcome to BUSSYNC</h2>
          <p>
            Our Transport Management System provides comprehensive solutions for managing student transportation,
            including route planning, request management, and issue resolution across three main modules.
          </p>
        </div>

        <div className="modules-grid">
          {modules.map((module, idx) => (
            <div key={idx} className="module-card">
              <div className="module-icon">{module.icon}</div>
              <h3>{module.title}</h3>
              <p className="module-description">{module.description}</p>
              <div className="module-routes">
                <h4>Quick Links:</h4>
                <ul>
                  {module.routes.map((route, ridx) => (
                    <li key={ridx}>
                      <button 
                        className="route-link"
                        onClick={() => navigate(route.path)}
                      >
                        {route.name} →
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <h4>Route Management</h4>
              <p>Manage and track all transport routes efficiently</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <h4>Request Processing</h4>
              <p>Handle student transport requests with ease</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <h4>Issue Tracking</h4>
              <p>Report and resolve transport-related issues</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <h4>Real-time Notifications</h4>
              <p>Stay updated with instant notifications</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <h4>Approval Workflow</h4>
              <p>Streamlined approval process for requests</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <h4>Map Integration</h4>
              <p>Visual route planning with map utilities</p>
            </div>
          </div>
        </div>

        <div className="help-section">
          <h2>Help & Support</h2>
          <div className="help-cards">
            <div className="help-card">
              <h4>For Students</h4>
              <ul>
                <li>Login with your student credentials</li>
                <li>Navigate to Student Dashboard</li>
                <li>View available routes and request changes</li>
                <li>Report any issues encountered</li>
                <li>Check notifications for updates</li>
              </ul>
            </div>
            <div className="help-card">
              <h4>For Transport Office</h4>
              <ul>
                <li>Access Admin Dashboard</li>
                <li>Review pending route requests</li>
                <li>Manage approvals in Approval System</li>
                <li>Monitor system statistics</li>
                <li>Track bus and route information</li>
              </ul>
            </div>
            <div className="help-card">
              <h4>For Department Coordinators</h4>
              <ul>
                <li>Access Coordinator Dashboard</li>
                <li>Review student transport requests</li>
                <li>Monitor and resolve reported issues</li>
                <li>Receive and manage notifications</li>
                <li>Coordinate with transport office</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="support-footer">
        <p>&copy; 2024 Transport Management System. All rights reserved.</p>
        <button onClick={() => navigate('/')} className="btn-home">
          ← Back to Home
        </button>
      </footer>
    </div>
  );
}
