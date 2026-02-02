import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaPlus, FaBell, FaExclamationCircle, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../utils/authFetch";
import "./DeptCoordinatorDashboard.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
Modal.setAppElement("#root");

export default function DeptCoordinatorDashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    department: localStorage.getItem("department") || "",
    coordinatorName: localStorage.getItem("userName") || "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    yearSection: "",
    route: "",
    purpose: "",
    studentCount: "",
  });

  // ✅ TOKEN-PROTECTED FETCH (CORRECT ENDPOINT)
  const fetchRequests = async () => {
    try {
      const res = await authFetch(
        `${API_BASE}/api/transport/requests`
      );
      const data = await res.json();
      console.log("Fetched requests:", data);
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching requests", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Focus or open native picker for inputs when icons are clicked
  const focusInput = (name) => {
    const el = document.querySelector(`input[name="${name}"], select[name="${name}"]`);
    if (!el) return;
    // use showPicker when available (Chromium)
    if (typeof el.showPicker === "function") {
      try {
        el.showPicker();
        return;
      } catch (e) {
        // fallthrough to focus
      }
    }
    el.focus();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authFetch(`${API_BASE}/api/transport/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          department: formData.department,
          coordinatorName: formData.coordinatorName,
          startDate: formData.startDate,
          endDate: formData.endDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
          route: formData.route,
          studentCount: Number(formData.studentCount),
          purpose: formData.purpose,
        }),
      });

      setModalIsOpen(false);
      fetchRequests();
    } catch (err) {
      console.error("Error submitting request", err);
    }
  };
const totalRequests = requests.length;

const approvedCount = requests.filter(
  r => r.status?.toLowerCase() === "approved"
).length;

const pendingCount = requests.filter(
  r => r.status?.toLowerCase() === "pending"
).length;

const rejectedCount = requests.filter(
  r => r.status?.toLowerCase() === "rejected"
).length;



  return (
    <div className="dashboard-container dashboard-theme">
      <header className="dashboard-header">
        <h1>Department Coordinator Dashboard</h1>
        <div className="header-buttons">
          <button onClick={() => setModalIsOpen(true)}>
            <FaPlus /> New Request
          </button>
          <button><FaBell /> Notifications</button>
          <button onClick={() => navigate('/dept_coordinator/issues')}><FaExclamationCircle /> Issues</button>
        </div>
      </header>

      {/* Stats */}
      <div className="stats-cards">
  <div className="card total">
    <h3>Total Requests</h3>
    <p>{totalRequests}</p>
  </div>

  <div className="card approved">
    <h3>Approved</h3>
    <p>{approvedCount}</p>
  </div>

  <div className="card pending">
    <h3>Pending</h3>
    <p>{pendingCount}</p>
  </div>

  <div className="card rejected">
    <h3>Rejected</h3>
    <p>{rejectedCount}</p>
  </div>
</div>


      {/* Table */}
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
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.department}</td>
                <td>{req.coordinatorName}</td>
                <td>{new Date(req.date).toLocaleDateString()}</td>
                <td>{req.startTime || "-"}</td>
                <td>{req.endTime || "-"}</td>
                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
            <select name="department" value={formData.department} onChange={handleChange}>
              <option value="">Select department</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="AIML">AIML</option>
              <option value="AIDS">AIDS</option>
              <option value="CSD">CSD</option>
              <option value="EEE">EEE</option>
              <option value="ECE">ECE</option>
              <option value="EIE">EIE</option>
              <option value="CHEM">CHEM</option>
              <option value="AUTO">AUTO</option>
              <option value="CIVIL">CIVIL</option>
              <option value="MECH">MECH</option>
              <option value="MECHATRONIC">MECHATRONIC</option>
              <option value="BSC">BSC</option>
              <option value="MSC">MSC</option>
              <option value="MBA">MBA</option>
              <option value="PLACEMENT CELL">PLACEMENT CELL</option>
              <option value="TRAINING CELL">TRAINING CELL</option>
            </select>
          </label>

          <label>
            Coordinator
            <input name="coordinatorName" value={formData.coordinatorName} readOnly />
          </label>

          <label>
            Date (start)
            <div className="input-with-icon">
              <FaRegCalendarAlt className="input-icon" aria-hidden="true" onClick={() => focusInput('startDate')} role="button" />
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
            </div>
          </label>

          <label>
            Date (end)
            <div className="input-with-icon">
              <FaRegCalendarAlt className="input-icon" aria-hidden="true" onClick={() => focusInput('endDate')} role="button" />
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
            </div>
          </label>

          <label>
            Start Time
            <div className="input-with-icon">
              <FaRegClock className="input-icon" aria-hidden="true" onClick={() => focusInput('startTime')} role="button" />
              <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
            </div>
          </label>

          <label>
            End Time
            <div className="input-with-icon">
              <FaRegClock className="input-icon" aria-hidden="true" onClick={() => focusInput('endTime')} role="button" />
              <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
            </div>
          </label>

          <label>
            Subject / Purpose
            <textarea name="purpose" value={formData.purpose} onChange={handleChange} />
          </label>

          <label>
            Expected Student Count
            <input type="number" name="studentCount" min="0" value={formData.studentCount} onChange={handleChange} />
          </label>

          <div className="form-buttons">
            <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
