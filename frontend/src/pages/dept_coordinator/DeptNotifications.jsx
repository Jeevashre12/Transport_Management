import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeptNotifications.css';

export default function DeptNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'request', title: 'New Route Request', message: 'Student STU001 requested route change', time: '2 hours ago', read: false },
    { id: 2, type: 'issue', title: 'Bus Issue Reported', message: 'Issue reported on Route #2 - Bus delayed', time: '5 hours ago', read: false },
    { id: 3, type: 'approval', title: 'Request Approved', message: 'Route request STU003 has been approved', time: '1 day ago', read: true },
    { id: 4, type: 'issue', title: 'Issue Resolved', message: 'Issue on Route #5 has been resolved', time: '2 days ago', read: true },
    { id: 5, type: 'request', title: 'Route Request Pending', message: 'STU004 request is pending approval', time: '3 days ago', read: true },
  ]);

  const handleMarkRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'request': return '📋';
      case 'issue': return '⚠️';
      case 'approval': return '✓';
      default: return '🔔';
    }
  };

  return (
    <div className="dept-notifications-container">
      <header className="dept-header">
        <h1>Notifications {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}</h1>
        <button onClick={() => navigate('/dept/dashboard')} className="btn-back">← Back</button>
      </header>

      <div className="notifications-content">
        {/* Action Buttons */}
        {unreadCount > 0 && (
          <button className="btn-mark-all" onClick={handleMarkAllRead}>
            Mark All as Read
          </button>
        )}

        {/* Notifications List */}
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="empty-state">
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div 
                key={notif.id} 
                className={`notification-item ${notif.read ? 'read' : 'unread'}`}
              >
                <div className="notif-icon">
                  {getNotificationIcon(notif.type)}
                </div>
                <div className="notif-content">
                  <div className="notif-header">
                    <h3>{notif.title}</h3>
                    <span className="notif-time">{notif.time}</span>
                  </div>
                  <p className="notif-message">{notif.message}</p>
                </div>
                <div className="notif-actions">
                  {!notif.read && (
                    <button 
                      className="btn-mark"
                      onClick={() => handleMarkRead(notif.id)}
                      title="Mark as read"
                    >
                      •
                    </button>
                  )}
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(notif.id)}
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
