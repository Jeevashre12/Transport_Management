import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaPlus, FaBell, FaExclamationCircle, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import "./DeptCoordinatorDashboard.css";
  
// Backend API base (use Vite env var if provided)
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';


Modal.setAppElement("#root");

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    department: localStorage.getItem('department') || "",
    coordinatorName: localStorage.getItem('userName') || "",
    date: "",
    startTime: "",
    endTime: "",
    yearSection: "",
    route: "",
    purpose: "",
    studentCount: "",
  });

  // Fetch requests from backend
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/transport/requests`);
      // Defensive: backend should return an array, but handle wrapped or unexpected shapes
      // and log the payload for debugging in devtools.
      // Examples handled: [] | { requests: [] } | { success: true, request: {...} }
      // Prefer an array when available, otherwise fall back to empty array.
      // eslint-disable-next-line no-console
      console.log('fetch /api/requests ->', res.data);
      const payload = res.data;
      if (Array.isArray(payload)) setRequests(payload);
      else if (Array.isArray(payload.requests)) setRequests(payload.requests);
      else if (Array.isArray(payload.data)) setRequests(payload.data);
      else setRequests([]);
    } catch (err) {
      console.error("Error fetching requests", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit new request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send payload matching backend schema at /api/transport/request
      const payload = {
        department: formData.department,
        coordinatorName: formData.coordinatorName,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        route: formData.route,
        studentCount: Number(formData.studentCount) || 0,
        purpose: formData.purpose,
      };
      const res = await axios.post(`${API_BASE}/api/transport/request`, payload);
      // eslint-disable-next-line no-console
      console.log('post /api/transport/request ->', res.data);
      setModalIsOpen(false);
      setFormData({
        department: localStorage.getItem('department') || "",
        coordinatorName: localStorage.getItem('userName') || "",
        date: "",
        startTime: "",
        endTime: "",
        yearSection: "",
        route: "",
        purpose: "",
        studentCount: "",
      });
      fetchRequests(); // Refresh table
    } catch (err) {
      console.error("Error adding request", err);
    }
  };

  return (
    <div className="dashboard-container dashboard-theme">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Department Coordinator Dashboard</h1>
        <div className="header-buttons">
          <button onClick={() => setModalIsOpen(true)}>
            <FaPlus /> New Request
          </button>
          <button>
            <FaBell /> Notifications
          </button>
          <button>
            <FaExclamationCircle /> Issues
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="card total">
          <h3>Total Requests</h3>
          <p>{requests.length}</p>
        </div>
        <div className="card pending">
          <h3>Pending</h3>
          <p>{requests.filter(r => r.status === "Pending").length}</p>
        </div>
        <div className="card approved">
          <h3>Approved</h3>
          <p>{requests.filter(r => r.status === "Approved").length}</p>
        </div>
        <div className="card rejected">
          <h3>Rejected</h3>
          <p>{requests.filter(r => r.status === "Rejected").length}</p>
        </div>
      </div>

      {/* Requests Table */}
      <div className="requests-table">
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Coordinator</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td>{req.department}</td>
                <td>{req.coordinatorName}</td>
                <td>{req.date ? new Date(req.date).toLocaleDateString() : '-'}</td>
                <td>{req.startTime || '-'}</td>
                <td>{req.endTime || '-'}</td>
                <td>
                  <span className={`status-badge ${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Request Form */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="request-modal"
        overlayClassName="modal-overlay"
      >
        <h2>New Request</h2>
        <form onSubmit={handleSubmit} className="request-form">
          <label>
            Department
            <input type="text" name="department" value={formData.department} onChange={handleChange} required />
          </label>
          <label>
            Coordinator Name
            <input type="text" name="coordinatorName" value={formData.coordinatorName} onChange={handleChange} readOnly />
          </label>
          <label>
            Date(s) of Extra Class
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <label style={{ flex: 1 }}>
              Start Time
              <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
            </label>
            <label style={{ flex: 1 }}>
              End Time
              <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
            </label>
          </div>
          <label>
            Year / Section
            <input type="text" name="yearSection" value={formData.yearSection} onChange={handleChange} />
          </label>
          <label>
            Subject / Purpose
            <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} />
          </label>
          <label>
            Expected Student Count
            <input type="number" name="studentCount" value={formData.studentCount} onChange={handleChange} required />
          </label>
          <label>
            Route
            <input type="text" name="route" value={formData.route} onChange={handleChange} />
          </label>
          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
